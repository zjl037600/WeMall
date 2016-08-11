$(function() {    
    var browser = {
        versions: function() {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1,
                presto: u.indexOf('Presto') > -1,
                webKit: u.indexOf('AppleWebKit') > -1,
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/) && u.indexOf('QIHU') && u.indexOf('QIHU') > -1 && u.indexOf('Chrome') < 0,
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
                iPad: u.indexOf('iPad') > -1,
                webApp: u.indexOf('Safari') == -1,
                ua: u
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }

    if (browser.versions.mobile && !browser.versions.iPad) {

    } else {
        //this.location = "{:U('Pc/index','sid='.$store['store_id'])}";
    }
    var containerEl = $('.footer_banner'),
            hideBtnEl = $('.J_close_banner'),
            downloadEl = $('#footer_download');
    var url = location.href;
    if (url && url.indexOf('product=dpapp') == -1) {
        containerEl.show();
    }

    hideBtnEl.on('click', function(e) {
        containerEl.hide();
    });
    downloadEl.on('click', function(e) {
        location.href = dist_url;
    })
})