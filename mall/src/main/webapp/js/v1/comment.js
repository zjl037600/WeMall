function initloadcomment(a) { 
    var b = now_page,
    c = {
        debug: !1,
        url: "",
        targetSelector: "",
        loadmoreSelector: ".j-loadmore",
        tpl: "",
        data: {
            p: b
        },
        callback: null
    },
    d = $.extend(!0, {},c, a)   
    $(window).scroll(function() {
        var a = $(window).scrollTop() >= $(document).height() - $(window).height() ? !0 : !1;
        if (a) {
            var c = $(d.loadmoreSelector);
            return d.data.p = now_page = parseInt(now_page) + 1,           
            $.ajax({
                url: d.url,
                type: "post",
                dataType: "json",
                data: d.data,
                beforeSend: function() {
                    c.find(".loadmore-icon").css("display", "inline-block")
                },
                success: function(a) {       
                    if (d.debug && console.log(a), a.length) {                        
                        var b = _.template(d.tpl, {
                            dataset: a
                        }),                                   
                        e = $(b);                          
                        $(d.targetSelector).append(e);                        
                    } else c.siblings(".j-noMoreData").css("display", "block"),
                    c.hide();
                    c.find(".loadmore-icon").hide(),
                    d.callback && d.callback(e)
                }
            }),
            !1
        }
    })
}