// ==UserScript==
// @name        EnsiNotes
// @namespace   https://intranet.ensimag.fr/Zenith2/ConsultNotes?uid=*
// @description Cool notes
// @include     https://intranet.ensimag.fr/Zenith2/ConsultNotes?uid=*
// @version     1
// @grant       none
// @author      posva
// @copyright   2014, Posva (http://posva.net)
// ==/UserScript==

/*
 * Permet de visualiser plus facilement les notes sur Zenith 2
 *
 * Code original par Eduardo San Martin Morote Juin 2014 posva13@gmail.com
 *
 * TODO:
 * - Modification des notes
 * - Ajout/suppression de note spour tester sa moyenne (utiliser storage.js, cookies?)
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

    APP.sum = 0;
    APP.n = 0;
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

function calc() {
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

$( document ).ready(function() {
    init();
    calc();
});
