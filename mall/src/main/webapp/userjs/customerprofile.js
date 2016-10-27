   var WechatId;	
	var customer = {
	    nikename:"OK",
		realname:"OKOK1",
		sex:"男",
		birthday:"1993年2月3日",
		phone:"1232345545",
		wechatid:3443545,
		qqid:5645767,
	    email:"11111@qq.com",
		job:"teacher",
		place:"中国陕西省西安市高新区科技二路",			
		};	
	
	function createcustomer(name) {
        var s = Object.create(customer);
        s.nikename = "First";
        return s;
    }
	
    function userprofileload() {
	
		var user = createcustomer();		
        /*
	    window.localStorage.setItem("nikename", "阿玛尼");
	    window.localStorage.setItem("realname", "阿玛尼2");
		window.localStorage.setItem("sex", "男");
	    window.localStorage.setItem("birthday", "1993年2月3日");
	    window.localStorage.setItem("phone", "3213");
	    window.localStorage.setItem("wechaid", "123");
	    window.localStorage.setItem("qqid", "435");
		window.localStorage.setItem("email", "11111@qq.com");
	    window.localStorage.setItem("job", "teacher");
	    window.localStorage.setItem("place", "中国陕西省西安市高新区光电园");*/
		
		
	    user.nikename = window.localStorage.getItem("nikename");
	    user.realname = window.localStorage.getItem("realname");
	    user.sex = window.localStorage.getItem("sex");
	    user.birthday = window.localStorage.getItem("birthday");
	    user.phone = window.localStorage.getItem("phone");
	    user.wechatid = window.localStorage.getItem("wechatid");
	    user.qqid = window.localStorage.getItem("qqid");
	    user.email = window.localStorage.getItem("email");
	    user.job = window.localStorage.getItem("job");
	    user.place = window.localStorage.getItem("place");
		
	    var jsonuser = JSON.stringify(user);
		var user2= createcustomer();
		user2 = JSON.parse(jsonuser);
	    
		debugger		
        $("span#nikename").html(user2.nikename);
		$("span#realname").html(user2.realname);
		$("span#sex").html(user2.sex);	
		$("span#birthday").html(user2.birthday);	
		$("span#phone").html(user2.phone);	
        $("span#wechatid").html(user2.wechatid);
		$("span#qqid").html(user2.qqid);
		$("span#email").html(user2.email);	
		$("span#job").html(user2.job);	
		$("span#place").html(user2.place);			
    }
	
    function userprofilesave() {
		var user = createcustomer();
		
		user.nikename = $("#nikename").val();
		user.realname = $("#realname").val();
		user.sex = $("#sex").val();
		user.birthday = $("#birthday").val();
		user.phone = $("#phone").val();
		user.wechatid = $("#wechatid").val();
		user.qqid = $("#qqid").val();
		user.email = $("#email").val();
		user.job = $("#job").val();
		user.place = $("#place").val();			

	    var jsonuser = JSON.stringify(user);
		var user2= createcustomer();
		user2 = JSON.parse(jsonuser);
		
	    window.localStorage.setItem("nikename", user2.nikename);
	    window.localStorage.setItem("realname", user2.realname);
		window.localStorage.setItem("sex", user2.sex);
	    window.localStorage.setItem("birthday", user2.birthday);
	    window.localStorage.setItem("phone", user2.phone);
	    window.localStorage.setItem("wechatid", user2.wechatid);
	    window.localStorage.setItem("qqid", user2.qqid);
		window.localStorage.setItem("email", user2.email);
	    window.localStorage.setItem("job", user2.job);
	    window.localStorage.setItem("place", user2.place);
		
		var user1 = createcustomer();		
	    user1.nikename = window.localStorage.getItem("nikename");
	    user1.realname = window.localStorage.getItem("realname");
	    user1.sex = window.localStorage.getItem("sex");
	    user1.birthday = window.localStorage.getItem("birthday");
	    user1.phone = window.localStorage.getItem("phone");
	    user1.wechatid = window.localStorage.getItem("wechatid");
	    user1.qqid = window.localStorage.getItem("qqid");
	    user1.email = window.localStorage.getItem("email");
	    user1.job = window.localStorage.getItem("job");
	    user1.place = window.localStorage.getItem("place");
		
		if(user1.nikename === user.nikename){
		    alert('恭喜您，资料修改成功'); window.location.replace('user_profile.html');
		}else{
			alert(result == "" ? '修改失败' : result);
		}
			
    }	