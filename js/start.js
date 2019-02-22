window.onload = function(){
	var $register = $("#register");
	var $login = $("#login");
	var $img = $("img");
	//背景虚化
	setInterval(function(){
		$img.animate({opacity : 0.4},2000,function(){
			$img.animate({opacity : 0.8},2000)
		})
	},5000);
	$register.on("click",function(){
		location.href = "register.html";
	})
	$login.on("click",function(){
		location.href = "login.html";
	})
}
