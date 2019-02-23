//支持 缓冲 + 多物体 + 链式 + 完美
//  obj ： 运动的对象  
// json :存储多个attr和target
//callback ：代表一个功能    一个函数  当一个函数作为参数时，这样的函数叫做回调函数
//回调 ：回头再调用
function startMove(obj,json,callback){//{ width:3,height:200 }
	clearInterval( obj.timer );
	obj.timer = setInterval( function(){
		var flag = true;//假设值为true时  可以停止定时器了
		for( var attr in json ){
			//获取实际样式值
			var current = 0;
			if( attr == "opacity" ){
				current = getStyle( obj , attr )*100;
			}else if( attr == "zIndex" ){
				current = parseInt( getStyle( obj , attr ) );
			}else{
				current = parseInt( getStyle( obj , attr ) );
			}
			//获取速度
			var speed = (json[attr] - current)/10;
			speed = speed > 0 ? Math.ceil( speed ) : Math.floor( speed );
			
			if( json[attr] != current ){
				flag = false;//假设不成立
			}
			//设置样式继续发生变化
			if( attr == "opacity" ){
				obj.style[attr] = (current + speed)/100;
			}else if( attr == "zIndex" ){
				obj.style[attr] = json[attr];
			}else{
				obj.style[attr] = current + speed + "px";
			}
		}
	
		//循环结束后 如果flag的值还是true  就可以停止定时器了
		if( flag ){//判断结束条件 并设置样式
			clearInterval( obj.timer );
			//上一个动作完成了  开始进入到下一个动作
			//下一个动作不确定  此处有一个功能 是可变的
			if( callback ){//如果用户传递了该参数 就执行下一个动作
				callback();
			}
		}
	},30 )
}

//封装一个函数 功能是获取非行内元素样式值
function getStyle( obj ,attr ){
	if( getComputedStyle ){
		return getComputedStyle( obj,false )[attr];
	}else{
		return obj.currentStyle[attr];
	}
}
