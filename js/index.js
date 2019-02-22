window.onload = function(){
	var $portrait = $("#portrait");
	var $jiahao = $(".icon-jiahao");
	var $plusSmall = $("#plusSmall");
	var plus = document.getElementById("plus");
	function HtmlVal(index,obj){
		return $("#personal").find("span").eq(index).html(obj);
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
		$("#personal").animate({left : 0},1000);
		return false;
	})
	//点击加号，一秒内将div显示，点击其他地方隐藏
	$jiahao.on("click",function(){
		$plusSmall.slideDown(1000);
		return false;//阻止事件冒泡
	})
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
	
}

