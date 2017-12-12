/**
 * language determinator
 * 
 * 1. get_user_locale()
 * 2. get_user_locale()
 * 3. if query string i18n set, it overrides previous.
 * 
 * @author Jean-Philippe Ruijs
 */

import en from './languages/org/en';
import fr from './languages/export/fr';
import es from './languages/export/es';
import it from './languages/export/it';
import fi from './languages/export/fi';
import de from './languages/export/de';
import nl from './languages/export/nl';

import LocalizedStrings from 'react-localization';

const l10n = new LocalizedStrings({
    en: en,
    fr: fr,
    es: es,
    de: de,
    it: it,
    fi: fi,
    nl: nl
});


/*
first try to get the 'get_user_locale()' from javascript object  'npwi18n'
app_language is prior set by get_option. If not existing it returns get_user_locale() value
*/
try {
    if (npwi18n !== undefined) {
        l10n.setLanguage(npwi18n.lang);
        //console.log(`set "${npwi18n.lang}" from get_user_locale value`);
        console.log('mpat-newpage-wizard is using locale: ' + i18n.getLanguage());
    } else {
        console.log('npwi18n not defined');
    }
}
catch (err) {
    //console.log(err);
}
/*
in case we have a i18n querystring, we override this
*/
try {
    const i = document.location.search.split('i18n=');
    if (i.length > 1) {
        const j = i[1].split('&')[0];
        l10n.setLanguage(j);
    }
} catch (err) {
    //console.log(err);
}

module.exports = l10n;
