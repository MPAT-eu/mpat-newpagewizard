<?php
/*
 * Plugin Name: MPAT New Page Wizard
 * Plugin URI: https://github.com/jeanphilipperuijs/mpat-newpage-wizard/
 * Description: Wizard for creating new pages for MPAT
 * Version: 2.0.beta
 * Author: Jean-Philippe Ruijs
 * Author URI: https://github.com/jeanphilipperuijs/
 * License: GPL2
 */
 namespace MPAT\NewPageWizard;
 
 class NewPage
 {
     function init()
     {
 //      add_menu_page('Wizard', 'Wizard', 'manage_options', 'MPAT_NewPageWizard', array(&$this, 'js'), 'dashicons-welcome-learn-more');
         add_submenu_page('_doesntexist','Wizard','','manage_options', 'MPAT_NewPageWizard', array(&$this, 'js'), 'dashicons-welcome-learn-more');
         add_action('admin_footer', array(&$this, 'insert'));
     }
     function js()
     {
         wp_enqueue_script('wp-api');
         wp_enqueue_script('mpat-newpage-wizard', plugin_dir_url(__FILE__) . 'public/rui.js', array('wp-api'), 1.0, true );
     }
     function insert() {
       if (isset($_GET['post_type']) && $_GET['post_type'] === 'page' ) {
         ?>
           <script>
             window.onload = function() {
               let post_type = '<?php print $_GET['post_type']; ?>';
               try{
                 let l = document.getElementsByClassName('page-title-action')[0];
                 l.href='./admin.php?page=MPAT_NewPageWizard';
               }catch(err){
                 console.log(err);
               }
             }
           </script>
         <?php
       }
     }
 }
 
 $np = new NewPage();
 add_action("admin_menu",array(&$np, "init") );
 