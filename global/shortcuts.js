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
