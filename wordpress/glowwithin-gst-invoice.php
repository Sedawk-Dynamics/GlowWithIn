<?php
/**
 * Plugin Name: GlowWithin — GST details on invoices
 * Description: Captures the customer's GSTIN at checkout, stores an HSN code per product, and prints Place of Supply + both GSTINs on the PDF invoice.
 * Author:      Webel.io
 * Version:     1.0.0
 *
 * INSTALL — either:
 *   • WPCode → Add Snippet → Add Your Custom Code → PHP Snippet, paste everything
 *     BELOW the closing comment of this header, Auto Insert → Run Everywhere; or
 *   • upload this file to wp-content/mu-plugins/glowwithin-gst-invoice.php
 *
 * WHAT THIS DOES NOT DO: it does not calculate GST. The CGST/SGST/IGST split
 * comes from WooCommerce → Settings → Tax, which must be configured first —
 * otherwise the invoice shows GST numbers but no tax amount, and neither side
 * can claim input credit.
 *
 * Requires: WooCommerce + PDF Invoices & Packing Slips for WooCommerce.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Your GSTIN. Also add it to PDF Invoices → General → Shop Additional Info. */
const GLOWWITHIN_SELLER_GSTIN = '36XXXXXXXXXXXZX';

/** GSTIN format: 2-digit state code, PAN, entity code, Z, checksum. */
const GLOWWITHIN_GSTIN_REGEX = '/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/';

/* ==========================================================================
 * 1. GSTIN field at checkout (optional — only B2B buyers fill it in)
 * ========================================================================== */

add_filter( 'woocommerce_billing_fields', function ( $fields ) {

	$fields['billing_gstin'] = array(
		'type'        => 'text',
		'label'       => __( 'GSTIN (optional — for a GST input-credit invoice)', 'glowwithin' ),
		'placeholder' => '22AAAAA0000A1Z5',
		'required'    => false,
		'class'       => array( 'form-row-wide' ),
		'clear'       => true,
		'priority'    => 125, // after the company field
	);

	return $fields;
} );

/* Reject a malformed GSTIN rather than printing a wrong one on a tax invoice. */
add_action( 'woocommerce_after_checkout_validation', function ( $data, $errors ) {

	if ( empty( $data['billing_gstin'] ) ) {
		return; // optional field, left blank
	}

	$gstin = strtoupper( preg_replace( '/\s+/', '', $data['billing_gstin'] ) );

	if ( ! preg_match( GLOWWITHIN_GSTIN_REGEX, $gstin ) ) {
		$errors->add(
			'billing_gstin',
			__( 'Please enter a valid 15-character GSTIN, or leave the field blank.', 'glowwithin' )
		);
	}
}, 10, 2 );

/* Save it on the order. */
add_action( 'woocommerce_checkout_create_order', function ( $order, $data ) {

	if ( empty( $data['billing_gstin'] ) ) {
		return;
	}

	$gstin = strtoupper( preg_replace( '/\s+/', '', $data['billing_gstin'] ) );
	$order->update_meta_data( '_billing_gstin', sanitize_text_field( $gstin ) );
}, 10, 2 );

/* Show it in wp-admin on the order screen. */
add_action( 'woocommerce_admin_order_data_after_billing_address', function ( $order ) {

	$gstin = $order->get_meta( '_billing_gstin' );

	if ( $gstin ) {
		echo '<p><strong>' . esc_html__( 'GSTIN', 'glowwithin' ) . ':</strong> ' . esc_html( $gstin ) . '</p>';
	}
} );

/* ==========================================================================
 * 2. HSN code per product
 * ========================================================================== */

/* Field on the product edit screen: Product data → Inventory. */
add_action( 'woocommerce_product_options_inventory_product_data', function () {

	woocommerce_wp_text_input( array(
		'id'          => '_hsn_code',
		'label'       => __( 'HSN code', 'glowwithin' ),
		'description' => __( 'Printed on the tax invoice for this product, e.g. 3305 for hair preparations.', 'glowwithin' ),
		'desc_tip'    => true,
	) );
} );

add_action( 'woocommerce_admin_process_product_object', function ( $product ) {

	$hsn = isset( $_POST['_hsn_code'] ) ? sanitize_text_field( wp_unslash( $_POST['_hsn_code'] ) ) : '';
	$product->update_meta_data( '_hsn_code', $hsn );
} );

/**
 * Copy the HSN onto the order line at checkout.
 *
 * Storing it as order-item meta (rather than reading the product at print
 * time) means the invoice always shows the HSN that applied on the day of
 * sale, even if the product is edited or deleted later — which is the whole
 * point of an invoice being a record.
 */
add_action( 'woocommerce_checkout_create_order_line_item', function ( $item, $cart_item_key, $values, $order ) {

	$product = $item->get_product();

	if ( ! $product ) {
		return;
	}

	$hsn = $product->get_meta( '_hsn_code' );

	if ( ! $hsn && $product->get_parent_id() ) { // variation falls back to the parent
		$parent = wc_get_product( $product->get_parent_id() );
		$hsn    = $parent ? $parent->get_meta( '_hsn_code' ) : '';
	}

	if ( $hsn ) {
		$item->add_meta_data( __( 'HSN', 'glowwithin' ), $hsn, true );
	}
}, 10, 4 );

/* ==========================================================================
 * 3. Print Place of Supply + both GSTINs on the PDF invoice
 * ========================================================================== */

add_action( 'wpo_wcpdf_after_order_data', function ( $document_type, $order ) {

	if ( 'invoice' !== $document_type || ! is_a( $order, 'WC_Order' ) ) {
		return;
	}

	/* Seller GSTIN */
	if ( GLOWWITHIN_SELLER_GSTIN && false === strpos( GLOWWITHIN_SELLER_GSTIN, 'XXXX' ) ) {
		echo '<tr class="gstin-seller"><th>' . esc_html__( 'Our GSTIN', 'glowwithin' ) . ':</th><td>'
			. esc_html( GLOWWITHIN_SELLER_GSTIN ) . '</td></tr>';
	}

	/* Buyer GSTIN — only present on B2B orders */
	$buyer_gstin = $order->get_meta( '_billing_gstin' );

	if ( $buyer_gstin ) {
		echo '<tr class="gstin-buyer"><th>' . esc_html__( 'Customer GSTIN', 'glowwithin' ) . ':</th><td>'
			. esc_html( $buyer_gstin ) . '</td></tr>';
	}

	/* Place of supply — the billing state decides CGST+SGST vs IGST */
	$state_code = $order->get_billing_state();
	$country    = $order->get_billing_country();

	if ( $state_code && 'IN' === $country ) {
		$states = WC()->countries->get_states( 'IN' );
		$state  = isset( $states[ $state_code ] ) ? $states[ $state_code ] : $state_code;

		echo '<tr class="place-of-supply"><th>' . esc_html__( 'Place of Supply', 'glowwithin' ) . ':</th><td>'
			. esc_html( $state ) . '</td></tr>';
	}
}, 10, 2 );
