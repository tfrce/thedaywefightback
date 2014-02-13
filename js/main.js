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
// Countup.js
function countUp(a,b,c,d,e){for(var f=0,g=["webkit","moz","ms"],h=0;h<g.length&&!window.requestAnimationFrame;++h)window.requestAnimationFrame=window[g[h]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[g[h]+"CancelAnimationFrame"]||window[g[h]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a){var c=(new Date).getTime(),d=Math.max(0,16-(c-f)),e=window.setTimeout(function(){a(c+d)},d);return f=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)});var i=this;this.useEasing=!0,this.d=document.getElementById(a),i.startVal=Number(b),c=Number(c),this.countDown=b>c?!0:!1,d=Math.max(0,d||0),this.dec=Math.pow(10,d),this.duration=1e3*e||2e3,this.startTime=null,this.timestamp=null,this.remaining=null,this.frameVal=b,this.rAF=null,this.easeOutExpo=function(a,b,c,d){return 1024*c*(-Math.pow(2,-10*a/d)+1)/1023+b},this.count=function(a){null===i.startTime&&(i.startTime=a),i.timestamp=a;var e=a-i.startTime;if(i.remaining=i.duration-e,i.useEasing)if(i.countDown){var f=i.easeOutExpo(e,0,i.startVal-c,i.duration);i.frameVal=b-f}else i.frameVal=i.easeOutExpo(e,i.startVal,c-i.startVal,i.duration);else if(i.countDown){var f=(i.startVal-c)*(e/i.duration);i.frameVal=i.startVal-f}else i.frameVal=i.startVal+(c-i.startVal)*(e/i.duration);i.frameVal=Math.round(i.frameVal*i.dec)/i.dec,i.frameVal=i.countDown?i.frameVal<c?c:i.frameVal:i.frameVal>c?c:i.frameVal,i.d.innerHTML=i.addCommas(i.frameVal.toFixed(d)),e<i.duration?i.rAF=requestAnimationFrame(i.count):null!=i.callback&&i.callback()},this.start=function(a){return i.callback=a,isNaN(c)||isNaN(b)?(true,i.d.innerHTML="--"):i.rAF=requestAnimationFrame(i.count),!1},this.stop=function(){cancelAnimationFrame(i.rAF)},this.reset=function(){cancelAnimationFrame(i.rAF),i.d.innerHTML=i.addCommas(b.toFixed(d))},this.resume=function(){i.startTime=null,i.duration=i.remaining,i.startVal=i.frameVal,requestAnimationFrame(i.count)},this.addCommas=function(a){a+="";var b,c,d,e;for(b=a.split("."),c=b[0],d=b.length>1?"."+b[1]:"",e=/(\d+)(\d{3})/;e.test(c);)c=c.replace(e,"$1,$2");return c+d},i.d.innerHTML=i.addCommas(b.toFixed(d))}


/* ==========================================================================
   Subscriber counts
   ==========================================================================*/

//This function converts a difference in two times into days hours and minutes and seconds.
function splitTime(msec){
        var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
        msec -= dd * 1000 * 60 * 60 * 24;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;
        var ret = new Object();
              ret['d']=dd;
              ret['h']=hh;
              ret['m']=mm;
              ret['s']=ss;
        return ret;
}

// Update the day/hr/min/sec on page
function updateTimeOnSite(timeDiffObj) {
daysOd.update(timeDiffObj['d']);
hoursOd.update(timeDiffObj['h']-3);
minutesOd.update(timeDiffObj['m']);
secondsOd.update(timeDiffObj['s']);
}

// Set odometer options
if( $('#subscribers-count-sites').length ){
    window.odometerOptions = {
      auto: false, // Don't automatically initialize everything with class 'odometer'
      format: '(,ddd).dd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
      duration: 3000, // Change how long the javascript expects the CSS animation to take
    };

    //Create website counter
    var siteCountOd = new Odometer({
      el: $("#subscribers-count-sites")[0],
      value: 0,
      theme: 'car'
    });

    //Update website counter
    $.ajax('https://d1anv19wqyolnf.cloudfront.net/count', {
        dataType: 'jsonp',
        cache         : true,
        jsonpCallback : 'myCallbacka'
    }).done(function(res){
        siteCountOd.update(res.siteCount);
        // $('.subscribers-count').text(res.siteCount + ' websites and ' + res.totalCount + ' people');
    });

    //Create day/hr/min/sec odometers
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
    var minutesOd = new Odometer({
      el: $("#minutes-left")[0],
      value: 0,
      theme: 'car'
    });
    var secondsOd = new Odometer({
      el: $("#seconds-left")[0],
      value: 0,
      theme: 'car'
    });

    //Get time difference
    $.ajax({
        type: "GET",
        url: '/blank.html',
        success: function(data, status, xhr) {
            var serverDateTime = (xhr.getResponseHeader('Date'));
            serverDate = new Date(serverDateTime);
            liveDate = new Date(Date.UTC(2014, 1, 11, 8, 0));
            var diff = liveDate - serverDate;

            timeDiffObj = splitTime(diff);
            updateTimeOnSite(timeDiffObj);

            setInterval(function(){
                diff -= 1000;
                timeDiffObj = splitTime(diff);
                updateTimeOnSite(timeDiffObj);
            }, 1000);
        }
    });
}


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

$(".email-updates").sticky({
    topSpacing: 0,
    className: 'sticky-signup'
});

$('#email-signup-close').click(function () {
  $(this).remove();
  var css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = ".sticky-signup .email-updates { position: static !important }";
  document.body.appendChild(css);
  return false;
});

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
        },
        'ra': {
            name: 'RootsAction',
            policy: 'http://www.rootsaction.org/privacy-policy'
        },
        'o98': {
            name: 'The Other 98%',
            policy: 'http://other98.com/privacy/'
        },
        'dk': {
            name: 'Daily Kos',
            policy: 'http://www.dailykos.com/special/privacy'
        },
        'ca': {
            name: 'Credo Action',
            policy: 'http://credoaction.com/privacy/'
        },
        'aclu': {
            name: 'ACLU',
            policy: 'https://www.aclu.org/american-civil-liberties-union-privacy-statement'
        },
        'pda': {
            name: 'Progressive Democrats of America',
            policy: 'http://www.pdamerica.org/about-pda/privacy-policy'
        },
        'of': {
            name: 'Campaign for America\'s Future',
            policy: 'http://ourfuture.org/privacy'
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
    $('.video-container').html('<iframe width="853" height="480" src="//www.youtube-nocookie.com/embed/aGmiw_rrNxk?rel=0&vq=hd1080&autoplay=1" frameborder="0" allowfullscreen></iframe>');
});

$('span#readmore').click( function(){
    $('#readmoreaboutbills').removeClass("hidden");
    $(this).addClass("hidden");
});

$(document).on('ready', function () {
    new countUp("result-calls", 0, 96000, 0, 5).start();
    new countUp("result-emails", 0, 555000, 0, 5).start();
    new countUp("result-petitions", 0, 245000, 0, 5).start();
    new countUp("result-website", 0, 1000000, 0, 5).start();
    new countUp("result-banner", 0, 37000000, 0, 5).start();
    new countUp("result-twitter", 0, 84000, 0, 5).start();
    new countUp("result-facebook", 0, 410000 + 10000, 0, 5).start();
})
