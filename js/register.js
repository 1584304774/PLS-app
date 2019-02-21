window.onload = function(){
	var	uname = $id("uname"),
		phone = $id("phone"),
		uemail = $id("uemail"),
		pwd = $id("pwd"),
		surepwd = $id("surepwd"),
		s1 = $id("s1"),
		s2 = $id("s2"),
		s3 = $id("s3"),
		s4 = $id("s4"),
		s5 = $id("s5");
	var flagName = true;
	uname.onblur = function(){
		var reg1 = /^\w{6,12}$/;
		var unameVal = uname.value;
		if(reg1.test(unameVal)){
			s1.innerHTML = "✔";
			s1.style.color = "#0f0";
			flagName = true;
		}else{
			s1.innerHTML = "✖";
			s1.style.color = "#f00";
			flagName = false;
		}
	}
	var flagPhone = true;
	phone.onblur = function(){
		var reg2 = /^1[3|4|5|7|8]\d{9}$/;
		var phoneVal = phone.value;
		if(reg2.test(phoneVal)){
			s2.innerHTML = "✔";
			s2.style.color = "#0f0";
			flagPhone = true;
		}else{
			s2.innerHTML = "✖";
			s2.style.color = "#f00";
			flagPhone = false;
		}
	}
}
