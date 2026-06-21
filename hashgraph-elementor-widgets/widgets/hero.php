<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Hashgraph_Hero_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'hashgraph_hero';
	}

	public function get_title() {
		return esc_html__( '03. Hashgraph Hero', 'hashgraph-elements' );
	}

	public function get_icon() {
		return 'eicon-info-box';
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
			'line_1',
			[
				'label' => esc_html__( 'Line 1', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'The next wave',
			]
		);

		$this->add_control(
			'line_2',
			[
				'label' => esc_html__( 'Line 2', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'of venture capital',
			]
		);

		$this->add_control(
			'scroll_text',
			[
				'label' => esc_html__( 'Scroll Text', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Scroll down to discover more',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
		<div class="home-hero gutters fixed-section" style="opacity: 1; visibility: inherit;">
			<h1 class="portable-text text-splitter--splitted text-splitter home-hero__title">
				<p aria-label="<?php echo esc_attr( $settings['line_1'] . ' ' . $settings['line_2'] ); ?>">
					<div class="anim-line" aria-hidden="true" style="position: relative; display: block; text-align: left;">
						<?php
						$chars1 = preg_split('//u', $settings['line_1'], -1, PREG_SPLIT_NO_EMPTY);
						foreach($chars1 as $i => $char):
							$delay = ($i * 0.04) . 's';
							if($char === ' ') {
								echo '&nbsp;';
								continue;
							}
						?>
						<div class="anim-fade" aria-hidden="true" style="position: relative; display: inline-block; transition-delay: <?php echo $delay; ?>;"><?php echo esc_html($char); ?></div>
						<?php endforeach; ?>
					</div>
					<div class="anim-line" aria-hidden="true" style="position: relative; display: block; text-align: left;">
						<?php
						$chars2 = preg_split('//u', $settings['line_2'], -1, PREG_SPLIT_NO_EMPTY);
						foreach($chars2 as $i => $char):
							$delay = (($i + count($chars1)) * 0.04) . 's';
							if($char === ' ') {
								echo '&nbsp;';
								continue;
							}
						?>
						<div class="anim-fade" aria-hidden="true" style="position: relative; display: inline-block; transition-delay: <?php echo $delay; ?>;"><?php echo esc_html($char); ?></div>
						<?php endforeach; ?>
					</div>
				</p>
			</h1>
			<button class="home-hero__btn btn-label ttu">
				<span class="home-hero__btn-label"><?php echo esc_html( $settings['scroll_text'] ); ?></span>
				<span class="home-hero__btn-line"></span>
			</button>
		</div>
		<?php
	}
}
