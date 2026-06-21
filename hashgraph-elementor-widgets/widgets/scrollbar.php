<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Hashgraph_Scrollbar_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'hashgraph_scrollbar';
	}

	public function get_title() {
		return esc_html__( '08. Hashgraph Scrollbar', 'hashgraph-elements' );
	}

	public function get_icon() {
		return 'eicon-scroll';
	}

	public function get_categories() {
		return [ 'general' ];
	}

	protected function render() {
		?>
		<div class="scrollbar scrollbar--visible">
			<div class="scrollbar__inner"></div>
			<div class="scrollbar__progress" style="translate: none; rotate: none; scale: none; transform: translate3d(0px, 0px, 0px);"></div>
		</div>
		<?php
	}
}
