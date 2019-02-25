window.onload = function() {
	var $portrait = $("#portrait");
	var $jiahao = $(".icon-jiahao");
	var $plusSmall = $("#plusSmall");

	//注册登录功能，包括增加账号、删除账号、修改注册信息、查看注册信息、对于注册密码和用户名的查看

	//设置个人信息栏内容
	function HtmlVal(index, obj) {
		return $("#personal").find("span").eq(index).html(obj);
	}
	//设置可编辑信息栏内容
	function HtmlSet(index, obj) {
		return $("#setup").find("input").eq(index).val(obj);
	}
	//获取可编辑信息栏内容
	function HtmlGet(index) {
		return $("#setup").find("input").eq(index).val();
	}
	//获取index1.json中的轮播图img的src属性值
	function GetSrc(index, obj) {
		$("#bigImg").find("img").eq(index).attr("src", "images/xiuxian/" + obj);
	}
	//点击头像显示个人注册信息
	$portrait.click(function() {
		var str = getCookie("infor");
		if(str != "") {
			var arr = JSON.parse(str);
			HtmlVal(0, arr.uname);
			HtmlVal(1, arr.phone);
			HtmlVal(2, arr.uemail);
			HtmlVal(3, arr.pwd);
			HtmlVal(4, arr.sex);
			HtmlVal(5, arr.birth);
		}
		//个人信息栏显示
		$("#personal").animate({
			left: 0
		}, 1000, function() {
			//之后点击设置键入可编辑信息栏
			$(".icon-shezhi2").click(function() {
				var str = getCookie("infor");
				if(str != "") {
					//说明此时已经注册过,可进行信息的修改
					var arr = JSON.parse(str);
					HtmlSet(0, arr.uname);
					HtmlSet(1, arr.phone);
					HtmlSet(2, arr.uemail);
					HtmlSet(3, arr.pwd);
					HtmlSet(4, arr.sex);
					HtmlSet(5, arr.birth);
					//在个人信息栏出现后再点击设置出现可编辑设置栏
					$("#setup").animate({
						left: 0
					}, 1000, function() {
						//可编辑设置栏出现后个人信息栏隐藏
						$("#personal").fadeOut();
					});
					return false;//阻止事件冒泡
				}else{
					//说明此时未注册,则弹出提示框“没有信息，请先去注册!”,2秒后跳转到注册页面
					$("#setup").animate({left:0},1000,function(){
						//可编辑设置栏出现后个人信息栏隐藏
						$("#personal").fadeOut();
						//提示框显示
						$("#unregistered").fadeIn(1000);
						//经过2秒后提示框消失，且跳转到注册页面
						var timer = setTimeout(function(){
							$("#unregistered").fadeOut(1000);
							location.href = "register.html";
							//清除延时器，提高效率
							clearTimeout(timer);
						},2000);
					});
				}
			})
		});
		return false;
	})
	//点击加号，一秒内将div显示，点击其他地方隐藏
	$jiahao.on("click", function() {
		$plusSmall.slideDown(1000);
		return false; //阻止事件冒泡
	})

	//点击屏幕事件
	$(document).on("click", function() {
		//点击其他地方使加号显示的部分隐藏
		$plusSmall.slideUp(1000);
		//点击其他地方使个人信息栏隐藏
		$("#personal").animate({
			left: "-2.63rem"
		}, 1000);
		//点击其他部分隐藏表情栏
		$(".face").slideUp(1000);
		//点击其他地方隐藏显示出来的showinfo
		$(".showBox").fadeOut(1000);
	})
	//选项卡功能,点击footer中的div显示相应的section
	$("footer div").click(function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$("section").eq(index).show().siblings().hide();
		$("footer").css("display", "block"); //点击时会将footer隐藏，所以需要将footer显示
		$(this).parent().parent().prev().find("h2").html($(this).find("em").html());
	})
	//使用事件委托实现点击加号下相应的文字跳转到相应的网页
	$plusSmall.on("click", "h4", function() {
		if($(this).html() == "百度一下") {
			location.href = "https://www.baidu.com/";
		} else if($(this).html() == "腾讯新闻") {
			location.href = "https://news.qq.com/l/scrollnews.htm";
		} else if($(this).html() == "网易资讯") {
			location.href = "https://news.163.com/";
		}
	})
	//点击“确认修改”退出可编辑信息栏,回到个人信息栏
	$("#setup").find("h2:first").click(function() {
		$("#setup").animate({
			left: "-2.63rem"
		}, 1000, function() {
			//点击“确认修改”时，将编辑框内的内容保存到个人信息栏显示
			HtmlVal(0, HtmlGet(0));
			HtmlVal(1, HtmlGet(1));
			HtmlVal(2, HtmlGet(2));
			HtmlVal(3, HtmlGet(3));
			HtmlVal(4, HtmlGet(4));
			HtmlVal(5, HtmlGet(5));
			//同时将修改后的内容保存到cookie中
			//当点击“确定修改”时，若每条信息都为空，则不会将修改后的内容保存到cookie中
			if((HtmlGet(0) != "") && (HtmlGet(1) != "") && (HtmlGet(2) != "") && (HtmlGet(3) != "") && (HtmlGet(4) != "") && (HtmlGet(5) != "")) {
				var obj = {
					uname: HtmlGet(0),
					phone: HtmlGet(1),
					uemail: HtmlGet(2),
					pwd: HtmlGet(3),
					sex: HtmlGet(4),
					birth: HtmlGet(5)
				}
				obj = JSON.stringify(obj);
				setCookie("infor", obj, 3);
			}
			//可编辑信息栏退出后个人信息栏显示且设置left为0
			$("#personal").fadeIn().animate({
				left: 0
			}, 1000);
		});
	})
	//点击“退出登录”回到login.html页面
	$("#setup").find("h2").eq(1).click(function() {
		location.href = "login.html";
	})
	//点击“注销账号”删除cookie，且回到start.html重新注册
	$("#setup").find("h2").eq(2).click(function() {
		removeCookie("infor");
		location.href = "start.html";
	})

	//社交圈版块内容
	//将发布的内容保存在cookie中，刷新时可以使之前发布的内容在屏幕中显示
	//点击表情显示表情栏，点击其他部分隐藏
	$(".bq").click(function() {
		$(".face").slideDown(1000);
		return false;
	})
	//点击某个表情，克隆到message中
	$(".face li").click(function() {
		var bq = $(this).find("img").clone();
		bq.css({
			"width": "0.3rem",
			"height": "0.3rem",
			"display": "inline-block"
		});
		bq.appendTo(".message");
	})
	//之前发布的几条内容也要获取用户名和时间
	var str = getCookie("infor");
	if(str != "") {
		var arr = JSON.parse(str);
		$(".msgBox").find("dd").html(arr.uname);
	}
	var nowtime = new Date();
	$(".nowtime").html(nowtime.toLocaleString());
	//点击发布内容,并将发布的内容存入cookie？？？
	$(".qqsubmit").click(function() {
		var txt = $(".message").html();
		$(".msgCon").prepend(`<div class='msgBox'>
									<dl>
										<dt><img src='images/background/background11.jpeg'/></dt>
										<dd></dd>
									</dl>
									<div class='msgTxt'>${txt}</div>
								</div>`);
		//内容发布后内容框清空
		$(".message").html("");
		//获取用户名和时间，显示在发表的内容中
		var str = getCookie("infor");
		if(str != "") {
			var arr = JSON.parse(str);
			$(".msgBox").find("dd").html(arr.uname);
		}
		$(".msgBox:first").append(`<div class="nowtime">${new Date().toLocaleString()}</div>`)
	})
	//点击每个msgBox显示相应的内容
	$(".msgCon").on("click", ".msgBox", function() {
		$(".showBox").fadeIn(1000);
		$(".showBox").find("dd").html($(this).find("dd").html());
		$(".showBox").find(".showTxt").html($(this).find(".msgTxt").html());
		$(".showBox").find(".showtime").html($(this).find(".nowtime").html());
		return false;
	});

	//休闲养生版块
	//搜索框聚焦后放大镜图标隐藏,失去焦点后显示,且清空搜索框内容
	$("#search").find(":text").focus(function() {
		$("#search").find("i").css("display", "none");
	})
	$("#search").find(":text").blur(function() {
		$("#search").find("i").css("display", "block");
		$("#search").find(":text").val("");
	})
	//通过ajax获取index1.json中的轮播图src属性值
	var deff = $.ajax({ //请求服务器传递过来的数据
		type: "get", //请求数据方式
		url: "json/index1.json", //请求路径
		async: true //表示异步
	});
	deff.done(function(msg) { //通过done方法获取服务器的数据，deff为deffered对象
		GetSrc(0, msg[0].src);
		GetSrc(1, msg[1].src);
		GetSrc(2, msg[2].src);
		GetSrc(3, msg[3].src);
		GetSrc(4, msg[4].src);
		GetSrc(5, msg[0].src); //第六张图片时第一张图片
	})

	//无缝轮播图(原生js实现)
	var index = 0;
	var banner = $id("banner");
	var ul = $id("bigImg");
	var list = $id("smallImg").children;
	setInterval(auto, 3000);

	function auto() {
		index++; //下标自增1
		for(var i = 0; i < list.length; i++) {
			//排他思想：先将所有的类名清空，只有当前下标的类名才为current
			list[i].className = "";
		}
		//边界处理，当下标为5时，图片显示的是第六张图片，实际上是第一张图片（HTML结构），所以当出现下标溢出时，应该使下标指向第二张图片（index为1），才能起到无缝轮播的效果
		if(index == 6) {
			index = 1;
			ul.style.left = 0;
		}
		//下标值最大只有4，所以当index为5时需要重置为0，才能起到无缝轮播的效果
		//将当前下标的类名加上current
		list[index == 5 ? 0 : index].className = "current";
		//调用运动函数，ul向左移动 的距离为一张图片的宽度*当前的下标值
		startMove(ul, {
			left: -index * ul.children[0].offsetWidth
		});

	}
	//每个小按钮自动旋转
	var deg = 45;
	setInterval(function() {
		deg++;
		for(var i = 0; i < list.length; i++) {
			if(deg == 360) {
				deg = 0;
			}
			list[i].style.transform = "rotate(" + deg + "deg)";
		}
	}, 100)

	//缓压版块

	//上班模式版块
	//点击“开始上班”按钮弹出蒙层覆盖整个屏幕
	/*
	已经注册过的前提下:
		输入空字符时弹出提示框“请填写解锁密码”，2秒后提示框消失
		输入正确密码时弹出提示框“欢迎回来”，2秒后蒙层和提示框消失
		输入错误密码时弹出提示框“密码错误”，2秒后提示框消失
	未注册的前提下：
		无论什么情况下，没有注册过的用户在输入任何值时点击确定按钮都会弹出提示框“注册信息已过期”，并在2秒后转到转到注册页面
	*/
	$("#startwork").click(function() {
		$("#layer").fadeIn(1000);
		$("#pwdbtn").click(function() {
			var str = getCookie("infor");
			if(str != "") {
				//说明此时该用户已经注册过
				var arr = JSON.parse(str);
				//密码正确
				if($("#startpwd").val() == arr.pwd) {
					$("#mask").fadeIn(1000);
					$("#mask").find("h3").html("欢迎回来!");
					$("#mask").find("h3").css("color", "blue");
					var timer = setTimeout(function() {
						$("#mask").fadeOut(1000);
						$("#layer").fadeOut(1000);
						//同时将输入框的内容清空
						$("#startpwd").val("");
						//2秒后完成所有动作之后删除延时器，提高效率
						clearTimeout(timer);
					}, 2000);
					//没有填写密码
				} else if($("#startpwd").val() == "") {
					$("#mask").fadeIn(1000);
					$("#mask").find("h3").html("请填写解锁密码!");
					$("#mask").find("h3").css("color", "red");
					var timer1 = setTimeout(function() {
						$("#mask").fadeOut(1000);
						clearTimeout(timer1);
					}, 2000);
					//密码错误
				} else {
					$("#mask").fadeIn(1000);
					$("#mask").find("h3").html("密码错误!");
					$("#mask").find("h3").css("color", "red");
					var timer2 = setTimeout(function() {
						$("#mask").fadeOut(1000);
						//同时将输入框的内容清空
						$("#startpwd").val("");
						clearTimeout(timer2);
					}, 2000);
				}
			} else {
				//说明此时该用户没有注册过
				$("#mask").fadeIn(1000);
				$("#mask").find("h3").html("注册信息过期!");
				$("#mask").find("h3").css("color", "red");
				var timer3 = setTimeout(function() {
					$("#mask").fadeOut(1000);
					$("#layer").fadeOut(1000);
					$("#startpwd").val("");
					location.href = "register.html";
					clearTimeout(timer3);
				}, 2000);
			}
		})
	})
}