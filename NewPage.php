<?php
/**
 *
 * Copyright (c) 2017 MPAT Consortium , All rights reserved.
 * Fraunhofer FOKUS, Fincons Group, Telecom ParisTech, IRT, Lacaster University, Leadin, RBB, Mediaset
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library. If not, see <http://www.gnu.org/licenses/>.
 *
 * AUTHORS:
 * Jean-Philippe Ruijs (jean-philippe@ruijs.fr)
 * Jean-Claude Dufourd (jean-claude.dufourd@telecom-paristech.fr)
 *
 **/
/*
 * Plugin Name: MPAT New Page Wizard
 * Plugin URI: https://github.com/jeanphilipperuijs/mpat-newpage-wizard/
 * Description: Wizard for creating new pages for MPAT
 * Version: 2.0.3
 * Author: Jean-Philippe Ruijs
 * Author: Jean-Claude Dufourd (jean-claude.dufourd@telecom-paristech.fr)
 * Author URI: https://github.com/jeanphilipperuijs/
 * Text Domain: mpat-newpage-wizard
 * Domain Path: /languages
 * License: GPL2
 */

namespace MPAT\NewPageWizard;

class NewPage
{
    function init()
    {
        /* we declare that we have some languages files for internationalization */
        load_plugin_textdomain('mpat-newpage-wizard', false, basename( dirname( __FILE__ ) ) . '/languages' );

        /* creating a hidden menu '_doesnotexist' */
        add_submenu_page('_doesntexist', __("Wizard", "mpat-newpage-wizard"), '', 'manage_options', 'MPAT_NewPageWizard', array(&$this, 'load_js'), 'dashicons-welcome-learn-more');

        /* configuration option 'mpatNewPageWizard' */
        add_option('mpatNewPageWizard', '');

        /* add this option to general settings overview */
		add_settings_section(  
			'wizard_settings_section',
			__('Wizard', "mpat-newpage-wizard"),
			function(){
                _e('NewPage Wizard settings', "mpat-newpage-wizard");
            },
			'general'
		);
		add_settings_field(
			'mpatNewPageWizard',
			__('Remove "Add-Page" (show only the Wizard button)', "mpat-newpage-wizard"),
			function($args){
                $option = get_option($args[0],'');
                $cmp = strcmp($option , "on");
                $chk = ($cmp == 0) ? 'checked' : '';
                echo '<input type="checkbox" id="'.$args[0].'" name="'.$args[0].'" '.$chk.' />';
            },
			'general',
			'wizard_settings_section',
			array('mpatNewPageWizard')
		); 
        register_setting('general', 'mpatNewPageWizard','esc_attr');

        /* check the loop */
        if (isset($_GET['post_type']) && $_GET['post_type'] === 'page') {
            /* remove/replace the 'Add New-button' ? */
            $replace ='';
            if(get_option('mpatNewPageWizard') =='on')
            {
                $replace='checked';
            }
            ?>

            <script>
             window.onload = function() {
                try{
                    let mnpwReplaceAddNew = <?php echo strcmp($replace ,'checked'); ?>;
                    /* the callback url */
                    let url ='./admin.php?page=MPAT_NewPageWizard';
                    if(mnpwReplaceAddNew == 0){
                        let addNew = document.getElementsByClassName('page-title-action')[0];
                        addNew.innerText = '<?php _e("Wizard", "mpat-newpage-wizard"); ?>';
                        addNew.href=url;
                    }else{
                        let n = document.getElementsByClassName('wp-heading-inline')[0];
                        let wizard = document.createElement('a');
                        wizard.href=url;
                        wizard.innerText = '<?php _e("Wizard", "mpat-newpage-wizard"); ?>';
                        wizard.className = 'page-title-action';
                        n.appendChild(wizard);
                    }
                }catch(err){
                    //console.log('NewPageWizard', err);
                }
             }
         </script>
         <?php
        }
    }
    
    function load_js()
    {
        /* we need the wordpress api */
        wp_enqueue_script('wp-api');
        
        /* load the i18n variables */
        wp_register_script('mpat_npw_i18n', null, array("wp-api"));
        wp_localize_script('mpat_npw_i18n', 'npwi18n', array(
            'lang' => substr(get_user_locale(), 0, 2),
            'locale' => get_user_locale()
        ));
        wp_enqueue_script('mpat_npw_i18n');

        /* the build package */
        wp_enqueue_script('mpat-newpage-wizard', plugin_dir_url(__FILE__) . 'public/rui.js', array('wp-api'), 1.0, true );
      //wp_enqueue_script('mpat-newpage-wizard', 'http://localhost:8000/rui.js', array('wp-api'), 1.0, true );
    }
}
 
 $np = new NewPage();
 add_action("admin_menu", array(&$np, "init") );