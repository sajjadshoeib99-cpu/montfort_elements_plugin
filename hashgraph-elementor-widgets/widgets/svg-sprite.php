<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Hashgraph_SVG_Sprite_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'hashgraph_svg_sprite';
	}

	public function get_title() {
		return esc_html__( '09. Hashgraph SVG Sprite', 'hashgraph-elements' );
	}

	public function get_icon() {
		return 'eicon-image-box';
	}

	public function get_categories() {
		return [ 'general' ];
	}

	protected function render() {
		?>
		<svg class="svg-sprite" fill="none" aria-hidden="true">
			<defs>
				<linearGradient id="btnBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stop-color="#9BB8E1"></stop>
					<stop offset="100%" stop-color="#2C4E73"></stop>
				</linearGradient>
			</defs>
			<defs>
				<linearGradient id="navBorderLeft" x1="0.5" y1="14.5" x2="65" y2="14.5" gradientUnits="userSpaceOnUse">
					<stop stop-color="#9BB8E1"></stop>
					<stop offset="1" stop-color="#235792"></stop>
				</linearGradient>
			</defs>
			<defs>
				<linearGradient id="navBorderRight" x1="-34.5" y1="14.5" x2="30" y2="14.5"
								gradientUnits="userSpaceOnUse">
					<stop stop-color="#9BB8E1"></stop>
					<stop offset="1" stop-color="#235792"></stop>
				</linearGradient>
			</defs>
		</svg>
		<?php
	}
}
