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
  
  return false;
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

btnPanel.append(
  $('<button>', {
    id: 'ecciExportCsv',
    'class': 'btn btn-sm btn-primary'
  })
  .append('<i class="glyphicon glyphicon-user"')
  .append('Exportar csv')
);

btnPanel
  .appendTo($('.navbar-header > .navbar-text').first())
  .ready(function() {
    $('#ecciOpenPersonBtn').on('click', openTicketInNewTab);
    $('#ecciExportCsv').on('click', function(){exportCsv(prompt('A partir do ticket...'))});
  })

$.getScript('http://danml.com/js/download.js',
  function() {
    window.exportCsv = function exportCsv(startAt) {
      if(!startAt || isNaN(parseInt(startAt)))
        startAt = 0;

      var header = "First Name,Last Name,Mobile Phone\n";
      var template = "{{FIRST_NAME}},{{LAST_NAME}},{{PHONE_NUMBER}}\n";

      var users = [];
      var csv = '';

      $('#pending tr[data-id]').each(function () {
        var $this = $(this);
        var data = $this.find('td');

        var id = data[0].innerText,
            name = data[2].innerText,
            phone = '+55 ' + data[3].innerText.replace('(', '').replace(')', '');

        if(parseInt(id) < startAt)
          return;

        var firstName = id + ' ' + name.split(' ')[0],
            lastName = name.split(' ').splice(1).join(' ');

        var fullName = firstName + ' ' + lastName;


        csv += template
                .replace('{{FIRST_NAME}}', firstName)
                .replace('{{LAST_NAME}}', lastName)
                .replace('{{PHONE_NUMBER}}', phone)
      });

      download(new Blob([header + csv]), "contatos-"+startAt+".csv", "text/plain");
    }
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
