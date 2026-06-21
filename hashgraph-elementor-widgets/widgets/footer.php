<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Hashgraph_Footer_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'hashgraph_footer';
	}

	public function get_title() {
		return esc_html__( '07. Hashgraph Footer', 'hashgraph-elements' );
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
				'label' => esc_html__( 'Content', 'hashgraph-elements' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'title',
			[
				'label' => esc_html__( 'Title', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => "We prioritize warm introductions\nand ecosystem referrals",
			]
		);

		$this->add_control(
			'copyright',
			[
				'label' => esc_html__( 'Copyright', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => '© Hashgraph Ventures 2026',
			]
		);

		$repeater_socials = new \Elementor\Repeater();
		$repeater_socials->add_control('link_text', ['label' => 'Text', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'Link']);
		$repeater_socials->add_control('link_url', ['label' => 'URL', 'type' => \Elementor\Controls_Manager::URL]);

		$this->add_control(
			'social_links',
			[
				'label' => esc_html__( 'Social Links', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::REPEATER,
				'fields' => $repeater_socials->get_controls(),
				'default' => [
					[ 'link_text' => 'Email', 'link_url' => [ 'url' => 'mailto:info@hashgraphvc.com' ] ],
					[ 'link_text' => 'X (Twitter)', 'link_url' => [ 'url' => 'https://x.com/HashgraphVC' ] ],
					[ 'link_text' => 'LinkedIn', 'link_url' => [ 'url' => 'https://www.linkedin.com/company/hashgraph-ventures/' ] ],
				],
				'title_field' => '{{{ link_text }}}',
			]
		);

		$repeater_legals = new \Elementor\Repeater();
		$repeater_legals->add_control('link_text', ['label' => 'Text', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'Link']);
		$repeater_legals->add_control('link_url', ['label' => 'URL', 'type' => \Elementor\Controls_Manager::URL]);

		$this->add_control(
			'legal_links',
			[
				'label' => esc_html__( 'Legal Links', 'hashgraph-elements' ),
				'type' => \Elementor\Controls_Manager::REPEATER,
				'fields' => $repeater_legals->get_controls(),
				'default' => [
					[ 'link_text' => 'Privacy Policy', 'link_url' => [ 'url' => '/privacy-policy' ] ],
					[ 'link_text' => 'Made by rbxgc', 'link_url' => [ 'url' => 'https://rbxgc.co/' ] ],
				],
				'title_field' => '{{{ link_text }}}',
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
		<footer class="is-visible footer--full-height footer" style="opacity: 1; visibility: inherit;">
			<h3 class="portable-text text-splitter--splitted text-splitter footer__title h2">
				<p aria-label="<?php echo esc_attr(str_replace("\n", " ", $settings['title'])); ?>">
					<?php
					$lines = explode("\n", $settings['title']);
					$char_count = 0;
					foreach($lines as $line):
					?>
					<div class="anim-line" aria-hidden="true" style="position: relative; display: block; text-align: center;">
						<?php
						$chars = preg_split('//u', $line, -1, PREG_SPLIT_NO_EMPTY);
						foreach($chars as $char):
							if($char === ' ') { echo '&nbsp;'; continue; }
						?>
						<div class="anim-fade" aria-hidden="true" style="position: relative; display: inline-block; transition-delay: <?php echo ($char_count * 0.04); ?>s;"><?php echo esc_html($char); ?></div>
						<?php $char_count++; endforeach; ?>
					</div>
					<?php endforeach; ?>
				</p>
			</h3>
			<div class="grid btn-label ttu">
				<div class="footer__copyrights"><?php echo esc_html($settings['copyright']); ?></div>
				<ul class="footer__list footer__list--socials">
					<?php foreach($settings['social_links'] as $item): ?>
					<li><a href="<?php echo esc_url($item['link_url']['url']); ?>" rel="noopener noreferrer" target="_blank" class="link"><?php echo esc_html($item['link_text']); ?></a></li>
					<?php endforeach; ?>
				</ul>
				<div class="footer__credits">
					<ul class="footer__list footer__list--legals">
						<?php foreach($settings['legal_links'] as $item): ?>
						<li><a href="<?php echo esc_url($item['link_url']['url']); ?>" rel="noopener noreferrer" target="_blank" class="link"><?php echo esc_html($item['link_text']); ?></a></li>
						<?php endforeach; ?>
					</ul>
				</div>
			</div>
		</footer>
		<?php
	}
}
