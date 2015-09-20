openTicketInNewTab = function() {
  var num = prompt('Digite o número da pessoa');

  if(num) {
    window.open('http://elsevechatcontrol.dlapp.co/server/default/ticket/'+num)
  }
}
