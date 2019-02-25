window.onload = function() {
	var $btn = $("#btn"),
		$uname = $("#uname"),
		$pwd = $("#pwd"),
		$s1 = $("#s1"),
		$s2 = $("#s2"),
		$s3 = $("#s3");

	$btn.click(function() {
		var cookieInfo = getCookie("infor"); //取出来的是数组
		if(cookieInfo.length != 0) { //如果取出来的数组的长度不为0，则证明已经注册过
			//取出每一条数据
			for(var i = 0; i < cookieInfo.length; i++) {
				//遍历每一条数据中的uname值，如果当前输入框的值与其中一条数据的uname值相等，则结束循环
				if($uname.val() == cookieInfo[i].uname) {
					var index = i; //当前符合条件的数据的下标
					//再去比对当前符合条件的数据中的pwd值,相等则跳转到主页
					if($pwd.val() == cookieInfo[index].pwd) {
						$s3.html("登录成功！稍后跳转");
						setTimeout(function() {
							location.href = "index.html?sid=" + (index + 1);
						}, 2000);
					} else {
						$s3.html("用户名或密码错误!");
					}
					break; //找到结束循环
				}
			}
		} else {
			//取出来的数组长度为空，表示未注册,2秒后跳转到注册页面
			$s3.html("未找到该用户，请先注册!");
			var timer1 = setTimeout(function() {
				location.href = "register.html";
				clearTimeout(timer1);
			}, 2000);
		}
	})
	$("#forget").click(function() {
		location.href = "forgetpwd.html";
	})
}