var CurSkuId = "";
var Curgiid = "";
var CartObj;
var JsVer = "jq";
var CartAddType = "";
if (location.href.indexOf("cart.html") > 0) {
    JsVer = "basejq";
}
function ShowSelSku(gi_id, gi_spec, img_src, gi_virtual, Obj, type) {

    if (gi_virtual == "1") {
        alert("此商品无法加入购物车,请点击详情直接购买!");
        return;
    }
    CartObj = Obj;
    Curgiid = gi_id;
    CartAddType = type;
    if (gi_spec == "1") {

        CurSkuId = "";
        $("#SelectSKUlist").show();
        if (JsVer == "jq")
            $("#SelectSKUback").fadeIn();
        else
            $("#SelectSKUback").fadeIn(null, null, null, 0.8);
        try {
            $("#SelectSKUback").click(function () {
                $("#SelectSKUlist").removeClass("in");
                $("#SelectSKUback").fadeOut();
                setTimeout(function () {
                    $("#SelectSKUlist").hide();
                }, 500)
            })
        } catch (e) {
            $("#SelectSKUback").bind("click", function () {
                $("#SelectSKUlist").removeClass("in");
                $("#SelectSKUback").fadeOut();
                setTimeout(function () {
                    $("#SelectSKUlist").hide();
                }, 500)
            })
        }
        $("#SelectSKUlist").addClass("in");
        getGoodsSkuInfo(Sid, gi_id, type);

    } else {
        AddCart(gi_id, "", 1, type)
    }
}
function AddToCart() {
    if (CurSkuId == "") {
        alert("请选择商品属性!");
        return;
    }
    AddCart(Curgiid, CurSkuId, 1, CartAddType)
}
function getGoodsSkuInfo(Sid, gi_id, type) {
    Ajax("/vshop/detail.html?sid=" + Sid + "&iid=" + gi_id + "&action=info", {}, function (result) {
        $("#emptyTips").hide();
        var msg = eval(result);
        var data = msg.info[0];

        var sku_html = '';
        var sku_arr = [];
        for (var i in msg.rule) {
            sku_arr.push(msg.rule[i].pName);
            sku_html += '<p class="control_tle gray_txt"> ' + msg.rule[i].pName + '：</p>';
            sku_html += '<ul class="sku_ul">';
            for (var j in msg.rule[i].pList) {
                sku_html += '<li class="sku_li"><a name="' + (msg.rule[i].pList.length == 1 ? "sku_default" : "") + '" class="sku_a curr' + i + '" data-id="' + i + '" data-rname="' + msg.rule[i].pName + '" data-name="' + msg.rule[i].pList[j] + '" data-sku="" data-stock=""  data-price="">' + msg.rule[i].pList[j] + '</a></li>';
            }
            sku_html += '</ul>'
        }
        $("#sku_body").html(sku_html);

        // $(".sku_a").unbind("click");
        $(".sku_a").bind("click", function () {

            var target = $(this);

            if (!target.hasClass("current_sku") && !target.hasClass("nostock")) {
                $(".curr" + target.attr("data-id")).removeClass("current_sku");
                target.addClass("current_sku");
                var cur_sku_len = 0;
                if (JsVer != "jq") {
                    cur_sku_len = $(".current_sku").length();
                } else {
                    cur_sku_len = $(".current_sku").length
                }

                if (cur_sku_len == sku_arr.length) {
                    var cur_l = cur_sku_len;
                    var t = [];
                    for (var i = 0; i < cur_l; i++) {
                        t.push($(".current_sku").eq(i).attr("data-rname") + ":" + $(".current_sku").eq(i).attr("data-name"));
                    }
                    for (var i in msg.sku) {
                        if (msg.sku[i].gs_sku == t.join("|")) {
                            var sku = msg.sku[i];
                            CurSkuId = sku.gss_id;
                        }
                    }
                }
            }
        })
        //}
        var Obj = document.getElementsByName("sku_default");

        for (var i = 0; i < Obj.length; i++) {
            Obj[i].click();
        }
    });
}

