window.onload = function(){
	var $uname = $("#uname"),
		$phone = $("#phone"),
		$uemail = $("#uemail"),
		$pwd = $("#pwd"),
		$surepwd = $("#surepwd"),
		$submit = $("#submit"),
		$s1 = $("#s1"),
		$s2 = $("#s2"),
		$s3 = $("#s3"),
		$s4 = $("#s4"),
		$s5 = $("#s5"),
		$s6 = $("#s6");
	var flagName = null;
	$uname.on("blur",function(){
		var reg1 = /^(\w{6,})|([\u4e00-\u9fa5])$/;
		var unameVal = $uname.val();
		if(reg1.test(unameVal)){
			$s1.html("✔");
			$s1.css("color","#0f0");
			flagName = true;
		}else{
			$s1.html("✖");
			$s1.css("color","#f00");
			flagName = false;
		}
	})
	var flagPhone = null;
	$phone.on("blur",function(){
		var reg2 = /^[1][3,4,5,7,8][0-9]{9}$/;
		var phoneVal = $phone.val();
		if(reg2.test(phoneVal)){
			$s2.html("✔");
			$s2.css("color","#0f0");
			flagPhone = true;
		}else{
			$s2.html("✖");
			$s2.css("color","#f00");
			flagPhone = false;
		}
	})
	var flagEmail = null;
	$uemail.on("blur",function(){
		var reg3 = /^\w+@\w+(\.\w+)+$/;//123@qq.com.cn
		var uemailVal = $uemail.val();
		if(reg3.test(uemailVal)){
			$s3.html("✔");
			$s3.css("color","#0f0");
			flagEmail = true;
		}else{
			$s3.html("✖");
			$s3.css("color","#f00");
			flagEmail = false;
		}
	})
	var flagPwd = null;
	$pwd.on("blur",function(){
		var reg4 = /^\w{6,12}$/;
		var pwdVal = $pwd.val();
		if(reg4.test(pwdVal)){
			$s4.html("✔");
			$s4.css("color","#0f0");
			flagPwd = true;
		}else{
			$s4.html("✖");
			$s4.css("color","#f00");
			flagPwd = false;
		}
	})
	var flagSurePwd = null;
	$surepwd.on("blur",function(){
		var upwdVal = $pwd.val();
		var surepwdVal = $surepwd.val();
		if(surepwdVal == upwdVal && surepwdVal != ""){
			$s5.html("✔");
			$s5.css("color","#0f0");
			flagSurePwd = true;
		}else{
			$s5.html("✖");
			$s5.css("color","#f00");
			flagSurePwd = false;
		}
	})
	$submit.on("click",function(){
		if(flagName && flagPhone && flagEmail && flagPwd && flagSurePwd){
			var obj = {
				uname : $uname.val(),
				phone : $phone.val(),
				uemail : $uemail.val(),
				pwd : $pwd.val()
			};
			obj = JSON.stringify(obj);
			setCookie("infor",obj,3);
			location.href = "login.html";
		}else{
			$s6.html("所填信息有错误!");
		}
	})
	
}
