<?php
/**
 * Plugin Name: Negar Mohammadi Elementor Widgets
 * Description: Custom Elementor widgets for Negar Mohammadi website sections.
 * Version: 1.0.0
 * Author: Jules
 * Text Domain: negar-mohammadi
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Main Negar Mohammadi Elements Class
 */
final class Negar_Mohammadi_Elements {

	/**
	 * Instance
	 */
	private static $_instance = null;

	/**
	 * Instance Management
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'plugins_loaded', [ $this, 'init' ] );
	}

	/**
	 * Initialize the plugin
	 */
	public function init() {
		// Check if Elementor installed and activated
		if ( ! did_action( 'elementor/loaded' ) ) {
			return;
		}

		// Add actions
		add_action( 'elementor/widgets/register', [ $this, 'init_widgets' ] );
		add_action( 'elementor/frontend/after_enqueue_styles', [ $this, 'init_assets' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_custom_scripts' ] );
	}

	/**
	 * Init Assets
	 */
	public function init_assets() {
		wp_enqueue_style( 'negar-mohammadi-styles', plugins_url( '/assets/css/styles.css', __FILE__ ) );
	}

    /**
     * Enqueue custom scripts
     */
    public function enqueue_custom_scripts() {
        wp_enqueue_script( 'negar-mohammadi-scripts', plugins_url( '/assets/js/scripts.js', __FILE__ ), [ 'jquery' ], '1.0.0', true );
    }

	/**
	 * Init Widgets
	 */
	public function init_widgets( $widgets_manager ) {
		$widgets = [
			'global-effects',
			'header',
			'hero',
			'marquee',
			'story',
			'collections',
			'couture-experience',
			'metamorphosis',
			'testimonials',
			'appointment',
			'footer',
		];

		foreach ( $widgets as $widget ) {
			require_once( __DIR__ . '/widgets/' . $widget . '.php' );
		}

		$widgets_manager->register( new \NM_Global_Effects_Widget() );
		$widgets_manager->register( new \NM_Header_Widget() );
		$widgets_manager->register( new \NM_Hero_Widget() );
		$widgets_manager->register( new \NM_Marquee_Widget() );
		$widgets_manager->register( new \NM_Story_Widget() );
		$widgets_manager->register( new \NM_Collections_Widget() );
		$widgets_manager->register( new \NM_Couture_Experience_Widget() );
		$widgets_manager->register( new \NM_Metamorphosis_Widget() );
		$widgets_manager->register( new \NM_Testimonials_Widget() );
		$widgets_manager->register( new \NM_Appointment_Widget() );
		$widgets_manager->register( new \NM_Footer_Widget() );
	}
}

Negar_Mohammadi_Elements::instance();