function AddCart(gi_id, skuid, num, type) {
    OpenMsg("<div style='height:12px;'></div>请稍后...", 3000);
    var i_length = num;
    Ajax("/vshop/detail.html?sid=" + Sid + "&iid=" + gi_id + "&action=checkCartGoods&num=" + i_length + "&skuid=" + skuid + "&guest=0&from=scan", {}, function (result) {

        var json = eval(result);
        if (json.state == "0") {

            Ajax("/vshop/detail.html?sid=" + Sid + "&iid=" + gi_id + "&action=cart&num=" + i_length + "&skuid=" + (skuid == "0" ? "" : skuid) + "&guest=0&from=scan", {}, function (result) {
                var data = eval(result);
                switch (data.state) {
                    case 0:
                        location.href = '/vshop/login.html?sid=' + Sid;
                        break;
                    case 1:
                        if (location.href.toString().indexOf("/vshop/cart.html") > 0) {
                            document.getElementById("SelectSKUback").click()
                            M._alert("加入购物车成功!");

                            Cart.getList();
                            if (sessionStorage.isscangoods && type == "scan") {
                                setTimeout(function () {
                                    Cart.scan();
                                }, 1500)
                            }
                        } else {
                            $("#SelectSKUback").click();
                            OpenMsg("<div style='height:0.8em;'></div>加入购物车成功!", 2000);
                            try {
                                scanAddToCartBack();
                            } catch (e) { }
                            if (sessionStorage.isscangoods) {
                                setTimeout(function () {
                                    var paras = sessionStorage.isscangoods.toString().split(',');
                                    location.href = "/vshop/cart.html?sid=" + Sid + "&from=scan";
                                }, 1500)
                            }
                        }
                        $("#footer_icon_cart_count").html(parseInt($("#footer_icon_cart_count").html().trim()) + i_length);
                        document.getElementById("footer_icon_cart_count").style.display = "block";
                        break;
                    case 2:
                        alert(data.result);
                        break;
                    default:
                        alert("加入购物车失败");
                        break;
                }
            })
        } else if (json.state == "1") {
            confirm_n("购物车已存在此商品,是否加入到购物车?", function () {
                Ajax("/vshop/detail.html?sid=" + Sid + "&iid=" + gi_id + "&action=cart&num=" + i_length + "&skuid=" + skuid + "&guest=0&from=scan", {}, function (result) {
                    var data = eval(result);
                    switch (data.state) {
                        case 0:
                            location.href = '/vshop/login.html?sid=' + Sid;
                            break;
                        case 1:

                            if (location.href.toString().indexOf("/vshop/cart.html") > 0) {
                                document.getElementById("SelectSKUback").click();
                                M._alert("加入购物车成功!");
                                Cart.getList();
                                if (sessionStorage.isscangoods && type == "scan") {
                                    setTimeout(function () {
                                        Cart.scan();
                                    }, 1500)
                                }
                            } else {
                                $("#SelectSKUback").click();
                                OpenMsg("<div style='height:0.8em;'></div>加入购物车成功!", 2000);
                                try {
                                    scanAddToCartBack();
                                } catch (e) { }
                                if (sessionStorage.isscangoods) {
                                    setTimeout(function () {
                                        var paras = sessionStorage.isscangoods.toString().split(',');
                                        //OpenScan(paras[0], paras[1]);
                                        location.href = "/vshop/cart.html?sid=" + Sid + "&from=scan";
                                    }, 1500)
                                }
                            }
                            $("#footer_icon_cart_count").html(parseInt($("#footer_icon_cart_count").html().trim()) + i_length);
                            document.getElementById("footer_icon_cart_count").style.display = "block";
                            break;
                        case 2:
                            alert(data.result);
                            break;
                        default:
                            alert("加入购物车失败");
                            break;
                    }
                })

            })
        } else if (json.state == "-1") {
            location.href = '/vshop/login.html?sid=' + Sid;
        }
    });
}

function MoveBox(obj) {

    var offset1 = $(obj).offset();
    var offset2 = $(obj).prev().offset();

    var divTop = offset2.top - offset1.top;
    var divLeft = $(obj).offset().left;
    $(obj).css({ "position": "fixed", "z-index": "99999999", "left": divLeft + "px", "top": (divTop) + "px", "margin-top": "auto", "margin-left": "auto" });
}