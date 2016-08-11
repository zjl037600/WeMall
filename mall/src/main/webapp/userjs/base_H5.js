var $ = function (obj) {
    if (!obj) { return null; }

    if (typeof (obj) === "object") {
        return new B(obj);
    }
    else if (typeof (obj) === "string") {
        if (obj.indexOf("#") === 0) {
            return new B(document.querySelector(obj));
        }
        else {
            return new B(document.querySelectorAll(obj));
        }
    }
}

var $$ = function (obj) {
    if (obj.indexOf("#") == 0) {
        return document.querySelector(obj);
    }
    else {
        return document.querySelectorAll(obj);
    }
}
var B = function (DOM) {
    this.parent = function () {
        return new B(DOM.parentNode);
    }
    this.children = function () {
        return new B(DOM.children);
    }
    this.eq = function (i) {
        return new B(DOM[i]);
    }
    this.length = function () {
        if (DOM) {
            if (DOM.length) {
                return DOM.length;
            }
            else {
                if (DOM.innerHTML || DOM.value || DOM.tagName) {/*value for input tagName for empty element*/
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
        else {
            return 0;
        }
    }
    this.css = function (cssName, cssVal) {
        /*$(dom).css({"":"","":""})->$(dom).css("","")->$(dom).css("")*/
        if (typeof (cssName) === "object") {
            for (var v in cssName) {
                var x = v; /*临时记录*/
                var _split = v.indexOf("-");
                if (_split != -1) {
                    var a = v.substring(_split + 1, _split + 2);
                    v = v.replace("-" + a, a.toUpperCase());
                    /*console.log(v)*/
                }
                DOM.style[v] = cssName[x];
            }
            return this;
        }
        else {
            var _split = cssName.indexOf("-");
            if (_split != -1) {
                var a = cssName.substring(_split + 1, _split + 2);
                cssName = cssName.replace("-" + a, a.toUpperCase());
            }
            if (cssName && !cssVal) {
                return DOM.style[cssName];
            }
            else {/*background-color to backgroundColor*/
                DOM.style[cssName] = cssVal;
                return this;
            }
        }
    },
	this.attr = function (attrName, attrVal) {
	    /*$(dom).attr({"":"","":""})->$(dom).attr("","")->$(dom).attr("")*/
	    if (typeof (attrName) === "object") {
	        for (var v in attrName) {
	            DOM.setAttribute(v, attrName[v]);
	        }
	        return this;
	    }
	    else {
	        if (attrName && !attrVal) {
	            return DOM.getAttribute(attrName);
	        }
	        else {
	            DOM.setAttribute(attrName, attrVal);
	            return this;
	        }
	    }
	},
    this.removeAttr = function (attrName) {
        DOM.removeAttribute(attrName);
    },
    this.val = function (val) {
        /*$(dom).val()*/
        if (val || typeof (val) === "string") {/*val("")*/
            DOM.value = val;
            return this;
        }
        else {
            return DOM.value;
        }
    },
	this.html = function (_val) {
	    /*$(dom).html("")->$(dom).html()->*/
	    var val = typeof (_val) == "number" ? _val.toString() : _val;
	    if (val) {
	        DOM.innerHTML = val;
	        return this;
	    }
	    else {
	        if (DOM.length) {
	            return DOM[0].innerHTML;
	        }
	        else {
	            return DOM.innerHTML;
	        }
	    }
	},
	this.prev = function () {
	    return new B(DOM.previousElementSibling);
	},
	this.next = function () {
	    return new B(DOM.nextElementSibling);
	},
	this.addClass = function (cls) {
	    /*$(dom).addClass("")*/
	    //var clsSome = cls.indexOf(" ") ? true : false;/*addClass("a b c")*/
	    var _l = this.length();
	    if (_l == 1) {
	        if (DOM.length) {
	            if (DOM[0].classList) {
	                DOM[0].classList.add(cls);
	            }
	            else {
	                var current_className = DOM[0].className;
	                if (current_className.indexOf(cls) == -1) {
	                    DOM[0].className = current_className + " " + cls;
	                }
	            }
	        }
	        else {
	            if (DOM.classList) {
	                DOM.classList.add(cls);
	            }
	            else {
	                var current_className = DOM.className;
	                if (current_className.indexOf(cls) == -1) {
	                    DOM.className = current_className + " " + cls;
	                }
	            }
	        }
	        return this;
	    }
	    else if (_l > 1) {
	        if (DOM[0].classList) {
	            for (var i = _l; i--; ) {
	                DOM[i].classList.add(cls);
	            }
	        }
	        else {
	            for (var i = _l; i--; ) {
	                var current_className = DOM[i].className;
	                if (current_className.indexOf(cls) == -1) {
	                    DOM[i].className = current_className + " " + cls;
	                }
	            }
	        }
	        return DOM[_l - 1];
	    }
	},
	this.removeClass = function (cls) {
	    /*$(dom).removeClass("")*/
	    //var clsSome = cls.indexOf(" ") ? true : false;/*removeClass("a b c")*/
	    var _l = this.length();
	    if (_l == 1) {
	        if (DOM.length) {/*class*/
	            if (DOM[0].classList) {
	                DOM[0].classList.remove(cls);
	            }
	            else {
	                var current_className = DOM[0].className;
	                if (current_className.indexOf(cls) != -1) {
	                    DOM[0].className = current_className.replace(cls, "");
	                }
	            }
	        }
	        else {/*id*/
	            if (DOM.classList) {
	                DOM.classList.remove(cls);
	            }
	            else {
	                var current_className = DOM.className;
	                if (current_className.indexOf(cls) != -1) {
	                    DOM.className = current_className.replace(cls, "");
	                }
	            }
	        }
	        return this;
	    }
	    else if (_l > 1) {
	        if (DOM[0].classList) {
	            for (var i = _l; i--; ) {
	                DOM[i].classList.remove(cls);
	            }
	        }
	        else {
	            for (var i = _l; i--; ) {
	                var current_className = DOM[i].className;
	                if (current_className.indexOf(cls) != -1) {
	                    DOM[i].className = current_className.replace(cls, "");
	                }
	            }
	        }
	        return DOM[_l - 1];
	    }
	},
	this.clearClass = function () {
	    /*$(dom).clearClass()*/
	    var _l = DOM.length;
	    if (_l) {
	        for (var i = _l; i--; ) {
	            DOM[i].className = "";
	        }
	        return DOM[_l - 1];
	    }
	    else {
	        DOM.className = "";
	        return this;
	    }
	}
    this.hasClass = function (cls) {
        /*if( $(dom).hasClass("") )*/
        if (DOM.classList) {
            return DOM.classList.contains(cls);
        }
        else {
            if (DOM.className.indexOf(cls) != -1) {
                return true;
            }
            else {
                return false;
            }
        }
    },
	this.show = function () {
	    /*$(dom).show()*/
	    DOM.style.display = "block";
	    return this;
	},
	this.hide = function () {
	    /*$(dom).hide()*/
	    DOM.style.display = "none";
	    return this;
	},
	this.remove = function () {
	    /*$(dom).remove()*/
	    DOM.parentNode.removeChild(DOM);
	},
	this.trigger = function (type) {
	    /*$(dom).trigger("touchend")*/
	    var _event = document.createEvent("Event");
	    _event.initEvent(type, true, true);
	    DOM.dispatchEvent(_event);
	    return this;
	},
	this.bind = function (type, fun) {
	    /*$(dom).bind("click",function(){})*/
	    /*if(!DOM) return false;*/
	    if (DOM.length) {/*class*/
	        if (DOM.length == 1) {
	            DOM[0].addEventListener(type, function () {
	                fun.call(this);
	            }, false)
	        }
	        else {
	            var _l = this.length();
	            for (var i = _l; i--; ) {
	                DOM[i].addEventListener(type, function () {
	                    fun.call(this);
	                }, false)
	            }
	            return DOM[_l - 1];
	        }
	    }
	    else {/*id || window.length == 0*/
	        if (DOM.innerHTML || DOM === window || DOM.value || DOM.tagName) {/*tagName for empty element*/
	            DOM.addEventListener(type, function () {
	                fun.call(this);
	            }, false)
	        }
	        else {
	            return null;
	        }
	    }
	    return this;
	    /*
	    if(type === "tap"){
	    DOM.addEventListener("touchstart",function(){
	    event.preventDefault();
	    },false)
	    DOM.addEventListener("touchend",function(){
	    event.preventDefault();
	    fun.call(this);
	    },false)
	    }
	    */
	},
	this.unbind = function (type, fun) {
	    /*$(dom).unbind("click",fun)*/
	    DOM.removeEventListener(type, fun, false);
	    return this;
	},
	this.width = function () {
	    /*$(dom).width()*/
	    return DOM.offsetWidth;
	},
	this.height = function () {
	    /*$(dom).height()*/
	    return DOM.offsetHeight;
	},
	this.offset = function () {
	    /*$(dom).offset().top*/
	    return {
	        top: DOM.offsetTop,
	        left: DOM.offsetLeft
	    }
	},
	this.find = function (options) {
	    /*$(dom).find("p")*/
	    return new B(DOM.querySelectorAll(options));
	}
    this.append = function (ele) {
        if (typeof (ele) === "string") {
            DOM.innerHTML += ele;
        }
        else {
            DOM.appendChild(ele);
        }
        return this;
    }
    this.insert = function (ele) {
        if (typeof (ele) === "string") {
            DOM.innerHTML = ele + DOM.innerHTML;
        }
        else {
            DOM.insertBefore(ele);
        }
    }
    /*以下为动效*/
    this.fadeIn = function (second, callback, fadeOut, opacity) {
        if (!opacity) {
            opacity = 1;
        }
        /*$(DOM).fadeIn(200,function(){ alert("ok"); })*/
        var t = this;
        var _second;
        var _second_callback = false;
        if (typeof (second) === "function") {
            _second = 200;
            _second_callback = true;
        }
        else {
            _second = second > 200 ? second : 200;
        }

        if (fadeOut) {
            t.css("webkitTransition", "opacity 200ms ease");
            setTimeout(function () {
                t.css("opacity", 0.1);
                var transEndOut = function () {
                    /*console.log(t.attr("id")+"out");*/
                    $(this).hide();
                    _second_callback ? second.call(this) : (callback && callback.call(this));
                    DOM.removeEventListener("webkitTransitionEnd", transEndOut, false);
                }
                DOM.addEventListener("webkitTransitionEnd", transEndOut, false);
            }, 100)
        }
        else {
            t.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + _second + "ms ease" });
            setTimeout(function () {
                t.css("opacity", opacity);
                var transEndIn = function () {
                    /*console.log(t.attr("id")+"in");*/
                    _second_callback ? second.call(this) : (callback && callback.call(this));
                    DOM.removeEventListener("webkitTransitionEnd", transEndIn, false);
                }
                DOM.addEventListener("webkitTransitionEnd", transEndIn, false);
            }, 100)
        }
    },
	this.fadeOut = function (second, callback) {
	    this.fadeIn(second, callback, true);
	},
	this.animate = function (params, dur, callback, eas, delay) {
	    /*
	    检测浏览器类型 webkit moz o IE
	    left,right,top,bottom
	    fadeIn,fadeOut,
	    */
	    var dummyStyle = document.createElement("div").style;
	    var prefix = (function () {
	        var prefixs = "t,webkitT,MozT,msT,OT".split(","), t, i = 0, l = prefixs.length;
	        for (; i < l; i++) {
	            t = prefixs[i] + "ransform";
	            if (t in dummyStyle) {
	                return prefixs[i].substr(0, prefixs[i].length - 1);
	            }
	        }
	        return false;
	    } ());
	    var cssPrefix = prefix ? "-" + prefix.toLowerCase() + "-" : ""; /*-webkit-  webkitTransition = cssPrefix + 'transform',1s,linear*/
	    var transEnd = (function () {
	        if (!prefix) return false;
	        var transitionEnd = {
	            '': 'transitionend',
	            'webkit': 'webkitTransitionEnd',
	            'Moz': 'transitionend',
	            'O': 'otransitionend',
	            'ms': 'MSTransitionEnd'
	        };
	        return transitionEnd[prefix];
	    } ());
	    var prefixStyle = function (style) {/*style = transform  return = webkitTransform*/
	        if (!prefix) return style;
	        style = style.charAt(0).toUpperCase() + style.substr(1);
	        return prefix + style;
	    }
	    var transform = prefixStyle('transform'),
			transitionProperty = prefixStyle('transitionProperty'),
			transitionDuration = prefixStyle('transitionDuration'),
			transitionTimingFunction = prefixStyle('transitionTimingFunction'),
			transitionDelay = prefixStyle('transitionDelay');
	    /*transformOrigin = prefixStyle('transformOrigin'),*/

	    var paramArray = new Array();
	    for (var param in params) {
	        paramArray.push(param);
	    }
	    /*
	    需要变换的属性 width height font-size      left right=transform translateX top bottom=translateY 放大 缩小=scale 旋转=rotate
	    translate的属性都不影响周边 都是浮着改变
	    left top jquery也是不影响周边 而且不给父级加position属性
	    */
	    var transEndFun = function (e) {
	        callback ? callback() : "";
	        e.target.removeEventListener(transEnd, transEndFun, false);
	    }
	    this.css({
	        transitionProperty: paramArray.join(","),
	        transitionDuration: dur ? dur / 1000 + "s" : ".2s",
	        transitionTimingFunction: eas ? eas : "ease",
	        transitionDelay: delay ? delay / 1000 + "s" : "0s"
	    }).dom.addEventListener(transEnd, transEndFun, false);

	    /*设置CSS 此时已经有了动画参数 根据参数的长度*/
	    var iCss = 0, param_l = paramArray.length;
	    for (; iCss < param_l; iCss++) {
	        var i = paramArray[iCss];
	        this.css(i, params[i]);
	    }
	    return this;
	}
}

var M = {
    baseUrl: "/vshop/1/H5",
    h5Href: location.href.indexOf('#') >= 0 ? location.href.substr(0, location.href.indexOf('#')) : location.href,
    h5Vshop: "http://" + location.host + "/vshop",
    version: 201402141327,
    doc: document,
    win: window,
    w: document.body ? document.body.offsetWidth : 0,
    h: document.body ? document.body.offsetHeight : 0,
    /*
    jsonp : function(href,_callback){
    var a = "jsonpcallback_" + new Date().getTime() + "_" + Math.random().toString().substr(2);
    window[a] = function(json){
    window[a] = undefined;
    _callback ? _callback(json) : "";
    }
    M.loadScript(href + (href.indexOf("?") == -1 ? "?callback=" : "&callback=") + a);
    },
    */
    toJSON: function (obj) {
        return JSON.stringify(obj);
    },
    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    jsonp: function (href, _callback, _err) {
        var date_start = new Date(); /*局部*/
        var _t = date_start.getTime() + "_" + Math.random().toString().substr(2); /*后缀防重复*/
        var a = "jsonpcallback_" + _t; /*全局 避免重复*/
        var b = "interval_" + _t; /*全局 避免重复 循环处理*/
        window[a] = function (json) {
            window[a] = undefined;
            _callback && _callback(json);
        }
        window[b] = setInterval(function () {
            if (new Date() - date_start > 8000) {
                clearInterval(window[b]);
                _err && _err();
                //console.log("-------------------" + href + "网络不给力，一会再试试吧");
            }
        }, 100);
        M.loadScript(href + (href.indexOf("?") == -1 ? "?callback=" : "&callback=") + a, function () {
            /*
            如果地址不对 不会触发onload事件 也就不考虑了
            如果地址对 并且 已经加载了 那就是已经返回值了
            */
            clearInterval(window[b]);
        });
    },
    ajax: function (url, data, callback, error_callback, method, async) {
        var request = new XMLHttpRequest();
        request.open(method ? method : 'POST', url, typeof (async) == "undefined" ? true : async);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(data)
        var date_start = new Date();
        var ajax_notice = setInterval(function () {
            if (new Date() - date_start > 8000) {
                clearInterval(ajax_notice);
                error_callback && error_callback();
            }
        }, 100);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                clearInterval(ajax_notice);

                switch (request.status) {
                    case 200:
                        callback && callback(request.responseText);
                        break;
                    case 404:
                        alert("404--URL地址未找到");
                        ajax_error();
                        break;
                    case 500:
                        alert("500--服务器错误");
                        ajax_error();
                        break;
                }
            }
        }
        function ajax_error() {
            ajax.abort();
            error_callback && error_callback();
        }
    },
    ajax_sync: function (url, data, callback, error_callback, method) {
        var request = new XMLHttpRequest();
        var date_start = new Date();
        var ajax_notice = setInterval(function () {
            if (new Date() - date_start > 8000) {
                clearInterval(ajax_notice);
                error_callback && error_callback();
            }
        }, 100);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                clearInterval(ajax_notice);

                switch (request.status) {
                    case 200:
                        callback && callback(request.responseText);
                        break;
                    case 404:
                        alert("404--URL地址未找到");
                        ajax_error();
                        break;
                    case 500:
                        alert("500--服务器错误");
                        ajax_error();
                        break;
                }
            }
        }
        function ajax_error() {
            ajax.abort();
            error_callback && error_callback();
        }
        request.open(method ? method : 'POST', url, false);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(data)
    },
    upload: function (url, data, callback, error_callback) {
        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.send(data)
        var date_start = new Date();
        var ajax_notice = setInterval(function () {
            if (new Date() - date_start > 8000) {
                clearInterval(ajax_notice);
                error_callback && error_callback();
            }
        }, 100);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                clearInterval(ajax_notice);

                switch (request.status) {
                    case 200:
                        callback && callback(request.responseText);
                        break;
                    case 404:
                        alert("404--URL地址未找到");
                        ajax_error();
                        break;
                    case 500:
                        alert("500--服务器错误");
                        ajax_error();
                        break;
                }
            }
        }
        function ajax_error() {
            ajax.abort();
            error_callback && error_callback();
        }
    },
    get: function (href, callback, error_callback) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", href, true);
        ajax.send();
        var date_start = new Date();
        var ajax_notice = setInterval(function () {
            if (new Date() - date_start > 8000) {
                alert("网络不给力，一会再试试吧");
                error_callback && error_callback();
            }
        }, 100);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                clearInterval(ajax_notice);
                switch (ajax.status) {
                    case 200:
                        callback(ajax.responseText);
                        break;
                    case 404:
                        alert("404--URL地址未找到");
                        ajax_error();
                        break;
                    case 500:
                        alert("500--服务器错误");
                        ajax_error();
                        break;
                }
            }
        }
        function ajax_error() {
            ajax.abort();
            error_callback && error_callback();
        }
    },
    lazyLoad: function () {/*原生 非B*/
        var img = M.doc.getElementsByClassName("lazy_load"), img_l = img.length;
        if (img_l) {
            var img_arr = [];
            var lazy_src = "";
            for (var i = 0; i < img_l; i++) {
                (function (i) {
                    var z = i, that = img[z], src = that.getAttribute("data-src"), thatClass = that.className;
                    that.src = lazy_src;
                    img_arr[z] = new Image();
                    img_arr[z].src = src;
                    img_arr[z].onload = function () {
                        that.src = src;
                        that.className = thatClass.replace("lazy_load", "");
                    }
                } (i));
            }
        }
    },
    loadScript: function (url, callback) {
        var script = document.createElement("script");
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") { script.onreadystatechange = null; callback && callback(); }
            }
        }
        else { script.onload = function () { callback && callback(); } }
        script.src = (url.indexOf("?") > 0) ? (url + "&ver=" + M.version) : (url + "?ver=" + M.version);
        var _s = document.getElementsByTagName("script")[0];
        _s.parentNode.insertBefore(script, _s);
    },
    json: function (data) {
        return JSON.parse(data);
    },
    urlQuery: function (name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1]
    },
    getCookie: function (name) {
        //if (localStorage) {
        //return localStorage.getItem(name) ? localStorage.getItem(name) : (sessionStorage.getItem(name) ? sessionStorage.getItem(name) : "");
        /*
        if(name == "WD_hide_dis"){
        return sessionStorage.getItem(name) == null ? "" : sessionStorage.getItem(name);
        }
        else{
        return localStorage.getItem(name) == null ? "" : localStorage.getItem(name);
        }
        */
        //}
        //else {
        var cookie_start = document.cookie.indexOf(name);
        var cookie_end = document.cookie.indexOf(";", cookie_start);
        return cookie_start == -1 ? "" : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
        //}
    },
    setCookie: function (name, value, isSession) {
        //if (localStorage) {
        //    isSession ? sessionStorage.setItem(name, value) : localStorage.setItem(name, value);
        /*
        if(name == "WD_hide_dis"){
        console.log("isSession")
        sessionStorage.setItem(name,value);
        }
        else{
        console.log("isLocal")
        localStorage.setItem(name,value);
        }
        */
        // }
        // else {
        var expires = new Date();
        expires.setTime(expires.getTime() + 2592000000);
        isSession ? document.cookie = escape(name) + '=' + escape(value) + ('/') + ('') + ('') : document.cookie = escape(name) + '=' + escape(value) + (expires ? '; expires=' + expires.toGMTString() : '') + ('/') + ('') + ('');
        /*
        if(name == "WD_hide_dis"){
        document.cookie = escape(name) + '=' + escape(value) + ('/') + ('') + ('');
        }
        else{
        document.cookie = escape(name) + '=' + escape(value) + (expires ? '; expires=' + expires.toGMTString() : '') + ('/') + ('') + ('');
        }
        */
        //}
    },
    delCookie: function (name) {
        document.cookie = name + "=;expires=" + (new Date(0)).toGMTString();
    },
    clearCookie: function () {
        if (localStorage) {
            localStorage.clear();
        }
        else {
            var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
            if (keys) {
                var l = keys.length;
                for (var i = l; i--; )
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
            }
        }
    },
    ua: function () {
        return navigator.userAgent.toLowerCase();
    },
    isMobile: function () {
        return M.ua().match(/iPhone|iPad|iPod|Android|IEMobile/i);
    },
    isAndroid: function () {
        return M.ua().indexOf("android") != -1 ? 1 : 0;
    },
    isIOS: function () {
        var a = M.ua();
        return (a.indexOf("iphone") != -1 || a.indexOf("ipad") != -1 || a.indexOf("ipod") != -1) ? 1 : 0;
    },
    platform: function () {
        if (M.isMobile()) {/*移动端*/
            if (M.isIOS()) {
                return "IOS";
            }
            else if (M.isAndroid()) {
                return "Android";
            }
            else {
                return "other-mobile";
            }
        }
        else {/*PC端*/
            return "PC";
        }
    },
    isWeixin: function () {
        return M.ua().indexOf("micromessenger") != -1 ? 1 : 0;
    },
    isWeixinPay: function () {
        if (M.isWeixin()) {
            var a = M.ua();
            var b = a.substr(a.indexOf("micromessenger"), 18).split("/");
            if (Number(b[1]) >= 5) {
                return 1;
            }
            else {
                return 0;
            }
        }
        else {
            return 0;
        }
    },
    /*alert & confirm start*/
    _alert: function (txt, callback, times) {
        if ($("#_alert_bg").length()) {
            $("#_alert_bg").show();
        }
        else {
            var _d = document;
            var _alert_bg = _d.createElement("div");
            _alert_bg.setAttribute("id", "_alert_bg");
            _d.body.appendChild(_alert_bg);

            var _alert_content = _d.createElement("div");
            _alert_content.setAttribute("id", "_alert_content");
            _alert_bg.appendChild(_alert_content);
        }
        var _this = $("#_alert_content");
        _this.html(txt).fadeIn(function () {
            setTimeout(function () {
                _this.fadeOut(function () {
                    $("#_alert_bg").hide();
                    callback && callback();
                })
            }, times ? times * 1000 : 1000)
        });
    },
    _loading: function (hide, msg) {
        if (hide) {
            $("#_alert_bg").hide();
        } else {
            if (document.getElementById("_alert_bg")) {
                $("#_alert_bg").show();
            }
            else {
                var _d = document;
                var _alert_bg = _d.createElement("div");
                _alert_bg.setAttribute("id", "_alert_bg");
                _d.body.appendChild(_alert_bg);

                var _alert_content = _d.createElement("div");
                _alert_content.setAttribute("id", "_alert_content");
                _alert_bg.appendChild(_alert_content);
            }
            var _this = $("#_alert_content");
            _this.html(msg ? msg : "处理中...").fadeIn(function () {
            });
        }
    },
    _confirm: function (tle, btnA, btnB, submit_fun, cancel_fun) {
        var _d = document;
        var _confirm_bg = _d.createElement("div");
        _confirm_bg.setAttribute("id", "_confirm_bg");
        _d.body.appendChild(_confirm_bg);

        var _confirm_content = _d.createElement("div");
        _confirm_content.setAttribute("id", "_confirm_content");
        _confirm_bg.appendChild(_confirm_content);

        var _wrap = $("#_confirm_content");

        var _temp = "";
        _temp = _temp + "<p>" + tle + "</p>";
        _temp = _temp + "<em id='_confirm_shadowA'>&nbsp;</em>";
        _temp = _temp + "<em id='_confirm_shadowB'>&nbsp;</em>";
        _temp = _temp + "<div id='_confirm_btnW'>";
        if (btnB[0]) {//B按钮有
            _temp = _temp + "<div id='_confirm_btnA' class='" + btnA[1] + "'>" + btnA[0] + "</div>";
            _temp = _temp + "<em id='_confirm_shadowC'>&nbsp;</em>";
            _temp = _temp + "<em id='_confirm_shadowD'>&nbsp;</em>";
            _temp = _temp + "<div id='_confirm_btnB' class='" + btnB[1] + "'>" + btnB[0] + "</div>";
        }
        else {
            _temp = _temp + "<div id='_confirm_btnA' class='" + btnA[1] + "' style='width:100%'>" + btnA[0] + "</div>";
        }
        _temp = _temp + "</div>";

        _wrap.html(_temp).fadeIn();

        $("#_confirm_btnA").bind("click", function () {/*cancel*/
            cancel_fun && cancel_fun();
            _wrap.fadeOut(function () {
                $("#_confirm_bg").remove();
            })
        })
        if (btnB[0]) {//B按钮有
            $("#_confirm_btnB").bind("click", function () {/*submit*/
                submit_fun();
                _wrap.fadeOut(function () {
                    $("#_confirm_bg").remove();
                })
            })
        }
    },
    _confirm3: function (tle, btnA, btnB, btnC, btnA_fun, btnB_fun, btnC_fun) {
        var _d = document;
        var _confirm_bg = _d.createElement("div");
        _confirm_bg.setAttribute("id", "_confirm_bg");
        _d.body.appendChild(_confirm_bg);

        var _confirm_content = _d.createElement("div");
        _confirm_content.setAttribute("id", "_confirm_content");
        _confirm_bg.appendChild(_confirm_content);

        var _wrap = $("#_confirm_content");

        var _temp = "";
        _temp = _temp + "<p>" + tle + "</p>";
        _temp = _temp + "<em id='_confirm_shadowA'>&nbsp;</em>";
        _temp = _temp + "<em id='_confirm_shadowB'>&nbsp;</em>";
        _temp = _temp + "<div id='_confirm3_btnW'>";

        _temp = _temp + "<div id='_confirm3_btnA' class='" + btnA[1] + "'>" + btnA[0] + "</div>";
        _temp = _temp + "<em id='_confirm3_shadowC'>&nbsp;</em>";
        _temp = _temp + "<div id='_confirm3_btnB' class='" + btnB[1] + "'>" + btnB[0] + "</div>";
        _temp = _temp + "<em id='_confirm3_shadowC'>&nbsp;</em>";
        _temp = _temp + "<div id='_confirm3_btnC' class='" + btnC[1] + "'>" + btnC[0] + "</div>";

        _temp = _temp + "</div>";

        _wrap.html(_temp).fadeIn();

        $("#_confirm3_btnA").bind("click", function () {/*cancel*/
            btnA_fun && btnA_fun();
            _wrap.fadeOut(function () {
                $("#_confirm_bg").remove();
            })
        })
        if (btnB[0]) {//B按钮有
            $("#_confirm3_btnB").bind("click", function () {/*submit*/
                btnB_fun();
                _wrap.fadeOut(function () {
                    $("#_confirm_bg").remove();
                })
            })
        }
        if (btnC[0]) {//C按钮有
            $("#_confirm3_btnC").bind("click", function () {/*submit*/
                btnC_fun();
                _wrap.fadeOut(function () {
                    $("#_confirm_bg").remove();
                })
            })
        }
    },
    _prompt: function (tle, btnA, btnB, submit_fun, cancel_fun, def_val) {
        var _d = document;
        var _confirm_bg = _d.createElement("div");
        _confirm_bg.setAttribute("id", "_confirm_bg");
        _d.body.appendChild(_confirm_bg);

        var _confirm_content = _d.createElement("div");
        _confirm_content.setAttribute("id", "_confirm_content");
        _confirm_bg.appendChild(_confirm_content);

        var _wrap = $("#_confirm_content");

        var _temp = "";
        _temp = _temp + "<p>" + tle + "<input id='prompt' value='" + (def_val ? def_val : "") + "' style='width:100%;height:30px;line-height:30px;border:1px solid #d9d9d9;text-indent:6px;font-size:14px'></p>";
        _temp = _temp + "";
        _temp = _temp + "<em id='_confirm_shadowA'>&nbsp;</em>";
        _temp = _temp + "<em id='_confirm_shadowB'>&nbsp;</em>";
        _temp = _temp + "<div id='_confirm_btnW'>";
        if (btnB[0]) {//B按钮有
            _temp = _temp + "<div id='_confirm_btnA' class='" + btnA[1] + "'>" + btnA[0] + "</div>";
            _temp = _temp + "<em id='_confirm_shadowC'>&nbsp;</em>";
            _temp = _temp + "<em id='_confirm_shadowD'>&nbsp;</em>";
            _temp = _temp + "<div id='_confirm_btnB' class='" + btnB[1] + "'>" + btnB[0] + "</div>";
        }
        else {
            _temp = _temp + "<div id='_confirm_btnA' class='" + btnA[1] + "' style='width:100%'>" + btnA[0] + "</div>";
        }
        _temp = _temp + "</div>";

        _wrap.html(_temp).fadeIn();

        $("#_confirm_btnA").bind("click", function () {/*cancel*/
            cancel_fun && cancel_fun();
            _wrap.fadeOut(function () {
                $("#_confirm_bg").remove();
            })
        })
        if (btnB[0]) {//B按钮有
            $("#_confirm_btnB").bind("click", function () {/*submit*/
                submit_fun($("#prompt").val());
                _wrap.fadeOut(function () {
                    $("#_confirm_bg").remove();
                })
            })
        }
    },
    /*alert & confirm end*/
    img: function (obj, cb) {
        obj.bind('change', function () {
            var file = this.files[0];
            var ext = new RegExp("(.jpg|.png|.gif|.jpeg)$"); ;
            if (!ext.test(file.name.toLowerCase())) {
                M._alert("只允许上传.jpg|.png|.gif|.jpeg");
                obj.val("");
                return;
            }
            var url = webkitURL.createObjectURL(file);
            var img = new Image();
            img.onload = function () {
                var width = img.width,
                        height = img.height;
                if ($("#canvas").length() <= 0) {
                    var div = document.createElement("div");
                    div.innerHTML = '<canvas id="canvas" class="hide"></canvas>';
                    document.body.appendChild(div);
                }
                var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext('2d');
                canvas.setAttribute("width", width);
                canvas.setAttribute("height", height);
                ctx.drawImage(img, 0, 0, width, height);
                var base64 = canvas.toDataURL();
                var base64Data = base64.substr(22);
                cb(base64Data);
            }
            img.src = url;
        });
    },
    phone: function (p) {
        var partten = /^1[3,4,5,8]\d{9}$/;
        if (!partten.exec(p)) return false;
        return true;
    },
    email: function (e) {
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!reg.test(e))
            return false;
        return true;
    },
    init: function () {
        //用户分享ID
        if (M.urlQuery('uid') && M.urlQuery('uid') != "0") {
            sessionStorage.uid = M.urlQuery('uid');
        }
        //店铺ID
        if (M.urlQuery('sid')) {
            localStorage.sid = M.urlQuery('sid');
        }
    }
}
M.init();


