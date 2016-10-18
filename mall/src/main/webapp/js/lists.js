$(function(){
    function a(){
        var a = $(".g-box>section>a>img").width();
        $(".g-box>section>a>img").height(a)
    }
    window.sessionStorage && !window.sessionStorage.avr && (window.sessionStorage.avr = ""), $("#J-listgoods").addClass(window.sessionStorage.avr), $(document).on("touchend", ".J-avr", function(){
        $("#J-listgoods").hasClass("avr") ? ($("#J-listgoods").removeClass("avr"), window.sessionStorage.avr = "", $(".J-avr").find("img:first").show(), $(".J-avr").find("img:last").hide()) : ($("#J-listgoods").addClass("avr"), window.sessionStorage.avr = "avr", $(".J-avr").find("img:first").hide(), $(".J-avr").find("img:last").show()), a()
    }), a(), $(window).resize(function(){
        a()
    }), initLoadMore({
        targetSelector: "#J-listgoods ul",
        tpl: $("#tpl_item_lists").html()
    })
});
