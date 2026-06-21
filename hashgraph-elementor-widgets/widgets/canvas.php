<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Hashgraph_Canvas_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'hashgraph_canvas';
	}

	public function get_title() {
		return esc_html__( '01. Hashgraph Canvas', 'hashgraph-elements' );
	}

	public function get_icon() {
		return 'eicon-code';
	}

	public function get_categories() {
		return [ 'general' ];
	}

	protected function register_controls() {
		$this->start_controls_section(
			'content_section',
			[
				'label' => esc_html__( 'Content', 'hashgraph-elements' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'canvas_width',
			[
				'label' => esc_html__( 'Width', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::NUMBER,
				'default' => 491,
			]
		);

		$this->add_control(
			'canvas_height',
			[
				'label' => esc_html__( 'Height', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::NUMBER,
				'default' => 1065,
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
		<div id="gl-canvas">
			<canvas width="<?php echo esc_attr( $settings['canvas_width'] ); ?>" height="<?php echo esc_attr( $settings['canvas_height'] ); ?>" style="display: block; width: 100%; height: 100%; touch-action: none;"
					data-engine="three.js r182 webgpu"></canvas>
		</div>
		<?php
	}
}
