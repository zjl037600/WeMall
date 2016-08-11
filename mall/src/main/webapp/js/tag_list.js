!function(t){
    t.extend(t.fn, {
        anchor: function(i){
            function n(i, n){
                var o = 0, e = null;
                t(i.elements).each(function(s){
                    var a = t(this.hash);
                    if (a.length) {
                        var r = a.offset().top + i.offsetY, d = Math.abs(n - r);
                        n >= r && (null === e ? (e = d, o = s) : e > d && (e = d, o = s))
                    }
                }), t(i.classElements).removeClass(i.currentClass).eq(o).addClass(i.currentClass), "function" == typeof i.addedCurrentCallback && i.addedCurrentCallback(i.classElements.eq(o))
            }
            var o = {}, e = t.extend(o, i || {}), s = t("html, body"), a = t(window);
            return e.offsetY = Number(e.offsetY), e.currentClass = e.currentClass || "current", e.elements = e.elements ? t(e.elements) : this, e.classElements = e.classElements ? t(e.classElements) : this, this.data("_anchor_binded_") || 0 === this.length ? this : (this.data("_anchor_binded_", "true"), e[this[0][t.expando]] = e, a.scroll(function(){
                for (var t in e) 
                    n(e[t], a.scrollTop())
            }), this.click(function(){
                var i = t(this);
                setTimeout(function(){
                    i.parent().addClass("current"), i.parent().siblings().removeClass("current")
                }, 120);
                var n = t(this.hash);
                return s.scrollTop(n.offset().top + e.offsetY), !1
            }), void n(e, a.scrollTop()))
        }
    })
}(window.$), define("wap/components/anchor", function(){
}), window.Utils = window.Utils || {}, $.extend(window.Utils, {
    makeRandomString: function(t){
        var i = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        t = t || 10;
        for (var o = 0; t > o; o++) 
            i += n.charAt(Math.floor(Math.random() * n.length));
        return i
    }
}), define("wap/components/util/number", function(){
}), define("wap/components/pop", ["components/zenjs/events", "wap/components/util/number"], function(t){
    var i = function(){
    };
    window.zenjs = window.zenjs || {};
    var n = t.extend({
        init: function(t){
            this._window = $(window);
            var n = window.Utils.makeRandomString();
            $("body").append('<div id="' + n + '"                 style="display:none; height: 100%;                 position: fixed; top: 0; left: 0; right: 0;                background-color: rgba(0, 0, 0, ' + (t.transparent || ".9") + ');z-index:1000;opacity:0;transition: opacity ease 0.2s;"></div>'), this.nBg = $("#" + n), this.nBg.on("click", _(function(){
                this.isCanNotHide || this.hide()
            }).bind(this));
            var o = window.Utils.makeRandomString();
            $("body").append('<div id="' + o + '" class="' + (t.className || "") + '" style="overflow:hidden;visibility: hidden;"></div>'), this.nPopContainer = $("#" + o), t.contentViewClass && (this.contentViewClass = t.contentViewClass, this.contentViewOptions = _.extend({
                el: this.nPopContainer
            }, t.contentViewOptions || {}), this.contentView = new this.contentViewClass(_.extend({
                onHide: _(this.hide).bind(this)
            }, this.contentViewOptions))), this.animationTime = t.animationTime || 300, this.isCanNotHide = t.isCanNotHide, this.onShow = t.onShow || i, this.onHide = t.onHide || i, this.onFinishHide = t.onFinishHide || i, this.html = t.html
        },
        render: function(t){
            return this.renderOptions = t || {}, this.contentViewClass ? this.contentView.render(this.renderOptions) : this.html && this.nPopContainer.html(this.html), this
        },
        show: function(){
            return this.top = this._window.scrollTop(), this.nBg.show().css({
                opacity: "1",
                "transition-property": "none"
            }), setTimeout(_(function(){
                this._window.scrollTop(0), this.startShow(), this.nPopContainer.css("visibility", "visible"), this._doShow && this._doShow(), this.onShow()
            }).bind(this), 200), this
        },
        hide: function(){
            var t, i = function(){
                return t !== this._window.scrollTop() ? (this._window.scrollTop(t), void setTimeout(_(i).bind(this))) : void setTimeout(_(this.onFinishHide).bind(this), 50)
            };
            return function(){
                this._doHide && this._doHide(), setTimeout(_(function(){
                    this.startHide(), t = this.top, this._window.scrollTop(t), _(i).bind(this)(), this.nBg.css({
                        opacity: 0,
                        "transition-property": "opacity"
                    }), setTimeout(_(function(){
                        this.destroy()
                    }).bind(this), 200)
                }).bind(this), this.animationTime), this.onHide()
            }
        }(),
        destroy: function(){
            return this.nPopContainer.remove(), this.nBg.remove(), this.contentView && this.contentView.remove(), this
        },
        startShow: function(){
            var t = window.zenjs.popList;
            t || (t = window.zenjs.popList = []), t.indexOf(this) < 0 && (t.push(this), $("body,html").css({
                overflow: "hidden",
                height: this._window.height()
            }), $("html").css("position", "relative"))
        },
        startHide: function(){
            var t = window.zenjs.popList, i = t.indexOf(this);
            i > -1 && t.splice(i, 1), t.length < 1 && ($("html,body").css({
                overflow: "visible",
                height: "auto"
            }), $("html").css("position", "static"))
        }
    });
    return n
}), define("wap/components/popup", ["wap/components/pop"], function(t){
    var i = t.extend({
        init: function(t){
            this._super(t), this.onClickBg = t.onClickBg ||
            function(){
            }, this.onBeforePopupShow = t.onBeforePopupShow ||
            function(){
            }, this.onAfterPopupHide = t.onAfterPopupHide ||
            function(){
            }, this.nPopContainer.css(t.containerCss || {}), this.nPopContainer.css("opacity", "0")
        },
        events: {},
        _doShow: function(){
            this.contentView && this.contentView.height ? this.height = this.contentView.height() : this.contentView || (this.height = this.nPopContainer.height()), this.onBeforePopupShow(), $(".js-popup-close").click(_(function(){
                this.hide()
            }).bind(this)), this.nPopContainer.css({
                height: this.height + "px",
                transform: "translate3d(0,100%,0)",
                "-webkit-transform": "translate3d(0,100%,0)",
                opacity: 0,
                position: "absolute",
                "z-index": 1e3
            }), this.bodyPadding = $("body").css("padding"), $("body").css("padding", "0px"), setTimeout(_(function(){
                this.nPopContainer.css({
                    transform: "translate3d(0,0,0)",
                    "-webkit-transform": "translate3d(0,0,0)",
                    "-webkit-transition": "all ease " + this.animationTime + "ms",
                    transition: "all ease " + this.animationTime + "ms",
                    opacity: 1
                })
            }).bind(this)), setTimeout(_(function(){
                this.contentView && this.contentView.onAfterPopupShow && this.contentView.onAfterPopupShow()
            }).bind(this), this.animationTime)
        },
        _doHide: function(){
            this.nPopContainer.css({
                transform: "translate3d(0,100%,0)",
                "-webkit-transform": "translate3d(0,100%,0)",
                opacity: 0
            }), setTimeout(_(function(){
                $("body").css("padding", this.bodyPadding), this.onAfterPopupHide()
            }).bind(this), this.animationTime)
        }
    });
    return i
}), require(["wap/components/anchor", "wap/components/popup", "vendor/zepto/outer"], function(t, i){
    !function(t){
        t.extend(t.fn, {
            scrollToFixed: function(i){
                function n(){
                    var t = s.scrollTop(), i = d.offset().top, n = parseInt(t - i);
                    n >= 0 && (a.removeAttr("style"), a.css({
                        position: "fixed",
                        top: "0",
                        width:"22%"
                    }), n - c >= 0 && (a.removeAttr("style"), a.css({
                        position: "absolute",
                        top: 0
                    }))), 0 > n && a.css({
                        position: "static",
                        width:"100%"
                    })
                }
                var o = {}, e = t.extend(o, i || {}), s = t(window), a = e.element, r = a.outerHeight(), d = e.hitBottomBox, h = d.outerHeight(), c = h - r, l = document.getElementsByTagName("body")[0];
                l.addEventListener("touchmove", n, !1), s.scroll(function(){
                    n()
                })
            }
        })
    }(window.$), function(t){
        var n = t(".custom-tag-list"), o = n.find(".custom-tag-list-side-menu");
        t.each(o, function(i, n){
            var o = t(n), e = t(n).parents(".custom-tag-list").height();
            o.parent().css("height", e)
        }), t.each(o, function(i, n){
            var o = t(n);
            o.scrollToFixed({
                element: o,
                hitBottomBox: o.parents(".custom-tag-list")
            }), o.find("a").anchor({
                offsetY: 0,
                classElements: o.find("li"),
                currentClass: "current",
                animateDuring: 100
            })
        });
    }(window.$)
}), define("main", function(){
});
