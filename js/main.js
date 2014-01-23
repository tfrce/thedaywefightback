/* ==========================================================================
   Social counts
   ==========================================================================*/
var shareUrl = tfrceConfig.shareCountURL || 'https://thedaywefightback.org';
$.ajax('https://d28jjwuneuxo3n.cloudfront.net/?networks=facebook,twitter,googleplus&url=' + shareUrl, {
    success: function(res, err) {
        $.each(res, function(network, value) {
            var count = value;
            if (count / 10000 > 1) {
                count = Math.ceil(count / 1000) + 'k'
            }
            $('[data-network="' + network + '"]').attr('count', count);
        })
    },
    dataType: 'jsonp',
    cache         : true,
    jsonpCallback : 'myCallback'
});
if(tfrceConfig.loadTotals) {
    $.ajax('https://d28jjwuneuxo3n.cloudfront.net/?networks=facebook,twitter,googleplus&url=https://thedaywefightback.org', {
        success: function(res, err) {
            $.each(res, function(network, value) {
                var count = value;
                if (count / 10000 > 1) {
                    count = Math.ceil(count / 1000) + 'k'
                }
                $('[data-network-totals="' + network + '"]').attr('count', count);
            })
        },
        dataType: 'jsonp',
        cache         : true,
        jsonpCallback : 'myCallback'
    });
}
/* ==========================================================================
   Subscriber counts
   ==========================================================================*/


// subscriber counts
window.odometerOptions = {
  auto: false, // Don't automatically initialize everything with class 'odometer'
  format: '(,ddd).dd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
  duration: 3000, // Change how long the javascript expects the CSS animation to take
};

$.ajax('http://d1anv19wqyolnf.cloudfront.net/count', {
    dataType: 'jsonp',
    cache         : true,
    jsonpCallback : 'myCallbacka'
}).done(function(res){
    var siteCountOd = new Odometer({
      el: $("#subscribers-count-sites")[0],
      value: 0,
      theme: 'car'
    });
    siteCountOd.update(res.siteCount);
    // $('.subscribers-count').text(res.siteCount + ' websites and ' + res.totalCount + ' people');
});

$.ajax({
    type: "GET",
    url: '/',
    success: function(data, status, xhr) {
        var serverDateTime = (xhr.getResponseHeader('Date'));
        serverDate = new Date(serverDateTime);
        liveDate = new Date(Date.UTC(2014, 1, 12, 8, 0));
         var diff = liveDate - serverDate;
        //  alert(serverDate);
        //  alert(liveDate);
        // alert(diff);
        //These next lines convert diff into days hours and minutes
        var msec = diff;
        var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
        msec -= dd * 1000 * 60 * 60 * 24;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;
        var left = dd + " days   " + hh + " hours  " + mm +" minutes";


        var daysOd = new Odometer({
          el: $("#days-left")[0],
          value: 0,
          theme: 'car'
        });
        var hoursOd = new Odometer({
          el: $("#hours-left")[0],
          value: 0,
          theme: 'car'
        });
        var secondsOd = new Odometer({
          el: $("#seconds-left")[0],
          value: 0,
          theme: 'car'
        });

        daysOd.update(dd);
        hoursOd.update(hh);
        secondsOd.update(ss);
    }
});


/* ==========================================================================
   Form submits
   ==========================================================================*/

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
if(typeof disableSticky === 'undefined') {
    $(".email-updates").sticky({
        topSpacing: 0,
        className: 'sticky-signup'
    });
}



