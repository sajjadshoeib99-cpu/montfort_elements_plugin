<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Hashgraph_Portfolio_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'hashgraph_portfolio';
	}

	public function get_title() {
		return esc_html__( '05. Hashgraph Portfolio', 'hashgraph-elements' );
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
				'label' => esc_html__( 'Content', 'hashgraph-elements' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'title_part_1',
			[
				'label' => esc_html__( 'Title Part 1', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Early access',
			]
		);

		$this->add_control(
			'title_part_2',
			[
				'label' => esc_html__( 'Title Part 2', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'permanent',
			]
		);

		$this->add_control(
			'title_part_3',
			[
				'label' => esc_html__( 'Title Part 3', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'advantage',
			]
		);

		$this->add_control(
			'description',
			[
				'label' => esc_html__( 'Description', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => "Hashgraph Ventures sits at the apex of a deliberate trifecta, bringing together the Hashgraph Group as the tech arm, the Hashgraph Association for enterprise integration and community, and Ventures as fast-moving capital. For select investors, this means one thing: your investment doesn’t rely on a fund alone. It’s backed by a proven adoption machine with sovereign partnerships, global tech teams, and enterprise-grade distribution. Infrastructure first. Returns follow.",
			]
		);

		$this->add_control(
			'explore_btn_text',
			[
				'label' => esc_html__( 'Explore Button Text', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Explore our portfolio',
			]
		);

		$this->add_control(
			'explore_btn_url',
			[
				'label' => esc_html__( 'Explore Button URL', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::URL,
				'default' => [
					'url' => '/companies/debyt',
				],
			]
		);

		$this->add_control(
			'back_btn_text',
			[
				'label' => esc_html__( 'Back Button Text', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Back to homepage',
			]
		);

		$this->add_control(
			'read_more_text',
			[
				'label' => esc_html__( 'Read More Text', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Read more',
			]
		);

		$this->add_control(
			'section_id',
			[
				'label' => esc_html__( 'Section ID', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => '//02',
			]
		);

		$this->add_control(
			'section_title',
			[
				'label' => esc_html__( 'Section Title', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Investors',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
		<div class="home-portfolio grid fixed-section" style="opacity: 1; visibility: inherit;">
			<h2 class="portable-text text-splitter--splitted text-splitter home-portfolio__title h1">
				<p aria-label="<?php echo esc_attr($settings['title_part_1']); ?>">
					<div class="anim-line" aria-hidden="true" style="position: relative; display: block; text-align: start;">
						<?php
						$chars1 = preg_split('//u', $settings['title_part_1'], -1, PREG_SPLIT_NO_EMPTY);
						foreach($chars1 as $i => $char):
							if($char === ' ') { echo '&nbsp;'; continue; }
						?>
						<div class="anim-fade" aria-hidden="true" style="position: relative; display: inline-block; transition-delay: <?php echo ($i * 0.04); ?>s;"><?php echo esc_html($char); ?></div>
						<?php endforeach; ?>
					</div>
				</p>
				<p aria-label="<?php echo esc_attr($settings['title_part_2']); ?>">
					<div class="anim-line" aria-hidden="true" style="position: relative; display: block; text-align: start;">
						<?php
						$chars2 = preg_split('//u', $settings['title_part_2'], -1, PREG_SPLIT_NO_EMPTY);
						foreach($chars2 as $i => $char):
							if($char === ' ') { echo '&nbsp;'; continue; }
						?>
						<div class="anim-fade" aria-hidden="true" style="position: relative; display: inline-block; transition-delay: <?php echo (($i + count($chars1)) * 0.04); ?>s;"><?php echo esc_html($char); ?></div>
						<?php endforeach; ?>
					</div>
				</p>
				<p aria-label="<?php echo esc_attr($settings['title_part_3']); ?>">
					<div class="anim-line" aria-hidden="true" style="position: relative; display: block; text-align: start;">
						<?php
						$chars3 = preg_split('//u', $settings['title_part_3'], -1, PREG_SPLIT_NO_EMPTY);
						foreach($chars3 as $i => $char):
							if($char === ' ') { echo '&nbsp;'; continue; }
						?>
						<div class="anim-fade" aria-hidden="true" style="position: relative; display: inline-block; transition-delay: <?php echo (($i + count($chars1) + count($chars2)) * 0.04); ?>s;"><?php echo esc_html($char); ?></div>
						<?php endforeach; ?>
					</div>
				</p>
			</h2>
			<div class="home-portfolio__copy-wrapper">
				<p class="home-portfolio__copy body-copy">
					<span class="text-splitter--splitted text-splitter" aria-label="<?php echo esc_attr($settings['description']); ?>">
						<?php
						$lines = explode("\n", $settings['description']);
						foreach($lines as $i => $line):
						?>
						<div class="anim-fade" aria-hidden="true" style="position: relative; display: block; text-align: center; transition-delay: <?php echo ($i * 0.1); ?>s;">
							<?php echo esc_html($line); ?>
						</div>
						<?php endforeach; ?>
					</span>
				</p>
				<div class="home-portfolio__cta anim-fade" style="transition-delay: 1.2s;">
					<a href="<?php echo esc_url($settings['explore_btn_url']['url']); ?>" class="btn ff-detail ttu">
						<span class="btn__wrapper oh">
							<span class="btn__label btn__label--base"><?php echo esc_html($settings['explore_btn_text']); ?></span>
						</span>
						<svg class="btn__svg" fill="none" aria-hidden="true">
							<rect x="0.5" y="0.5" height="31" rx="5" ry="5" stroke="url(#btnBorderGrad)" width="174" style="stroke-dashoffset: 0px; stroke-dasharray: 180.972px, 4px, 196.709px, 4px;"></rect>
						</svg>
						<span class="btn__shimmer"><span class="btn__shimmer-inner"></span></span>
					</a>
				</div>
				<div class="home-portfolio__copy-cta">
					<button class="btn ff-detail ttu">
						<span class="btn__wrapper oh">
							<span class="btn__label btn__label--base"><?php echo esc_html($settings['back_btn_text']); ?></span>
						</span>
						<svg class="btn__svg" fill="none" aria-hidden="true">
							<rect x="0.5" y="0.5" height="31" rx="5" ry="5" stroke="url(#btnBorderGrad)" width="174" style="stroke-dashoffset: 0px; stroke-dasharray: 180.972px, 4px, 196.709px, 4px;"></rect>
						</svg>
					</button>
				</div>
			</div>
			<div class="home-portfolio__mobile-cta">
				<button class="btn--small btn ff-detail ttu">
					<span class="btn__wrapper oh">
						<span class="btn__label btn__label--base"><?php echo esc_html($settings['read_more_text']); ?></span>
					</span>
					<svg class="btn__svg" fill="none" aria-hidden="true">
						<rect x="0.5" y="0.5" height="31" rx="5" ry="5" stroke="url(#btnBorderGrad)" width="105" style="stroke-dashoffset: 0px; stroke-dasharray: 112.197px, 4px, 128.225px, 4px;"></rect>
					</svg>
				</button>
			</div>
			<div class="section-title btn-label ttu"><span class="section-title__id"><?php echo esc_html($settings['section_id']); ?></span> <?php echo esc_html($settings['section_title']); ?></div>
		</div>
		<?php
	}
}
