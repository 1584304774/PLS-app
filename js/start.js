window.onload = function(){
	var $register = $("#register");
	var $login = $("#login");
	var $img = $("img");
	var op = 10;
	//背景虚化
	setInterval(function(){
		$img.animate({opacity : (op--)/10},1000)
		if(op/10 < 0.6){
			$img.animate({opacity : (op++)/10},500)
		}
	},1000);
	$register.on("click",function(){
		location.href = "register.html";
	})
	$login.on("click",function(){
		location.href = "login.html";
	})
}
