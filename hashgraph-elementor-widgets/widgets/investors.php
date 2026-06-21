<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Hashgraph_Investors_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'hashgraph_investors';
	}

	public function get_title() {
		return esc_html__( '04. Hashgraph Investors', 'hashgraph-elements' );
	}

	public function get_icon() {
		return 'eicon-text-area';
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
				'default' => 'Capital with',
			]
		);

		$this->add_control(
			'title_part_2',
			[
				'label' => esc_html__( 'Title Part 2', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'conviction',
			]
		);

		$this->add_control(
			'description',
			[
				'label' => esc_html__( 'Description', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => "Hashgraph Ventures is an early-stage VC fund at the intersection of blockchain infrastructure and AI — pre-seed through Series A. We believe decentralised infrastructure and AI-native applications will rewire how value, data, and trust move across the world. We don't wait for consensus. We move with speed and clarity.",
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
				'default' => '//01',
			]
		);

		$this->add_control(
			'section_title',
			[
				'label' => esc_html__( 'Section Title', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Manifesto',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
		<div class="home-investors grid fixed-section" style="opacity: 1; visibility: inherit;">
			<div class="home-investors__wrapper">
				<h2 class="portable-text text-splitter--splitted text-splitter home-investors__title h1">
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
						<div class="anim-line" aria-hidden="true" style="position: relative; display: block; text-align: right;">
							<?php
							$chars2 = preg_split('//u', $settings['title_part_2'], -1, PREG_SPLIT_NO_EMPTY);
							foreach($chars2 as $i => $char):
								if($char === ' ') { echo '&nbsp;'; continue; }
							?>
							<div class="anim-fade" aria-hidden="true" style="position: relative; display: inline-block; transition-delay: <?php echo (($i + count($chars1)) * 0.04); ?>s;"><?php echo esc_html($char); ?></div>
							<?php endforeach; ?>
						</div>
					</p>
				</h2>
				<div class="home-investors__copy-wrapper">
					<p class="home-investors__copy body-copy">
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
					<div class="home-investors__copy-cta">
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
			</div>
			<div class="home-investors__cta">
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
