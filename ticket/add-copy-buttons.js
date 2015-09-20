var ticketId = window.location.pathname.match('[0-9]+')[0];

// Insert "Copy" buttons
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

// desabilitando link para pergunta
$('#ticket-questions .item-question').off()

// Salvandoo histórico
$('.btn-copy-answer').on('click', function(){
    var ticket_id = $(this).attr('data-ticket-id');
    var question_id = $(this).attr('data-question-id');

    copyText('.phrase-hidden');

    $.ajax({
        method: "POST",
        url: "default/save_historic",
        data: { ticket_id: ticket_id, question_id: question_id }
    }).done(function( msg ) {
      console.log('Added to question history:', {ticket: ticket_id, question: question_id})
      var msg = $('<div class="alert alert-success alert-fixed" role="alert">A mensagem foi copiada com sucesso.</div>')
      $('main > .container').append(msg)
      msg.fadeOut(5000)
    });
});
