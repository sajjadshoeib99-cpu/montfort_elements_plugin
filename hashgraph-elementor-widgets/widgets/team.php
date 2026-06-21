<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Hashgraph_Team_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'hashgraph_team';
	}

	public function get_title() {
		return esc_html__( '06. Hashgraph Team', 'hashgraph-elements' );
	}

	public function get_icon() {
		return 'eicon-person';
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
				'default' => 'Experience',
			]
		);

		$this->add_control(
			'title_part_2',
			[
				'label' => esc_html__( 'Title Part 2', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'you can build on',
			]
		);

		$this->add_control(
			'description',
			[
				'label' => esc_html__( 'Description', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => "No career investors. No tourists. We've been the founder who couldn't sleep. The investor who got it wrong and came back smarter. The operator who scaled through chaos. Every person on this team carries real reps across VC, Blockchain, Web3, Investment Banking, Tech and Enterprise.\n\n50+ years of combined experience that only comes one way. The hard way. This team wasn't assembled. It was forged.",
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'member_name', [
				'label' => esc_html__( 'Name', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => esc_html__( 'Name' , 'hashgraph-elements' ),
				'label_block' => true,
			]
		);

		$repeater->add_control(
			'member_position', [
				'label' => esc_html__( 'Position', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => esc_html__( 'Position' , 'hashgraph-elements' ),
				'label_block' => true,
			]
		);

		$this->add_control(
			'team_members',
			[
				'label' => esc_html__( 'Team Members', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::REPEATER,
				'fields' => $repeater->get_controls(),
				'default' => [
					[ 'member_name' => 'Dara Campbell', 'member_position' => 'Managing Partner' ],
					[ 'member_name' => 'Will Patterson', 'member_position' => 'Head of Venture' ],
					[ 'member_name' => 'Arjun Chirumamilla', 'member_position' => 'Senior Associate' ],
					[ 'member_name' => 'Jeff Sun', 'member_position' => 'Venture Capital Analyst' ],
					[ 'member_name' => 'Tracie Hutchins', 'member_position' => 'Executive Operations Manager' ],
					[ 'member_name' => 'Stefan Deiss', 'member_position' => 'Co-Founder' ],
					[ 'member_name' => 'Kamal Youssefi', 'member_position' => 'Co-Founder & Executive Chairman' ],
				],
				'title_field' => '{{{ member_name }}}',
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
				'default' => '//03',
			]
		);

		$this->add_control(
			'section_title',
			[
				'label' => esc_html__( 'Section Title', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Team',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
		<div class="home-team grid fixed-section" style="opacity: 1; visibility: inherit;">
			<div class="home-team__wrapper">
				<h2 class="portable-text text-splitter--splitted text-splitter home-team__title h1">
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
				</h2>
				<div class="home-team__copy-wrapper">
					<div class="home-team__copy body-copy">
						<div class="portable-text text-splitter--splitted text-splitter">
							<?php
							$paragraphs = explode("\n\n", $settings['description']);
							foreach($paragraphs as $p_idx => $paragraph):
							?>
							<p aria-label="<?php echo esc_attr($paragraph); ?>">
								<?php
								$lines = explode("\n", $paragraph);
								foreach($lines as $l_idx => $line):
								?>
								<div class="anim-fade" aria-hidden="true" style="position: relative; display: block; text-align: center; transition-delay: <?php echo (($p_idx * 5 + $l_idx) * 0.1); ?>s;">
									<?php echo esc_html($line); ?>
								</div>
								<?php endforeach; ?>
							</p>
							<?php endforeach; ?>
						</div>
					</div>
					<div class="home-team__copy-cta">
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
			<div class="home-team__inner">
				<nav class="nav-prev-next--vertical nav-prev-next">
					<button aria-label="Show previous team member" class="nav-prev-next__btn nav-prev-next__btn--prev">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 12" aria-hidden="true" class="nav-prev-next__btn-arrow nav-prev-next__btn-arrow--base">
							<path d="M0 7.978 4 12v-1.978L0 6zm0-3.956L4 0v1.978L0 6z"></path>
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 12" aria-hidden="true" class="nav-prev-next__btn-arrow nav-prev-next__btn-arrow--hover">
							<path d="M0 7.978 4 12v-1.978L0 6zm0-3.956L4 0v1.978L0 6z"></path>
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 33" aria-hidden="true" class="nav-prev-next__svg-border">
							<path d="M30.5 32.5h-25a5 5 0 0 1-5-5v-22a5 5 0 0 1 5-5h25"></path>
						</svg>
					</button>
					<button aria-label="Show next team member" class="nav-prev-next__btn nav-prev-next__btn--next">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 12" aria-hidden="true" class="nav-prev-next__btn-arrow nav-prev-next__btn-arrow--base">
							<path d="M0 7.978 4 12v-1.978L0 6zm0-3.956L4 0v1.978L0 6z"></path>
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 12" aria-hidden="true" class="nav-prev-next__btn-arrow nav-prev-next__btn-arrow--hover">
							<path d="M0 7.978 4 12v-1.978L0 6zm0-3.956L4 0v1.978L0 6z"></path>
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 33" aria-hidden="true" class="nav-prev-next__svg-border">
							<path d="M0 32.5h25a5 5 0 0 0 5-5v-22a5 5 0 0 0-5-5H0"></path>
						</svg>
					</button>
				</nav>
				<div class="home-team__members">
					<?php foreach ( $settings['team_members'] as $index => $item ) : ?>
					<div class="home-team-member" style="<?php echo ($index === 0) ? 'opacity: 1; visibility: inherit;' : 'opacity: 0; visibility: hidden;'; ?>">
						<p class="h2">
							<span class="text-splitter--splitted text-splitter" aria-label="<?php echo esc_attr($item['member_name']); ?>">
								<?php
								$chars = preg_split('//u', $item['member_name'], -1, PREG_SPLIT_NO_EMPTY);
								foreach($chars as $char):
									if($char === ' ') { echo '&nbsp;'; continue; }
								?>
								<span class="home-team-member__char" aria-hidden="true" style="opacity: 1;"><?php echo esc_html($char); ?></span>
								<?php endforeach; ?>
							</span>
						</p>
						<p class="home-team-member__position btn-label ttu">
							<span class="text-splitter--splitted text-splitter" aria-label="<?php echo esc_attr($item['member_position']); ?>">
								<?php
								$chars = preg_split('//u', $item['member_position'], -1, PREG_SPLIT_NO_EMPTY);
								foreach($chars as $char):
									if($char === ' ') { echo '&nbsp;'; continue; }
								?>
								<span class="home-team-member__char" aria-hidden="true" style="opacity: 1;"><?php echo esc_html($char); ?></span>
								<?php endforeach; ?>
							</span>
						</p>
					</div>
					<?php endforeach; ?>
				</div>
			</div>
			<div class="home-team__cta">
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
