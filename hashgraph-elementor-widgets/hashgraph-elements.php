<?php
/**
 * Plugin Name: Hashgraph Elementor Widgets
 * Description: Custom Elementor widgets for Hashgraph Ventures website sections.
 * Version: 1.0.0
 * Author: Jules
 * Text Domain: hashgraph-elements
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Main Hashgraph Elements Class
 */
final class Hashgraph_Elements {

	/**
	 * Plugin Version
	 */
	const VERSION = '1.0.0';

	/**
	 * Minimum Elementor Version
	 */
	const MINIMUM_ELEMENTOR_VERSION = '3.0.0';

	/**
	 * Minimum PHP Version
	 */
	const MINIMUM_PHP_VERSION = '7.0';

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
	}

	/**
	 * Init Widgets
	 */
	public function init_widgets( $widgets_manager ) {
		// Include widget files
		require_once( __DIR__ . '/widgets/canvas.php' );
		require_once( __DIR__ . '/widgets/header.php' );
		require_once( __DIR__ . '/widgets/hero.php' );
		require_once( __DIR__ . '/widgets/investors.php' );
		require_once( __DIR__ . '/widgets/portfolio.php' );
		require_once( __DIR__ . '/widgets/team.php' );
		require_once( __DIR__ . '/widgets/footer.php' );
		require_once( __DIR__ . '/widgets/scrollbar.php' );
		require_once( __DIR__ . '/widgets/svg-sprite.php' );

		// Register widgets
		$widgets_manager->register( new \Hashgraph_Canvas_Widget() );
		$widgets_manager->register( new \Hashgraph_Header_Widget() );
		$widgets_manager->register( new \Hashgraph_Hero_Widget() );
		$widgets_manager->register( new \Hashgraph_Investors_Widget() );
		$widgets_manager->register( new \Hashgraph_Portfolio_Widget() );
		$widgets_manager->register( new \Hashgraph_Team_Widget() );
		$widgets_manager->register( new \Hashgraph_Footer_Widget() );
		$widgets_manager->register( new \Hashgraph_Scrollbar_Widget() );
		$widgets_manager->register( new \Hashgraph_SVG_Sprite_Widget() );
	}
}

Hashgraph_Elements::instance();
