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

//callback handler for form submit
$("#email-update-form").submit(function(e)
{
    var postData = $(this).serializeArray();
    var formURL = $(this).attr("action");
    $.ajax(
    {
        url : formURL,
        type: "POST",
        data : postData,
        success:function(data, textStatus, jqXHR) 
        {
            $('.email-box').html('THANK YOU!');
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
            //if fails      
        }
    });
    e.preventDefault(); //STOP default action
});
 //callback handler for form submit
$("#email-banner-form").submit(function(e)
{
    var postData = $(this).serializeArray();
    var formURL = $(this).attr("action");
    $.ajax(
    {
        url : formURL,
        type: "POST",
        data : postData,
        success:function(data, textStatus, jqXHR) 
        {
            $('.email-banner-box').html('THANK YOU!');
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
            //if fails      
        }
    });
    e.preventDefault(); //STOP default action
});
