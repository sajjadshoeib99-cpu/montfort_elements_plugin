<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class NM_Marquee_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'nm_marquee';
	}

	public function get_title() {
		return esc_html__( '03. NM Marquee', 'negar-mohammadi' );
	}

	public function get_icon() {
		return 'eicon-t-path';
	}

	public function get_categories() {
		return [ 'general' ];
	}

	protected function register_controls() {
		$this->start_controls_section(
			'content_section',
			[
				'label' => esc_html__( 'Content', 'negar-mohammadi' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'text', [
				'label' => esc_html__( 'Text', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => esc_html__( 'Marquee Text' , 'negar-mohammadi' ),
				'label_block' => true,
			]
		);

		$this->add_control(
			'marquee_items',
			[
				'label' => esc_html__( 'Marquee Items', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::REPEATER,
				'fields' => $repeater->get_controls(),
				'default' => [
					[ 'text' => 'Haute Couture' ],
					[ 'text' => 'Bespoke Bridal' ],
					[ 'text' => 'Red Carpet' ],
					[ 'text' => 'Private Fittings' ],
					[ 'text' => 'Hand-Embroidery' ],
					[ 'text' => 'Paris · Milan · Dubai' ],
				],
				'title_field' => '{{{ text }}}',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
        <div class="nm-widget-container">
            <section class="nm-container nm-relative border-y border-border/50 nm-py-8 nm-overflow-hidden bg-surface/40">
                <div class="nm-container nm-flex nm-animate-marquee whitespace-nowrap">
                    <?php
                    // Duplicate items for seamless loop
                    $items = array_merge($settings['marquee_items'], $settings['marquee_items'], $settings['marquee_items']);
                    foreach ( $items as $item ) : ?>
                        <div class="nm-container nm-flex nm-items-center gap-12 px-12 nm-font-display text-3xl md:text-5xl italic text-foreground/30">
                            <?php echo esc_html( $item['text'] ); ?>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                                class="nm-container lucide lucide-sparkles size-4 text-gold shrink-0" aria-hidden="true">
                                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                                <path d="M20 2v4"></path>
                                <path d="M22 4h-4"></path>
                                <circle cx="4" cy="20" r="2"></circle>
                            </svg>
                        </div>
                    <?php endforeach; ?>
                </div>
            </section>
        </div>
		<?php
	}
}
