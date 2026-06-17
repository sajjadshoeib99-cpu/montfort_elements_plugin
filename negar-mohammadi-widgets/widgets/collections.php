<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class NM_Collections_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'nm_collections';
	}

	public function get_title() {
		return esc_html__( '05. NM Collections', 'negar-mohammadi' );
	}

	public function get_icon() {
		return 'eicon-gallery-grid';
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
				'default' => '02',
			]
		);

		$this->add_control(
			'section_tag',
			[
				'label' => esc_html__( 'Section Tag', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Signature Collections',
			]
		);

		$this->add_control(
			'title',
			[
				'label' => esc_html__( 'Title', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'Pieces destined<br>for <span class="nm-container nm-italic text-gradient-gold">the few.</span>',
			]
		);

		$this->add_control(
			'description',
			[
				'label' => esc_html__( 'Description', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'Each collection is produced in limited numbers — never repeated, never re-sold, archived in the maison\'s private codex.',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'collections_section',
			[
				'label' => esc_html__( 'Collections', 'negar-mohammadi' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'image', [
				'label' => esc_html__( 'Image', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::MEDIA,
				'default' => [ 'url' => plugins_url( '/assets/images/collection-1-D95NfIyU.jpg', __FILE__ ) ],
			]
		);

		$repeater->add_control(
			'number', [
				'label' => esc_html__( 'Number (e.01 / 03)', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => '01 / 03',
			]
		);

		$repeater->add_control(
			'pieces_count', [
				'label' => esc_html__( 'Pieces Count', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => '12 pieces',
			]
		);

		$repeater->add_control(
			'category', [
				'label' => esc_html__( 'Category', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Evening',
			]
		);

		$repeater->add_control(
			'collection_title', [
				'label' => esc_html__( 'Collection Title', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Nuit d\'Or',
			]
		);

		$repeater->add_control(
			'collection_description', [
				'label' => esc_html__( 'Short Description', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'Black silk crepe with hand-applied gold filigree.',
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
			'collections',
			[
				'label' => esc_html__( 'Collections List', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::REPEATER,
				'fields' => $repeater->get_controls(),
				'default' => [
					[
						'collection_title' => 'Nuit d\'Or',
						'category' => 'Evening',
						'pieces_count' => '12 pieces',
						'number' => '01 / 03',
						'image' => [ 'url' => plugins_url( '/assets/images/collection-1-D95NfIyU.jpg', __FILE__ ) ],
						'collection_description' => 'Black silk crepe with hand-applied gold filigree.'
					],
					[
						'collection_title' => 'L\'Épouse Éternelle',
						'category' => 'Bridal',
						'pieces_count' => '8 pieces',
						'number' => '02 / 03',
						'image' => [ 'url' => plugins_url( '/assets/images/collection-2-DRej0DVp.jpg', __FILE__ ) ],
						'collection_description' => 'Crystal-beaded tulle, ivory mikado, cathedral train.'
					],
					[
						'collection_title' => 'Velluto Rosso',
						'category' => 'Red Carpet',
						'pieces_count' => '6 pieces',
						'number' => '03 / 03',
						'image' => [ 'url' => plugins_url( '/assets/images/collection-3-TygyR_Vx.jpg', __FILE__ ) ],
						'collection_description' => 'One-shoulder draped silk velvet in deep burgundy.'
					],
				],
				'title_field' => '{{{ collection_title }}}',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
        <section id="collections" class="nm-container nm-relative py-32 md:py-48 px-6 md:px-12 bg-surface/30">
            <div class="nm-container nm-mx-auto max-w-[1500px]">
                <div class="nm-container nm-flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
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
                <div class="nm-container nm-grid md:grid-cols-3 gap-6 md:gap-8">
                    <?php foreach ( $settings['collections'] as $item ) : ?>
                        <article data-cursor="hover" class="nm-container nm-group relative">
                            <div class="nm-container nm-relative aspect-[3/4] overflow-hidden bg-surface-2">
                                <img src="<?php echo esc_url( $item['image']['url'] ); ?>"
                                     alt="<?php echo esc_attr( $item['collection_title'] ); ?>"
                                     class="nm-container nm-absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                                     loading="lazy">
                                <div class="nm-container nm-absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>
                                <div class="nm-container nm-absolute inset-0 ring-1 ring-inset ring-border group-hover:ring-gold/60 transition-all duration-700"></div>
                                <div class="nm-container nm-absolute top-6 left-6 font-mono-luxe text-gold"><?php echo esc_html( $item['number'] ); ?></div>
                                <div class="nm-container nm-absolute top-6 right-6 font-mono-luxe text-foreground/70"><?php echo esc_html( $item['pieces_count'] ); ?></div>
                                <div class="nm-container nm-absolute inset-x-6 bottom-6">
                                    <div class="nm-container nm-font-mono-luxe text-gold mb-2"><?php echo esc_html( $item['category'] ); ?></div>
                                    <h3 class="nm-container nm-font-display text-4xl md:text-5xl mb-2 italic"><?php echo esc_html( $item['collection_title'] ); ?></h3>
                                    <p class="nm-container nm-max-h-0 overflow-hidden text-foreground/70 transition-all duration-700 group-hover:max-h-20 group-hover:mt-3">
                                        <?php echo esc_html( $item['collection_description'] ); ?>
                                    </p>
                                    <div class="nm-container nm-mt-4 flex items-center gap-2 font-mono-luxe text-foreground/80 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700">
                                        View piece
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                             stroke-linejoin="round" class="nm-container lucide lucide-arrow-up-right size-3.5"
                                             aria-hidden="true">
                                            <path d="M7 7h10v10"></path>
                                            <path d="M7 17 17 7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </article>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
		<?php
	}
}
