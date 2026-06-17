<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class NM_Hero_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'nm_hero';
	}

	public function get_title() {
		return esc_html__( '02. NM Hero', 'negar-mohammadi' );
	}

	public function get_icon() {
		return 'eicon-banner';
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
			'hero_image',
			[
				'label' => esc_html__( 'Hero Image', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::MEDIA,
				'default' => [
					'url' => '',
				],
			]
		);

		$this->add_control(
			'badge_text',
			[
				'label' => esc_html__( 'Badge Text', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Atelier · Paris — Tehran · Est. 2012',
			]
		);

		$this->add_control(
			'title_line1',
			[
				'label' => esc_html__( 'Title Line 1', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'The Art of',
			]
		);

		$this->add_control(
			'title_line2_italic',
			[
				'label' => esc_html__( 'Title Line 2 (Italic)', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Becoming',
			]
		);

		$this->add_control(
			'title_line3',
			[
				'label' => esc_html__( 'Title Line 3', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Couture.',
			]
		);

		$this->add_control(
			'description',
			[
				'label' => esc_html__( 'Description', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'A private maison dressing women of presence — sculpting one-of-one gowns from hand-loomed silks, vintage lace, and gold filigree.',
			]
		);

		$this->add_control(
			'button_text',
			[
				'label' => esc_html__( 'Button Text', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Discover the Collections',
			]
		);

		$this->add_control(
			'button_url',
			[
				'label' => esc_html__( 'Button URL', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => '#collections',
			]
		);

        $this->add_control(
			'scroll_text',
			[
				'label' => esc_html__( 'Scroll Text', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Scroll',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
        <div class="nm-widget-container">
            <section class="nm-container nm-relative h-[100svh] min-h-[780px] nm-w-full nm-overflow-hidden">
                <div class="nm-container nm-absolute nm-inset-0">
                    <div class="nm-container nm-absolute -nm-top-40 -nm-left-40 nm-size-600 nm-rounded-full nm-bg-gold/10 nm-blur-120 nm-animate-glow-pulse"></div>
                    <div class="nm-container nm-absolute nm-top-1/3 -nm-right-40 nm-size-500 nm-rounded-full nm-bg-gold/15 nm-blur-140 nm-animate-glow-pulse"
                        style="animation-delay:1.5s"></div>
                </div>
                <div class="nm-container nm-absolute nm-inset-0" style="transform: scale(1.15);">
                    <?php if ( ! empty( $settings['hero_image']['url'] ) ) : ?>
                        <img src="<?php echo esc_url( $settings['hero_image']['url'] ); ?>"
                             alt="Couture"
                             class="nm-container nm-absolute nm-right-0 nm-top-0 nm-h-full nm-w-full md:nm-w-[58%] nm-object-cover object-center">
                    <?php endif; ?>
                    <div class="nm-container nm-absolute nm-inset-0 bg-gradient-to-r from-background via-background/85 to-transparent"></div>
                    <div class="nm-container nm-absolute nm-inset-0 bg-gradient-to-t from-background via-transparent to-background/40"></div>
                </div>
                <div class="nm-container nm-relative z-10 nm-mx-auto nm-flex nm-h-full nm-max-w-1500 nm-flex-col nm-justify-end nm-px-6 md:nm-px-12 nm-pb-20 md:nm-pb-32">
                    <div class="nm-container nm-flex nm-items-center gap-3 nm-mb-8">
                        <span class="nm-container nm-h-px nm-w-12 nm-bg-gold"></span>
                        <span class="nm-container nm-font-mono-luxe nm-text-gold"><?php echo esc_html( $settings['badge_text'] ); ?></span>
                    </div>
                    <h1 class="nm-container nm-font-display max-w-5xl text-[15vw] md:text-[8.5vw] leading-[0.92] tracking-[-0.04em]">
                        <span class="nm-container nm-inline-block nm-overflow-hidden"><span class="nm-inline-block"><?php echo esc_html( $settings['title_line1'] ); ?></span></span>
                        <span class="nm-container nm-inline-block nm-overflow-hidden"><span class="nm-inline-block"><span class="nm-italic nm-text-gradient-gold"> <?php echo esc_html( $settings['title_line2_italic'] ); ?> </span></span></span>
                        <span class="nm-container nm-inline-block nm-overflow-hidden"><span class="nm-inline-block"><?php echo esc_html( $settings['title_line3'] ); ?></span></span>
                    </h1>
                    <div class="nm-container nm-mt-10 nm-flex nm-flex-col md:nm-flex-row md:nm-items-end md:nm-justify-between gap-8">
                        <p class="nm-container nm-max-w-md text-foreground/70 leading-relaxed"><?php echo esc_html( $settings['description'] ); ?></p>
                        <div class="nm-container nm-flex nm-items-center gap-6">
                            <a href="<?php echo esc_attr( $settings['button_url'] ); ?>" class="nm-container nm-group nm-inline-flex nm-items-center gap-3 nm-font-mono-luxe">
                                <span class="nm-container nm-relative">
                                    <?php echo esc_html( $settings['button_text'] ); ?>
                                    <span class="nm-container nm-absolute -nm-bottom-1 nm-left-0 h-px nm-w-full origin-left scale-x-0 nm-bg-gold nm-transition-all nm-duration-500 group-hover:scale-x-100"></span>
                                </span>
                                <span class="nm-container nm-grid nm-size-10 nm-place-items-center nm-rounded-full nm-border-gold-40 nm-transition-all group-hover:nm-bg-gold group-hover:text-background">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                                        class="nm-container lucide lucide-chevron-right size-4" aria-hidden="true">
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="nm-container nm-absolute nm-bottom-8 nm-left-1/2 -nm-translate-x-1/2 nm-flex nm-flex-col nm-items-center gap-3">
                    <span class="nm-container nm-font-mono-luxe text-foreground/50"><?php echo esc_html( $settings['scroll_text'] ); ?></span>
                    <div class="nm-container nm-h-10 nm-w-px bg-gradient-to-b from-gold to-transparent"></div>
                </div>
            </section>
        </div>
		<?php
	}
}
