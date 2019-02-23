window.onload = function(){
	var $portrait = $("#portrait");
	var $jiahao = $(".icon-jiahao");
	var $plusSmall = $("#plusSmall");
	
	//注册登录功能，包括增加账号、删除账号、修改注册信息、查看注册信息
	
	//设置个人信息栏内容
	function HtmlVal(index,obj){
		return $("#personal").find("span").eq(index).html(obj);
	}
	//设置可编辑信息栏内容
	function HtmlSet(index,obj){
		return $("#setup").find("input").eq(index).val(obj);
	}
	//获取可编辑信息栏内容
	function HtmlGet(index){
		return $("#setup").find("input").eq(index).val()
	}
	//获取index1.json中的轮播图img的src属性值
	function GetSrc(index,obj){
		$("#bigImg").find("img").eq(index).attr("src","images/xiuxian/" + obj);
	}
	//点击头像显示个人注册信息
	$portrait.click(function(){
		var str = getCookie("infor");
		if(str != ""){
			var arr = JSON.parse(str);
			HtmlVal(0,arr.uname);
			HtmlVal(1,arr.phone);
			HtmlVal(2,arr.uemail);
			HtmlVal(3,arr.pwd);
			HtmlVal(4,arr.sex);
			HtmlVal(5,arr.birth);
		}
		$("#personal").animate({left : 0},1000,function(){
			$(".icon-shezhi2").click(function(){
				var str = getCookie("infor");
				if(str != ""){
					var arr = JSON.parse(str);
					HtmlSet(0,arr.uname);
					HtmlSet(1,arr.phone);
					HtmlSet(2,arr.uemail);
					HtmlSet(3,arr.pwd);
					HtmlSet(4,arr.sex);
					HtmlSet(5,arr.birth);
				}
				//在个人信息栏出现后再点击设置出现可编辑设置栏
				$("#setup").animate({left : 0},1000,function(){
					//可编辑设置栏出现后个人信息栏隐藏
					$("#personal").fadeOut();
				});
				return false;
			})
		});
		return false;
	})
	//点击加号，一秒内将div显示，点击其他地方隐藏
	$jiahao.on("click",function(){
		$plusSmall.slideDown(1000);
		return false;//阻止事件冒泡
	})
	//点击其他地方使加号显示的部分隐藏，也可使个人信息栏隐藏
	$(document).on("click",function(){
		$plusSmall.slideUp(1000);
		$("#personal").animate({left : "-2.63rem"},1000)
	})
	//选项卡功能,点击footer中的div显示相应的section
	$("footer div").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$("section").eq(index).show().siblings().hide();
		$("footer").css("display","block");//点击时会将footer隐藏，所以需要将footer显示
		$(this).parent().parent().prev().find("h2").html($(this).find("em").html());
	})
	//使用事件委托实现点击加号下相应的文字跳转到相应的网页
	$plusSmall.on("click","h4",function(){
		if($(this).html() == "百度一下"){
			location.href = "https://www.baidu.com/";
		}else if($(this).html() == "腾讯新闻"){
			location.href = "https://news.qq.com/l/scrollnews.htm";
		}else if($(this).html() == "网易资讯"){
			location.href = "https://news.163.com/";
		}
	})
	//点击“确认修改”退出可编辑信息栏,回到个人信息栏
	$("#setup").find("h2:first").click(function(){
		$("#setup").animate({left : "-2.63rem"},1000,function(){
			//点击“确认修改”时，将编辑框内的内容保存到个人信息栏显示
			HtmlVal(0,HtmlGet(0));
			HtmlVal(1,HtmlGet(1));
			HtmlVal(2,HtmlGet(2));
			HtmlVal(3,HtmlGet(3));
			HtmlVal(4,HtmlGet(4));
			HtmlVal(5,HtmlGet(5));
			//同时将修改后的内容保存到cookie中
			var obj = {
				uname : HtmlGet(0),
				phone : HtmlGet(1),
				uemail : HtmlGet(2),
				pwd : HtmlGet(3),
				sex : HtmlGet(4),
				birth : HtmlGet(5)
			}
			obj = JSON.stringify(obj);
			setCookie("infor",obj,3);
			//可编辑信息栏退出后个人信息栏显示且设置left为0
			$("#personal").fadeIn().animate({left : 0},1000);
		});
	})
	//点击“退出登录”回到login.html页面
	$("#setup").find("h2").eq(1).click(function(){
		location.href = "login.html";
	})
	//点击“注销账号”删除cookie，且回到start.html重新注册
	$("#setup").find("h2").eq(2).click(function(){
		removeCookie("infor");
		location.href = "start.html";
	})
	
	//社交圈版块内容
	
	
	//休闲养生版块
	//搜索框聚焦后放大镜图标隐藏
	$("#search").find(":text").focus(function(){
		$("#search").find("i").css("display","none");
	})
	//通过ajax获取index1.json中的轮播图src属性值
	var deff = $.ajax({//请求服务器传递过来的数据
		type:"get",//请求数据方式
		url:"json/index1.json",//请求路径
		async:true//表示异步
	});
	deff.done(function(msg){//通过done方法获取服务器的数据，deff为deffered对象
		GetSrc(0,msg[0].src);
		GetSrc(1,msg[1].src);
		GetSrc(2,msg[2].src);
		GetSrc(3,msg[3].src);
		GetSrc(4,msg[4].src);
		GetSrc(5,msg[0].src);//第六张图片时第一张图片
	})
	
	//无缝轮播图(原生js实现)
	var index = 0;
	var banner = $id("banner");
	var ul = $id("bigImg");
	var list = $id("smallImg").children;
	setInterval(auto,3000);
	function auto(){
		index++;//下标自增1
		for(var i = 0;i < list.length;i++){
			//排他思想：先将所有的类名清空，只有当前下标的类名才为current
			list[i].className = "";
		}
		//边界处理，当下标为5时，图片显示的是第六张图片，实际上是第一张图片（HTML结构），所以当出现下标溢出时，应该使下标指向第二张图片（index为1），才能起到无缝轮播的效果
		if(index == 6){
			index = 1;
			ul.style.left = 0;
		}
		//下标值最大只有4，所以当index为5时需要重置为0，才能起到无缝轮播的效果
		//将当前下标的类名加上current
		list[index == 5 ? 0 : index].className = "current";
		//调用运动函数，ul向左移动 的距离为一张图片的宽度*当前的下标值
		startMove(ul,{left : -index*ul.children[0].offsetWidth});
		
	}
	//每个小按钮自动旋转
	var deg = 45;
	setInterval(function(){
		deg++;
		for(var i = 0;i < list.length;i++){
			if(deg == 360){
				deg = 0;
			}
			list[i].style.transform = "rotate(" + deg + "deg)";
		}
	},100)
	
		
	
	//缓压版块
	
	
	//上班模式版块
}

