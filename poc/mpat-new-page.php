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
 *
 **/
/*
 * Plugin Name: MPAT New Page Wizard
 * Plugin URI: https://github.com/jeanphilipperuijs/npw
 * Description: Wizard for MPAT-project when creating a new page allowing to choose or create a page_layout.
 * Version: 1.0.0
 * Author: MPAT
 * Author URI: https://github.com/jeanphilipperuijs
 * Text Domain: mpat-new-page-wizard
 * Domain Path: /
 * License: GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

add_action('wp_loaded', "wiztemplate");
    
function wiztemplate()
{
    $url_path = trim(parse_url(add_query_arg(array()), PHP_URL_PATH), '/');
    if ($url_path === 'mpat-new-page-wizard' || endsWith($url_path, '/mpat-new-page-wizard')) {
          header("Content-Type: text/html;");
?>
<html>
    <head>
        <title>New Page Wizard</title>
<!--
<link rel='stylesheet' id='dashicons-css' href='/wp/wp-includes/css/dashicons.css' type='text/css' media='all' />
<link rel='stylesheet' id='admin-bar-css' href='/wp/wp-includes/css/admin-bar.css' type='text/css' media='all' />
<link rel='stylesheet' id='mpo-css' href='/app/plugins/custom-post-order/css/mpo.css' type='text/css' media='all' />
<link rel='stylesheet' id='thickbox-css' href='/wp/wp-includes/js/thickbox/thickbox.css' type='text/css' media='all' />
<link rel='stylesheet' id='common-css' href='/wp/wp-admin/css/common.css' type='text/css' media='all' />
<link rel='stylesheet' id='forms-css' href='/wp/wp-admin/css/forms.css' type='text/css' media='all' />
<link rel='stylesheet' id='admin-menu-css' href='/wp/wp-admin/css/admin-menu.css' type='text/css' media='all' />
<link rel='stylesheet' id='dashboard-css' href='/wp/wp-admin/css/dashboard.css' type='text/css' media='all' />
<link rel='stylesheet' id='list-tables-css' href='/wp/wp-admin/css/list-tables.css' type='text/css' media='all' />
<link rel='stylesheet' id='edit-css' href='/wp/wp-admin/css/edit.css' type='text/css' media='all' />
<link rel='stylesheet' id='revisions-css' href='/wp/wp-admin/css/revisions.css' type='text/css' media='all' />
<link rel='stylesheet' id='media-css' href='/wp/wp-admin/css/media.css' type='text/css' media='all' />
<link rel='stylesheet' id='themes-css' href='/wp/wp-admin/css/themes.css' type='text/css' media='all' />
<link rel='stylesheet' id='about-css' href='/wp/wp-admin/css/about.css' type='text/css' media='all' />
<link rel='stylesheet' id='nav-menus-css' href='/wp/wp-admin/css/nav-menus.css' type='text/css' media='all' />
<link rel='stylesheet' id='widgets-css' href='/wp/wp-admin/css/widgets.css' type='text/css' media='all' />
<link rel='stylesheet' id='site-icon-css' href='/wp/wp-admin/css/site-icon.css' type='text/css' media='all' />
<link rel='stylesheet' id='l10n-css' href='/wp/wp-admin/css/l10n.css' type='text/css' media='all' />
<link rel='stylesheet' id='buttons-css' href='/wp/wp-includes/css/buttons.css' type='text/css' media='all' />
<link rel='stylesheet' id='colors-css' href='/wp/wp-admin/css/colors/midnight/colors.css' type='text/css' media='all' />
<link rel='stylesheet' id='admin-style' href='/app/plugins/mpat-plugins/css/admin_style.css' type='text/css' media='all' />
-->
<?php
// var_dump(is_user_logged_in());
// var_dump(wp_get_current_user());
            wp_enqueue_script( 'wp-api' );
         //   wp_enqueue_style('mpat_admin', '/app/plugins/mpat-plugins/css/admin_style.css');
     //      wp_register_script('mpat_admin', '/app/plugins/mpat-plugins/js/mpat_admin.min.js', array('wp-api'), 1.0, true );
           wp_head();
        ?>
    </head>
    <body>
    <h1>New Page Wizard</h1>
    <button class="" onClick="javascript:mnp.loadPages()">loadPages</button>
    <button class="" onClick="javascript:mnp.loadLayouts()">loadLayouts</button>
    <div id="wp-content">
    <p id="result"></p>
    <pre id="raw"><pre>
    <?php
        wp_footer();
    ?>
    </div>
</body>
<script type="text/javascript" src="<?php echo plugin_dir_url(__FILE__); ?>rui.js" ></script>
<script type="text/javascript">
let mnp = new MpatNewPage();

</script>

</html>
<?php
      exit();
    }
}

function endsWith($haystack, $needle)
{
    $length = strlen($needle);
    if ($length == 0) {
        return true;
    }
    return (substr($haystack, -$length) === $needle);
}
?>