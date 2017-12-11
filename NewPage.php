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
 * Plugin URI: https://github.com/MPAT-eu/mpat-newpagewizard/
 * Description: Wizard for creating new pages for MPAT
 * Version: 2.0
 * Author: Jean-Philippe Ruijs
 * Author: Jean-Claude Dufourd (jean-claude.dufourd@telecom-paristech.fr)
 * License: GPL2
 */
 namespace MPAT\NewPageWizard;

 class NewPage
 {
     function init()
     {
 //      add_menu_page('Wizard', 'Wizard', 'manage_options', 'MPAT_NewPageWizard', array(&$this, 'js'), 'dashicons-welcome-learn-more');
         add_submenu_page('_doesntexist','Wizard','','edit_pages', 'MPAT_NewPageWizard', array(&$this, 'js'), 'dashicons-welcome-learn-more');
         add_action('admin_footer', array(&$this, 'insert'));
     }
     function js()
     {
         wp_enqueue_script('wp-api');
         wp_enqueue_script('mpat-newpagewizard', plugin_dir_url(__FILE__) . 'public/rui.js', array('wp-api'), 1.0, true );
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

