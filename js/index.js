window.onload = function(){
	var $portrait = $("#portrait");
	var $jiahao = $(".icon-jiahao");
	var $plusSmall = $("#plusSmall");
	var plus = document.getElementById("plus");
	//点击头像显示个人注册信息
	$portrait.click(function(){
		
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
	
}

