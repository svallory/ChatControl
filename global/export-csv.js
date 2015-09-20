$.getScript('http://danml.com/js/download.js',
  function() {
    window.exportCsv = function exportCsv(startAt) {
      if(!startAt || isNaN(parseInt(startAt)))
        startAt = 0;

      var header = "First Name,Last Name,Mobile Phone\n";
      var template = "{{FIRST_NAME}},{{LAST_NAME}},{{PHONE_NUMBER}}\n";

      var users = [];
      var csv = '';

      $('#pending tr[data-id]').each(function () {
        var $this = $(this);
        var data = $this.find('td');

        var id = data[0].innerText,
            name = data[2].innerText,
            phone = '+55 ' + data[3].innerText.replace('(', '').replace(')', '');

        if(parseInt(id) < startAt)
          return;

        var firstName = id + ' ' + name.split(' ')[0],
            lastName = name.split(' ').splice(1).join(' ');

        var fullName = firstName + ' ' + lastName;


        csv += template
                .replace('{{FIRST_NAME}}', firstName)
                .replace('{{LAST_NAME}}', lastName)
                .replace('{{PHONE_NUMBER}}', phone)
      });

      download(new Blob([header + csv]), "contatos-"+startAt+".csv", "text/plain");
    }
})