var MsgShowDivObj;
var MsgLoadState = 0;
var MsgShowLoadImgSrc = "../img/loading.gif";
function OpenMsg(Msg, TimeOut) {
    CloseMsg();
    MsgLoadState = 1;
    if (!TimeOut) {
        TimeOut = 30000;
    }
    setTimeout(function () {
        CloseMsg();
    }, TimeOut);
    //$("body").append(loadingHtml);
    var loadingHtml = '<div id="BodyLoading" style="width:100%;3em;position:fixed;z-index:100000000000;top:40%;text-align:center;">' +

    '<center><table border="0" style="width:85%;height:3em;color:#fff;background-color:#000;font-size:14px; opacity:0.8; -webkit-border-radius: 5px;border-radius: 5px;">' +
    '<tr>' +
    '<td align="center" valign="middle">' +
    Msg +
    '</td>' +
    '</tr>' +
    '</table></center>' +

    '</div>';

    MsgShowDivObj = DivObj(loadingHtml);
    document.body.appendChild(MsgShowDivObj);
}

function CloseMsg() {
    MsgLoadState = 0;
    try {
        document.body.removeChild(MsgShowDivObj);
    }
    catch (ex) {
    }

    //document.getElementById("BodyLoading").removeChild("BodyLoading");
    // $("#BodyLoading").remove();
}

