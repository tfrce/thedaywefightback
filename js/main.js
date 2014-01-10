(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
$.ajax('https://d28jjwuneuxo3n.cloudfront.net/?networks=facebook,twitter,googleplus&url=https://thedaywefightback.org&b=2', {
    success: function(res, err) {
        $.each(res, function(network, value) {
            var count = value;
            if (count / 10000 > 1) {
                count = Math.ceil(count / 1000) + 'k'
            }
            $('[data-network="' + network + '"]').attr('count', count);
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
$(".email-updates").sticky({
    topSpacing: 0,
    className: 'sticky-signup'
});

// 

$('#email-update-form').on('submit', function(ev) {
    var form = $(ev.currentTarget);
    var data = form.serializeObject();
    if(data.subscribe !== 'on') {
      delete data.org;
    }
    console.log(data, data.email);
    $.ajax({
        url: 'http://skipchimp2.herokuapp.com/subscribe',
        data: data,
        dataType: 'jsonp',
        type: 'GET',
        success: function() {
            $('.email-box').html('THANK YOU!');
        }
    });
    return false;
});
$('#email-banner-form').on('submit', function(ev) {
    var form = $(ev.currentTarget);
    var data = form.serializeObject();
    $.ajax({
        url: 'http://skipchimp2.herokuapp.com/subscribe',
        dataType: 'jsonp',
        data: data,
        type: 'GET',
        success: function() {
            $('.email-banner-box').html('THANK YOU!');
        }
    });
    return false;
});

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


function openFacebook() {
    var e = "https://www.facebook.com/sharer/sharer.php?u=https://thedaywefightback.org";
    window.open(e, "Share on Facebook", "width=500,height=500");
    return false
}
function openTwitter(){
        var t="https://twitter.com/home?status=Some of the biggest websites are planning a massive protest to #StopTheNSA on Feb 11th. I’m joining them — will you? https://thedaywefightback.org&related=thedaywefightback,sinak,neutralthoughts,stopwatchingus,eff";
        window.open(t,"Twitter","width=550,height=420");
          return false}

function openGplus(){
    var e="https://plus.google.com/share?url=https://thedaywefightback.org/";window.open(e,"Share on Google Plus","width=500,height=436");return false}

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
        }
    };
    var referalKeys = Object.keys(referalMap);
    var referalParam = getParameterByName('r');
    var referalOrg;
    var slug;
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
    console.log(slug, referalOrg);
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
