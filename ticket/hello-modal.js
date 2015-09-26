// FIRST: Hook into live queue updates
$(document).ajaxComplete(function(event, xhr, settings) {
  if(settings.url == 'ws/queue') $('#pending table').trigger('queue:update');
});

// HIDDEN IFRAME for opening
$('<iframe id="openTicket" border=0 width=0 height=0></iframe>').appendTo('body')

function ticketAlreadyOpen() {
  return /foi atendido/.test($('.alert-danger', $('iframe#openTicket').contents()).text());
}

function openTicket(id) {
  return $('iframe#openTicket').attr('src', 'http://elsevechatcontrol.dlapp.co/server/default/ticket/' + id);
}

//
// HELLO MESSAGE MODAL
//
$('<div id="hello-modal" class="modal fade">' +
  '<div class="modal-dialog">' +
    '<div class="modal-content">' +
      '<div class="modal-header">' +
        '<h4 class="modal-title text-center">' +
          'Cheque o nome do contato<br/>'+
          '<small>Se preciso, edite <strong>antes</strong> de copiar a mensagem.</small>' +
        '</h4>' +
      '</div>' +
      '<div class="modal-body text-center">' +
        '<form class="form-horizontal">' +
          '<div class="form-group">' +
            '<label class="user-id col-sm-5 control-label">{{TICKET}}</label>' +
            '<div class="col-sm-4">' +
              '<input class="user-name form-control" value="{{USER}}" />' +
            '</div>' +
            '<p class="form-control-static user-phone col-sm-12">{{USER_PHONE}}</p>' +
          '</div>' +
          '<div class="modal-buttons">' +
            '<div class="form-group">' +
              '<button id="btn-copy-hello-message" type="button" class="btn btn-success btn-lg col-md-8 col-md-push-2" id="btn-ok-new">' +
                '<i class="fa fa-copy"></i>Copiar Mensagem' +
              '</button>' +
            '</div>' +
          '</div>' +
          '<div id="hidden-hello-msg"></div>' +
        '</form>' +
      '</div>' +
    '</div>' +
  '<div>' +
'</div>').appendTo('body');

window.modals = window.modals || {};
var modal = window.modals.hello = $('#hello-modal');

// OPEN modal
function openHelloModal(id) {
  var $row = $('#pending tr[data-id="'+id+'"]');
  var tds = $row.find('td');

  var ticket = $row.data('id');
  var user = firstName(tds[2].innerText.trim());
  var phone = tds[3].innerText.trim();

  $row.fadeOut(function(){ $(this).remove(); });

  openTicket(id).load(function() {
    // Check if it's not already open by another attendant
    var alreadyOpen = ticketAlreadyOpen();

    if(alreadyOpen) {
      var msg = $(
        '<div class="alert alert-danger alert-fixed" role="alert">' +
          'Esse ticket já foi aberto por outra atendente.' +
        '</div>')
      $('main > .container').append(msg);
      msg.fadeOut(5000);
    }
    else {
      modal.find('.user-id').text(ticket);
      modal.find('.user-name').val(user);
      modal.find('.user-phone').text(phone);

      modal.modal();
    }
  });
}

$('#hello-modal').on('shown.bs.modal', function() {
  $(this).find('.user-name').select();
  $(this).find('.user-name').focus();
});

// UPDATE buttons
function updateBeginButtons() {
  var update = [];

  $('.btn-begin').each(function() {
    var $this = $(this);
    var link = $this.attr('href');
    var ticket = link.match('[0-9]+');
    var parent = $this.parent();

    $this.toggleClass('btn-lg btn-begin btn-open');
    // really?
    $this.attr('target', '_blank');
    $this.html('<i class="fa fa-external-link"></i> Abrir</a>');

    update.push($('<button>', {
      class: 'btn-start btn btn-success btn-start',
      'data-id': ticket
    })
    .text('Iniciar')
    .prependTo($this.parent()))

    parent.addClass('text-right');
    parent.html(
      '<div class="btn-group" role="group">' +
      parent.html() +
      '</div>'
    )
  });
  // todo: Use update array
  $('.btn-start').click(function(){ openHelloModal($(this).data('id')); });
}

// update new tickets
$('#pending table').on('queue:update', updateBeginButtons);

// COPY MESSAGE
$('#btn-copy-hello-message').click(function(){
  var modal = $('#hello-modal');

  data = {
    user: modal.find('.user-name').val(),
    attendant: getCookie(cookies.ATTENDANT_NAME),
    phone: getCookie(cookies.ATTENDANT_PHONE)
  }

  var length = helloMessages.length;
  var last = getCookie(cookies.LAST_HELLO_MSG) || 0;

  $('#hidden-hello-msg').text(template(helloMessages[last], data));
  copyText('#hidden-hello-msg');

  setCookie(cookies.LAST_HELLO_MSG, (last == length - 1 ? 0 : ++last));

  modal.modal('hide');
})

// Replace modal on ticket page
if(window.isTicketPage) {
  var modal = $('#modal-init-call');

  modal.html($('#hello-modal').html());

  modal.find('.user-id').text($('.client-name').data('id'));
  modal.find('.user-name').val(firstName($('.client-name').data('name')));
  modal.find('.user-phone').text($('.client-phone').text());

  $('<div class="col-sm-4"><button class="btn btn-success btn-open-modal">Mensagem inicial</button></div>')
  .insertAfter('.client-information');

  $('.btn-open-modal').click(function(){ modal.modal(); });
}
