//
// ATTENDANT DATA MODAL
//

$('<div id="attendant-modal" class="modal fade">' +
    '<div class="modal-dialog">' +
      '<div class="modal-content">' +
        '<div class="modal-header">' +
          '<h4 class="modal-title text-center">' +
            'Dados da atendente'+
          '</h4>' +
        '</div>' +
        '<div class="modal-body text-center">' +
          '<form name="attendant" class="form-horizontal">' +
            '<div class="attendant-info">' +
              '<div class="form-group">' +
                '<label for="attendant-name" class="col-sm-2 control-label">Nome</label>' +
                '<div class="col-sm-10">' +
                  '<input id="attendant-name" class="form-control" value="{{USER}}" placeholder="Nome" required /><br>' +
                '</div>' +
              '</div>' +
              '<div class="form-group">' +
                '<label for="attendant-name" class="col-sm-2 control-label">Telefone</label>' +
                '<div class="col-sm-10">' +
                  '<div class="input-group">' +
                    '<span class="input-group-addon">+55 (21)</span>' +
                    '<input id="attendant-phone" class="form-control" value="{{PHONE}}" required />' +
                  '</div>' +
                '</div>' +
            '</div>' +
            '<div class="modal-buttons">' +
              '<div id="errors"></div>' +
              '<div class="form-group">' +
                '<button id="save-attendant" class="btn btn-success btn-md col-sm-4 col-sm-push-4">' +
                  '<i class="fa fa-floppy-o"></i>Salvar' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>').appendTo('body');

$('#attendant-phone').focus(function() { $(this).select(); });

$('#attendant-modal').on('show.bs.modal', function (e) {
  var phone = getCookie(cookies.ATTENDANT_PHONE) || '';

  if(phone != '')
    phone = phone.substr(-10);

  $(this).find('#attendant-name').val(getCookie(cookies.ATTENDANT_NAME));
  $(this).find('#attendant-phone').val(phone);

});

$('#attendant-modal').on('shown.bs.modal', function() {
  if($(this).find('#attendant-phone').val() != '')
    $(this).find('#attendant-phone').focus();
});

window.modals = window.modals || {};
window.modals.attendant = $('#attendant-modal');

// OPEN attendant modal button
$('#ecci-buttons').append(
  $('<button id="open-attendant-modal" class="btn btn-warning">Dados da Atendente</button>')
);

$('#open-attendant-modal').click(function() {
  window.modals.attendant.modal();
})

// SAVE attendant data
function saveAttendantData(evt) {
  var modal = window.modals.attendant;

  var name = modal.find('#attendant-name').val().trim();
  var phone = modal.find('#attendant-phone').val().replace(/[^0-9]/g,'');

  var errors = [];

  if(name == '')
    errors.push('O <strong>nome</strong> é obrigatório');

  if(phone == '')
    errors.push('O <strong>Telefone</strong> é obrigatório');
  else if(phone.length != 9)
    errors.push('Telefone inválido');

  if(errors.length > 0) {
    modal.find('#errors').html(
      '<div class="alert alert-danger text-left" role="alert">' +
        errors.reduce(function(all, curr){ return all + '<div><i class="fa fa-exclamation-circle"></i> ' + curr + '</div>' }, '') +
      '</div>');
    evt.preventDefault();
    return false;
  }

  phone = '(21) ' + phone.substr(0, 5) + '-' + phone.substr(5);

  setCookie(cookies.ATTENDANT_NAME, name);
  setCookie(cookies.ATTENDANT_PHONE, phone);

  evt.preventDefault();
  modal.modal('hide');
  return false;
}

$('#save-attendant').click(saveAttendantData);

// UTILS
window.getAttendantData = function getAttendantData() {
  if(!getCookie() || !getCookie())
    modals.attendantData.modal('show');

  return {
    atendente: getCookie('atendente'),
    phone: getCookie('phone')
  }
}
