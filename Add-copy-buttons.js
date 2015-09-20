// ==UserScript==
// @name         Elseve Chat Control Improvements
// @namespace    http://saulovallory.com/
// @version      0.1
// @author       Saulo Vallory
// @match        *://elsevechatcontrol.dlapp.co/server/default/ticket/*
// @grant        none
// ==/UserScript==

// jQuery UI for fade out
$('head').append("<script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js'></script>")
$('head').append($('<link rel="stylesheet" href="https://cdn.rawgit.com/svallory/6dcf0d420dc46ac4feaf/raw/4bae1b254527ec0e131ec1e08794c5a240339249/ecci.css" />'));

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


/// LIVE SEARCH
Item = function($el) {
  this.$el = $el;
  this.text = $el.find('.question').text(); // .toLowerCase()
}

Item.prototype.hide = function hideItem() {
  this.$el.fadeOut();
}

Item.prototype.show = function showItem() {
  this.$el.fadeIn();
}

Item.prototype.filter = function filterItem(words) {
  for(var i=0; i < words.length; i++)
    if(!RegExp(words[i]).test(this.text))
      return true;
  return false;
}

var search = $('.form-search input');
var items = [];

$('.item-question').each(function(el) {
  items.push(new Item($(el)));
})

search.on('keyup', function() {
  var q = search.val();

  if(q.trim() == '') {
    $('.item-question').show();
    return;
  }

  var words = q.split(' ');

  items.forEach(function(it) {
    if(it.filter(words))
      it.hide();
    else
      it.show();
  })
})
