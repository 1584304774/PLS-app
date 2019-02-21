window.onload = function(){
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
	function HtmlVal(index,obj){
		return $("span").eq(index).html(obj);
	}
	$("h2:last").on("click",function(){
		location.href = "index.html";
	})
}
