if (M.urlQuery("province")) {
    $("#tele").val(M.urlQuery("tel"));
    $("#nam").val(decodeURI(M.urlQuery("name")));
    $("#detail_add").val(decodeURI(M.urlQuery("addr")));
    AddressByNameInit(document.getElementById("province"), decodeURI(M.urlQuery("province")), document.getElementById("city"), decodeURI(M.urlQuery("city")), document.getElementById("district"), decodeURI(M.urlQuery("area")), document.getElementById("town"));
}

function Country() {
    var country = $("#country").val();
    if (country == "中国") {
        $("#p_province").css("display","block");
        $("#p_city").css("display", "block");
        $("#p_district").css("display", "block");
        $("#p_town").css("display", "block");
    } else {
        $("#p_province").css("display", "none");
        $("#p_city").css("display", "none");
        $("#p_district").css("display", "none");
        $("#p_town").css("display", "none");
    }
}