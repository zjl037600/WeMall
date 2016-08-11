

function Preview() {
    try {

        uexWindow.cbActionSheet = function (opId, dataType, data) {
            switch (parseInt(data)) {
                case 0:
                    open_wx(0);
                    break;
                case 1:
                    open_wx(1);
                    break;
                case 2:
                    open_qzone();
                    break;
                case 3:

                case 4:
                    location.href = localStorage.Url;
                    break;

            }
        }
        // if (localStorage.ClientType == "android") {
        // uexWindow.actionSheet("选择", "取消", ["分享给微信好友", "分享到微信朋友圈", "分享到QQ空间", "分享到新浪微博", "预览店铺"]);
        uexWindow.actionSheet("选择", "取消", ["分享给微信好友", "分享到微信朋友圈", "分享到QQ空间", "预览店铺"]);
        //} else {
        //    uexWindow.actionSheet("选择", "取消", ["分享给微信好友", "分享到微信朋友圈", "分享到QQ空间", "分享到新浪微博", "预览店铺"]);
        // }
    }
    catch (e) {

        location.href = localStorage.Url;
    }
}
function sign() {

    if (location.href.toString().indexOf("center_shop") > 0) {

        if ($(".qd_2_1").next("div").text() != "我的签到") {
            $.ajax({
                type: "get",
                url: location.href.toString().replace("/center_shop.", "/manager.").replace("#","") + "&action=sign&r=" + Math.random(),
                success: function (result) {

                    if (result == "true") {
                        alert_n("签到成功!");
                        $(".qd_2_1").next("div").html("我的签到");
                    } else {
                        location.href = location.href.toString().replace("/center_shop.", "/manager.").replace("#", "") + "&action=go_signlist";
                    }
                }
            })
        } else {
            location.href = location.href.toString().replace("center.html", "manager.html").replace("center_shop.html", "manager.html").replace("#", "") + "&action=go_signlist";
        }
    } else {

        if ($.trim($(".qd_2_1").children(".name").text()) != "我的签到") {
            $.ajax({
                type: "get",
                url: location.href.toString().replace("center.html", "manager.html").replace("#", "") + "&action=sign",
                success: function (result) {
                    if (result == "true") {
                        alert_n("签到成功!");
                        $(".qd_2_1").children(".name").html("我的签到");
                    } else {
                        location.href = location.href.toString().replace("center.html", "manager.html").replace("#", "") + "&action=go_signlist";
                    }
                }
            })
        } else {
            location.href = location.href.toString().replace("center.html", "manager.html").replace("#", "") + "&action=go_signlist";
        }
    }
}
function open_qzone() {
    var cText = 0;
    var cJson = 1;
    var cInt = 2;
    uexQQ.cbRegister = function (opCode, dataType, data) {
        uexQQ.cbShareWebImgTextToQzone = function (opCode, dataType, data) {
            var json = eval("(" + data + ")");
            if (json.ret == "0") {
                M._alert("分享成功!");
            } else if (json.ret == "cancle") {
                M._alert("您中途取消分享!");
            } else if (json.ret == "7") {

            } else {
                M._alert("分享失败,请重试!");
            }
        }
        var Json = eval(localStorage.ShareCon);
        uexQQ.shareWebImgTextToQzone(Json[0].title.toString(), Json[0].describe.toString(), Json[0].url.toString(), '{"imgUrl":["' + Json[0].image.toString() + '","' + Json[0].image.toString() + '"]}');

    }
    uexQQ.register("tencent1102388611");
    //   
}
var appId = "wx0c199eb68d5190a6";
function open_wx(sence) {
    uexWeiXin.registerApp(appId);
    uexWeiXin.cbIsWXAppInStalled = function (opId, dataType, data) {
        uexWindow.alert("提示", "检测到您未安装微信,是否安装微信:" + data, "确定");
    }
    uexWeiXin.isWXAppInstalled();
    var Json = eval(localStorage.ShareCon);
    if (localStorage.ClientType == "ios") {
        uexWeiXin.cbSendImageContent = function (opId, dataType, data) {
            if (data == 0) {
                M._alert("分享成功!");
            }
            else
                if (data == -2) {
                    M._alert("您中途取消分享!");
                }
                else
                    if (data == -3) {
                        M._alert("分享失败,请重试!");
                    }
}
uexWeiXin.sendImageContent(sence, Json[0].image, "", Json[0].url, Json[0].title, Json[0].describe)
}
else {
    uexWeiXin.cbSendTextContent = function (opId, dataType, data) {
        if (data == 0) {
            M._alert("分享成功!");
        }
        else
            if (data == -2) {
                M._alert("您中途取消分享!");
            }
            else
                if (data == -3) {
                    M._alert("分享失败,请重试!");
                }
}

uexWeiXin.sendTextContent(sence, Json[0].title + " " + Json[0].describe + " " + Json[0].url);
}
}