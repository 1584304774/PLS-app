window.onload = function(){
	var $register = $("#register");
	var $login = $("#login");
	var $img = $("img");
	//背景虚化
	setInterval(function(){
		//每4秒让背景图的透明度逐渐在2秒内变为0.5，之后在2秒内逐渐变为0.8
		$img.animate({opacity : 0.5},2000,function(){
			$img.animate({opacity : 0.8},2000)
		})
	},4000);
	$register.on("click",function(){
		location.href = "register.html";
	})
	$login.on("click",function(){
		location.href = "login.html";
	})
}
