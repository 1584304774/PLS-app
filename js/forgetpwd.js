window.onload = function() {
	var str = getCookie("infor");
	if(str != "") {
		//str不为空说明之前已经注册过
		var arr = JSON.parse(str);
		var flagPhone = null;
		$("#phone").blur(function() {
			if($("#phone").val() == arr.phone) {
				$("#s1").html("✔");
				$("#s1").css("color", "#0f0");
				flagPhone = true;
			} else {
				$("#s1").html("✖");
				$("#s1").css("color", "#f00");
				flagPhone = false;
			}
		})
		var flagEmail = null;
		$("#uemail").blur(function() {
			if($("#uemail").val() == arr.uemail) {
				$("#s2").html("✔");
				$("#s2").css("color", "#0f0");
				flagEmail = true;
			} else {
				$("#s2").html("✖");
				$("#s2").css("color", "#f00");
				flagEmail = false;
			}
		})
		var flagSex = null;
		$(":radio").click(function() {
			if($(":radio:checked").val() == arr.sex) {
				flagSex = true;
			} else {
				flagSex = false;
			}
		})
		var flagBirth = null;
		$("#birth").blur(function() {
			if($("#birth").val() == arr.birth) {
				$("#s3").html("✔");
				$("#s3").css("color", "#0f0");
				flagBirth = true;
			} else {
				$("#s3").html("✖");
				$("#s3").css("color", "#f00");
				flagEmail = false;
			}
		})
		$("#btn").click(function() {
			if(flagPhone && flagEmail && flagSex && flagBirth) {
				//若所有的信息都填写正确则将隐藏的信息栏显示出来
				$("#information").fadeIn(1000);
				//同时将用户名和密码显示出来
				$("#uname").find("span").html(arr.uname);
				$("#pwd").find("span").html(arr.pwd);
				//点击“去登陆”进入到登录页面
				$("#back").click(function() {
					location.href = "login.html";
				})
				return false; //阻止事件冒泡
			} else {
				//若填写的信息有某个错误，则显示出提示语句
				$("#information").fadeIn(1000);
				//寻找到的用户名和密码信息隐藏，显示出提示语句
				$("#uname").css("display", "none");
				$("#pwd").css("display", "none");
				$("#back").css("display", "none");
				$("#erorrinfor").html("你确定都填对了!?");
				//点击“重新填写”回到原页面以填写正确的信息
				$("#rewrite").click(function() {
					location.href = "forgetpwd.html";
				})
				return false; //阻止事件冒泡
			}
		})
		//点击其他地方使显示的信息栏隐藏
		$(document).click(function() {
			$("#information").fadeOut(1000);
		})
	} else {
		//str为空说明该用户没有注册过
		//此时点击“查看按钮”时会有提示信息，点击“去注册”则跳到注册页面
		$("#btn").click(function() {
			$("form").append(`<div class="warn">找不到该用户,是否<span>去注册?</span></div>`);
			$(".warn").find("span").click(function() {
				location.href = "register.html";
			})
		})
	}
}