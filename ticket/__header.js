// ==UserScript==
// @name         Elseve Chat Control Ticket Improvements
// @namespace    http://saulovallory.com/
// @version      0.2
// @author       Saulo Vallory
// @match        *://elsevechatcontrol.dlapp.co/server/default/ticket/*
// @grant        none
// ==/UserScript==

// jQuery UI for fade out

window.isTicketPage = RegExp('elsevechatcontrol.dlapp.co/server/default/ticket/').test(window.location.href);

if(window.isTicketPage)
  $('head').append("<script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js'></script>")
