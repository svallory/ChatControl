$.getScript('https://cdnjs.cloudflare.com/ajax/libs/keymaster/1.6.1/keymaster.min.js',
  function() {
    function filter(event){
      var tagName = (event.target || event.srcElement).tagName;
      return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
    }

    key('⌘+s, ctrl+s, ⌘+b, ctrl+b', function() {
      $('.form-search input').focus();
      return false;
    });

    key('⌘+p, ctrl+p', function() {
      var num = prompt('Digite o número da pessoa');

      if(num) {
        window.open('http://elsevechatcontrol.dlapp.co/server/default/ticket/'+num)
      }
    });
  }
)