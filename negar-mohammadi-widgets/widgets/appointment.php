<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class NM_Appointment_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'nm_appointment';
	}

	public function get_title() {
		return esc_html__( '09. NM Appointment', 'negar-mohammadi' );
	}

	public function get_icon() {
		return 'eicon-form-horizontal';
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
				'default' => '06',
			]
		);

		$this->add_control(
			'section_tag',
			[
				'label' => esc_html__( 'Section Tag', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'The VIP Audience',
			]
		);

		$this->add_control(
			'title',
			[
				'label' => esc_html__( 'Title', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'Request a<br><span class="nm-container nm-italic text-gradient-gold">private audience.</span>',
			]
		);

		$this->add_control(
			'description',
			[
				'label' => esc_html__( 'Description', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXTAREA,
				'default' => 'The maison receives a limited number of new clients each season. Audiences are held by invitation at our salons in Paris and Tehran, or in your city by arrangement.',
			]
		);

		$this->add_control(
			'bg_image',
			[
				'label' => esc_html__( 'Background Image', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::MEDIA,
				'default' => [ 'url' => '' ],
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'salon_name', [
				'label' => esc_html__( 'Salon Name', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => 'Salon Paris · 8e Arr.',
			]
		);

		$this->add_control(
			'salons',
			[
				'label' => esc_html__( 'Salons List', 'negar-mohammadi' ),
				'type' => \Elementor\Controls_Manager::REPEATER,
				'fields' => $repeater->get_controls(),
				'default' => [
					[ 'salon_name' => 'Salon Paris · 8e Arr.' ],
					[ 'salon_name' => 'Salon Tehran · Niavaran' ],
					[ 'salon_name' => 'Travelling Atelier · On Request' ],
				],
				'title_field' => '{{{ salon_name }}}',
			]
		);

		$this->end_controls_section();

        $this->start_controls_section(
			'form_section',
			[
				'label' => esc_html__( 'Form Labels', 'negar-mohammadi' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

        $this->add_control( 'label_fn', [ 'label' => 'First Name', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'First Name' ] );
        $this->add_control( 'label_ln', [ 'label' => 'Family Name', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'Family Name' ] );
        $this->add_control( 'label_em', [ 'label' => 'Private Email', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'Private Email' ] );
        $this->add_control( 'label_co', [ 'label' => 'Country of Residence', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'Country of Residence' ] );
        $this->add_control( 'label_oc', [ 'label' => 'Occasion', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'Occasion' ] );
        $this->add_control( 'label_msg', [ 'label' => 'A Few Words', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'A Few Words' ] );
        $this->add_control( 'label_submit', [ 'label' => 'Submit Button', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'Submit Request' ] );
        $this->add_control( 'label_footer', [ 'label' => 'Form Footer Text', 'type' => \Elementor\Controls_Manager::TEXT, 'default' => 'Replies within 48 hours. All correspondence is held in confidence.' ] );

        $this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
        <div class="nm-widget-container">
            <section id="appointment" class="nm-container nm-relative py-32 md:py-48 px-6 md:px-12 nm-overflow-hidden">
                <div class="nm-container nm-absolute nm-inset-0">
                    <?php if ( ! empty( $settings['bg_image']['url'] ) ) : ?>
                        <img src="<?php echo esc_url( $settings['bg_image']['url'] ); ?>"
                            alt="" aria-hidden="true" loading="lazy" class="nm-container nm-size-full nm-object-cover opacity-20">
                    <?php endif; ?>
                    <div class="nm-container nm-absolute nm-inset-0 bg-gradient-to-t from-background via-background/70 to-background"></div>
                </div>
                <div class="nm-container nm-relative nm-mx-auto nm-max-w-1500 nm-grid lg:nm-grid-cols-12 gap-16">
                    <div class="nm-container nm-lg:nm-col-span-6">
                        <div class="nm-container nm-flex nm-items-center gap-3 nm-font-mono-luxe">
                            <span class="nm-container nm-text-gold"><?php echo esc_html( $settings['section_number'] ); ?></span>
                            <span class="nm-container nm-h-px nm-w-10 bg-gold/50"></span>
                            <span class="nm-container nm-text-foreground/70"><?php echo esc_html( $settings['section_tag'] ); ?></span>
                        </div>
                        <h2 class="nm-container nm-font-display text-5xl md:text-7xl leading-[1] nm-mt-8"><?php echo wp_kses_post( $settings['title'] ); ?></h2>
                        <p class="nm-container nm-mt-8 max-w-md text-foreground/70 leading-relaxed"><?php echo esc_html( $settings['description'] ); ?></p>
                        <ul class="nm-container nm-mt-10 space-y-4 nm-font-mono-luxe text-foreground/70">
                            <?php foreach ( $settings['salons'] as $item ) : ?>
                                <li class="nm-container nm-flex nm-items-center gap-3">
                                    <span class="nm-container nm-size-1.5 nm-rounded-full nm-bg-gold"></span>
                                    <?php echo esc_html( $item['salon_name'] ); ?>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    <form class="nm-container nm-lg:nm-col-span-6 nm-glass-gold p-8 md:p-12 space-y-6">
                        <div class="nm-container nm-grid md:nm-grid-cols-2 gap-5">
                            <div><label for="fn" class="nm-container nm-font-mono-luxe text-foreground/60 nm-block nm-mb-3"><?php echo esc_html( $settings['label_fn'] ); ?></label><input
                                    id="fn" type="text"
                                    class="nm-container nm-w-full nm-bg-transparent border-b border-border/70 focus:border-gold nm-py-3 nm-font-display text-xl text-foreground outline-none nm-transition-all">
                            </div>
                            <div><label for="ln" class="nm-container nm-font-mono-luxe text-foreground/60 nm-block nm-mb-3"><?php echo esc_html( $settings['label_ln'] ); ?></label><input
                                    id="ln" type="text"
                                    class="nm-container nm-w-full nm-bg-transparent border-b border-border/70 focus:border-gold nm-py-3 nm-font-display text-xl text-foreground outline-none nm-transition-all">
                            </div>
                        </div>
                        <div><label for="em" class="nm-container nm-font-mono-luxe text-foreground/60 nm-block nm-mb-3"><?php echo esc_html( $settings['label_em'] ); ?></label><input
                                id="em" type="email"
                                class="nm-container nm-w-full nm-bg-transparent border-b border-border/70 focus:border-gold nm-py-3 nm-font-display text-xl text-foreground outline-none nm-transition-all">
                        </div>
                        <div><label for="co" class="nm-container nm-font-mono-luxe text-foreground/60 nm-block nm-mb-3"><?php echo esc_html( $settings['label_co'] ); ?></label><input
                                id="co" type="text"
                                class="nm-container nm-w-full nm-bg-transparent border-b border-border/70 focus:border-gold nm-py-3 nm-font-display text-xl text-foreground outline-none nm-transition-all">
                        </div>
                        <div><label for="oc" class="nm-container nm-font-mono-luxe text-foreground/60 nm-block nm-mb-3"><?php echo esc_html( $settings['label_oc'] ); ?></label><select
                                id="oc"
                                class="nm-container nm-w-full nm-bg-transparent border-b border-border/70 focus:border-gold nm-py-3 nm-font-display text-xl text-foreground outline-none nm-transition-all">
                            <option class="nm-container nm-bg-background">Bridal Commission</option>
                            <option class="nm-container nm-bg-background">Red Carpet</option>
                            <option class="nm-container nm-bg-background">Private Event</option>
                            <option class="nm-container nm-bg-background">Heirloom Piece</option>
                            <option class="nm-container nm-bg-background">Other</option>
                        </select></div>
                        <div><label for="msg" class="nm-container nm-font-mono-luxe text-foreground/60 nm-block nm-mb-3"><?php echo esc_html( $settings['label_msg'] ); ?></label><textarea
                                id="msg" rows="3"
                                class="nm-container nm-w-full nm-bg-transparent border-b border-border/70 focus:border-gold nm-py-3 nm-font-display text-lg text-foreground outline-none nm-transition-all nm-resize-none"></textarea>
                        </div>
                        <button type="submit" data-cursor="hover"
                                class="nm-container nm-group nm-relative nm-w-full nm-mt-4 nm-py-5 nm-bg-gold text-background nm-font-mono-luxe nm-overflow-hidden">
                            <span class="nm-container nm-relative z-10 nm-inline-flex nm-items-center gap-2"><?php echo esc_html( $settings['label_submit'] ); ?> <svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                    class="nm-container lucide lucide-arrow-up-right size-4" aria-hidden="true"><path d="M7 7h10v10"></path><path
                                    d="M7 17 17 7"></path></svg></span><span
                                class="nm-container nm-absolute nm-inset-0 nm-bg-foreground nm-translate-y-full nm-group-hover-translate-y-0 nm-transition-all nm-duration-700"></span>
                        </button>
                        <p class="nm-container nm-text-xs text-foreground/45 nm-text-center"><?php echo esc_html( $settings['label_footer'] ); ?></p>
                    </form>
                </div>
            </section>
        </div>
		<?php
	}
}
