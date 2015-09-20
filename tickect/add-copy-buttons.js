var ticketId = window.location.pathname.match('[0-9]+')[0];

// Insert Copy buttons
$('.item-question').each(function () {
  $(this).find('.panel-body').prepend(
    $('<div>', {class: 'container-buttons pull-right'})
      .append(
        $('<button>', {
          class: 'btn-copy-answer btn btn-lg btn-default pull-right',
          'data-ticket-id': ticketId,
          'data-question-id': $(this).data('question-id')
        })
        .append($('<i class="fa fa-files-o">'))
        .append('Copiar texto')
      )
  )
});

// Insert hidden phrases
$('.question').each(function () {
  var parent = $(this).parents('.item-question');
  var qid = parent.data('question-id');

  parent.append(
    $('<div>', {
      id: 'hidden_phrase_' + qid,
      class: 'phrase-hidden'})
      .append($(this).find('p').html())
  )
});

// Disables question link
$('#ticket-questions .item-question').off()

// Saving history
$('.btn-copy-answer').on('click', function(){
    var ticket_id = $(this).attr('data-ticket-id');
    var question_id = $(this).attr('data-question-id');

    copyText('#hidden_phrase_'+question_id);

    $.ajax({
        method: "POST",
        url: "default/save_historic",
        data: { ticket_id: ticket_id, question_id: question_id }
    }).done(function( msg ) {
      var msg = $('<div class="alert alert-success alert-fixed" role="alert">A mensagem foi copiada com sucesso.</div>')
      $('main > .container').append(msg)
      msg.fadeOut(5000)
    });
});
