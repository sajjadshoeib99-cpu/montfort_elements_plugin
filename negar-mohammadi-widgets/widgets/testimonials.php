<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class NM_Testimonials_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'nm_testimonials';
	}

	public function get_title() {
		return esc_html__( '08. NM Testimonials', 'negar-mohammadi' );
	}

	public function get_icon() {
		return 'eicon-testimonial';
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
				'default' => '05',
			]
		);

		$this->add_control(
			'section_tag',
			[
				'label' => esc_html__( 'Section Tag', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Whispered in the Salon',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'testimonials_section',
			[
				'label' => esc_html__( 'Testimonials', 'negar-mohammadi' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'quote', [
				'label' => esc_html__( 'Quote', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'She did not make me a dress. She made me an heirloom my daughter will wear at her own audience.',
			]
		);

		$repeater->add_control(
			'author_name', [
				'label' => esc_html__( 'Author Name', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Marguerite D.',
			]
		);

		$repeater->add_control(
			'author_info', [
				'label' => esc_html__( 'Author Info', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Collector, Paris',
			]
		);

		$this->add_control(
			'testimonials',
			[
				'label' => esc_html__( 'Testimonials List', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::REPEATER,
				'fields' => $repeater->get_controls(),
				'default' => [
					[ 'quote' => 'She did not make me a dress. She made me an heirloom my daughter will wear at her own audience.', 'author_name' => 'Marguerite D.', 'author_info' => 'Collector, Paris' ],
					[ 'quote' => 'An architecture of the soul. Her silk feels like a second skin, but with the strength of armor.', 'author_name' => 'Sofia A.', 'author_info' => 'Architect, Milan' ],
					[ 'quote' => 'The only artisan who understands that silence is the most luxurious fabric.', 'author_name' => 'Layla R.', 'author_info' => 'Patron, Geneva' ],
				],
				'title_field' => '{{{ author_name }}}',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
        <section class="nm-container nm-relative py-32 md:py-48 px-6 md:px-12">
            <div class="nm-container nm-mx-auto max-w-[1500px]">
                <div class="nm-container nm-flex items-center gap-3 font-mono-luxe">
                    <span class="nm-container nm-text-gold"><?php echo esc_html( $settings['section_number'] ); ?></span>
                    <span class="nm-container nm-h-px w-10 bg-gold/50"></span>
                    <span class="nm-container nm-text-foreground/70"><?php echo esc_html( $settings['section_tag'] ); ?></span>
                </div>
                <div class="nm-container nm-mt-16 grid lg:grid-cols-12 gap-12 items-center">
                    <div class="nm-container nm-lg:col-span-8 relative h-[320px] md:h-[280px]">
                        <?php foreach ( $settings['testimonials'] as $index => $item ) : ?>
                            <blockquote class="nm-container nm-testimonial-item absolute inset-0" style="<?php echo ($index === 0) ? 'opacity: 1;' : 'opacity: 0; pointer-events: none;'; ?>">
                                <div class="nm-container nm-text-gold text-7xl font-display leading-none mb-6">"</div>
                                <p class="nm-container nm-font-display text-3xl md:text-5xl leading-[1.15] italic max-w-4xl"><?php echo esc_html( $item['quote'] ); ?></p>
                                <div class="nm-container nm-mt-8 flex items-center gap-4"><span class="nm-h-px w-12 bg-gold"></span>
                                    <div>
                                        <div class="nm-container nm-font-mono-luxe text-gold"><?php echo esc_html( $item['author_name'] ); ?></div>
                                        <div class="nm-container nm-text-sm text-foreground/55 mt-1"><?php echo esc_html( $item['author_info'] ); ?></div>
                                    </div>
                                </div>
                            </blockquote>
                        <?php endforeach; ?>
                    </div>
                    <div class="nm-container nm-lg:col-span-4 space-y-3">
                        <?php foreach ( $settings['testimonials'] as $index => $item ) : ?>
                            <button data-cursor="hover" data-index="<?php echo $index; ?>"
                                    class="nm-container nm-group nm-testimonial-button w-full text-left p-5 glass transition-all duration-500 hover:border-gold/30">
                                <div class="nm-container nm-flex items-center justify-between mb-2">
                                    <span class="nm-container nm-font-mono-luxe text-gold">0 <?php echo $index + 1; ?></span>
                                    <div class="nm-container nm-flex gap-0.5">
                                        <?php for($i=0; $i<5; $i++): ?>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="0" stroke-linecap="round"
                                                stroke-linejoin="round" class="nm-container lucide lucide-star size-3 fill-gold text-gold"
                                                aria-hidden="true">
                                                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                                            </svg>
                                        <?php endfor; ?>
                                    </div>
                                </div>
                                <div class="nm-container nm-font-display text-xl"><?php echo esc_html( $item['author_name'] ); ?></div>
                                <div class="nm-container nm-text-xs text-foreground/55 mt-1 font-mono-luxe"><?php echo esc_html( $item['author_info'] ); ?></div>
                            </button>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </section>
		<?php
	}
}
