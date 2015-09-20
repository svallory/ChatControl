if(window.isTicketPage) {
  // Item prototype
  Item = function($el) {
    this.$el = $el;
    this.text = removeDiacritics($el.find('.question').text()).toLowerCase();
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

  // the input field
  var search = $('.form-search input');
  // the items to show or hide
  var items = [];

  // Load items
  $('.item-question').each(function() {
    items.push(new Item($(this)));
  })

  // search function
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
}
