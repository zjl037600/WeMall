$(function() {
    var n = $(".js-scroll-notice");
    n.length && n.each(function() {
        function n() {
            a--,
                    0 > a + o && (a = i),
                    t.css({
                        left: a
                    })
        }
        var t = $(this),
                e = t.parents(".custom-notice-inner"),
                o = t.width(),
                i = e.width(),
                a = 0;       
        i >= o || (t.css({
            position: "relative"
        }), setInterval(n, 25))
    })
})