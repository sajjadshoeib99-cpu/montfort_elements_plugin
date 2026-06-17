<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class NM_Metamorphosis_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'nm_metamorphosis';
	}

	public function get_title() {
		return esc_html__( '07. NM Metamorphosis', 'negar-mohammadi' );
	}

	public function get_icon() {
		return 'eicon-image-before-after';
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
			'section_number',
			[
				'label' => esc_html__( 'Section Number', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => '04',
			]
		);

		$this->add_control(
			'section_tag',
			[
				'label' => esc_html__( 'Section Tag', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Transformations',
			]
		);

		$this->add_control(
			'title',
			[
				'label' => esc_html__( 'Title', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'From sketch<br>to <span class="nm-container nm-italic text-gradient-gold">silhouette.</span>',
			]
		);

		$this->add_control(
			'description',
			[
				'label' => esc_html__( 'Description', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'A glimpse into the metamorphosis — the croquis on the left, the finished piece on the right. Drag to reveal.',
			]
		);

		$this->add_control(
			'before_image',
			[
				'label' => esc_html__( 'Before Image (Sketch)', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::MEDIA,
				'default' => [ 'url' => plugins_url( '/assets/images/collection-1-D95NfIyU.jpg', __FILE__ ) ],
			]
		);

		$this->add_control(
			'after_image',
			[
				'label' => esc_html__( 'After Image (Final)', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::MEDIA,
				'default' => [ 'url' => plugins_url( '/assets/images/collection-1-D95NfIyU.jpg', __FILE__ ) ],
			]
		);

		$this->add_control(
			'before_label',
			[
				'label' => esc_html__( 'Before Label', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Atelier · Sketch',
			]
		);

		$this->add_control(
			'after_label',
			[
				'label' => esc_html__( 'After Label', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Couture · Final',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
        <section class="nm-container nm-relative py-32 md:py-48 px-6 md:px-12 bg-surface/30">
            <div class="nm-container nm-mx-auto max-w-[1500px]">
                <div class="nm-container nm-flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
                    <div>
                        <div class="nm-container nm-flex items-center gap-3 font-mono-luxe">
                            <span class="nm-container nm-text-gold"><?php echo esc_html( $settings['section_number'] ); ?></span>
                            <span class="nm-container nm-h-px w-10 bg-gold/50"></span>
                            <span class="nm-container nm-text-foreground/70"><?php echo esc_html( $settings['section_tag'] ); ?></span>
                        </div>
                        <h2 class="nm-container nm-font-display text-5xl md:text-7xl leading-[1] mt-8 max-w-3xl"><?php echo wp_kses_post( $settings['title'] ); ?></h2>
                    </div>
                    <p class="nm-container nm-max-w-sm text-foreground/65 leading-relaxed"><?php echo esc_html( $settings['description'] ); ?></p>
                </div>
                <div data-cursor="hover" class="nm-container nm-metamorphosis-container relative aspect-[16/10] w-full overflow-hidden ring-1 ring-border select-none">
                    <img src="<?php echo esc_url( $settings['after_image']['url'] ); ?>"
                         alt="Finished couture piece"
                         class="nm-container nm-absolute inset-0 size-full object-cover">
                    <div class="nm-container nm-metamorphosis-overlay absolute inset-0 overflow-hidden" style="clip-path:inset(0 50% 0 0)">
                        <img src="<?php echo esc_url( $settings['before_image']['url'] ); ?>"
                             alt="" aria-hidden="true"
                             class="nm-container nm-absolute inset-0 size-full object-cover grayscale contrast-125 brightness-75 sepia-[0.4]">
                        <div class="nm-container nm-absolute inset-0 bg-background/30"></div>
                        <div class="nm-container nm-absolute inset-0"
                             style="background-image:repeating-linear-gradient(90deg, transparent 0 2px, rgba(252,190,81,0.06) 2px 3px)"></div>
                    </div>
                    <div class="nm-container nm-metamorphosis-line absolute top-0 bottom-0 w-px bg-gold metamorphosis-slider" style="left:50%">
                        <div class="nm-container nm-absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-14 rounded-full glass-gold grid place-items-center">
                            <div class="nm-container nm-flex items-center text-gold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                     stroke-linejoin="round" class="nm-container lucide lucide-chevron-right size-4 rotate-180"
                                     aria-hidden="true">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                     stroke-linejoin="round" class="nm-container lucide lucide-chevron-right size-4" aria-hidden="true">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="nm-container nm-absolute top-6 left-6 font-mono-luxe text-gold"><?php echo esc_html( $settings['before_label'] ); ?></div>
                    <div class="nm-container nm-absolute top-6 right-6 font-mono-luxe text-foreground/80"><?php echo esc_html( $settings['after_label'] ); ?></div>
                </div>
            </div>
        </section>
		<?php
	}
}
