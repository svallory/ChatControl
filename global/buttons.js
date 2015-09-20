var btnPanel = $('<div>', {
  id: 'ecci-buttons'
});

btnPanel.append(
  $('<button>', {
    class: 'btn btn-sm btn-primary'
  })
  .append('<i class="glyphicon glyphicon-user"')
  .append('Abrir Pessoa')
);

$('.navbar-header > .navbar-text').first().append(btnPanel);
