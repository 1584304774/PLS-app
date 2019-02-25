window.onload = function() {
	$("#btn").click(function(){
		var cookieInfo = getCookie("infor");
		if(cookieInfo != 0){//说明已经注册过
			//取出每一条数据
			for(var i = 0;i < cookieInfo.length;i++){
				//遍历每一条数据中的uname值，如果当前输入框的值与其中一条数据的uname值相等，则结束循环
				if($("#uname").val() == cookieInfo[i].uname){
					var index = i;//当前符合条件的数据的下标
					if($("#phone").val() == cookieInfo[index].phone && $("#uemail").val() == cookieInfo[index].uemail && $(":radio:checked").val() == cookieInfo[index].sex && $("#birth").val() == cookieInfo[index].birth){
						//若所有的信息都填写正确则将隐藏的信息栏显示出来
						$("#information").fadeIn(1000);
						//同时将用户名和密码显示出来
						$("#username").find("span").html(cookieInfo[index].uname);
						$("#pwd").find("span").html(cookieInfo[index].pwd);
						//点击“去登陆”进入到登录页面
						$("#back").click(function() {
							location.href = "login.html";
						})
					}else{//若信息填写不正确
						$("#information").fadeIn(1000);
						$("#username").css("display", "none");
						$("#pwd").css("display", "none");
						$("#back").css("display", "none");
						$("#erorrinfor").html("你确定都填对了!?");
						//点击“重新填写”回到原页面以填写正确的信息
						$("#rewrite").html("重新填写");
						$("#rewrite").click(function() {
							location.href = "forgetpwd.html";
						})
					}
					break;
				}
			}
		}else{//说明没注册
			//此时点击“查看密码”时会有提示信息，点击“去注册”则跳到注册页面
			$("#btn").click(function() {
				$("form").append(`<div class="warn">找不到该用户,是否<span>去注册?</span></div>`);
				$(".warn").find("span").click(function() {
					location.href = "register.html";
				})
			})
		}
	})
}