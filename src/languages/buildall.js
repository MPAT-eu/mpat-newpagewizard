/**
 * For testing purposes.
 *
 * Merge language opbject and export the results in a file
 *
 * @author Jean-Philippe Ruijs
 */
const Merge2File = require('merge2file');
const en = require('./org/en');
const de = require('./org/de');
const es = require('./org/es');
const fi = require('./org/fi');
const fr = require('./org/fr');
const it = require('./org/it');
const nl = require('./org/nl');

const exportpath = './src/languages/export';

const org = JSON.stringify(en);

let m1 = new Merge2File('de', de, JSON.parse(org), exportpath);
m1.save();

m2 = new Merge2File('es', es, JSON.parse(org), exportpath);
m2.save();

m3 = new Merge2File('fi', fi, JSON.parse(org), exportpath);
m3.save();

m4 = new Merge2File('fr', fr, JSON.parse(org), exportpath);
m4.save();

m5 = new Merge2File('it', it, JSON.parse(org), exportpath);
m5.save();

m6 = new Merge2File('nl', nl, JSON.parse(org), exportpath);
m6.save();

