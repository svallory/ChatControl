// ==UserScript==
// @name         Elseve Chat Control Improvements
// @namespace    http://saulovallory.com/
// @version      0.1
// @author       Saulo Vallory
// @match        *://elsevechatcontrol.dlapp.co/server/default/ticket/*
// @grant        none
// ==/UserScript==

// jQuery UI for fade out

var baseUrl = 'https://rawgit.com/svallory/ChatControl/master/';

$('<link rel="stylesheet" href="'+baseUrl+'/dist/ecci.css" />').appendTo('head')
$.getScript(baseUrl + '/dist/global.js')
$.getScript(baseUrl + '/dist/ticket.js')
