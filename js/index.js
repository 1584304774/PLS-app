window.onload = function(){
	//显示个人注册信息
	var $portrait = $("#portrait");
	var $jiahao = $(".icon-jiahao");
	var $plusSmall = $("#plusSmall");
	var plus = document.getElementById("plus");
	$portrait.on("click",function(){
		location.href = "personal.html";
	})
	//点击加号，一秒内将div显示，点击其他地方隐藏
	$jiahao.on("click",function(){
		$plusSmall.slideDown(1000);
		return false;//阻止事件冒泡
	})
	$(document).on("click",function(){
		$plusSmall.slideUp(1000);
	})
}

