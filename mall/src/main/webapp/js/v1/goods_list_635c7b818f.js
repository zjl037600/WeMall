define("wap/showcase/modules/goods_list/box_stream", [],
function() {
    var t = function(i) {
        this._conf = {
            container: null,
            rowCount: 4,
            rowContainerClassName: "",
            rowContainerTagType: "div",
            rowCintainerWidths: [],
            _rowContainers: []
        },
        i && this.init(i)
    };
    return t.prototype = {
        init: function(i) {
            i = this._conf = $.extend(this._conf, i || {}),
            this._initRowContainers(i)
        },
        _initRowContainers: function(i) {
            var t, n, o, s, o = $(i.container).children();
            for (i.inialChildren = o, s = i.rowCount, t = 0; s > t; t++) n = document.createElement(i.rowContainerTagType),
            n.className = i.rowContainerClassName,
            n.style.cssText = "float:left;z-index:" + (s - t),
            i.rowCintainerWidths[t] && (n.style.width = i.rowCintainerWidths[t] + "px"),
            i.container.insertBefore(n, o[0]),
            i._rowContainers[t] = n;
            t = null,
            n = null,
            o = null,
            s = null
        },
        setListData: function(t) {
            var n = this._conf,
            o = n._rowContainers,
            t = t || n.inialChildren,
            s = n.rowCount;
            for (i = 0; i < t.length; i++) o[i % s].appendChild(t[i]);
            o = null
        },
        _sortOut: function() {
            var i, t, n, o, s = this._conf,
            e = s._rowContainers,
            a = 0,
            d = 0,
            r = 0,
            h = -1;
            for (t = 0; t < e.length; t++) i = e[t].offsetHeight,
            i > r && (r = i, a = t),
            (0 > h || h > i) && (h = i, d = t);
            return o = $(e[a]).children().last()[0],
            i = o.offsetHeight,
            r - h > i ? (e[d].appendChild(o), n = e[d].offsetHeight >= r ? !1 : !0) : n = !1,
            s = null,
            e = null,
            a = null,
            d = null,
            r = null,
            h = null,
            i = null,
            t = null,
            o = null,
            n
        },
        sortOut: function(i) {
            for (; this._sortOut(););
            "function" == typeof i && i()
        }
    },
    t
}),
window.Utils = window.Utils || {},
$.extend(window.Utils, {
    makeRandomString: function(i) {
        var t = "",
        n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        i = i || 10;
        for (var o = 0; i > o; o++) t += n.charAt(Math.floor(Math.random() * n.length));
        return t
    }
}),
define("wap/components/util/number",
function() {}),
define("wap/components/pop", ["components/zenjs/events", "wap/components/util/number"],
function(i) {
    var t = function() {};
    window.zenjs = window.zenjs || {};
    var n = i.extend({
        init: function(i) {
            this._window = $(window);
            var n = window.Utils.makeRandomString();
            $("body").append('<div id="' + n + '"                 style="display:none; height: 100%;                 position: fixed; top: 0; left: 0; right: 0;                background-color: rgba(0, 0, 0, ' + (i.transparent || ".9") + ');z-index:1000;opacity:0;transition: opacity ease 0.2s;"></div>'),
            this.nBg = $("#" + n),
            this.nBg.on("click", _(function() {
                this.isCanNotHide || this.hide()
            }).bind(this));
            var o = window.Utils.makeRandomString();
            $("body").append('<div id="' + o + '" class="' + (i.className || "") + '" style="visibility: hidden;"></div>'),
            this.nPopContainer = $("#" + o),
            i.contentViewClass && (this.contentViewClass = i.contentViewClass, this.contentViewOptions = _.extend({
                el: this.nPopContainer
            },
            i.contentViewOptions || {}), this.contentView = new this.contentViewClass(_.extend({
                onHide: _(this.hide).bind(this)
            },
            this.contentViewOptions))),
            this.animationTime = i.animationTime || 300,
            this.isCanNotHide = i.isCanNotHide,
            this.onShow = i.onShow || t,
            this.onHide = i.onHide || t,
            this.onFinishHide = i.onFinishHide || t,
            this.html = i.html
        },
        render: function(i) {
            return this.renderOptions = i || {},
            this.contentViewClass ? this.contentView.render(this.renderOptions) : this.html && this.nPopContainer.html(this.html),
            this
        },
        show: function() {
            return this.top = this._window.scrollTop(),
            this.nBg.show().css({
                opacity: "1",
                "transition-property": "none"
            }),
            setTimeout(_(function() {
                this._window.scrollTop(0),
                this.startShow(),
                this.nPopContainer.css("visibility", "visible"),
                this._doShow && this._doShow(),
                this.onShow()
            }).bind(this), 200),
            this
        },
        hide: function() {
            var i, t = function() {
                return i !== this._window.scrollTop() ? (this._window.scrollTop(i), void setTimeout(_(t).bind(this))) : void setTimeout(_(this.onFinishHide).bind(this), 50)
            };
            return function() {
                this._doHide && this._doHide(),
                setTimeout(_(function() {
                    this.startHide(),
                    i = this.top,
                    this._window.scrollTop(i),
                    _(t).bind(this)(),
                    this.nBg.css({
                        opacity: 0,
                        "transition-property": "opacity"
                    }),
                    setTimeout(_(function() {
                        this.destroy()
                    }).bind(this), 200)
                }).bind(this), this.animationTime),
                this.onHide()
            }
        } (),
        destroy: function() {
            return this.nPopContainer.remove(),
            this.nBg.remove(),
            this.contentView && this.contentView.remove(),
            this
        },
        startShow: function() {
            var i = window.zenjs.popList;
            i || (i = window.zenjs.popList = []),
            i.indexOf(this) < 0 && (i.push(this), $("body,html").css({
                overflow: "hidden",
                height: this._window.height()
            }), $("html").css("position", "relative"))
        },
        startHide: function() {
            var i = window.zenjs.popList,
            t = i.indexOf(this);
            t > -1 && i.splice(t, 1),
            i.length < 1 && ($("html,body").css({
                overflow: "visible",
                height: "auto"
            }), $("html").css("position", "static"))
        }
    });
    return n
}),
define("wap/components/popup", ["wap/components/pop"],
function(i) {
    var t = i.extend({
        init: function(i) {
            this._super(i),
            this.onClickBg = i.onClickBg ||
            function() {},
            this.onBeforePopupShow = i.onBeforePopupShow ||
            function() {},
            this.onAfterPopupHide = i.onAfterPopupHide ||
            function() {},
            this.nPopContainer.css(i.containerCss || {}),
            this.nPopContainer.css("opacity", "0")
        },
        events: {},
        _doShow: function() {
            this.contentView && this.contentView.height ? this.height = this.contentView.height() : this.contentView || (this.height = this.nPopContainer.height()),
            this.onBeforePopupShow(),
            $(".js-popup-close").click(_(function() {
                this.hide()
            }).bind(this)),
            this.nPopContainer.css({
                height: this.height + "px",
                transform: "translate3d(0,100%,0)",
                "-webkit-transform": "translate3d(0,100%,0)",
                opacity: 0,
                position: "absolute",
                "z-index": 1e3
            }),
            this.bodyPadding = $("body").css("padding"),
            $("body").css("padding", "0px"),
            setTimeout(_(function() {
                this.nPopContainer.css({
                    transform: "translate3d(0,0,0)",
                    "-webkit-transform": "translate3d(0,0,0)",
                    "-webkit-transition": "all ease " + this.animationTime + "ms",
                    transition: "all ease " + this.animationTime + "ms",
                    opacity: 1
                })
            }).bind(this)),
            setTimeout(_(function() {
                this.contentView && this.contentView.onAfterPopupShow && this.contentView.onAfterPopupShow()
            }).bind(this), this.animationTime)
        },
        _doHide: function() {
            this.nPopContainer.css({
                transform: "translate3d(0,100%,0)",
                "-webkit-transform": "translate3d(0,100%,0)",
                opacity: 0
            }),
            setTimeout(_(function() {
                $("body").css("padding", this.bodyPadding),
                this.onAfterPopupHide()
            }).bind(this), this.animationTime)
        }
    });
    return t
}),
require(["wap/showcase/modules/goods_list/box_stream", "wap/components/popup", "vendor/zepto/outer"],
function(i, t) { !
    function(t) {
        var n = t(".sc-goods-list.waterfall");
        n.length && n.each(function() {
            var n, o, s, e = t(this),
            a = 2;
            n = e.outerWidth(),
            s = Math.floor(n / 2) - 5,
            n >= 540 ? (a = 3, o = [176.5, 176.5, 176.5]) : o = n >= 360 ? [s, s] : [155, 155];
            var d = new i({
                container: e[0],
                rowCount: a,
                rowContainerClassName: "",
                rowContainerTagType: "li",
                rowCintainerWidths: o
            });
            d.setListData(),
            d.sortOut()
        })
    } ($),
    function(i) {
        var n = !1,
        o = function(o, s) {
            var e = i(o.target);
            if (o.preventDefault(), o.stopPropagation(), "true" != zenjs.Args.getParameterByName("hide_buy_btn", location.href)) {
                if (s = s || {},!window._global.is_mobile) return void motify.log("预览不支持进行购买，<br/>实际效果请在手机上进行。");
                if (n) motify.log("请勿重复提交。");
                else {
                    var a = e.data("alias"),
                    d = e.data("postage"),
                    r = 1,
                    h = e.data("id"),
                    l = e.data("title"),
                    c = e.data("price"),
                    u = e.parents(".js-goods"),
                    w = e.data("imgurl"),
                    isvirtual = e.data("isvirtual");
                    if ("0" == r) {
                        var p = u.attr("href");
                        window.location.href = p
                    } else {
                        s.isAddWish || e.parent().find(".goods-buy").addClass("ajax-loading"),
                        n = !0;
                        var f = i.ajax({
                            type: "get",
                            timeout: 5e3,
                            url: get_goods_sku,
                            data: {
                                goods_id: h
                            },
                            dataType: "json",
                            cache: !1,
                            success: function(n) {
                                if (0 !== +n.code) return void motify.log(n.msg);
                                var o = n.data,
                                a = (o.list[0], o.stock_num),
                                r = h;                              
                                if (a) {
                                    
                                    var y = i.extend(!0, {
                                        sku: o,
                                        goods_id: r,
                                        postage: d,
                                        difTitle: !0,
                                        goods_info: {
                                            title: l,
                                            picture: [w],
                                            price: c,
                                            origin: ""
                                        },
                                        acitvity: {},
                                        activity_alias: window._global.activity_alias,
                                        activity_id: window._global.activity_id,
                                        activity_type: window._global.activity_type,
                                        isMultiBtn: !0
                                    },
                                    s),
                                    b = new t({
                                        contentViewClass: BuyView,
                                        className: "sku-layout sku-box-shadow",
                                        onFinishHide: function() {
                                            s.isAddWish
                                        },
                                        contentViewOptions: {
                                            skuViewConfig: {
                                                top: 50
                                            },
                                            isCartBtnHide: (o.option || {}).hideCart || window._global.hide_shopping_cart,
                                            logURL: window._global.logURL,
                                            baseUrl: window._global.url.wap,
                                            wxpay_env: window._global.wxpay_env,
                                            onAddSuccess: function(i, t) {
                                                i = i || {},
                                                i.wish && (e.removeClass("js-goods-wish").addClass("js-remove-goods-wish"), e.data("sku", (t || {}).sku_id), e.parent().find(".goods-wish").addClass("added-wish"))
                                            }
                                        },
                                        isCanNotHide: !1
                                    });
                                    b.render(y).show()
                                } else motify.log("该商品已售罄!")
                                
                                //虚拟商品屏蔽加入购物车按钮
                                if(isvirtual == 1){
                                	$(".cart").remove();
                                	$(".content-foot").css("text-align","center");
                                }
                            },
                            error: function(i, t) {
                                "timeout" === t ? (f.abort(), motify.log("连接超时")) : "error" === t && (f.abort(), motify.log("请求失败，请刷新或重新打开本页!"))
                            },
                            complete: function() {
                                n = !1,
                                e.parent().find(".goods-buy").removeClass("ajax-loading")
                            }
                        })
                    }
                }
            }
        };
        i("body").on("click", ".js-goods-buy",
        function(i) {
            o(i)
        })        
    } ($);    
}),
define("main",
function() {});