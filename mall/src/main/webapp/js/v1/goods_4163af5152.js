window.Utils = window.Utils || {},
$.extend(window.Utils, {
    getWxInfo: function() {
        var t = window.navigator.userAgent,
        e = t.match(/MicroMessenger\/(\d+(\.\d+)*)/),
        i = null !== e && e.length,
        n = i ? parseFloat(e[1]) : 0;
        return {
            isWx: i,
            wxVersion: n
        }
    }
}),
define("wap/components/util/wx_info",
function() {}),
define("text!wap/showcase/goods/templates/goodsCount.html", [],
function() {
    return '<% if ( data.day > 0 ) { %>\n<i class="mc-num-days"><%- (+data.day) %></i><span class="mc-text">天</span>\n<% } %>\n<% if ( data.day > 0 || data.hour > 0 ) { %>\n<i class="mc-num-hours"><%- (+data.hour) %></i><span class="mc-text">小时</span>\n<% } %>\n<i class="mc-num-minutes"><%- data.min %></i><span class="mc-text">分</span>\n<i class="mc-num-seconds"><%- data.sec %></i><span class="mc-text">秒</span>'
}),
define("components/zenjs/util/count_down", [],
function() {
    function t(t, e, i, n, s) {
        var o = 0,
        a = 0,
        d = 0,
        r = 0,
        c = 0,
        l = "",
        h = new Date,
        u = t.getTime() - h.getTime();
        return 0 >= u ? (s.stop(), e({
            seconds: 0,
            text: "00:00:000",
            hour: 0,
            min: 0,
            sec: 0,
            msec: 0,
            day: 0
        }), void i()) : (u > 864e5 && (o = Math.floor(u / 864e5), u -= 864e5 * o, l += o + "天"), u > 36e5 && (a = u > 36e6 ? Math.floor(u / 36e5) : "0" + Math.floor(u / 36e5), u -= 36e5 * a, l += a + "小时"), u > 6e4 ? (d = Math.floor(u / 6e4) % 60, r = Math.floor(u / 1e3) % 60, c = u % 1e3) : (d = 0, r = Math.floor(u / 1e3), c = u % 1e3), 10 > d && (l += "0"), l += d + "分", 10 > r && (l += "0"), l += r + "秒", 10 > c ? l += "00": 100 > c && (l += "0"), "second" != n && (l += c), void e({
            text: l,
            hour: a,
            min: d,
            sec: r,
            msec: c,
            day: o
        }))
    }
    function e() {
        this.tid = null,
        this.startTime = null
    }
    var i = function() {};
    return e.prototype = {
        run: function(e) {
            function n() {
                r.tid = setTimeout(n, "second" == e.step ? 1e3: 50),
                t(d, o, a, e.step, r)
            }
            this.startTime || (this.startTime = Date.now());
            var s = e.seconds || 0,
            o = e.onTimeChange || i,
            a = e.onTimeChangeEnd || i;
            this.startTime += 1e3 * s;
            var d = new Date(this.startTime),
            r = this;
            n()
        },
        stop: function() {
            clearTimeout(this.tid)
        }
    },
    e
}),
define("text!wap/showcase/goods/templates/present_sku.html", [],
function() {
    return '<!-- <div class="layout-title sku-box-shadow name-card sku-name-card">\n    <div class="thumb"><img src="http://imgqntest.koudaitong.com/upload_files/2014/11/20/FtZUJNm6bg4dPp7ECvNnBjhEFKyu.jpg!100x100.jpg" alt=""></div>\n    <div class="detail goods-base-info clearfix">\n        <p class="title c-black ellipsis">我很便宜</p>\n        <div class="goods-price clearfix">\n            <div class="current-price c-black pull-left">\n                <span class="price-name pull-left font-size-14 c-orange">￥</span><i class="js-goods-price price font-size-18 c-orange vertical-middle">0.01</i>\n            </div>\n        </div>\n    </div>\n    <div class="js-cancel sku-cancel">\n        <div class="cancel-img"></div>\n    </div>\n</div> -->\n\n<div class="adv-opts layout-content">\n    <div class="goods-models js-sku-views block block-list block-border-top-none">\n    </div>\n    <div class="confirm-action content-foot">\n        <a href="javascript:;" class="js-sku-get-present btn btn-block btn-green">领取赠品</a>\n    </div>\n</div>\n'
}),
define("wap/showcase/goods/views/present_sku", ["wap/showcase/sku/views/message", "text!wap/showcase/goods/templates/present_sku.html"],
function(t, e) {
    return Backbone.View.extend({
        events: {
            "click .js-sku-get-present": "_onGetPresentClicked",
            "click .js-cancel": "_onCancelClicked"
        },
        initialize: function(t) {
            t = t || {},
            this.messages = t.messages || [],
            this.onHide = t.onHide ||
            function() {},
            this.onGetPresentClicked = t.onGetPresentClicked
        },
        render: function() {
            return this.$el.html(e),
            this.nSkuContainer = this.$(".js-sku-views"),
            this.messageView = new t({
                messages: this.messages,
                className: "block-item block-item-messages"
            }),
            this.nSkuContainer.append(this.messageView.render().el),
            this
        },
        _onGetPresentClicked: function() {
            var t = this.messageView.getData();
            t && this.onGetPresentClicked({
                postData: t
            })
        },
        _onCancelClicked: function() {
            this.onHide()
        }
    })
}),
define("wap/components/popout", ["wap/components/pop"],
function(t) {
    var e = t.extend({
        init: function(t) {
            t = t || {},
            this._super(t),
            this.css = _.extend({
                position: "absolute",
                "z-index": 1e3,
                transition: "opacity ease " + this.animationTime + "ms",
                opacity: 0,
                top: "50%",
                left: "50%",
                "-webkit-transform": "translate3d(-50%, -50%, 0)",
                transform: "translateY(-50%, -50%, 0)"
            },
            t.css || {}),
            this.nPopContainer.css(this.css)
        },
        _doShow: function() {
            $(".js-popout-close").click(_(function() {
                this.hide()
            }).bind(this)),
            this.nPopContainer.css("opacity", 1),
            this.nPopContainer.show()
        },
        _doHide: function() {
            this.nPopContainer.css({
                opacity: 0
            })
        }
    });
    return e
}),
define("wap/components/popout_box", ["wap/components/popout"],
function(t) {
    var e = function() {},
    i = t.extend({
        init: function(t) {
            this._super(t),
            this._onOKClicked = t.onOKClicked || e,
            this._onCancelClicked = t.onCancelClicked || e,
            this.preventHideOnOkClicked = t.preventHideOnOkClicked || !1,
            this.width = t.width,
            this.setEventListener()
        },
        setEventListener: function() {
            this.nPopContainer.on("click", ".js-ok", $.proxy(this.onOKClicked, this)),
            this.nPopContainer.on("click", ".js-cancel", $.proxy(this.onCancelClicked, this))
        },
        _doShow: function() {
            this.boxCss = {
                "border-radius": "4px",
                background: "white",
                width: this.width || "270px",
                padding: "15px"
            },
            this.nPopContainer.css(this.boxCss).addClass("popout-box"),
            this._super()
        },
        _doHide: function() {
            this._super()
        },
        onOKClicked: function(t) {
            this._onOKClicked(t),
            !this.preventHideOnOkClicked && this.hide()
        },
        onCancelClicked: function(t) {
            this._onCancelClicked(t),
            this.hide()
        }
    });
    return i
}),
define("text!wap/showcase/goods/templates/cashback_rule.html", [],
function() {
    return '<form class="form-dialog">\n    <div class="header">\n        <h2> <span>促销详情</span> </h2>\n    </div>\n    <fieldset class="field-info">\n        <% if(cashBack && cashBack.replace(/(^\\s*)|(\\s*$)/g, "")){ %>\n        <p class="font-size-12"><span class="c-red">【订单返现】</span><span><%= cashBack %></span>返现；</p>\n        <div class="turn-rule-step">\n            <p class="font-size-12 c-gray-dark reset-p-margin">1、通过【微信支付】付款，返现金额将通过 【微信红包】发放，请在三天内领取，逾期作废；</p>\n            <p class="font-size-12 c-gray-dark reset-p-margin">2、通过【银行卡】付款，返现金额将在3天内，原路发放至银行卡账户；</p>\n        </div>\n        <hr>\n        <% } %>\n        <% if(meetReduce && meetReduce.replace(/(^\\s*)|(\\s*$)/g, "")){ %>\n        <p class="font-size-12">\n            <span class="block-icon btn btn-red font-size-14">满减/赠/包邮</span>单笔订单金额<%= meetReduce %>\n        </p>\n        <% } %>\n    </fieldset>\n    <div class="action-container">\n        <button type="button" class="js-ok btn btn-green btn-block">我知道了</button>\n    </div>\n</form>\n\n'
}),
define("wap/showcase/goods/goods", ["wap/components/util/wx_info", "text!wap/showcase/goods/templates/goodsCount.html", "components/zenjs/util/count_down", "wap/components/popup", "wap/showcase/goods/views/present_sku", "wap/components/popout_box", "text!wap/showcase/goods/templates/cashback_rule.html"],
function(t, e, i, n, s, o, a) {
    var d = _.template(e),
    r = Backbone.View.extend({
        el: "body",
        cashBackRuleTpl: _.template(a),
        events: {
            "click .js-qrcode-buy": "qrcodeBuyTip",
            "click .js-hide-qrcode": "hideQrcode",
            "click .js-add-cart": "onAddCartClicked",
            "click .js-buy-it": "onBuyItClicked",
            "click .js-add-gift": "onGiftClicked",
            "click .js-trade-reward": "onRewardArrowClicked",
            "click .js-add-wish": "onAddWishClicked",
            "click .js-add-wish-btn": "onAddWishClicked",
            "click .js-added-wish-btn": "onAddedWishClicked",
            "click .js-get-present": "onGetPresent",
            "click .js-promotion-rule": "onShowCashbackRule"
        },
        initialize: function(t) {
            var e = this;
            this.buyConfig = t.buyConfig;
            var i = this.sku = window._global.sku;
            return this.messages = i.messages,
            this.goodsId = window._global.goods_id,
            this.quota = window._global.quota || 1 / 0,
            this.buyQuantity = 1,
            this.totalStock = i.stock_num,
            this.price = i.price,
            this.postage = window._global.postage || 0,
            this.qrCache = {},
            $("#tmpl-side-qrcode").length > 0 && (this.qrTemplate = _.template($("#tmpl-side-qrcode").html())),
            this.activityAlias = window._global.activity_alias,
            this.fullPage = this.$(".wap-page-goods"),
            this.imageSwiper = this.$(".js-image-swiper"),
            this.taoInfo = this.$(".custom-go-tao"),
            this.returnBtn = this.$(".js-butn-return"),
            this.buyBtn = this.$(".js-buy-it"),
            this.confirmBtn = this.$(".js-confirm-it"),
            this.componentsContainer = this.$(".js-components-container"),
            this.bottomOpts = this.$(".js-bottom-opts"),
            this.qrcodeContainer = $(".js-qrcode-container"),
            this.qrcodeBtn = this.$(".js-qrcode-buy"),
            this.hideBtn = this.$(".js-hide-qrcode"),
            this.buyGuide = this.$(".js-buy-guide"),
            this.nAddWish = this.$(".js-add-wish"),
            this.nAddWishBtn = this.$(".js-wish-btn"),
            window._global.isWishOpen ? void(window.queryBatch && window.queryBatch({
                key: "goods_wish",
                url: "/v2/trade/wish/IsAdded.json?kdt_id=" + window._global.kdt_id || 0,
                type: "POST",
                para: {
                    goods_ids: [this.goodsId]
                },
                handler: function(t) {
                    {
                        var i = t.code,
                        n = (t.data || {})[e.goodsId] || {};
                        t.msg
                    }
                    0 == i && (n.isWishOpen && e.nAddWish.removeClass("hide"), n.isWishAdded && e.nAddWish.addClass("wish-added"))
                }
            })) : this
        },
        initCountdown: function() {
            var t = this,
            e = $(".js-mini-counter");
            if (e.length) {
                var n = new i;
                n.run({
                    seconds: e.data("countdown"),
                    onTimeChange: function(t) {
                        e.html(d({
                            data: t || {}
                        }))
                    },
                    step: "second",
                    onTimeChangeEnd: function() {
                        t.$(".js-info-wrapper").hide(),
                        t.$(".js-to-start").addClass("hide"),
                        t.$(".js-normal-btns").removeClass("hide")
                    }
                })
            }
        },
        buyAction: function(t) {
            if (this.buyConfig) {
                var e = Utils.getWxInfo() || {};
                return this.buyConfig.isAdmin && !this.buyConfig.isMobile ? (motify.log("预览不支持进行购买，<br />实际效果请在手机上进行。", 0), !1) : this.buyConfig.no_fans_buy ? (setTimeout(function() {
                    window.showGuide && window.showGuide("follow", {
                        goods: !0
                    })
                },
                400), !1) : this.buyConfig.permissions.aliPay || this.buyConfig.permissions.wxPay && e.isWx ? void app.trigger(t) : (motify.log("该商品无法购买，请联系商家。", 3e4), this.buyBtn.prop("disabled", !0), !1)
            }
        },
        onRewardArrowClicked: function() {
            var t = this.$(".js-arrow-down");
            t.hasClass("arrow-down") ? (t.removeClass("arrow-down"), this.$(".js-trade-reward-info").addClass("hide-part-text")) : (t.addClass("arrow-down"), this.$(".js-trade-reward-info").removeClass("hide-part-text"))
        },
        onBuyItClicked: function(t) {
            return t.preventDefault(),
            t.stopPropagation(),
            $(t.target).prop("disabled") ? !1 : void this.buyAction("buy")
        },
        onAddCartClicked: function(t) {
            return t.preventDefault(),
            t.stopPropagation(),
            $(t.target).prop("disabled") ? !1 : void this.buyAction("addcart")
        },
        onAddWishClicked: function(t) {
            t.preventDefault(),
            t.stopPropagation();
            var e = this;
            this.nAddWish.hasClass("wish-added") ? ($.ajax({
                url: cancleCollect,
                type: "POST",
                dataType: "json",
                cache: !1,
                timeout: 15e3,
                data: {
                    id: this.goodsId
                },
                beforeSend: function() {
                    e.isAjaxing = !0
                },
                success: function(t) {
                    1 == t.status ? (e.nAddWish.removeClass("wish-added"), motify.log("该收藏已取消"), e.nAddWishBtn.removeClass("js-added-wish-btn").addClass("js-add-wish-btn").text("收藏")) : (motify.log(t.msg),window.location.href=t.url);
                    e.isAjaxing = !1
                },
                error: function() {
                    e.isAjaxing = !1
                }
            }), Logger && Logger.log({
                fm: "click",
                title: "add_wish"
            })) : this.buyAction("add-wish")
        },
        onAddedWishClicked: function() {
            window.location.href = window._global.url.trade + "/wxpay/wish?kdt_id=" + window._global.kdt_id
        },
        onGiftClicked: function(t) {
            t.preventDefault(),
            t.stopPropagation(),
            this.buyAction("gift")
        },
        onGetPresent: function(t) {
            t.preventDefault(),
            t.stopPropagation();
            var e = (window._global.sku || {}).messages || [],
            i = this;
            e.length ? new n({
                contentViewClass: s,
                className: "sku-layout sku-box-shadow",
                contentViewOptions: {
                    messages: e,
                    onGetPresentClicked: function(t) {
                        i.getPresentToServer(t.postData)
                    }
                },
                containerCss: {
                    left: "0px",
                    right: "0px",
                    bottom: "0px",
                    background: "white"
                }
            }).render().show() : this.getPresentToServer()
        },
        onShowCashbackRule: function() {
            var t = {
                cashBack: $("#cash-back-str").html().trim(),
                meetReduce: $("#meet-reduce-str").html().trim()
            };
            if (0 !== t.cashBack.length || 0 !== t.meetReduce.length) {
                var e = this.cashBackRuleTpl(t);
                new o({
                    html: e,
                    transparent: ".8"
                }).render().show()
            }
        },
        getPresentToServer: function(t) {
            var e = window._global,
            i = e.url.wap + "/trade/order/generateUserPresentOrder.jsonp",
            n = e.present.alias;
            $.ajax({
                url: i,
                type: "GET",
                dataType: "jsonp",
                cache: !1,
                data: _.extend({},
                t, {
                    alias: n
                }),
                beforeSend: function() {
                    motify.log("提交成功，跳转中…")
                },
                success: function(t) {
                    var e = t.code;
                    if (0 === e) {
                        var i = t.data.trade_confirm_url;
                        window.location.href = i
                    } else motify.log(t.msg)
                },
                error: function() {
                    motify.log("请求出错，请重试！")
                }
            })
        },
        qrcodeBuyTip: function(t) {
            var e = this;
            t.preventDefault(),
            e.qrcodeContainer.hasClass("shake") || (e.qrcodeContainer.addClass("active animated shake"), setTimeout(function() {
                e.qrcodeContainer.removeClass("animated shake")
            },
            1200))
        },
        initPcBuy: function() {
            var t = zenjs.UA; ! t || t.isMobile() || t.isIPad() || (this.adminPreview())
        },
        adminPreview: function() {
            var t = this;
            $(document.documentElement).on("switch_style",
            function(e, i) {
                t.switchStyle(i)
            })
        },        
        scrollToTitle: function() {
            var t = $(".custom-go-tao").offset().top;
            setTimeout(function() {
                window.scrollTo(0, t)
            },
            10)
        },       
        wishAdded: function() {
            this.nAddWish.addClass("wish-added"),
            this.nAddWishBtn.addClass("js-added-wish-btn").removeClass("js-add-wish-btn").text("请TA来买单")
        },
        render: function() {
            var t = this.$(".js-trade-reward"),
            e = this.$(".js-trade-reward-info"),
            i = t.width(),
            n = $.trim(e.text());
            return i < 75 + 11 * n.length && this.$(".js-arrow-down").removeClass("hide"),
            this.initCountdown(),
            this.initPcBuy(),
            this
        }
    });
    return r
}),
define("text!wap/showcase/goods/templates/recommend_goods.html", [],
function() {
    return '<div>\n	<hr style="margin: 10px 0;">\n	<p class="center font-size-14 c-black" style="padding: 5px 0;">店内更多商品</p>\n\n	<div class="js-recommend-goods-list"></div>\n\n	<p class="center" style="margin: 10px 0 20px;">\n	    <a href="<%= window._global.url.wap %>/showcase/homepage?kdt_id=<%= window._global.kdt_id %>" class="center btn btn-white btn-xsmall font-size-14 " style="padding:8px 26px;">进店逛逛></a>\n	</p>\n</div>\n'
}),
require(["wap/showcase/goods/goods", "wap/components/popup", "text!wap/showcase/goods/templates/recommend_goods.html"],
function(t, e, i) {
    var n = Backbone.View.extend({
        initialize: function() {
            var t = this;
            this.listenTo(this, "buy", this.buy),
            this.listenTo(this, "addcart", this.addCart),
            this.listenTo(this, "goods", this.goods),
            this.listenTo(this, "wish:added", this.wishAdded),
            this.listenTo(this, "gift", this.gift),
            this.listenTo(this, "add-wish", this.addWish),
            this.buyConfig = {
                permissions: {
                    wxPay: _global.wxpay_env,
                    aliPay: _global.alipay_env
                },
                isAdmin: _global.is_owner_team,
                isMobile: _global.is_mobile,
                team_certificate: _global.team_certificate,
                no_fans_buy: _global.no_fans_buy
            },
            this.goods();
            var t = this;
            if ("true" != zenjs.Args.getParameterByName("showsku") || window._global.is_owner_team && !window._global.is_mobile || $(".js-bottom-opts button").prop("disabled") || t.buy(), "true" == zenjs.Args.getParameterByName("dal")) {
                var e = $("a,span");
                e.click(function(t) {
                    return t.preventDefault(),
                    t.stopPropagation(),
                    !1
                }),
                e.css("-webkit-tap-highlight-color", "rgba(0, 0, 0, 0)")
            }
            "wxd" == zenjs.Args.getParameterByName("from") && $.ajax({
                url: "/v2/showcase/goods/recommendgoodslist.json",
                type: "GET",
                dataType: "json",
                data: {
                    count: 10,
                    kdt_id: window._global.kdt_id
                },
                success: function(e) {
                    var n = e.code,
                    s = e.data;
                    if (0 == n) {
                        var o = s.html || "";
                        if (o) {
                            var a = $(_.template(i)());
                            a.find(".js-recommend-goods-list").append(o),
                            a.find(".js-goods-list").css("visibility", "visible"),
                            a.find(".js-goods-lazy").lazyload({
                                threshold: 200,
                                appear: function() {
                                    var t, e = $(this),
                                    i = e.parents(".js-goods").first().data("goods-id"),
                                    n = Logger.getSpm();
                                    t = n.lastIndexOf("_") === n.length - 1 ? n + "SI" + i: n + "_SI" + i,
                                    Logger && Logger.log({
                                        spm: t,
                                        fm: "display"
                                    })
                                }
                            }),
                            t.$(".js-components-container").append(a)
                        }
                    }
                }
            })
        },
        gift: function() {
            this.displaySku({
                isAddCart: !1,
                isGift: !0
            })
        },
        goods: function() {
            window._global;
            this.goodsView || (this.goodsView = new t({
                el: $("body"),
                buyConfig: this.buyConfig
            }).render()),
            this.popupView && this.popupView.hide()
        },
        wishAdded: function() {
            this.goodsView.wishAdded()
        },
        buy: function() {
            this.displaySku({
                isAddCart: !1,
                multiBtn: !1
            })
        },
        addCart: function() {
            this.displaySku({
                isAddCart: !0,
                multiBtn: !1
            })
        },
        addWish: function() {
            this.displaySku({
                isAddWish: !0,
                isAddCart: !1,
                multiBtn: !1
            })
        },
        displaySku: function(t) {
            var i = this;
            if (window.BuyView) {
                var n = window._global;
                this.popupView = new e({
                    contentViewClass: window.BuyView,
                    className: "sku-layout sku-box-shadow",
                    onFinishHide: function() {
                        t.isAddWish && window.eventHandler && window.eventHandler.trigger("wishScrollEnd")
                    },
                    contentViewOptions: {
                        logURL: n.logURL,
                        baseUrl: n.url.wap,
                        need_ajax_login: n.need_ajax_login,
                        wxpay_env: n.wxpay_env,
                        isCartBtnHide: n.hide_shopping_cart
                    }
                }).render({
                    sku: n.sku,
                    isAddCart: t.isAddCart,
                    isAddWish: t.isAddWish,
                    goods_id: n.goods_id,
                    postage: n.postage,
                    activity_alias: n.activity_alias,
                    activity_id: n.activity_id,
                    activity_type: n.activity_type,
                    quota: n.quota,
                    quota_used: n.quota_used,
                    difTitle: !1,
                    acitvity: {},
                    isGift: t.isGift
                }).show()
            } else setTimeout(function() {
                i.displaySku(t)
            },
            100)
        }
    });
    window.app = new n({
        el: $("body")
    })
}),
define("main",
function() {});