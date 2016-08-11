//隐藏订单
function Hide(vo_no) {
    M._confirm("确定隐藏该订单吗?", ["取消"], ["确定"], function () {
        M._loading(false);
        M.jsonp(M.h5Href + "&action=hide&vo_no=" + vo_no, function (msg) {
            M._loading(true);
            if (msg.state == "1") {
                $("#order" + vo_no).hide();
                var state4 = $("#state4").html();
                $("#state4").html(parseInt(state4) - 1);
                M._alert("操作成功");
            } else {
                M._alert("操作失败")
            }
        });
    })
}