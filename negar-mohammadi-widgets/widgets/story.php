<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class NM_Story_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'nm_story';
	}

	public function get_title() {
		return esc_html__( '04. NM Story', 'negar-mohammadi' );
	}

	public function get_icon() {
		return 'eicon-time-line';
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
				'default' => '01',
			]
		);

		$this->add_control(
			'section_tag',
			[
				'label' => esc_html__( 'Section Tag', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'The Maison',
			]
		);

		$this->add_control(
			'title',
			[
				'label' => esc_html__( 'Title', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'A house built<br><span class="nm-container nm-italic text-gradient-gold">by hand,</span><br>by patience.',
			]
		);

		$this->add_control(
			'description',
			[
				'label' => esc_html__( 'Description', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'For more than a decade, Negar Mohammadi has approached dressmaking as a form of devotion — a slow, almost monastic act in an industry built for speed.',
			]
		);

		$this->add_control(
			'main_image',
			[
				'label' => esc_html__( 'Main Image', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::MEDIA,
				'default' => [
					'url' => plugins_url( '/assets/images/atelier-BtroqwLx.jpg', __FILE__ ),
				],
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'year', [
				'label' => esc_html__( 'Year', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => '2012',
			]
		);

		$repeater->add_control(
			'event_title', [
				'label' => esc_html__( 'Event Title', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Event Title',
			]
		);

		$repeater->add_control(
			'event_description', [
				'label' => esc_html__( 'Event Description', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'Event description goes here.',
			]
		);

		$this->add_control(
			'timeline_items',
			[
				'label' => esc_html__( 'Timeline Items', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::REPEATER,
				'fields' => $repeater->get_controls(),
				'default' => [
					[ 'year' => '2012', 'event_title' => 'The Atelier Opens', 'event_description' => 'Negar founds her first studio in Tehran with three seamstresses and a single Singer machine.' ],
					[ 'year' => '2016', 'event_title' => 'First Paris Showing', 'event_description' => 'An invitation-only presentation during couture week catches the eye of European editors.' ],
					[ 'year' => '2020', 'event_title' => 'Bridal Maison', 'event_description' => 'Launch of the bridal codex — pieces commissioned for royalty, diplomats, and dynasty heirs.' ],
					[ 'year' => '2024', 'event_title' => 'A Global Clientele', 'event_description' => 'Today the maison dresses a discreet roster of clients across four continents.' ],
				],
				'title_field' => '{{{ year }}} - {{{ event_title }}}',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
        <section id="story" class="nm-container nm-relative py-32 md:py-48 px-6 md:px-12">
            <div class="nm-container nm-mx-auto max-w-[1500px] grid lg:grid-cols-12 gap-16">
                <div class="nm-container nm-lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
                    <div class="nm-container nm-flex items-center gap-3 font-mono-luxe">
                        <span class="nm-container nm-text-gold"><?php echo esc_html( $settings['section_number'] ); ?></span>
                        <span class="nm-container nm-h-px w-10 bg-gold/50"></span>
                        <span class="nm-container nm-text-foreground/70"><?php echo esc_html( $settings['section_tag'] ); ?></span>
                    </div>
                    <h2 class="nm-container nm-font-display text-5xl md:text-7xl leading-[1] mt-8"><?php echo wp_kses_post( $settings['title'] ); ?></h2>
                    <p class="nm-container nm-mt-8 max-w-md text-foreground/70 leading-relaxed"><?php echo esc_html( $settings['description'] ); ?></p>
                    <div class="nm-container nm-mt-10 relative aspect-[4/5] overflow-hidden">
                        <img src="<?php echo esc_url( $settings['main_image']['url'] ); ?>"
                             alt="Inside the atelier"
                             class="nm-container nm-absolute inset-0 size-full object-cover grayscale-[20%]"
                             loading="lazy">
                        <div class="nm-container nm-absolute inset-0 ring-1 ring-inset ring-gold/20"></div>
                    </div>
                </div>
                <div class="nm-container nm-lg:col-span-7 lg:pl-16">
                    <ol class="nm-container nm-relative border-l border-border/60 space-y-20">
                        <?php foreach ( $settings['timeline_items'] as $item ) : ?>
                            <li class="nm-container nm-relative pl-12" style="opacity: 1; transform: none;">
                                <span class="nm-container nm-absolute -left-[7px] top-2 size-3 rounded-full bg-gold ring-4 ring-background"></span>
                                <div class="nm-container nm-font-mono-luxe text-gold mb-3"><?php echo esc_html( $item['year'] ); ?></div>
                                <h3 class="nm-container nm-font-display text-3xl md:text-4xl mb-3"><?php echo esc_html( $item['event_title'] ); ?></h3>
                                <p class="nm-container nm-text-foreground/65 max-w-md leading-relaxed"><?php echo esc_html( $item['event_description'] ); ?></p>
                            </li>
                        <?php endforeach; ?>
                    </ol>
                </div>
            </div>
        </section>
		<?php
	}
}
