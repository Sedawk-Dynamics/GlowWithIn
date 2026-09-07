<?php
/**
 * Plugin Name: GlowWithin — percentage-off sale badge
 * Description: Replaces WooCommerce's "On Sale" flash with the actual discount ("31% OFF") on the shop loop, the single product page and related products.
 * Author:      Webel.io
 * Version:     1.0.0
 *
 * INSTALL — either:
 *   • WPCode → Add Snippet → Add Your Custom Code → PHP Snippet, paste everything
 *     BELOW this header, Auto Insert → Run Everywhere; or
 *   • upload this file to wp-content/mu-plugins/glowwithin-sale-badge.php
 *
 * The site runs the parent BeTheme with no child theme, so functions.php is not
 * an option — a theme update would erase it.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Discount as a whole percentage, or 0 when the product is not really on sale.
 *
 * Rounded DOWN, never up: a 49.7% saving must not be advertised as "50% OFF".
 * Variable products report their deepest discount, which is what the badge on a
 * "from ₹x" price is claiming.
 */
function glowwithin_sale_percent( $product ) {

	if ( ! $product instanceof WC_Product || ! $product->is_on_sale() ) {
		return 0;
	}

	$best = 0;

	if ( $product->is_type( 'variable' ) ) {
		foreach ( $product->get_children() as $child_id ) {
			$variation = wc_get_product( $child_id );

			if ( $variation ) {
				$best = max( $best, glowwithin_sale_percent_single( $variation ) );
			}
		}
	} else {
		$best = glowwithin_sale_percent_single( $product );
	}

	return $best;
}

/** Percentage for one concrete product/variation. */
function glowwithin_sale_percent_single( $product ) {

	$regular = (float) $product->get_regular_price();
	$sale    = (float) $product->get_sale_price();

	// A blank or zero regular price makes the ratio meaningless; a sale price at
	// or above the regular price is a data-entry slip, not a discount.
	if ( $regular <= 0 || $sale <= 0 || $sale >= $regular ) {
		return 0;
	}

	return (int) floor( ( ( $regular - $sale ) / $regular ) * 100 );
}

/** The badge markup — keeps the theme's .onsale class so BeTheme still styles it. */
function glowwithin_sale_badge_html( $percent ) {
	return '<span class="onsale gw-onsale">' . esc_html( sprintf( '%d%% OFF', $percent ) ) . '</span>';
}

/* ==========================================================================
 * 1. The normal path — every standards-compliant theme runs this filter
 * ========================================================================== */

add_filter( 'woocommerce_sale_flash', function ( $html, $post, $product ) {

	$percent = glowwithin_sale_percent( $product );

	return $percent ? glowwithin_sale_badge_html( $percent ) : $html;
}, 20, 3 );

/* ==========================================================================
 * 2. Safety net for themes that print the badge without running the filter
 *
 * BeTheme ships its own copies of WooCommerce's sale-flash templates (that is
 * why the badge says "On Sale" rather than WooCommerce's "Sale!"). If a copy
 * dropped the apply_filters() call, section 1 above never fires. Buffering the
 * badge hooks and rewriting only the <span class="onsale"> covers that case
 * without touching anything else on the page.
 * ========================================================================== */

function glowwithin_badge_buffer_start() {
	if ( glowwithin_sale_percent( $GLOBALS['product'] ?? null ) ) {
		ob_start();
	}
}

function glowwithin_badge_buffer_end() {

	$percent = glowwithin_sale_percent( $GLOBALS['product'] ?? null );

	if ( ! $percent || ! ob_get_level() ) {
		return;
	}

	$html = ob_get_clean();

	if ( false === $html ) {
		return;
	}

	// Rewrite the badge's inner text only when it isn't already a percentage,
	// so this never fights with section 1 when both happen to run.
	echo preg_replace_callback(
		'#(<span[^>]*class="[^"]*\bonsale\b[^"]*"[^>]*>)(.*?)(</span>)#is',
		static function ( $m ) use ( $percent ) {
			return false !== strpos( $m[2], '%' ) ? $m[0] : $m[1] . esc_html( sprintf( '%d%% OFF', $percent ) ) . $m[3];
		},
		$html
	);
}

foreach ( array( 'woocommerce_before_shop_loop_item_title', 'woocommerce_before_single_product_summary' ) as $glowwithin_badge_hook ) {
	add_action( $glowwithin_badge_hook, 'glowwithin_badge_buffer_start', 1 );
	add_action( $glowwithin_badge_hook, 'glowwithin_badge_buffer_end', 99 );
}
unset( $glowwithin_badge_hook );

/* ==========================================================================
 * 3. Presentation — the percentage is one character wider than "On Sale",
 *    so stop it wrapping inside BeTheme's fixed-width badge.
 * ========================================================================== */

add_action( 'wp_head', function () {

	if ( ! function_exists( 'is_woocommerce' ) || ! ( is_woocommerce() || is_cart() || is_checkout() ) ) {
		return;
	}
	?>
<style id="gw-onsale">
.onsale.gw-onsale{white-space:nowrap;letter-spacing:.02em;font-weight:700}
</style>
	<?php
}, 20 );
