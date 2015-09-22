// ==UserScript==
// @name         Elseve Chat Control Improvements
// @namespace    http://saulovallory.com/
// @version      0.3
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

$('<link rel="stylesheet" href="'+baseUrl+'/dist/ecci.css" />').appendTo('head');
$.getScript(baseUrl + '/dist/global.js');
$.getScript(baseUrl + '/dist/ticket.js');

function beginClickHandler () {
  $('.btn-begin').click(function () {
    var callNumber = this.parentNode.parentNode.querySelector('td:first-child').innerText;
    var consumerName = this.parentNode.parentNode.querySelector('td:nth-child(3)').innerText.split(' ')[0];
    window.open('http://web.whatsapp.com/#' + callNumber + '-' + consumerName, 'WhatsApp Web');
  });
};

function startClickHandler () {
  if(document.querySelector('.btn-begin')) {
    beginClickHandler();
    window.clearInterval(beginHandle);
  }
}

var beginHandle = window.setInterval(startClickHandler, 1000)

