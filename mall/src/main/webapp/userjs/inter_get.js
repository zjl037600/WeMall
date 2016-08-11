function AddShare(sid) {
    M._prompt("请输入要转赠的积分值", ["取消"], ["确定"], function (value) {
        if (parseInt(value) < 1) {
            alert("对不起！转赠积分的最少为1");
            return false;
        }
        if (parseInt(num) >= parseInt(value)) {
            M.jsonp("/vshop/user_inter_get.html?action=AddShare&sid=" + sid + "&num=" + value, function (data) {
                var result = data.result;
                if (result == "true") {
                    location.reload();

                } else if (result == "count") {
                    alert("对不起！您转赠积分的次数已超过限量");
                } else if (result == "num") {
                    alert("对不起！您转赠的积分超过限额:" + num);
                } else if (result == "fail") {
                    alert("对不起！您的积分不足。");
                } else {
                    alert("对不起，操作失败,请重试!");
                }
            });
        }
        else {
            alert("对不起！您转赠的积分超过限额:" + num);
        }
    }, function () { }, 1);
}

function OpenShare(sid, igid, state) {
    M._confirm("确定"+(state=="1"?"关闭":"开启")+"转赠?", ["取消"], ["确定"],function (){
        M.jsonp("/vshop/user_inter_get.html?action=OpenShare&sid=" + sid + "&igid=" + igid + "&state=" + state, function (data) {
            var result = data.result;
            if (result == "true") {
                if (state == "0") {
                    alert("开启成功!");
                }  else {
                    alert("已关闭赠送!");
                }
                location.reload();

            } else if (result == "count") {
                alert("对不起！您转赠积分的次数已超过限量");
            } else if (result == "fail") {
                alert("对不起！您的积分不足。");
            } else {
                alert("对不起，操作失败,请重试!");
            }
        });
    });
}


var cardid = "";
var issub = "0";
var isGet = 0;
function GetInter(cardid) {
    if (isGet == 1) {
        return;
    }
    isGet = 1;
    $("#btn_getinter").html("请稍后...");
    $("#btn_getinter").addClass("disbled");
    M.jsonp(location.href + "&action=GetInter", function (data) {
        issub = "1";
        $("#btn_getinter").removeClass("disbled");
        $("#btn_getinter").html("立&nbsp;即&nbsp;领&nbsp;取");
        if (data.state == "true") {
            alert("领取成功!");
            location.reload();
        } else if (data.state == "login") {
            alert("请先登录!");
            location.href = "/vshop/login.html?sid=" + data.msg;
        } else {
            alert_n(data.msg);
        }
    })
}