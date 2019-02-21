//存cookie
function setCookie(name,val,day){
	var d = new Date();
	d.setDate(d.getDate() + day);
	document.cookie = name + "=" + val + ";expires=" + d;
}

//取cookie
function getCookie(name){
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i = 0;i < arr.length; i++){
		var cur = arr[i].split("=");
		if(cur[0] == name){
			return cur[1];
		}
	}
	return "";
}

//删除cookie
function removeCookie(name){
	setCookie(name,"",-1);
}