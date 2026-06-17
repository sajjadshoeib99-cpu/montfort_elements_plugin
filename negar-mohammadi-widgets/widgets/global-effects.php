<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class NM_Global_Effects_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'nm_global_effects';
	}

	public function get_title() {
		return esc_html__( '00. NM Global Effects', 'negar-mohammadi' );
	}

	public function get_icon() {
		return 'eicon-global-settings';
	}

	public function get_categories() {
		return [ 'general' ];
	}

	protected function register_controls() {
		$this->start_controls_section(
			'content_section',
			[
				'label' => esc_html__( 'Settings', 'negar-mohammadi' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'show_cursor',
			[
				'label' => esc_html__( 'Show Custom Cursor', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::SWITCHER,
				'label_on' => esc_html__( 'Show', 'negar-mohammadi' ),
				'label_off' => esc_html__( 'Hide', 'negar-mohammadi' ),
				'return_value' => 'yes',
				'default' => 'yes',
			]
		);

		$this->add_control(
			'show_grain',
			[
				'label' => esc_html__( 'Show Grain Overlay', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::SWITCHER,
				'label_on' => esc_html__( 'Show', 'negar-mohammadi' ),
				'label_off' => esc_html__( 'Hide', 'negar-mohammadi' ),
				'return_value' => 'yes',
				'default' => 'yes',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();

		if ( 'yes' === $settings['show_cursor'] ) : ?>
            <div aria-hidden="true" class="nm-container nm-custom-cursor pointer-events-none fixed left-0 top-0 z-[60] hidden md:block">
                <div class="nm-container nm-custom-cursor-dot -translate-x-1/2 -translate-y-1/2 size-3 rounded-full bg-gold"
                     style="opacity: 1;"></div>
                <div class="nm-container nm-custom-cursor-outer -translate-x-1/2 -translate-y-1/2 absolute left-0 top-0 size-10 rounded-full border border-gold/40"></div>
            </div>
		<?php endif;

		if ( 'yes' === $settings['show_grain'] ) : ?>
            <div aria-hidden="true" class="nm-container nm-pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
                 style="background-image:url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>&quot;)"></div>
		<?php endif;
	}
}
