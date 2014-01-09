$.ajax('https://d28jjwuneuxo3n.cloudfront.net/?networks=facebook,twitter,googleplus&url=https://rally.stopwatching.us/', {
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

$(".email-updates").sticky({topSpacing:0, className: 'sticky-signup'});