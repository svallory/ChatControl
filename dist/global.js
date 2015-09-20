// ==UserScript==
// @name         Elseve Chat Control Global Improvements
// @namespace    http://saulovallory.com/
// @version      0.1
// @author       Saulo Vallory
// @match        *://elsevechatcontrol.dlapp.co/*
// @grant        none
// ==/UserScript==

openTicketInNewTab = function() {
  var num = prompt('Digite o número da pessoa');

  if(num) {
    window.open('http://elsevechatcontrol.dlapp.co/server/default/ticket/'+num)
  }
}

var btnPanel = $('<div>', {
  id: 'ecci-buttons'
});

btnPanel.append(
  $('<button>', {
    id: 'ecciOpenPersonBtn',
    'class': 'btn btn-sm btn-primary'
  })
  .append('<i class="glyphicon glyphicon-user"')
  .append('Abrir Pessoa')
);

btnPanel
  .appendTo($('.navbar-header > .navbar-text').first())
  .ready(function() {
    $('#ecciOpenPersonBtn').on('click', openTicketInNewTab);
  })

$.getScript('https://cdnjs.cloudflare.com/ajax/libs/keymaster/1.6.1/keymaster.min.js',
  function() {
    key.filter = function filter(event){
      var tagName = (event.target || event.srcElement).tagName;
      return true //!(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
    }

    key('⌘+s, ctrl+s, ⌘+b, ctrl+b', function() {
      $('.form-search input').focus();
      return false;
    });

    key('⌘+p, ctrl+p', openTicketInNewTab);
  }
)
