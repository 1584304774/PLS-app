window.onload = function() {
	var $uname = $("#uname"),
		$phone = $("#phone"),
		$uemail = $("#uemail"),
		$pwd = $("#pwd"),
		$surepwd = $("#surepwd"),
		$birth = $("#birth"),
		$submit = $("#submit"),
		$s1 = $("#s1"),
		$s2 = $("#s2"),
		$s3 = $("#s3"),
		$s4 = $("#s4"),
		$s5 = $("#s5"),
		$s6 = $("#s6"),
		$s7 = $("#s7");
	var flagName = null;
	$uname.on("blur", function() {
		var reg1 = /^(\w{6,})|([\u4e00-\u9fa5])$/;
		var unameVal = $uname.val();
		if(reg1.test(unameVal)) {
			$s1.html("✔");
			$s1.css("color", "#0f0");
			flagName = true;
		} else {
			$s1.html("✖");
			$s1.css("color", "#f00");
			flagName = false;
		}
	})
	var flagPhone = null;
	$phone.on("blur", function() {
		var reg2 = /^[1][3,4,5,7,8][0-9]{9}$/;
		var phoneVal = $phone.val();
		if(reg2.test(phoneVal)) {
			$s2.html("✔");
			$s2.css("color", "#0f0");
			flagPhone = true;
		} else {
			$s2.html("✖");
			$s2.css("color", "#f00");
			flagPhone = false;
		}
	})
	var flagEmail = null;
	$uemail.on("blur", function() {
		var reg3 = /^\w+@\w+(\.\w+)+$/; //123@qq.com.cn
		var uemailVal = $uemail.val();
		if(reg3.test(uemailVal)) {
			$s3.html("✔");
			$s3.css("color", "#0f0");
			flagEmail = true;
		} else {
			$s3.html("✖");
			$s3.css("color", "#f00");
			flagEmail = false;
		}
	})
	var flagPwd = null;
	$pwd.on("blur", function() {
		var reg4 = /^\w{6,12}$/;
		var pwdVal = $pwd.val();
		if(reg4.test(pwdVal)) {
			$s4.html("✔");
			$s4.css("color", "#0f0");
			flagPwd = true;
		} else {
			$s4.html("✖");
			$s4.css("color", "#f00");
			flagPwd = false;
		}
	})
	var flagSurePwd = null;
	$surepwd.on("blur", function() {
		var upwdVal = $pwd.val();
		var surepwdVal = $surepwd.val();
		if(surepwdVal == upwdVal && surepwdVal != "") {
			$s5.html("✔");
			$s5.css("color", "#0f0");
			flagSurePwd = true;
		} else {
			$s5.html("✖");
			$s5.css("color", "#f00");
			flagSurePwd = false;
		}
	})
	var flagBirth = null;
	$birth.on("blur", function() {
		var reg5 = /^\d{4}-\d{2}(-\d{2})?$/;
		var birthVal = $birth.val();
		if(reg5.test(birthVal)) {
			$s7.html("✔");
			$s7.css("color", "#0f0");
			flagBirth = true;
		} else {
			$s7.html("✖");
			$s7.css("color", "#f00");
			flagBirth = false;
		}
	})
	var arr = []; //用于存放多个用户的信息
	$submit.on("click", function() {
		if(flagName && flagPhone && flagEmail && flagPwd && flagSurePwd && flagBirth) {
			$s6.html("注册成功!稍后跳转");
			var json = {}; //用于存放一个用户的信息
			json = { //当前注册的用户信息
				uname: $uname.val(),
				phone: $phone.val(),
				uemail: $uemail.val(),
				pwd: $pwd.val(),
				sex: $(":radio:checked").val(),
				birth: $birth.val(),
				sid: 1
			};
			var flag = true; //假设为true时，可以向数组中push一个对象
			//先取出cookie中的所有用户信息，判断当前注册的用户信息是否在cookie中存在，如果存在则提示该用户已经注册
			//若不存在则将该用户信息存入arr数组中
			var cookieInfo = getCookie("infor"); //取出来的是数组
			//如果数组中有数据则判断是否当前注册的信息是否已经存在
			if(cookieInfo.length != 0) {
				//一开始先将注册的信息存入cookie中，否则后面用户注册的信息会把前面的覆盖
				arr = cookieInfo; //因为最终是将arr数组存入到cookie中 所以要将cookieInfo中的数据赋值给arr
				//判断是否当前注册的信息是否已经存在
				for(var i = 0; i < cookieInfo.length; i++) {
					//先遍历每一个存入的用户信息，如果当前注册的用户名已经在之前存在过，则提示“该用户已存在”
					if(cookieInfo[i].uname == json.uname) {
						flag = false;
						break; //只要寻找到一个存在的便可以结束遍历
					} else {
						//若当前注册的用户信息不存在，说明可以存入cookie中，则将sid+1，之后主页可根据sid来判断当前登录的用户是谁
						json.sid++;
					}
				}
			}
			if(flag) {
				//说明当前用户并没有注册
				arr.push(json);
				//将arr数组存入到cookie中
				setCookie("infor", JSON.stringify(arr), 3);
				var timer = setTimeout(function() {
					location.href = "login.html";
					clearTimeout(timer);
				}, 2000);
			} else {
				$s6.html("该用户已注册");
			}
		} else {
			//所填信息有错
			$s6.html("所填信息有错误!");
		}
	})
}