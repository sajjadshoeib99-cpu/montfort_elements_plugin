<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class NM_Footer_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'nm_footer';
	}

	public function get_title() {
		return esc_html__( '10. NM Footer', 'negar-mohammadi' );
	}

	public function get_icon() {
		return 'eicon-footer';
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
				'label' => esc_html__( 'Site Title Part 2 (Gold Italic)', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Mohammadi',
			]
		);

		$this->add_control(
			'description',
			[
				'label' => esc_html__( 'Description', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'A private couture maison. Pieces commissioned, never reproduced.',
			]
		);

		$this->end_controls_section();

		for ( $i = 1; $i <= 3; $i++ ) {
			$this->start_controls_section(
				'menu_section_' . $i,
				[
					'label' => esc_html__( 'Menu Column ' . $i, 'negar-mohammadi' ),
					'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
				]
			);

			$this->add_control(
				'menu_title_' . $i,
				[
					'label' => esc_html__( 'Title', 'negar-mohammadi' ),
					'type' => \Elementor\Controls_Manager::TEXT,
					'default' => $i === 1 ? 'Maison' : ($i === 2 ? 'Couture' : 'Salons'),
				]
			);

			$repeater = new \Elementor\Repeater();
			$repeater->add_control( 'link_text', [ 'label' => 'Link Text', 'type' => \Elementor\Controls_Manager::TEXT ] );
			$repeater->add_control( 'link_url', [ 'label' => 'Link URL', 'type' => \Elementor\Controls_Manager::TEXT ] );

			$default_links = [];
			if ($i === 1) {
				$default_links = [
					[ 'link_text' => 'The Atelier', 'link_url' => '#' ],
					[ 'link_text' => 'Heritage', 'link_url' => '#' ],
					[ 'link_text' => 'Press', 'link_url' => '#' ],
					[ 'link_text' => 'Journal', 'link_url' => '#' ],
				];
			} elseif ($i === 2) {
				$default_links = [
					[ 'link_text' => 'Evening', 'link_url' => '#' ],
					[ 'link_text' => 'Bridal', 'link_url' => '#' ],
					[ 'link_text' => 'Red Carpet', 'link_url' => '#' ],
					[ 'link_text' => 'Archive', 'link_url' => '#' ],
				];
			} else {
				$default_links = [
					[ 'link_text' => 'Paris', 'link_url' => '#' ],
					[ 'link_text' => 'Tehran', 'link_url' => '#' ],
					[ 'link_text' => 'By Appointment', 'link_url' => '#' ],
				];
			}

			$this->add_control(
				'menu_links_' . $i,
				[
					'label' => esc_html__( 'Links', 'negar-mohammadi' ),
					'type' => \Elementor\Controls_Manager::REPEATER,
					'fields' => $repeater->get_controls(),
					'default' => $default_links,
					'title_field' => '{{{ link_text }}}',
				]
			);

			$this->end_controls_section();
		}

		$this->start_controls_section(
			'bottom_section',
			[
				'label' => esc_html__( 'Bottom Bar', 'negar-mohammadi' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'copyright_text',
			[
				'label' => esc_html__( 'Copyright Text', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => '© 2026 Negar Mohammadi Maison · All Pieces Archived',
			]
		);

		$this->add_control(
			'crafted_text',
			[
				'label' => esc_html__( 'Crafted Text', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Crafted in silence · Paris — Tehran',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
        <div class="nm-widget-container">
            <footer class="nm-container nm-relative border-t border-border/40 px-6 md:px-12 pt-20 pb-10">
                <div class="nm-container nm-mx-auto nm-max-w-1500">
                    <div class="nm-container nm-grid nm-md-grid-cols-12 gap-10 pb-16">
                        <div class="nm-container nm-md:col-span-5">
                            <div class="nm-container nm-font-display text-4xl md:text-5xl">
                                <?php echo esc_html( $settings['site_title_part1'] ); ?>
                                <span class="nm-container nm-italic nm-text-gradient-gold"><?php echo esc_html( $settings['site_title_part2'] ); ?></span>
                            </div>
                            <p class="nm-container nm-mt-4 max-w-sm text-foreground/55 leading-relaxed"><?php echo esc_html( $settings['description'] ); ?></p>
                        </div>
                        <?php for ( $i = 1; $i <= 3; $i++ ) : ?>
                            <div class="nm-container nm-md:col-span-2">
                                <div class="nm-container nm-font-mono-luxe nm-text-gold mb-4"><?php echo esc_html( $settings['menu_title_' . $i] ); ?></div>
                                <ul class="nm-container nm-space-y-2">
                                    <?php foreach ( $settings['menu_links_' . $i] as $link ) : ?>
                                        <li><a href="<?php echo esc_attr( $link['link_url'] ); ?>" class="nm-container nm-text-foreground/60 hover:nm-text-gold transition-colors"><?php echo esc_html( $link['link_text'] ); ?></a></li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        <?php endfor; ?>
                    </div>
                    <div class="nm-container nm-flex nm-flex-col md:flex-row nm-items-center nm-justify-between gap-4 pt-8 border-t border-border/30 nm-font-mono-luxe text-foreground/45 text-xs">
                        <span><?php echo esc_html( $settings['copyright_text'] ); ?></span>
                        <span><?php echo esc_html( $settings['crafted_text'] ); ?></span>
                    </div>
                </div>
            </footer>
        </div>
		<?php
	}
}
