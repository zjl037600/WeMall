  var WechatId;	
	var good_infor = {
	    goods_id:"dsfds7879sdf",
		goods_name:"�½�����",
		goods_unit:"��",
		goods_price:"49.90",
		goods_cost:"30.92",
		goods_currency_unit:"Ԫ",
		goods_inventory:35,
	    goods_addr:"�½������",
		goods_manufacture_data:"2016��10��",
		goods_description:"���������Ӫ����ֵ�ߣ����ǡ������ᡢά���ء�����̼ˮ�������14%��ˮ֭Ϊ86%�����к�����10%����0.03%���ҷ�0.12%��ÿ100�����溬ά����CԼ4.3���ˣ����������ǡ����ἰ����΢��Ԫ�أ���ʳ���ִ�83.6%",
		goods_icons1_url:"Images/56aad7c13d8fe.jpg",		
		goods_icons2_url:"Images/56aad7c13d8fe.jpg",
		goods_icons3_url:"Images/56aad7c13d8fe.jpg",
		goods_icons4_url:"Images/56aad7c13d8fe.jpg",
		goods_icons5_url:"Images/56aad7c13d8fe.jpg",
		goods_icons6_url:"Images/56aad7c13d8fe.jpg",
		goods_icons7_url:"Images/56aad7c13d8fe.jpg",
		goods_icons8_url:"Images/56aad7c13d8fe.jpg",
		goods_icons9_url:"Images/56aad7c13d8fe.jpg",
		goods_icons10_url:"Images/56aad7c13d8fe.jpg",
		};	
	
	function creategoodinfor(name) {
        var s = Object.create(good_infor);
        s.goods_name = "init";
        return s;
    }
    function good_admin_save() {
		var good = creategoodinfor();
		
		good.goods_id = $("#goods_id").val();
		good.goods_name = $("#goods_name").val();
		good.goods_unit = $("#goods_unit").val();
		good.goods_price = $("#goods_price").val();
		good.goods_cost = $("#goods_cost").val();
		good.goods_currency_unit = $("#goods_currency_unit").val();
		good.goods_inventory = $("#goods_inventory").val();
		good.goods_addr = $("#goods_addr").val();
		good.goods_manufacture_data = $("#goods_manufacture_data").val();
		good.goods_description = $("#goods_description").val();
		good.goods_icons1_url = $("#goods_icons1_url").val();
		good.goods_icons2_url = $("#goods_icons2_url").val();
		good.goods_icons3_url = $("#goods_icons3_url").val();
		good.goods_icons4_url = $("#goods_icons4_url").val();
		good.goods_icons5_url = $("#goods_icons5_url").val();
		good.goods_icons6_url = $("#goods_icons6_url").val();
		good.goods_icons7_url = $("#goods_icons7_url").val();
		good.goods_icons8_url = $("#goods_icons8_url").val();
		good.goods_icons9_url = $("#goods_icons9_url").val();
		good.goods_icons10_url = $("#goods_icons10_url").val();		

	    var jsongood = JSON.stringify(good);
		
	    window.localStorage.setItem("good_infor", jsongood);
        var jsongood2 = window.localStorage.getItem("good_infor");
    }
	
    function good_admin_load() {
	
		var good = creategoodinfor();

	    var jsongood;
	    jsongood = window.localStorage.getItem("good_infor");
		
		good = JSON.parse(jsongood);		

        $(".title").html(good.goods_name);
        $(".js-goods-price").html(good.goods_price);		
    }