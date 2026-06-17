<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class NM_Header_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'nm_header';
	}

	public function get_title() {
		return esc_html__( '01. NM Header', 'negar-mohammadi' );
	}

	public function get_icon() {
		return 'eicon-header';
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

		$this->add_control(
			'site_title_part1',
			[
				'label' => esc_html__( 'Site Title Part 1', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Negar',
			]
		);

		$this->add_control(
			'site_title_part2',
			[
				'label' => esc_html__( 'Site Title Part 2 (Gold)', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Mohammadi',
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'link_text', [
				'label' => esc_html__( 'Link Text', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => esc_html__( 'Link Text' , 'negar-mohammadi' ),
				'label_block' => true,
			]
		);

		$repeater->add_control(
			'link_url', [
				'label' => esc_html__( 'Link URL', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => '#',
			]
		);

		$this->add_control(
			'nav_links',
			[
				'label' => esc_html__( 'Navigation Links', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::REPEATER,
				'fields' => $repeater->get_controls(),
				'default' => [
					[ 'link_text' => 'Maison', 'link_url' => '#story' ],
					[ 'link_text' => 'Collections', 'link_url' => '#collections' ],
					[ 'link_text' => 'Couture', 'link_url' => '#couture' ],
					[ 'link_text' => 'Atelier', 'link_url' => '#appointment' ],
				],
				'title_field' => '{{{ link_text }}}',
			]
		);

		$this->add_control(
			'button_text',
			[
				'label' => esc_html__( 'Button Text', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Reserve',
			]
		);

		$this->add_control(
			'button_url',
			[
				'label' => esc_html__( 'Button URL', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => '#appointment',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
        <div class="nm-widget-container">
            <header class="nm-container nm-fixed nm-inset-x-0 nm-top-0 nm-z-40 nm-transition-all nm-duration-700 nm-py-4">
                <div class="nm-container nm-mx-auto nm-max-w-1500 nm-px-6 md:nm-px-12 nm-transition-all nm-duration-700 nm-glass nm-mx-4 md:nm-mx-8 nm-px-6 nm-py-3">
                    <div class="nm-container nm-flex nm-items-center nm-justify-between">
                        <a href="#" class="nm-container nm-font-display text-xl md:text-2xl tracking-wide">
                            <?php echo esc_html( $settings['site_title_part1'] ); ?>
                            <span class="nm-container nm-text-gold italic"><?php echo esc_html( $settings['site_title_part2'] ); ?></span>
                        </a>
                        <nav class="nm-container hidden md:nm-flex nm-items-center gap-10 nm-font-mono-luxe text-foreground/80">
                            <?php foreach ( $settings['nav_links'] as $item ) : ?>
                                <a href="<?php echo esc_attr( $item['link_url'] ); ?>" class="nm-container hover:nm-text-gold transition-colors">
                                    <?php echo esc_html( $item['link_text'] ); ?>
                                </a>
                            <?php endforeach; ?>
                        </nav>
                        <a href="<?php echo esc_attr( $settings['button_url'] ); ?>"
                        class="nm-container nm-group nm-relative nm-inline-flex nm-items-center gap-2 nm-px-5 nm-py-2.5 nm-font-mono-luxe text-background nm-bg-gold nm-overflow-hidden">
                            <span class="nm-container nm-relative nm-z-10"><?php echo esc_html( $settings['button_text'] ); ?></span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                class="nm-container lucide lucide-arrow-up-right nm-relative nm-z-10 size-3.5" aria-hidden="true">
                                <path d="M7 7h10v10"></path>
                                <path d="M7 17 17 7"></path>
                            </svg>
                            <span class="nm-container nm-absolute nm-inset-0 nm-bg-foreground nm-translate-y-full nm-group-hover-translate-y-0 nm-transition-all nm-duration-500"></span>
                        </a>
                    </div>
                </div>
            </header>
        </div>
		<?php
	}
}
