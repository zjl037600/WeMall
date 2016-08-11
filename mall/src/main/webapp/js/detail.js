$(function() {
        function a(a) {
                var b = -a * g;
                $(".mdetail_goodsdet_con .detailConPanel").animate({
                        left: b
                }, 100)
        }
        function b(a) {
                var b = a.find("img"),
                            c = $(".mdetail_goodsdet_con");
                b.length && _.each(b, function(b) {
                        var d = new Image;
                        d.src = b.src, d.onload = function() {
                                var b = a.outerHeight(!0);
                                c.css("minHeight", b)
                        }
                });
                var d = a.outerHeight(!0);
                c.css("minHeight", d)
        }
        function c(a) {
                var b, d, e, f, g = 0,
                            k = [];
                if ("undefined" != typeof i[a])
            return i[a];
                if (f = a.split(";"), f.length === j.length)
            return h[a] ? parseInt(h[a].stock) : 0;
                for (b = 0; b < j.length; b++) {
                        for (d = 0; d < j[b].length && f.length > 0 && j[b][d] != f[0]; d++)
                ;
                        if (!(d < j[b].length && f.length > 0)) {
                                for (e = 0; e < j[b].length; e++)
                    g += c(k.concat(j[b][e], f).join(";"));
                                break
                        }
                        k.push(f.shift())
                }
                return i[a] = g, g
        }
        function d(a) {
                var b, c, e, f, g = [],
                            h = [];
                if (f = a.split(";"), h.push(a), f.length === j.length)
            return h;
                for (b = 0; b < j.length; b++) {
                        for (c = 0; c < j[b].length && f.length > 0 && j[b][c] != f[0]; c++);
                        if (!(c < j[b].length && f.length > 0)) {
                                for (e = 0; e < j[b].length; e++)
                    h = h.concat(d(g.concat(j[b][e], f).join(";")));
                                break
                        }
                        g.push(f.shift())
                }
                return h
        }
        var e = document.getElementById("mySwipe");
        window.mySwipe = Swipe(e, {
                startSlide: 0,
                auto: 3e3,
                callback: function(a) {
                        indexs.eq(a).addClass("cur").siblings().removeClass("cur")
                }
        }), window.indexs = $("#mySwipe .members_flash_time span");
        try {
             
                 
                 $(".j-swipe").each(function(i,item){
      window.mySwipe = Swipe(item, {
                        startSlide: 0,
                        auto: 3e3,
                        callback: function(a) {
                                indexs[i].eq(a).addClass("cur").siblings().removeClass("cur")
                        }
                }), 
                window.indexs[i] = $(".j-swipe:eq("+i+") .members_flash_time span");

  });
                
              
        } catch (f) {

    }
        var g = $(".mdetail_goodsdet_con").width();
        $(".mdetail_goodsdet_tit span").click(function() {
                var c = $(this).index();
                
                $(this).addClass("cur").siblings().removeClass("cur"), a(c),
                b($(".mdetail_goodsdet_con .detailCon:eq(" + c +")"))
        }), b($(".mdetail_goodsdet_con .members_con:eq(0)")), $(document).on("touchend", ".J-comimg", function(a) {
                var b = $(this).attr("src"),
                            c = '<div class="mdetail_conimg"><img src="' + b + '" width="100%"></div>';
                $("body").append(c), $(".mdetail_conimg").click(function() {
                        $(this).remove()
                }), a.preventDefault()
        }), $(".md_add").click(function() {
                var a = parseInt($(".md_text").val()),
                            b = parseInt($("#j-stocknum-ipt").data("maxnum"));
                a >= b || (a += 1, $(".md_text").val(a))
        }), $(".md_min").click(function() {
                var a = parseInt($(".md_text").val());
                1 >= a || (a -= 1, $(".md_text").val(a))
        }), $(".madtail_cart").click(function() {
                var a = $(this).data("id"),
                            b = $(".md_text").val(),
                            c = $(".md_text").data("maxnum"),
                            d = [];
                if (1 > b)
            return void $.Error("购买数量不能小于1");
                if (b > c)
            return void $.Error("您所填的购买数量超出库存");
                $(".j-skulist dd span.cur").each(function() {
                        d.push($(this).data("propsid"))
                });
                var e = $(".j-skulist").length;
                return e && d.length < e ? void $.Error("请先选择您要购买的类型！") : ($.post(add_cart_url, {
                        id: a,
                        num: b,
                        value: d
                }, function(a) {
                        1 == a.status ? ($.addone(b, 700), $.Error("添加成功")) : $.Error("对不起，加入购物车失败：" + a.msg)
                }), !1)
        }), $(".onbuy").click(function() {
                var a = ($(this).data("id"), $(".md_text").val()),
                            b = $(".md_text").data("maxnum"),
                            c = [];
                if (1 > a)
            return void $.Error("购买数量不能小于1");
                if (a > b)
            return void $.Error("您所填的购买数量超出库存");
                $(".j-skulist dd span.cur").each(function() {
                        c.push($(this).data("propsid"))
                });
                var d = $(".j-skulist").length;
                return d && c.length < d ? void $.Error("请先选择您要购买的类型！") : ($('input[name="sku"]').val(c), $('input[name="num"]')
                            .val(a), void $("#form1").submit())
        }), $(".j-collect").click(function() {
                var a = $(this),
                            b = a.data("id"),
                            c = a.data("action");
                switch (console.log(c), console.log(b), c) {
                    case "collect":
                            $.post(addCollect, {
                                    id: b
                            }, function(b) {
                                    1 == b.status ? ($.Error("收藏成功"), a.hide().siblings("a").show()) : window.location.href = b.url
                            });
                            break;
                    case "cancel":
                            $.post(cancleCollect, {
                                    id: b
                            }, function(b) {
                                    1 == b.status ? ($.Error("已取消收藏"), a.hide().siblings("a").show()) : window.location.href = b.url
                            })
                }
        });
        var h = {}, i = {}, j = [];
        h = $.parseJSON($("#j-skuDataset").val()), j = $.parseJSON($("#j-propsDataset").val()), $(".j-skulist dd span").click(function() {
                if (!$(this).hasClass("disabled")) {
                        {
                                $(this).data("propsid")
                        }
                        $(this).hasClass("cur") ? ($(this).removeClass("cur"), $(this).find("b").hide(), $(".j-skulist span.cur").length ||
                                    $(".j-skulist dd span").removeClass("disabled")) : ($(this).addClass("cur").siblings().removeClass(
                                    "cur"), $(this).find("b").show().parent().siblings().find("b").hide());
                        var a = $(".j-skulist dd span.cur").length;
                        if (a) {
                                a <= $(".j-skulist").length - 1 && $(".j-skulist span").addClass("disabled"), 1 == a && $(
                                            ".j-skulist dd span.cur").siblings("span").removeClass("disabled");
                                var b = [];
                                $(".j-skulist span.cur").each(function() {
                                        b.push($(this).data("propsid"))
                                });
                                var e = d(b.join(";")),
                                            f = [];
                                for (var g in h)
                    for (var i = 0; i < e.length; i++)
                        g == e[i] && f.push(e[i]);
                                for (var i = 0; i < f.length; i++)
                    for (var j = f[i].split(";"), k = 0; k < j.length; k++)
                        $(
                                                            ".j-skulist span[data-propsid='" + j[k] + "']").removeClass("disabled");
                                var l = c(b.join(";"));
                                $(".j-stocknum").text(l), $("#j-stocknum-ipt").data("maxnum", l).val("1"), 1 == f.length && $(
                                            ".j-skuPrice").text("￥" + h[f[0]].price)
                        }
                }
        })
});