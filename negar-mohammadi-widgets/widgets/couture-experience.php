<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class NM_Couture_Experience_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'nm_couture_experience';
	}

	public function get_title() {
		return esc_html__( '06. NM Couture Experience', 'negar-mohammadi' );
	}

	public function get_icon() {
		return 'eicon-skill-bar';
	}

	public function get_categories() {
		return [ 'general' ];
	}

	protected function register_controls() {
		$this->start_controls_section(
			'content_section',
			[
				'label' => esc_html__( 'Header Content', 'negar-mohammadi' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'section_number',
			[
				'label' => esc_html__( 'Section Number', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => '03',
			]
		);

		$this->add_control(
			'section_tag',
			[
				'label' => esc_html__( 'Section Tag', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'The Couture Experience',
			]
		);

		$this->add_control(
			'title',
			[
				'label' => esc_html__( 'Title', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'Four seasons.<br><span class="nm-container nm-italic text-gradient-gold">Six hundred hours.</span><br>One gown.',
			]
		);

		$this->add_control(
			'bg_image',
			[
				'label' => esc_html__( 'Background Image (Silk)', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::MEDIA,
				'default' => [ 'url' => plugins_url( '/assets/images/gold-silk-B4lgvMfl.jpg', __FILE__ ) ],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'steps_section',
			[
				'label' => esc_html__( 'Experience Steps', 'negar-mohammadi' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'step_number', [
				'label' => esc_html__( 'Step Number (e.g. 01)', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => '01',
			]
		);

		$repeater->add_control(
			'icon', [
				'label' => esc_html__( 'Icon (SVG/Text)', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::ICONS,
				'default' => [
					'value' => 'fas fa-crown',
					'library' => 'fa-solid',
				],
			]
		);

		$repeater->add_control(
			'step_title', [
				'label' => esc_html__( 'Step Title', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'The Audience',
			]
		);

		$repeater->add_control(
			'step_description', [
				'label' => esc_html__( 'Step Description', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'An intimate consultation at the maison. We listen — for the occasion, the woman, the silhouette her presence demands.',
			]
		);

		$this->add_control(
			'steps',
			[
				'label' => esc_html__( 'Steps List', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::REPEATER,
				'fields' => $repeater->get_controls(),
				'default' => [
					[ 'step_number' => '01', 'step_title' => 'The Audience', 'step_description' => 'An intimate consultation at the maison. We listen — for the occasion, the woman, the silhouette her presence demands.' ],
					[ 'step_number' => '02', 'step_title' => 'The Toile', 'step_description' => 'A first muslin is cut and draped on the body across three private fittings over six to ten weeks.' ],
					[ 'step_number' => '03', 'step_title' => 'The Embroidery', 'step_description' => 'Petit-main artisans hand-apply beads, sequins, and metallic threads — often more than 600 hours per gown.' ],
					[ 'step_number' => '04', 'step_title' => 'The Delivery', 'step_description' => 'The finished piece is presented in a couture trunk, accompanied by its archival certificate.' ],
				],
				'title_field' => 'Step {{{ step_number }}}: {{{ step_title }}}',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
        <section id="couture" class="nm-container nm-relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
            <img src="<?php echo esc_url( $settings['bg_image']['url'] ); ?>"
                 alt="" aria-hidden="true" loading="lazy"
                 class="nm-container nm-pointer-events-none absolute -right-40 top-20 w-[60vw] opacity-30 mix-blend-screen blur-sm"
                 style="transform: translateY(-150px);">
            <div class="nm-container nm-relative mx-auto max-w-[1500px]">
                <div class="nm-container nm-max-w-3xl">
                    <div class="nm-container nm-flex items-center gap-3 font-mono-luxe">
                        <span class="nm-container nm-text-gold"><?php echo esc_html( $settings['section_number'] ); ?></span>
                        <span class="nm-container nm-h-px w-10 bg-gold/50"></span>
                        <span class="nm-container nm-text-foreground/70"><?php echo esc_html( $settings['section_tag'] ); ?></span>
                    </div>
                    <h2 class="nm-container nm-font-display text-5xl md:text-7xl leading-[1] mt-8"><?php echo wp_kses_post( $settings['title'] ); ?></h2>
                </div>
                <div class="nm-container nm-mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
                    <?php foreach ( $settings['steps'] as $item ) : ?>
                        <div class="nm-container nm-group relative bg-background p-10 hover:bg-surface transition-colors duration-700">
                            <div class="nm-container nm-font-mono-luxe text-foreground/40 mb-8">Step <?php echo esc_html( $item['step_number'] ); ?></div>
                            <div class="nm-container nm-text-gold mb-6 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                                <?php \Elementor\Icons_Manager::render_icon( $item['icon'], [ 'aria-hidden' => 'true', 'class' => 'size-8' ] ); ?>
                            </div>
                            <h3 class="nm-container nm-font-display text-3xl mb-4"><?php echo esc_html( $item['step_title'] ); ?></h3>
                            <p class="nm-container nm-text-foreground/65 leading-relaxed text-sm"><?php echo esc_html( $item['step_description'] ); ?></p>
                            <span class="nm-container nm-absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-1000 group-hover:w-full"></span>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
		<?php
	}
}
