$(document).ready(function () {
    var storage = localStorage;
    var WechatId;	
    // 读取WechatId
    function WechatIdLoad() {
	    window.localStorage.setItem("WechatId", "1234567890wertyuiosdfghj");
	    WechatId = window.localStorage.getItem("WechatId");
	    $(document).ready(function() {
	    	$.get("/restful/mall/savetestfour", function(data,
				status) {
	    		$("div.nickname span#lbl_my_name").html(data);
		});
	    });
    }
});
