<?php


if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


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


add_filter( 'woocommerce_sale_flash', function ( $html, $post, $product ) {

	$percent = glowwithin_sale_percent( $product );

	return $percent ? glowwithin_sale_badge_html( $percent ) : $html;
}, 20, 3 );

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