$('#email-update-form').on('submit', function(ev) {
    var form = $(ev.currentTarget);
    var data = form.serializeObject();
    if(data.subscribe !== 'on') {
      delete data.org;
    }
    console.log(data, data.email);
    $.ajax({
        url: 'https://skipchimp2.herokuapp.com/subscribe',
        data: data,
        dataType: 'jsonp',
        type: 'GET',
        success: function() {
            $('.email-box').html('We\'ll be in touch!');
            $("#signup, #undefined-sticky-wrapper").delay(2000).animate({height: 0}, 100, function(){
                $(this).remove();
            });
        }
    });
    return false;
});
$('#email-banner-form').on('submit', function(ev) {
    var form = $(ev.currentTarget);
    var data = form.serializeObject();
    $.ajax({
        url: 'https://skipchimp2.herokuapp.com/subscribe',
        dataType: 'jsonp',
        data: data,
        type: 'GET',
        success: function() {
            $('.banner-signup-form').html('Thanks for signing up, someone\'ll be in touch soon.');
        }
    });
    return false;
});


/* ==========================================================================
   Sharing buttons
   ==========================================================================*/

$( ".fblinkthis" ).click(function() {
    var url = $(this).attr("href");
    window.open(url, "Share on Facebook", "width=650,height=500");
    return false;
})
$( ".twlinkthis" ).click(function() {
    var url = $(this).attr("href");
    window.open(url,"Twitter","width=550,height=420");
    return false;
})
$( ".gpluslinkthis" ).click(function() {
    var url = $(this).attr("href");
    window.open(url,"Share on Google Plus","width=500,height=436");
    return false;
})




/* ==========================================================================
   Signup forms
   ==========================================================================*/

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&\/#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// ie shims
if (!Object.keys) {
    Object.keys = function(o) {
        if (o !== Object(o))
            throw new TypeError('Object.keys called on a non-object');
        var k = [],
            p;
        for (p in o)
            if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
        return k;
    }
}

(function() {

    var referalMap = {
        'fp': {
            name: 'Free Press',
            policy: 'http://www.freepress.net/privacy-copyright'
        },
        'fftf': {
            name: 'Fight for the Future',
            policy: 'http://www.fightforthefuture.org/privacy/'
        },
        'eff': {
            name: 'EFF',
            policy: 'https://www.eff.org/policy'
        },
        'an': {
            name: 'Access Now',
            policy: 'https://www.accessnow.org/pages/privacy-policy'
        },
        'dp': {
            name: 'Demand Progress',
            policy: 'http://www.demandprogress.org/privacy/'
        },
        'om': {
            name: 'Open Media',
            policy: 'https://openmedia.ca/privacy'
        }
    };
    var referalKeys = Object.keys(referalMap);
    var referalParam = getParameterByName('r');
    var referalOrg;
    var slug;

    // Allows a page to have a selected org always
    if(typeof alwaysSelected !== 'undefined') {
        referalParam = alwaysSelected;
    }
    
    if (referalParam in referalMap) {
      referalOrg = referalMap[referalParam];
      slug = referalParam;
    } else {
      var randomOrgIndex = Math.floor(Math.random() * referalKeys.length);
      referalOrg = referalMap[referalKeys[randomOrgIndex]];
      slug = referalKeys[randomOrgIndex];
    }
    $('.org-name').text(referalOrg.name);
    $('.org-slug').val(slug);
    $('.org-privacy').attr('href', referalOrg.policy);
    if(slug === 'eff') {
      $('#subscriber-checkbox').removeAttr('checked');
    }
    /*

    var spans = label.getElementsByTagName('span');
    var link = label.getElementsByTagName('a')[0];
    spans[0].innerHTML = referalOrg.name;
    spans[1].innerHTML = referalOrg.name;
    link.href = referalOrg.policy;
    checkbox.onchange = function(e) {
        hiddenInput.value = checkbox.checked ? referalOrg.name : '';
    };
    */
})();


/* ==========================================================================
   Video preload
   ==========================================================================*/

$('#video-preload').click( function(){
    $('.video-container').html('<iframe width="853" height="480" src="//www.youtube-nocookie.com/embed/RJ194S7KjRg?rel=0&vq=hd1080&autoplay=1" frameborder="0" allowfullscreen></iframe>');
})


