<?php
/**
 * Plugin Name: GlowWithin — COD handling fee
 * Description: Adds a non-refundable ₹100 handling fee to Cash on Delivery orders, shows the notice under the COD option, and refreshes the totals when the payment method changes.
 * Author:      Webel.io
 * Version:     1.0.0
 *
 * INSTALL — upload this file to:  wp-content/mu-plugins/glowwithin-cod-fee.php
 * (create the mu-plugins folder if it does not exist). Must-use plugins load
 * automatically — there is nothing to activate, and nothing is lost when
 * BeTheme or WooCommerce update.
 *
 * The shop runs the parent BeTheme with no child theme, so this must NOT go in
 * the theme's functions.php — a theme update would erase it.
 *
 * =====================================================================
 * GlowWithin™ — Cash on Delivery policy
 *  1) COD is available on every order (no minimum order value)
 *  2) ₹100 non-refundable handling fee on all COD orders
 *  3) Fee notice shown under the COD option at checkout
 *  4) Totals refresh instantly when the payment method changes
 * =====================================================================
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // no direct access
}

/** The fee, in rupees. Change this one number to change the fee everywhere. */
const GLOWWITHIN_COD_FEE = 100;

/* ---- 1. Add the ₹100 fee when COD is the chosen method ---- */
add_action( 'woocommerce_cart_calculate_fees', function ( $cart ) {

	if ( is_admin() && ! defined( 'DOING_AJAX' ) ) {
		return;
	}
	if ( ! function_exists( 'WC' ) || ! WC()->session ) {
		return;
	}

	if ( 'cod' !== WC()->session->get( 'chosen_payment_method' ) ) {
		return;
	}

	/* Safety net: if COD is not actually offered for this order (for example
	   it was switched off, or excluded for the customer's country), a stale
	   session value must not add the fee to a prepaid order. */
	$gateways = WC()->payment_gateways() ? WC()->payment_gateways()->get_available_payment_gateways() : array();
	if ( ! isset( $gateways['cod'] ) ) {
		return;
	}

	$cart->add_fee(
		__( 'COD Handling Fee (non-refundable)', 'glowwithin' ),
		GLOWWITHIN_COD_FEE,
		false // not taxable
	);
} );

/* ---- 2. Fee notice under the COD option ---- */
add_filter( 'woocommerce_gateway_description', function ( $description, $gateway_id ) {

	if ( 'cod' === $gateway_id ) {
		$description .= '<br><small>A non-refundable '
			. wp_strip_all_tags( wc_price( GLOWWITHIN_COD_FEE ) )
			. ' COD handling fee applies. Choose prepaid at checkout to avoid the COD handling fee.</small>';
	}

	return $description;
}, 10, 2 );

/* ---- 3. Refresh totals when the payment method changes ---- */
add_action( 'wp_footer', function () {

	if ( ! function_exists( 'is_checkout' ) || ! is_checkout() || is_wc_endpoint_url() ) {
		return;
	}
	?>
	<script>
	jQuery( function ( $ ) {
		$( document.body ).on( 'change', 'input[name="payment_method"]', function () {
			$( document.body ).trigger( 'update_checkout' );
		} );
	} );
	</script>
	<?php
} );
