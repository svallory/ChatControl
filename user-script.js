// ==UserScript==
// @name         Elseve Chat Control Improvements
// @namespace    http://saulovallory.com/
// @version      0.2
// @author       Saulo Vallory
// @match        *://elsevechatcontrol.dlapp.co/*
// @grant        none
// ==/UserScript==

// jQuery UI for fade out

var baseUrl = 'https://rawgit.com/svallory/ChatControl/master/';

//baseUrl = 'http://localhost:4321';

$.ajaxSetup({
  cache: true
});

$('<link rel="stylesheet" href="'+baseUrl+'/dist/ecci.css" />').appendTo('head')
$.getScript(baseUrl + '/dist/global.js')
$.getScript(baseUrl + '/dist/ticket.js')