function DivObj(str) {
    var divObj = document.createElement("div");
    divObj.innerHTML = str;
    return divObj;
}
var style_html = '<style>.fade{top:20%;opacity:0;-webkit-transition:all 0.5s ease;transition:all 0.5s ease}.fade.in{top:25%;opacity:1;} </style>';

function alert_n(msg) {
    RemoveMsgShowDivObj();
    var loadingHtml = style_html + ' <div  style="font-family: "Microsoft YaHei" !important;">' +
        '<div id="msgtip" class="fade" style="width: 80%; position: fixed; z-index: 99999981; left:10%;background-color: #fff;border-radius: 8px; text-align: center">' +
            '<div style="height: 15px;">  </div>' +
           ' <center><div style="width:90%;text-align:left;color:#888787">提示：</div>' +
               '<div style="width: 88%;">' + msg +
               '</div>' +
           ' </center>' +
            '<div style="height: 10px; border-bottom: 1px solid #f1f1f1;"></div>' +
           ' <div style="height: 8px;"> </div>' +
           ' <div>' +
               ' <span  onclick="close_alert()" style="height: 32px; width: 90px; line-height: 32px; color: #fff; background-color: #35D355; border-radius: 5px; overflow: hidden;margin-bottom: 0px; margin: 0 auto; display: block;">确定</span>' +
           ' </div>' +
            '<div style="height: 8px;">' +
           ' </div>' +
        '</div>' +
        '<div id="msgtipback" onclick="close_alert()" style="display:none;width: 100%; height: 100%; position: fixed; z-index: 99999980; left: 0px; top: 0px; background-color: #000; opacity: 0.6;">' +
       ' </div>' +
   ' </div>';

    MsgShowDivObj = DivObj(loadingHtml);
    document.body.appendChild(MsgShowDivObj);
    $("#msgtipback").fadeIn(300, function () {
        MsgLoadState = 1;
        $("#msgtip").addClass("in");
    }, null, 0.6);

}
var confirm_cb;
function confirm_n(msg, cb, title) {
    RemoveMsgShowDivObj();
    confirm_cb = cb;
    if (!title) {
        title = "提示：";
    }
    var loadingHtml = style_html + ' <div  style="font-family: "Microsoft YaHei" !important;">' +
        '<div id="msgtip" class="fade" style="width: 80%; position: fixed; z-index: 99999981; left: 10%; background-color: #fff;border-radius: 8px; text-align: center">' +
            '<div style="height: 15px;">  </div>' +
           ' <center><div style="width:90%;text-align:left;color:#888787">' + title + '</div>' +
               ' <div style="width: 88%;">' + msg +
               ' </div>' +
           ' </center>' +
            '<div style="height: 15px; border-bottom: 1px solid #f1f1f1;"> </div>' +
           ' <div style="height: 8px;"> </div>' +
           ' <div><center>' +
               ' <table style="width:100%"><tr><Td align="right" style="width:50%;"><span  onclick="close_confirm_n()" style="height: 32px; width: 85%; line-height: 32px;text-align:center; color: #fff; background-color: #35D355; border-radius: 5px; overflow: hidden;margin-bottom: 0px; margin: 0 auto; display: block;">确定</span></td>' +
               '<td align="left"> <span  onclick="close_alert()" style="height: 32px; width: 85%; line-height: 32px; text-align:center;color: #fff; background-color: #859188; border-radius: 5px; overflow: hidden;margin-bottom: 0px; margin: 0 auto; display: block;">取消</span></td></tr></table>' +
           ' </center></div>' +
            '<div style="height: 8px;">' +
           ' </div>' +
        '</div>' +
        '<div id="msgtipback" onclick="close_alert()"  style="display:none;width: 100%; height: 100%; position: fixed; z-index: 99999980; left: 0px; top: 0px; background-color: #000; opacity: 0.6;">' +
       ' </div>' +
   ' </div>';

    MsgShowDivObj = DivObj(loadingHtml);
    document.body.appendChild(MsgShowDivObj);

    $("#msgtipback").fadeIn(300, function () {
        MsgLoadState = 1;
        $("#msgtip").addClass("in");

    }, null, 0.6);
}
function close_confirm_n() {
    if (MsgLoadState == 1) {

        MsgLoadState = 0;
        try {
            $("#msgtip").removeClass("in");
            $("#msgtipback").fadeOut(300);

            setTimeout(function () {
                confirm_cb();
                document.body.removeChild(MsgShowDivObj);
            }, 300);
        }
        catch (ex) {
        }
    }

}
function close_alert() {
    if (MsgLoadState == 1) {

        MsgLoadState = 0;
        try {
            $("#msgtip").removeClass("in");
            $("#msgtipback").fadeOut(300);

            setTimeout(function () {
                document.body.removeChild(MsgShowDivObj);
            }, 300);
        }
        catch (ex) {
        }
    }
}
function RemoveMsgShowDivObj() {
    try {
        document.body.removeChild(MsgShowDivObj);
    }
    catch (ex) {
    }
}

function Ajax(Url, Data, cb) {
    var datajson = "";
    for (var key in Data) {
        datajson += "&" + key + "=" + Data[key];
    }

    if (datajson != "") {
        datajson = datajson.substring(1);
    }
    M.ajax(Url, datajson, cb);
}
if (localStorage.Debug == "1") {
    document.write(location.href);
}
if (localStorage.Alert == "1") {
    alert(location.href);
}

try { uexWindow.onSwipeRight = function () { appcan.window.evaluateScript({ name: 'main', scriptContent: 'animFrame()' }); }; } catch (e) { }