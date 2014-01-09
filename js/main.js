$.ajax('https://d28jjwuneuxo3n.cloudfront.net/?networks=facebook,twitter,googleplus&url=https://thedaywefightback.org', {
  success: function (res, err) {
    $.each(res, function(network, value){
      var count = value;
      if(count / 10000 > 1) {
        count = Math.ceil(count/1000) + 'k'
      }
      $('[data-network="'+network+'"]').attr('count', count);
    })
  },
  dataType: 'jsonp'
});
      $.fn.serializeObject = function() {
          var o = {};
          var a = this.serializeArray();
          $.each(a, function() {
              if (o[this.name] !== undefined) {
                  if (!o[this.name].push) {
                      o[this.name] = [o[this.name]];
                  }
                  o[this.name].push(this.value || '');
              } else {
                  o[this.name] = this.value || '';
              }
          });
          return o;
      };
$(".email-updates").sticky({topSpacing:0, className: 'sticky-signup'});

           // 

$('#email-update-form').on('submit', function(ev){
  var form = $(ev.currentTarget);
  var data = form.serializeObject();
      $.ajax({
        url: 'https://skipchimp2.herokuapp.com/subscribe',
        data: data,
        type: 'POST',
        success: function () {
          $('.email-box').html('THANK YOU!');
        }
      });
      return false;
  });
$('#email-banner-form').on('submit', function(ev){
  var form = $(ev.currentTarget);
  var data = form.serializeObject();
      $.ajax({
        url: 'https://skipchimp2.herokuapp.com/subscribe',
        data: data,
        type: 'POST',
        success: function () {
          $('.email-banner-box').html('THANK YOU!');
        }
      });
      return false;
  });
