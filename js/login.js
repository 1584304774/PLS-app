window.onload = function(){
	var $btn = $("#btn"),
		$uname = $("#uname"),
		$pwd = $("#pwd"),
		$s1 = $("#s1"),
		$s2 = $("#s2"),
		$s3 = $("#s3");
	//将string类型转为object类型,转为object类型后可以直接获取里面的键
	var str = getCookie("infor");
	if(str != ""){//先取出cookie,如果存在则执行下面代码
		var arr = JSON.parse(str);
		var unameVal = arr.uname;
		var pwdVal = arr.pwd;
	}
	var flagName = null;
	$uname.on("blur",function(){
		if(unameVal == $uname.val()){
			$s1.html("✔");
			$s1.css("color","#000");
			flagName = true;
		}else{
			$s1.html("✖");
			$s1.css("color","#f00");
			flagName = false;
		}
	})
	var flagPwd = null;
	$pwd.on("blur",function(){
		if(pwdVal == $pwd.val()){
			$s2.html("✔");
			$s2.css("color","#000");
			flagPwd = true;
		}else{
			$s2.html("✖");
			$s2.css("color","#f00");
			flagPwd = false;
		}
	})
	$btn.on("click",function(){
		if(flagName && flagPwd){
			location.href = "index.html";
		}else{
			//若用户名有错误或者是密码有错误，则登录失败，提示有错误，让用户检查，用户可选择“忘记密码”选项对密码进行修改
			$s3.html("用户名或密码错误!");
		}
	})
}
