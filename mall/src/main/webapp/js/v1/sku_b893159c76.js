define("components/zenjs/backbone/quantity", ["backbone", "components/zenjs/util/ua"],
function(t) {
    var i = window.zenjs.UA,
    e = function() {},
    s = t.View.extend({
        template: _.template('<div class="quantity">            <div class="response-area response-area-minus"></div>            <button class="minus" type="button" <% if (data.readonly){ %> disabled <% } %> ></button>            <input type="text" class="txt" value="<%= data.num %>" <% if (data.readonly){ %> readonly <% } %>/>            <button class="plus" type="button" <% if (data.readonly){ %> disabled <% } %>></button>            <div class="response-area response-area-plus"></div>            <div class="txtCover"></div>        </div>'),
        initialize: function() {
            var t = function(t, i, e) {
                var s;
                return e > i ? (s = i, 0 !== i && (this.disabled = !0)) : s = e > t ? e: t > i ? i: t,
                s
            };
            return function(i) {
                this.onNumChange = i.onNumChange || e,
                this.onOverLimit = i.onOverLimit || e,
                this.limitNum = parseInt(i.limitNum),
                this.minimalNum = parseInt(i.minimalNum),
                this.minimalNum = 0 == this.minimalNum ? 0 : this.minimalNum || 1,
                this.onBelowLeast = i.onBelowLeast || e,
                this.disabled = i.disabled,
                this.num = t.call(this, i.num, this.limitNum, this.minimalNum),
                this.readonly = i.readonly
            }
        } (),
        events: {
            "click .response-area-minus": "onSubClicked",
            "click .response-area-plus": "onAddClicked",
            "click .txtCover": "txtFocus",
            "blur .txt": "txtBlur"
        },
        txtFocus: function(t) {
            if (!this.disabled) {
                var e = this.$el.find(".txt");
                e.focus(),
                i && (i.isIOS() && i.getIOSVersion() < 8 && (e.blur(), e.focus()), $(t.target).css("display", "none"))
            }
        },
        txtBlur: function() {
            this.$el.find(".txtCover").css("display", "block"),
            this.refreshNum()
        },
        onSubClicked: function() {
            this.changeNum(this.num - 1)
        },
        onAddClicked: function() {
            this.changeNum(this.num + 1)
        },
        changeNum: function(t) {
            if (!this.readonly && !this.disabled) {
                if (t > this.limitNum) return void this.onOverLimit(t, this.limitNum);
                if (t < this.minimalNum) return this.onBelowLeast(t, this.minimalNum),
                void(t = this.minimalNum);
                this.updateBtnStatus(t),
                this.updateNum(t)
            }
        },
        updateBtnStatus: function() {
            var t = function(t) {
                t.addClass("disabled"),
                t.attr("disabled", "true")
            },
            i = function(t) {
                t.removeClass("disabled"),
                t.removeAttr("disabled")
            };
            return function(e) {
                e > this.minimalNum ? i(this.nMinus) : t(this.nMinus),
                this.limitNum > 0 && e >= this.limitNum ? t(this.nPlus) : i(this.nPlus)
            }
        } (),
        updateNum: function(t) {
            this.disabled || (this.num = +t, this.$("input").val(this.num), this.onNumChange(this.num))
        },
        refreshNum: function() {
            var t = parseInt(this.$("input").val());
            this.num !== t && (t > 0 ? this.num = this.limitNum > 0 && t > this.limitNum ? this.limitNum: t: (this.num = this.minimalNum, this.updateNum(this.num)), this.changeNum(this.num))
        },
        setLimitNum: function(t) {
            this.disabled || 1 > t || (this.limitNum = +t, this.limitNum < this.num && this.changeNum(this.limitNum))
        },
        setMinimalNum: function(t) {
            this.disabled || 1 > t || (this.minimalNum = +t, this.num < this.minimalNum && this.changeNum(this.minimalNum))
        },
        validateNum: function() {
            var t = parseInt(this.$("input").val());
            return this.$("input").val(t),
            t > this.limitNum || 0 === this.limitNum ? (this.onOverLimit(t, this.limitNum), !1) : t < this.minimalNum ? (this.onBelowLeast(t, this.minimalNum), !1) : !0
        },
        getNum: function() {
            return this.validateNum() ? (this.refreshNum(), this.num) : null
        },
        render: function() {
            return this.$el.html(this.template({
                data: {
                    num: this.num,
                    readonly: this.readonly
                }
            })),
            this.nMinus = this.$(".minus"),
            this.nPlus = this.$(".plus"),
            this.updateBtnStatus(this.num),
            this
        }
    });
    return s
}),
define("wap/components/uploader/photo_uploader", [],
function() {
    var t = function() {},
    i = function() {
        if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) return ! 1;
        var t = document.createElement("input");
        return t.type = "file",
        !t.disabled
    },
    e = Backbone.View.extend({
        initialize: function(i) {
            this.nInput = this.$("input"),
            this.nUploader = this.$("button"),
            this.onValidUpload = i.onValidUpload ||
            function() {
                return ! 0
            },
            this.onStartReadFile = i.onStartReadFile || t,
            this.onFinishReadFile = i.onFinishReadFile || t,
            this.onBeforeUpload = i.onBeforeUpload || t,
            this.onUploadSuccess = i.onUploadSuccess || t,
            this.onUploadError = i.onUploadError || t
        },
        events: {
            "click input": "onInputClicked",
            "change input": "onFileChanged"
        },
        render: function() {
            i() || this.nUploader.css("padding-left", "10px").html("您的浏览器不支持图片上传").attr("disabled", "disabled")
        },
        onInputClicked: function() {},
        onFileChanged: function(t) {
            var i = this,
            e = t.target.files;
            _.map(e,
            function(t) {
                if (i.onValidUpload({
                    file: t
                })) {
                    i.onStartReadFile({
                        file: t
                    });
                    var e = new FileReader;
                    e.onload = function(e) {
                        i.onFinishReadFile({
                            src: e.target.result,
                            file: t
                        })
                    },
                    e.readAsDataURL(t),
                    i.doUploadPhoto(t)
                }
            })
        },     
        doUploadPhoto: function(t) {
            var i = this,
            e = new FormData;          
            e.append("file", t);
            var s = t.name.split("."),
            n = "";
            s.length > 1 && (n = "." + s[s.length - 1]),
            e.append("x:ext", n),
            $.ajax({
                url: upload_message_file,
                type: "post",
                data: e,
                dataType: "json",
                processData: !1,
                contentType: !1,
                beforeSend: function() {
                    i.onBeforeUpload({
                        file: t
                    }),
                    i.nInput.data("uploaded", "false")
                },
                success: function(e) {
                    i.onUploadSuccess({
                        url: e.info,
                        file: t
                    }),
                    i.nInput.data("value", e.info),
                    i.nInput.data("uploaded", "true")
                },
                error: function(e, s, n) {
                    i.onUploadError({
                        file: t
                    })
                },
                complete: function(t, i) {}
            })
        }
    });
    return e
}),
window.Utils = window.Utils || {},
$.extend(window.Utils, {
    validMobile: function(t) {
        return t = "" + t,
        /^((\+86)|(86))?(1)\d{10}$/.test(t)
    },
    validPhone: function(t) {
        return t = "" + t,
        /^0[0-9\-]{10,13}$/.test(t)
    },
    validNumber: function(t) {
        return /^\d+$/.test(t)
    },
    validEmail: function(t) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
    },
    validPostalCode: function(t) {
        return t = "" + t,
        /^\d{6}$/.test(t)
    }
}),
define("wap/components/util/valid",
function() {}),
define("text!wap/showcase/sku/templates/message.html", [],
function() {
    return '<% if(messages.length !== 0) {%>\n    <div class=\'sku-message\'>\n        <% for (var j = 0, len = messages.length; j < len; j++) { %>\n        <dl class="clearfix">\n            <dt class="pull-left">\n                <label for="ipt-<%=j %>"><% if (messages[j].required == \'1\') { %><sup class="required">*</sup><% } %><%=messages[j].name %></label>    \n            </dt>\n            <dd class="comment-wrapper clearfix">\n                <% if (messages[j].multiple == \'0\') { %>\n                    <% if (messages[j].type == \'image\') { %>\n                        <input data-valid-type="<%=messages[j].type %>" <% if (messages[j].required == \'1\') { %>required<% } %> tabindex="<%=j + 1 %>" id="ipt-<%=j %>" name="message_<%=j %>" type="file" capture="camera" accept="image/*" class="js-message photo-input" >\n                        <button class="btn btn-white image-input-trigger pull-right">拍照&nbsp;或&nbsp;选择相片</button>\n                        <div class=\'image-input-show clearfix\'>\n                            <img class="hide" width=50 height=50 />\n                        </div>\n                    <% }else { %>\n                        <input data-valid-type="<%=messages[j].type %>" <% if (messages[j].required == \'1\') { %>required<% } %> tabindex="<%=j + 1 %>" id="ipt-<%=j %>" name="message_<%=j %>" type="<%=messages[j].type %>" class="txt js-message font-size-14" />\n                    <% } %>\n                <% } else { %>\n                <textarea data-valid-type="<%=messages[j].type %>" <% if (messages[j].required == \'1\') { %>required<% } %> tabindex="<%=j + 1 %>" id="ipt-<%=j %>" name="message_<%=j %>" cols="32" rows="1" class="txta js-message font-size-14"></textarea>\n                <% } %>\n                <% if (messages[j].type != \'image\' && (isIOS || (messages[j].type != \'date\' && messages[j].type != \'time\'))) { %>\n                    <div class=\'txtCover\'></div>\n                <% } %>\n            </dd>\n        </dl>\n        <% } %>\n    </div>\n<% } %>'
}),
define("wap/showcase/sku/views/message", ["wap/components/uploader/photo_uploader", "wap/components/util/valid", "text!wap/showcase/sku/templates/message.html"],
function(t, i, e) {
    var s = window.zenjs.UA,
    n = s && s.isIOS(),
    o = Backbone.View.extend({
        template: _.template(e),
        initialize: function() {
            this.messages = this.options.messages || []
        },
        events: {
            "click .txtCover": "txtFocus",
            "blur .txt,.txta": "txtBlur"
        },
        txtFocus: function(t) {
            var i = $(t.target),
            e = i.parent().find(".txt,.txta");
            e.focus(),
            n && s.getIOSVersion() < 8 && (e.blur(), e.focus()),
            i.parent().find(".txta").attr("rows", "2"),
            i.css("display", "none")
        },
        txtBlur: function(t) {
            var i = $(t.target);
            i.parent().find(".txtCover").css("display", "block"),
            i.hasClass("txta") && i.attr("rows", "1")
        },
        render: function() {
            this.$el.html(this.template({
                messages: this.messages,
                isIOS: n
            })),
            0 === this.messages.length && this.$el.hide();
            var i = this.$(".photo-input");
            return this.photoUploaders = [],
            i.each(_(function(i, e) {
                var s = $(e).parent(),
                n = s.find("img"),
                o = s.find("button"),
                a = new t({
                    el: s,
                    onFinishReadFile: function(t) {
                        n.removeClass("hide").attr("src", t.src)
                    },
                    onBeforeUpload: function() {
                        o.html("正在上传...")
                    },
                    onUploadSuccess: function(t) {
                        n.removeClass("hide").attr("src", t.url),
                        o.html("修改")
                    },
                    onUploadError: function() {
                        o.html("重新上传")
                    }
                }).render();
                this.photoUploaders.push(a)
            }).bind(this)),
            n || this.$el.find("input[type=date], input[type=time]").on("mouseover mousedown touchstart touchmove touchend touchcancel",
            function(t) {
                t.stopPropagation()
            }),
            this
        },
        validate: function(t) {
            for (var i, e, s, n, o = this,
            a = this.messages,
            l = 0,
            u = a.length; u > l; l++) if (i = "message_" + l, e = t[i], s = a[l], _.isEmpty(e)) {
                if ("1" == s.required) return o.$el.find("#ipt-" + l).focus(),
                motify.log("image" == s.type ? "请上传 " + s.name + "。": "请填写 " + s.name + "。"),
                !1
            } else {
                if ("image" == s.type && (n = o.$el.find("#ipt-" + l).data("uploaded"), "false" == n || !n)) return motify.log("图片还在上传中，请稍等。。"),
                !1;
                if ("tel" == s.type && !Utils.validNumber(e)) return o.$el.find("#ipt-" + l).focus(),
                motify.log("请填写正确的" + s.name + "。"),
                !1;
                if ("email" == s.type && !Utils.validEmail(e)) return o.$el.find("#ipt-" + l).focus(),
                motify.log("请填写正确的" + s.name + "。"),
                !1
            }
            return ! 0
        },
        getData: function() {
            var t = {};
            return this.$("dl .js-message").each(function(i, e) {
                if ("file" == e.type) var s = $(e).data("value");
                t[e.name] = s || e.value || ""
            }),
            this.validate(t) ? t: null
        }
    });
    return o
}),
define("components/zenjs/backbone/base_view", ["components/zenjs/core/trigger_method"],
function(t) {
    return Backbone.View.extend({
        clean: function() {
            return this.stopListening(),
            this
        },
        triggerMethod: t
    })
}),
define("components/zenjs/list/list", ["components/zenjs/backbone/base_view"],
function(t) {
    var i = function() {};
    return t.extend({
        initialize: function(t) {
            return this.options = t = t || {},
            this.items = [],
            this.itemView = t.itemView,
            this.itemOptions = t.itemOptions || {},
            this.collection = t.collection,
            this.onAfterListChange = t.onAfterListChange || i,
            this.onAfterListLoad = t.onAfterListLoad || i,
            this.onAfterListDisplay = t.onAfterListDisplay || i,
            this.onListEmpty = t.onListEmpty || t.onEmptyList,
            this.onItemClick = t.onItemClick || i,
            this.onViewItemAdded = t.onViewItemAdded || i,
            this.displaySize = t.displaySize || -1,
            this.emptyHTML = t.emptyHTML || "",
            this.emptyText = t.emptyText || "列表为空",
            this._setupListeners(),
            this.on("list:empty", _(this._onListEmpty).bind(this)),
            this
        },
        render: function(t) {
            return this.displaySize = -1 == (t || {}).displaySize ? -1 : this.displaySize,
            this.clean(),
            this._setupListeners(),
            this.addAll(),
            this.onAfterListDisplay({
                list: this.collection
            }),
            this
        },
        fetchRender: function(t) {
            return this.collection.fetch({
                data: t,
                success: _(function(t, i) {
                    this.render(),
                    this.onAfterListLoad(this.collection, i),
                    this.onFetchSuccess && this.onFetchSuccess()
                }).bind(this)
            }),
            this
        },
        _setupListeners: function() {
            this.collection && (this.listenTo(this.collection, "add", this.addItem, this), this.listenTo(this.collection, "reset sort", this.render, this), this.listenTo(this.collection, "remove", this.onItemRemoved, this))
        },
        addItemListeners: function(t) {
            var i = this;
            this.listenTo(t, "all",
            function() {
                var i = "item:" + arguments[0],
                e = _.toArray(arguments);
                e.splice(0, 1),
                e.unshift(i, t),
                this.trigger.apply(this, e),
                "item:click" == i && this.onItemClick()
            }),
            this.listenTo(t.model, "change",
            function() {
                i.onAfterListChange({
                    list: this.collection
                })
            })
        },
        addAll: function() {
            0 === this.collection.length ? this.fetching || this.triggerMethod("list:empty") : this.collection.each(function(t) {
                this.addItem(t)
            },
            this)
        },
        removeAll: function() {
            this.collection && this.collection.each(function(t) {
                this.removeItem(t)
            },
            this),
            this.onAfterListChange({
                list: this.collection
            })
        },
        addItem: function(t) {
            if (! (this.displaySize >= 0 && this.items.length >= this.displaySize)) {
                1 == this.collection.length && (this.listEl || this.$el).html("");
                var i = new this.itemView(_.extend({},
                this.options.itemOptions, {
                    model: t,
                    index: this.collection.indexOf(t)
                }));
                return this.items.push(i),
                this.addItemListeners(i),
                i.render(),
                this.onViewItemAdded({
                    list: this.items,
                    viewItem: i
                }),
                (this.listEl || this.$el).append(i.el),
                i
            }
        },
        removeItem: function(t) {
            var i = this.getViewByModel(t);
            i && this.removeView(i)
        },
        removeView: function(t) {
            var i;
            this.stopListening(t),
            t && (this.stopListening(t.model), t.remove(), i = this.items.indexOf(t), this.items.splice(i, 1)),
            0 === this.collection.length && (this.fetching || this.triggerMethod("list:empty"))
        },
        onItemRemoved: function(t) {
            this.removeItem(t),
            this.onAfterListChange()
        },
        getViewByModel: function(t) {
            return _.find(this.items,
            function(i) {
                return i.model === t
            })
        },
        dispatchEventToAllViews: function(t, i) {
            for (var e = this.items.length - 1; e >= 0; e--) this.items[e].trigger(t, i)
        },
        remove: function() {
            t.prototype.remove.call(this, arguments),
            this.removeAll()
        },
        clean: function() {
            t.prototype.clean.call(this, arguments),
            this.removeAll(),
            (this.listEl || this.$el).html(""),
            this.stopListening(this.collection)
        },
        _onListEmpty: function() {
            this.$el.html(this.emptyHTML || (this.emptyText ? '<p style="text-align:center;line-height:60px;">' + this.emptyText + "</p>": ""))
        }
    })
}),
define("text!wap/showcase/sku/templates/skuList.html", [],
function() {
    return '<dt class="model-title sku-sel-title">\n    <label><%= skuCollection.k %>：</label>\n</dt>\n<dd>\n    <ul class="model-list sku-sel-list"></ul>\n</dd>'
}),
define("wap/showcase/sku/views/sku_list", ["components/zenjs/list/list", "text!wap/showcase/sku/templates/skuList.html"],
function(t, i) {
    var e = Backbone.View.extend({
        tagName: "li",
        className: "tag sku-tag pull-left ellipsis",
        template: _.template("<%= data.name %>"),
        initialize: function(t) {
            this.onItemClick = t.onItemClick ||
            function() {},
            this.listenTo(this, "active", this.onActive),
            this.listenTo(this, "enable", this.enableView),
            this.listenTo(this, "disable", this.disableView)
        },
        events: {
            click: "onClick"
        },
        onClick: function() {
            return this.$el.hasClass("unavailable") ? !1 : (this.toggle(), void this.onItemClick({
                v_id: this.model.id
            }))
        },
        onActive: function(t) {
            t.v_id !== this.model.id && this.deActive()
        },
        toggle: function() {
            this.$el.toggleClass("tag-orangef60"),
            this.$el.toggleClass("active"),
            this.isActived = !this.isActived
        },
        active: function() {
            this.$el.addClass("tag-orangef60"),
            this.$el.addClass("active"),
            this.isActived = !0
        },
        deActive: function() {
            this.$el.removeClass("tag-orangef60"),
            this.$el.removeClass("active"),
            this.isActived = !1
        },
        disableView: function(t) {
            parseInt(this.model.get("id")) == parseInt(t.value) && (this.$el.addClass("unavailable"), this.enabled = !1)
        },
        enableView: function(t) { ! t || "all" !== t.value && parseInt(t.value) !== parseInt(this.model.get("id")) || (this.$el.removeClass("unavailable"), this.enabled = !0)
        },
        isEnabled: function() {
            return this.enabled
        },
        render: function() {
            return this.$el.html(this.template(_.extend({
                data: this.model.toJSON()
            },
            {}))),
            this.enabled = !0,
            this
        }
    }),
    s = Backbone.View.extend({
        tagName: "dl",
        className: "clearfix block-item",
        template: _.template(i),
        initialize: function(t) {
            this.skuCollection = t.skuCollection,
            this.onSkuActived = t.onSkuActived ||
            function() {}
        },
        onItemClick: function(t) {
            this.skuListView.dispatchEventToAllViews("active", t),
            this.onSkuActived(this.getActivedSku())
        },
        getActivedSku: function() {
            var t = this.skuListView.items,
            i = _.find(t, _(function(t) {
                return t.isActived
            }).bind(this));
            return i ? {
                k_id: this.skuCollection.k_id,
                k_s: this.skuCollection.k_s,
                v_id: i.model.id
            }: null
        },
        activeFirstSku: function() {
            if (this.skuListView.items) for (var t in this.skuListView.items) {
                var i = this.skuListView.items[t];
                if (i.isEnabled()) return void i.onClick()
            }
        },
        disableSkuItem: function(t) {
            this.skuListView.dispatchEventToAllViews("disable", {
                value: t
            })
        },
        enableSkuItem: function(t) {
            this.skuListView.dispatchEventToAllViews("enable", {
                value: t
            })
        },
        enalbeAllSkuItem: function() {
            this.skuListView.dispatchEventToAllViews("enable", {
                value: "all"
            })
        },
        render: function() {
            return this.$el.html(this.template({
                skuCollection: this.skuCollection
            })),
            this.skuListView = new t({
                collection: this.skuCollection,
                el: this.$(".model-list"),
                itemView: e,
                itemOptions: {
                    onItemClick: _(this.onItemClick).bind(this)
                }
            }).render(),
            this
        }
    });
    return s
}),
define("wap/showcase/sku/views/sku_brain", [],
function() {
    var t = Backbone.View.extend({
        initialize: function(t) {
            this.collection = t.collection,
            Backbone.EventCenter.on("active", _(this.onSkuActived).bind(this))
        },
        onSkuActived: function(t) {
            var i = t.activedSkus,
            e = (t.clickedSku, ["s1", "s2", "s3"]);
            _.each(e, _(function(t) {
                var s = _.filter(i,
                function(i) {
                    return i.k_s !== t
                }),
                n = this.collection.filter(function(t) {
                    for (var i in s) {
                        var e = s[i];
                        if (t.get(e.k_s) !== e.v_id) return ! 1
                    }
                    return ! 0
                }),
                o = {};
                _.each(n,
                function(t) {
                    for (var i in e) {
                        var s = e[i],
                        n = t.get(s);
                        if (0 === parseInt(n)) return;
                        o[n] ? o[n].totalStock += parseInt(t.get("stock_num")) : o[n] = {
                            totalStock: parseInt(t.get("stock_num")),
                            k_s: s
                        }
                    }
                });
                for (var a in o) o[a].totalStock ? this.trigger("sku-comb:hasstock", {
                    v_id: a,
                    k_s: o[a].k_s
                }) : this.trigger("sku-comb:nostock", {
                    v_id: a,
                    k_s: o[a].k_s
                })
            }).bind(this))
        }
    });
    return t
}),
define("wap/showcase/sku/model", [],
function(t, i) {
    var e, i = {};
    return i.SkuModel = e = Backbone.Model,
    i.SkuCollection = Backbone.Collection.extend({
        model: e
    }),
    i.SkuStockModel = Backbone.Model,
    i.SkuStockCollection = Backbone.Collection,
    i
}),
define("wap/showcase/sku/views/sku_selector", ["./sku_list", "./sku_brain", "../model"],
function(t, i, e) {
    var s = e.SkuStockCollection,
    n = e.SkuCollection,
    o = Backbone.View.extend({
        initialize: function(t) {
            var i = this;
            this.skuCollectionArray = [],
            this.sku = (t || {}).sku,
            i.sku.none_sku ? this.selectedSkuComb = {
                id: i.sku.collection_id,
                get: function(t) {
                    return "price" === t ? i.sku.collection_price || "": void 0
                }
            }: _.each(this.sku.tree, _(function(t) {
                var i = new n(t.v);
                i.count = t.count,
                i.k = t.k,
                i.k_id = t.k_id,
                i.k_s = t.k_s,
                this.skuCollectionArray.push(i)
            }).bind(this)),
            this.skuStockCollection = new s(this.sku.list),
            Backbone.EventCenter.on("enable", _(this.enalbeAllSkuItem).bind(this))
        },
        events: {},
        onSkuActived: function(t) {
            var i = [];
            _.each(this.skuListViews,
            function(t) {
                var e = t.getActivedSku();
                e && i.push(e)
            }),
            this.selectedSkuComb = this.getSelectedSkuComb(i),
            Backbone.EventCenter.trigger("sku:selected", {
                skuComb: this.selectedSkuComb
            }),
            Backbone.EventCenter.trigger("active", {
                activedSkus: i,
                clickedSku: t
            })
        },
        getSelectedSkuComb: function(t) {
            this.activedSkus = t;
            var i = {},
            e = null;
            return _.each(t,
            function(t) {
                i[t.k_s] = t.v_id
            }),
            t.length === _.size(this.skuListViews) && (e = this.skuStockCollection.find(function(t) {
                for (var e in i) if (t.get(e) !== i[e]) return ! 1;
                return ! 0
            })),
            e
        },
        diableSkuItem: function(t) {
            this.skuListViews[t.k_s].disableSkuItem(t.v_id)
        },
        enableSkuItem: function(t) {
            this.skuListViews[t.k_s].enableSkuItem(t.v_id)
        },
        enalbeAllSkuItem: function(t) { !! this.skuListViews[t.k_s] && this.skuListViews[t.k_s].enalbeAllSkuItem()
        },
        autoSelect: function() {
            this.skuListViews && _.each(this.skuListViews,
            function(t) {
                1 === t.skuCollection.length && t.activeFirstSku()
            })
        },
        getSelectedSku: function() {
            var t = _.pluck(this.sku.tree, "k_id"),
            i = this.sku,
            e = [];
            return this.selectedSkuComb ? {
                status: !0,
                sku: this.selectedSkuComb
            }: (_.each(this.activedSkus,
            function(i) {
                t = _.without(t, "" + i.k_id)
            }), _.each(t,
            function(t) {
                e.push(_.find(i.tree,
                function(i) {
                    return i.k_id === t
                }).k)
            }), {
                status: !1,
                errMsg: e.join(" 和 ")
            })
        },
        render: function() {
            return this.skuListViews = {},
            _.each(this.skuCollectionArray, _(function(i) {
                var e = new t({
                    skuCollection: i,
                    onSkuActived: _(this.onSkuActived).bind(this)
                });
                this.$el.append(e.render().el),
                this.skuListViews[i.k_s] = e
            }).bind(this)),
            this.skuBrain = new i({
                collection: this.skuStockCollection
            }),
            this.listenTo(this.skuBrain, "sku-comb:nostock", _(this.diableSkuItem).bind(this)),
            this.listenTo(this.skuBrain, "sku-comb:hasstock", _(this.enableSkuItem).bind(this)),
            this
        },
        clear: function() {
            return this.stopListening(),
            Backbone.EventCenter.off("enable"),
            this.remove(),
            null
        }
    });
    return o
}),
define("text!wap/showcase/sku/templates/stock.html", [],
function() {
    return '<dt class="model-title stock-label pull-left">\n    <label>剩余: </label>\n</dt>\n<dd class="stock-num">\n    <%= data.stock %>\n</dd>'
}),
define("wap/showcase/sku/views/sku_stock", ["text!wap/showcase/sku/templates/stock.html"],
function(t) {
    var i = Backbone.View.extend({
        template: _.template(t),
        initialize: function(t) {
            this.hide_stock = t.hide_stock
        },
        events: {},
        onClick: function() {},
        render: function(t) {
            return this.stock = this.stock || t.stock,
            !this.hide_stock && this.stock && this.$el.html(this.template({
                data: {
                    stock: this.stock
                }
            })),
            this
        },
        setNum: function(t) {
            this.stock = t,
            this.render({})
        }
    });
    return i
}),
define("text!wap/showcase/sku/templates/title.html", [],
function() {
    return "<% if (goods_info['picture'].length > 0){ %>\n    <div class=\"thumb\"><img src=\"<%=goods_info['picture'][0] %>\" alt=\"\"></div>\n<% } %>\n<div class=\"detail goods-base-info clearfix\">\n    <p class=\"title c-black ellipsis\"><%=goods_info['title'] %></p>\n    <div class=\"goods-price clearfix\">\n    <% if(activity){ %>\n        <div class=\"current-price pull-left c-black activity-price\">\n            <span class='price-name pull-left font-size-14 c-orange'>￥</span><i class=\"js-goods-price price font-size-18 vertical-middle c-orange\"><%=activity['price'] %></i>\n            <span class=\"price-tag vertical-middle font-size-12\"><%=activity['price_title'] %></span>\n        </div>\n        <em class=\"old-price vertical-middle font-size-14 line-through\">价格：<%=sku['old_price'] && sku['old_price'] != '0.00' && sku['old_price'] != 0.00 ? sku['old_price'] : goods_info['price'] %></em>\n    <% }else{ %>\n        <div class=\"current-price pull-left c-black\">\n            <span class='price-name pull-left font-size-14 c-orange'>￥</span><i class=\"js-goods-price price font-size-18 vertical-middle c-orange\"><%=sku['price'] && sku['price'] != '0.00' && sku['price'] != 0.00 ? sku['price'] : goods_info['price'] %></i>\n        </div>\n    <% } %>\n    <% if(goods_info['origin'] && goods_info['origin'] !== '淘价：'){ %>\n        <div class=\"original-price vertical-middle font-size-14 line-through\"><%=goods_info['origin'] %></div>\n    <% } %>\n    </div>\n</div>\n<div class=\"js-cancel sku-cancel\">\n    <div class=\"cancel-img\"></div>\n</div>\n"
}),
define("wap/showcase/sku/views/sku_title", ["text!wap/showcase/sku/templates/title.html"],
function(t) {
    var i = Backbone.View.extend({
        initialize: function(t) {
            this.difTitle = (t || {}).difTitle
        },
        template: _.template(t),
        changePrice: function(t) {
            this.price = t,
            this.$(".js-goods-price").html((t / 1).toFixed(2))
        },
        changeThumb: function(t) {
            this.sku_img = t,
            this.$(".thumb img").attr('src',t);
        },
        getPrice: function() {
            return this.price
        },
        resetPrice: function() {
            this.$(".js-goods-price").html(this.priceScope)
        },
        render: function(t) {
            return this.difTitle && this.$el.html(this.template(t)),
            this.priceScope = this.$el.find(".js-goods-price").text(),
            this
        }
    });
    return i
}),
window.Utils = window.Utils || {},
$.extend(window.Utils, {
    needConfirm: function(t, i, e) {
        var s = window.confirm(t);
        s ? i && "function" == typeof i && i.apply() : e && "function" == typeof e && e.apply()
    }
}),
define("wap/components/util/confirm",
function() {}),
define("text!wap/showcase/sku/templates/buyBtn.html", [],
function() {
    return '<% if(!isMultiBtn) {%>\n    <a href="javascript:;" class="js-confirm-it btn btn-block btn-orange-dark">下一步</a>\n<% } else { \n    if(!isCartBtnHide) {%>\n        <a href="javascript:;" class="js-mutiBtn-confirm confirm btn btn-block btn-orange-dark half-button">立即购买</a>\n        <a href="javascript:;" class="js-mutiBtn-confirm cart btn btn-block btn-orange-dark half-button">加入购物车</a>\n    <% } else {%>\n        <a href="javascript:;" class="js-mutiBtn-confirm confirm btn btn-block btn-orange-dark">下一步</a> \n    <%}\n}%>'
}),
require(["components/zenjs/backbone/quantity", "wap/showcase/sku/views/message", "wap/showcase/sku/views/sku_selector", "wap/showcase/sku/views/sku_stock", "wap/showcase/sku/views/sku_title", "wap/components/util/confirm", "components/zenjs/util/args", "text!wap/showcase/sku/templates/buyBtn.html"],
function(t, i, e, s, n, o, a, l) {
    var u = function() {};
    Backbone.EventCenter = _.extend({},
    Backbone.Events);
    var c = Backbone.View.extend({
        initialize: function(t) {
            t = t || {},
            this.skuViewConfig = _.extend({
                bottom: 0,
                left: 0,
                right: 0,
                top: 40
            },
            t.skuViewConfig || {}),
            this.baseUrl = t.baseUrl,
            this.need_ajax_login = t.need_ajax_login || !1,
            this.wxpay_env = t.wxpay_env,
            this.isCartBtnHide = t.isCartBtnHide,
            this.quantityReadOnly = t.quantityReadOnly,
            this.isPriceCanChanged = !0,
            this.onAddSuccess = t.onAddSuccess || u,
            this.kdt_id = window._global.kdt_id,
            this.onHide = t.onHide ||
            function() {},
            this.viewTop = this.skuViewConfig.top,
            delete this.skuViewConfig.top,
            this.deviceView = {
                width: $(document).width(),
                height: $(document).height()
            },
            this.bodyPos = $("html").css("position"),
            this.nActionBtnTemplate = _.template(l),
            this.nPrice = this.$(".js-goods-price"),
            Backbone.EventCenter = _.extend({},
            Backbone.Events),
            Backbone.EventCenter.on("sku:selected", _(this.onSelectChange).bind(this))
        },
        render: function(o) {
            o = o || {},
            this.sku = o.sku || {},
            this.goods_id = o.goods_id,
            this.postage = o.postage,
            this.activity = o.activity,
            this.activity_alias = o.activity_alias || "",
            this.activity_id = o.activity_id || 0,
            this.activity_type = o.activity_type || 0,
            this.quota = o.quota,
            this.quota_used = o.quota_used,
            this.stockNum = o.stock || this.sku.stock_num,
            this.difTitle = o.difTitle,
            this.isGift = o.isGift,
            this.isAddCart = o.isAddCart,
            this.isAddWish = o.isAddWish,
            this.isMultiBtn = o.isMultiBtn || !1,
            this.onAfterHideFunc = o.onAfterHideFunc ||
            function() {},
            this.goods_info = o.goods_info || {
                title: "",
                picture: [],
                price: "",
                origin: ""
            },
            this.$el.append($("#tmpl-sku").html());
            var a = this.$(".layout-title");
            this.skuTitleView = new n({
                difTitle: this.difTitle,
                el: a
            }).render({
                goods_info: this.goods_info,
                activity: this.activity,
                sku: this.sku
            }),
            this.$(".js-sku-views").empty();
            var l = this.$(".js-sku-views");
            if (this.skuSelectorView = new e({
                sku: this.sku
            }).render(), l.append(this.skuSelectorView.$el.children()), !this.isAddWish) {
                var u = this.quantityLimit = this.getLimitNum(this.quota, this.quota_used, this.stockNum),
                c = $('<dl class="clearfix block-item"><dt class="model-title sku-num pull-left">                    <label>数量</label></dt><dd></dd></dl>');
                this.quantityView = new t({
                    readonly: this.quantityReadOnly,
                    num: 1,
                    tagName: "dl",
                    className: "clearfix",
                    limitNum: +u.limitNum,
                    minimalNum: this.isAddWish ? 0 : 1,
                    onOverLimit: _(function() {
                        var t = this.quota_used > 0 ? "<br>您之前已经购买过" + this.quota_used + "件": "";
                        return "quota" === u.limitType ? void motify.log("该商品每人限购" + this.quota + "件" + t) : "stock" === u.limitType ? void motify.log("就这么几件啦～") : void 0
                    }).bind(this),
                    onNumChange: _(function() {
                        var t;
                        return _(function(i) {
                            this.isAddWish && (0 === i ? t ? t.show() : (t = $('<div class="c-red text-right">0表示不限制赠送数量</div>'), this.quantityView.$el.parent().append(t)) : t.hide())
                        }).bind(this)
                    }).bind(this)()
                }).render(),
                l.append(c),
                this.quantityView.$el.appendTo(c.find("dd")),
                this.stockView = new s({
                    el: $('<div class="stock pull-right font-size-12"></div>'),
                    hide_stock: this.sku.hide_stock
                }).render({
                    stock: this.stockNum
                }),
                this.quantityView.$el.append(this.stockView.$el)
            }
            if (this.messageView = new i({
                messages: this.sku.messages,
                className: "block-item block-item-messages"
            }), l.append(this.messageView.render().el), this.$(".confirm-action").html(this.nActionBtnTemplate({
                isMultiBtn: this.isMultiBtn,
                isCartBtnHide: this.isCartBtnHide
            })), this.nConfirmBtn = this.$(0 === this.$(".js-confirm-it").length ? ".js-mutiBtn-confirm.confirm": ".js-confirm-it"), u && 0 === u.limitNum && this.nConfirmBtn.attr("disabled", !0), this.isMultiBtn) this.nConfirmBtn.data("text", "立即购买");
            else {
                var r = this.isAddCart ? "加入购物车": "下一步";
                this.nConfirmBtn.text(r),
                this.nConfirmBtn.data("text", r)
            }
            return this.$el.css(this.skuViewConfig),
            this.skuSelectorView.autoSelect(),
            !this.isAddWish || this.sku.messages && 0 !== this.sku.messages.length || !this.sku.none_sku || l.hide(),
            this
        },
        events: {
            "click .js-confirm-it": "doConfirmClicked",
            "click .js-cancel": "onCancelClicked",
            "click .js-mutiBtn-confirm": "onMultiBtnClick"
        },
        onSelectChange: function(t) {
            var i = t.skuComb,          
            e = this.stockNum;          
            i ? (this.quantityView, e = parseInt(i.get("stock_num")), this.stockView && this.stockView.setNum(e), this.setPrice(i.get("price")),this.setThumb(i.get("sku_img"))) : (this.stockView && this.stockView.setNum(this.stockNum), this.skuTitleView.resetPrice()),
            this.quantityView && (this.quantityLimit = this.getLimitNum(this.quota, this.quota_used, e), this.quantityView.setLimitNum(this.quantityLimit.limitNum)),
            this.height(),
            this.$el.height(this.skuViewHeight)
        },
        setPrice: function(t) {
            this.isPriceCanChanged && this.skuTitleView.changePrice(t)
        },
        setThumb: function(t) {           
             this.isPriceCanChanged && this.skuTitleView.changeThumb(t?t:this.goods_info.picture[0])
        },
        disablePriceChange: function() {
            this.isPriceCanChanged = !1
        },
        onMultiBtnClick: function(t) {
            t = t || window.event;
            var i = t.target || t.srcElement;
            this.isAddCart = $(i).hasClass("cart"),
            this.doConfirmClicked(t)
        },
        doConfirmClicked: function(t) {
            function i() {
                s.doSubmit({
                    buyType: n,
                    needLogin: "buy" === n
                })
            }
            var e = $(t.target);
            if (!e.attr("disabled")) {
                var s = this,
                n = this.getBuyType();
                t ? Logger && Logger.log({
                    fm: "click",
                    title: this.isAddCart ? "加入购物车": "立即购买"
                }).then(i,
                function() {
                    motify.log("亲，请稍等。")
                }) : i()
            }
        },
        doSubmit: function() {
            var t, i = function(t) {
                var i = this,
                e = this.baseUrl;
                $.ajax({
                    url: dec_buy_url,
                    type: "POST",
                    dataType: "json",
                    cache: !1,
                    timeout: 15e3,
                    data: t,
                    beforeSend: function() {
                        i.ajaxing = !0,
                        i.nConfirmBtn.html("提交中..."),
                        i.doDisabled(i.nConfirmBtn, !0)
                    },
                    success: function(e) {
                        i.ajaxing = !1,
                        i.submitSuccess(e, t)
                    },
                    error: function() {
                        i.ajaxing = !1,
                        i.submitError("buy")
                    }
                })
            },
            e = function(t) {
                var i = this,
                e = this.baseUrl;                
                $.ajax({
                    url: add_cart_url,
                    type: "POST",
                    dataType: "json",
                    cache: !1,
                    timeout: 15e3,
                    data: t,
                    beforeSend: function() {
                        i.ajaxing = !0
                    },
                    success: function(e) {
                        1 == +e.status ? (motify.log("已成功添加到购物车"),$('#global-cart,.js-show-more-btn').addClass('new'), i.onAddSuccess({
                            wish: !1,
                            cart: !0,
                            buy: !1
                        },
                        t), window.eventHandler, i.onHide()) : motify.log(e.msg)
                    },
                    error: function() {
                        i.ajaxing = !1,
                        i.submitError("add-cart")
                    },
                    complete: function() {
                        i.ajaxing = !1
                    }
                })
            },
            s = function(t) {
                var i = this;
                $.ajax({
                    url: addCollect,
                    type: "POST",
                    dataType: "json",
                    cache: !1,
                    timeout: 15e3,
                    data: {
                        'goods': t
                    },
                    beforeSend: function() {
                        i.ajaxing = !0,
                        i.nConfirmBtn.html("提交中..."),
                        i.doDisabled(i.nConfirmBtn, !0)
                    },
                    success: function(e) {
                        i.ajaxing = !1,
                        i.submitSuccess(e, t)
                    },
                    error: function() {
                        i.ajaxing = !1,
                        i.submitError("add-wish")
                    }
                })
            },
            n = {
                "add-cart": e,
                buy: i,
                "add-wish": s
            },
            o = function(i, e) { (e.buyType || "function" == typeof t) && t.call(this, i)
            },
            a = function() {
                var t, i, e = this.skuSelectorView.getSelectedSku(),
                s = this.messageView.getData();               
                if (!e.status) return motify.log("请选择 " + e.errMsg),
                !1;
                if (t = e.sku, !s) return ! 1;
                if (i = this.quantityView ? this.quantityView.getNum() : 1, !i) return motify.log("亲，是不是数量不对？"),
                !1;
                var n = {
                    kdt_id: this.kdt_id,
                    goods_id: this.goods_id,
                    postage: this.postage || 0,
                    num: i,
                    activity_alias: this.activity_alias,
                    activity_id: this.activity_id,
                    activity_type: this.activity_type,
                    sku_id: t.id,
                    price: parseInt(this.skuTitleView.getPrice()) || t.get("price")
                },
                o = (window.zenjs.Args.getParameterByName ||
                function() {})("from");
                return o && o.length > 0 && (n.from = o),
                n.use_wxpay = this.wxpay_env ? 1 : 0,
                _(n).extend(s),
                n
            };
            return function(i) {
                var e = this;
                if (t = n[i.buyType], !i.notCheckBtnDisabled && this.isDisabled(this.nConfirmBtn)) return ! 1;
                if (e.ajaxing) motify.log("提交订单中，请勿重复提交。");
                else {
                    var s = a.call(e);
                    if (!s) return ! 1;
                    e.isGift && (s.order_type = 1),
                    i.accept_price && (s.accept_price = i.accept_price),
                    o.call(e, s, i)
                }
            }
        } (),
        doWait: function(t) {
            t > 0 ? (this.nConfirmBtn.attr("disabled", !0), this.nConfirmBtn.text(this.isMultiBtn ? this.nConfirmBtn.data("text") + "(" + t + ")": "正在排队购买，请等待 " + t + " 秒后再提交"), this.waitId = setTimeout(_(this.doWait).bind(this, t - 1), 1e3)) : (this.nConfirmBtn.removeAttr("disabled"), this.nConfirmBtn.text(this.nConfirmBtn.data("text")), this.waitId = !1)
        },
        submitSuccess: function() {
            var t = {
                11011 : !0,
                11014 : !0,
                11012 : !0,
                11013 : !0
            },
            i = function(t) {
                motify.log(t),
                this.nConfirmBtn.html(t),
                this.doDisabled(view.nConfirmBtn, !0)
            };
            return function(e, s) {
                var n = this,
                o = e.status;
                if (1 === o) {
                    if (n.onAddSuccess({
                        wish: n.isAddWish,
                        cart: !1,
                        buy: !n.isAddWish
                    },
                    s), n.isAddWish) return window.app && window.app.trigger("wish:added"),
                    window.eventHandler && window.eventHandler.trigger("wish:add"),
                    window.eventHandler && window.eventHandler.trigger("global_icon:new"),
                    motify.log('收藏成功'),
                    void n.onHide();
                    n.nConfirmBtn.html("确认提交"),
                    n.nConfirmBtn.removeAttr("disabled"),
                    !1;                
                    window.location.href = e.url                   
                } else {
                    motify.log(e.msg);
                    window.location.href = e.url;
                }
            }
        } (),
        submitError: function(t) {
            this.doDisabled(this.nConfirmBtn, !1),
            "buy" == t ? (motify.log("购买失败，请重试。"), this.nConfirmBtn.html("提交订单")) : "add-cart" == t ? (motify.log("添加到购物车失败"), this.nConfirmBtn.html("加入购物车")) : "add-wish" == t && (motify.log("添加到心愿单失败"), this.nConfirmBtn.html("下一步"))
        },
        onCancelClicked: function() {
            this.onHide()
        },
        hide: function() {
            this.waitId && (clearTimeout(this.waitId), this.waitId = !1, this.nConfirmBtn.removeAttr("disabled")),
            this.isMultiBtn && (this.$(".js-sku-views").empty(), this.$(".layout-content").height("auto"), this.skuSelectorView = this.skuSelectorView.clear())
        },
        height: function() {
            this.$(".layout-content").height("auto");
            var t = $(window).height() - this.viewTop,
            i = this.$(".layout-title").outerHeight(),
            e = t - i,
            s = this.$(".layout-content").height();
            return this.skuConH = s,
            this.skuConWinH = e,
            this.skuConHeight = e > s ? s: e,
            this.skuViewHeight = this.skuConHeight + i,
            this.$(".layout-content").height(this.skuConHeight),
            this.skuViewHeight
        },
        onAfterPopupShow: function() {
            this.quantityView && this.quantityView.validateNum()
        },
        displaySku: function(t) {
            return this.render(t || {})
        },
        getLimitNum: function(t, i, e) {
            var s, n, o = t - i;
            return e > o && 0 !== t ? (s = +o, n = "quota") : (s = +e, n = "stock"),
            {
                limitNum: s,
                limitType: n
            }
        },
        doDisabled: function(t, i) {
            i ? this.nConfirmBtn.attr("disabled", !0) : this.nConfirmBtn.removeAttr("disabled")
        },
        isDisabled: function(t) {
            return t.attr("disabled")
        },
        getBuyType: function() {
            return this.isAddWish ? "add-wish": this.isAddCart ? "add-cart": "buy"
        }
    });
    return window.BuyView = c
}),
define("main",
function() {});