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
