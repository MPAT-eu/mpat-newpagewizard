
import LocalizedStrings from 'react-localization';

const i18n = new LocalizedStrings({
    en: {
        flow: {
            base: 'New Page Wizard',
            layout: 'Layout',
            model: 'Model',
            page: 'Page'
        },
        pageType: { layout: 'PageLayout', model: 'PageModel' },
        stepLabel: {
            base: 'Should your new page be based on a {0} or {1}?',
            chooseCreate: 'Choose or create a {0}',
            createNew: 'Create a new {0}',
            back: 'Back to previous'
        },
        stepButton: {
            createPage: 'create & edit',
            done: 'Create another',
            next: 'next',
            back: 'Back'
        },
        modal: {
            yes: 'Yes',
            no: 'No',
            cancel: 'Cancel',
            confirm: 'Confirm',
            edit: `Before continuing to the next step, would you like to modify "{0}" ?`
        },
        inputNew: '[{0} title]',
        optionChoose: 'choose',
        insertTitle: 'Choose a title for {0} "{1}"',
    },
    fr: {
        flow: {
            base: 'Assistant création de page',
            layout: 'Schéma',
            model: 'Modèle',
            page: 'Page'
        },
        pageType: { layout: 'PageLayout', model: 'PageModel' },
        stepLabel: {
            base: 'Voulez vous baser votre nouvelle page depuis un {0} ou {1}?',
            chooseCreate: 'Choix ou création d\'un(e) "{0}"',
            createNew: 'Création d\'un(e) "{0}"',
            back: 'Retour d\'une étape'
        },
        stepButton: {
            createPage: 'Créer & Modifier',
            done: 'Create another',
            next: 'suivant',
            back: 'Retour'
        },
        modal: {
            yes: 'Oui',
            no: 'Non',
            cancel: 'Annuler',
            confirm: 'Confirmer',
            edit: `Avant de continuer à la prochaine étape, voulez-vous modifier "{0}" ?`
        },
        inputNew: '[titre de {0}]',
        optionChoose: 'choisissez',
        insertTitle: `Choisissez un titre pour {0} "{1}"`,
    },
    de: {
        flow: {
            base: 'Seite Assistent für die Erstellung',
            layout: 'Diagramm',
            model: 'Modell',
            page: 'Seite'
        },
        pageType: { layout: 'PageLayout', model: 'PageModel' },
        stepLabel: {
            base: 'Wollen Sie Ihre neue Seite von {0} oder {1} gründen?',
            chooseCreate: 'Wahl oder die Schaffung von ein (e) "{0}"',
            createNew: 'Ein "{0}" kreieren',
            back: 'Zurück einen Schritt'
        },
        stepButton: {
            createPage: 'Erstellen und ändern',
            done: 'Ein anderes erstellen',
            next: 'folgende',
            back: 'Zurück'
        },
        modal: {
            yes: 'Ja',
            no: 'Nein',
            cancel: 'Stornieren',
            confirm: 'Bestätigen',
            edit: `Bevor Sie mit dem nächsten Schritt fortfahren, möchten Sie ändern "{0}" ?`
        },
        inputNew: '[ {0} Titel]',
        optionChoose: 'wählen',
        insertTitle: `Wählen Sie einen Titel für {0} "{1}"`,
    },
    it: {
        flow: {
            base: 'Procedura guidata di creazione pagina',
            layout: 'Schema',
            model: 'Modello',
            page: 'Pagina'
        },
        pageType: { layout: 'PageLayout', model: 'PageModel' },
        stepLabel: {
            base: 'Vuoi basare la nuova pagina da {0} o "{1}"?',
            chooseCreate: 'Scelta o la creazione di un(e) {0}',
            createNew: 'Create a new {0}',
            back: 'Indietro un passo'
        },
        stepButton: {
            createPage: 'crea e modifica',
            done: 'Creare un\'altra',
            next: 'prossimo',
            back: 'Ritorno'
        },
        modal: {
            yes: 'Si',
            no: 'No',
            cancel: 'Annulla',
            confirm: 'Conferma',
            edit: `Prima di continuare al passaggio successivo, desideri modificare "{0}" ?`
        },
        inputNew: '[{0} titolo]',
        optionChoose: 'scegliere',
        insertTitle: 'Scegli un titolo per {0} "{1}"',
    },
    fi: {
        flow: {
            base: 'Sivulla Luontitoiminnon',
            layout: 'Kaavio',
            model: 'Malli',
            page: 'Sivu'
        },
        pageType: { layout: 'PageLayout', model: 'PageModel' },
        stepLabel: {
            base: 'Haluatko perustaa oman uuden sivua {0} tai {1}?',
            chooseCreate: 'Valinnan tai luomisen "{0}"',
            createNew: 'Luo {0}',
            back: 'Takaisin yksi aske'
        },
        stepButton: {
            createPage: 'luominen ja muokkaaminen',
            done: 'Luo arvioita toisen',
            next: 'seuraava',
            back: 'Takaisin'
        },
        modal: {
            yes: 'Kyllä',
            no: 'Ei',
            cancel: 'Peruuta',
            confirm: 'Vahvista',
            edit: `Ennen seuraavaan vaiheeseen, voisitteko muuttaa "{0}" ?`
        },
        inputNew: '[{0} kuten]',
        optionChoose: 'kohdassa',
        insertTitle: 'Valitse otsikko {0} "{1}"',
    }
});


/*
first try to get the 'get_user_locale()' from javascript object  'mpati18n'
app_language is prior set by get_option. If not existing it returns get_user_locale() value
*/
try {
    if (mpati18n !== undefined) {
      i18n.setLanguage(mpati18n.lang);
      console.log('set i18n from app_langauge value');
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
      console.log('Forcing locale');
      i18n.setLanguage(j);
    }
  } catch (err) {
    //console.log(err);
  }
  console.log('Using locale: ' + i18n.getLanguage());
  module.exports = i18n;
  