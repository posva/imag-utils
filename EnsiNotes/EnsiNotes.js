// ==UserScript==
// @name        EnsiNotes
// @namespace   imag
// @description Notes Zenith 2
// @icon        https://raw.githubusercontent.com/posva/imag-utils/master/logo.png
// @include     https://intranet.ensimag.fr/Zenith2/ConsultNotes?uid=*
// @require     https://raw.githubusercontent.com/marcuswestin/store.js/master/store.min.js
// @version     1
// @grant       none
// @author      posva
// @copyright   2014, Posva (http://posva.net)
// @version       1.0
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

/*
 * Permet de visualiser plus facilement les notes sur Zenith 2
 *
 * Code original par Eduardo San Martin Morote Juin 2014 posva13@gmail.com
 *
 * TODO:
 * - Modification des notes
 * - Ajout/suppression de notes pour tester sa moyenne (utiliser storage.js)
 * - Gérer les rattrapages
 */

var APP = {};

function init() {
    var style = document.createElement("style");
    style.innerHTML = ".inf8{background-color:red;}" +
        ".inf10{background-color:orange;}" +
        ".inf12{background-color:yellow;}" +
        ".inf14{background-color:#00CD66;}" +
        ".sup14{background-color:lime;}" +
        ".rattrapee{background-color:lightgray;}" +
        ".desact{opacity:0.5;}";

    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);

    // colonne pour modifier les notes
    var table = document.getElementsByTagName("table")[0],
        th = table.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0],
        rows = table.getElementsByTagName("tr");

        /*
    var modCol = document.createElement("th");
    modCol.innerHTML = "Action";
    th.appendChild(modCol);

    APP.tr = [];

    for (var i = 1; i < rows.length; i++) {
        var r = rows[i].getElementsByTagName("td");
        var tmp = r[1].innerHTML; // sauvegarde des valeurs originales
        APP.tr[i] = r;
        APP.tr[i]["changed"] = false;
        APP.tr[i]["old"] = tmp;

        r[1].setAttribute("onclick", "this.innerHTML = parseFloat(prompt('Changer le coefficient', this.innerHTML)) || this.innerHTML;");
    }
    */
}

function addNoteColor(tr, note) {
    if (note < 8)
        cc = "inf8";
    else if (note >= 8 && note < 10)
        cc = "inf10";
    else if (note >= 10 && note < 12)
        cc = "inf12";
    else if (note >= 12 && note < 14)
        cc = "inf14";
    else cc = "sup14";

    tr.setAttribute("class", cc);
}

/*
function addButtons(tr, i) {
    var td = document.createElement("td");

    td.innerHTML = "Hi "+i;

    tr.appendChild(td);
}
*/

function calc() {
    APP.sum = 0;
    APP.n = 0;

    var table = document.getElementsByTagName("table")[0],
        rows = table.getElementsByTagName("tr"),
        note;
    // start at 1 because 0 is shit lol
    for (var i = 1; i < rows.length; i++) {
        var r = rows[i].getElementsByTagName("td");
        var c = parseFloat(r[1].innerHTML);
        note = parseFloat(r[3].innerHTML);
        APP.n += c;
        APP.sum += c * note;
        addNoteColor(r[3], note);

        //addButtons(rows[i], i);
    }

    note = (APP.sum/APP.n).toFixed(3);

    var moy = document.createElement("p"),
        cred = document.createElement("p");

    moy.innerHTML = "Moyenne: " + note;
    cred.innerHTML = "Crédits: " + APP.n;

    table.parentNode.appendChild(moy);
    table.parentNode.appendChild(cred);

    addNoteColor(moy, note);
}

init();
calc();
