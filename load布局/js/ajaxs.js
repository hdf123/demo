//rem适配
	(function(win,doc){
	    //浏览器缩放大小时
	    win.onresize=function(){
	        change();
	    };
	    change();
	    function change(){
	        var Fs=doc.documentElement.clientWidth,fg="",fk="";
	        if(Fs>=310&&Fs<=330){//320
	        	fg=100;//字体大小为100px;
	        }else if(Fs>=355&&Fs<=365){//360
	        	fg=112.5;
	        }else if(Fs>=370&&Fs<=380){//375
	        	fg=117.1875;
	        }else if(Fs>=410&&Fs<=420){//414、411
	        	fg=128.4375;
	        }else if(Fs>=765&&Fs<=770){//768
	        	console.log(11111111);
	        	fg=240;
	        }else if(Fs>=1020&&Fs<=1030){//1024
	        	console.log(11111111);
	        	fg=320;
	        }else{
	        	fg=100;
	        }
	        var nFs=Fs/(Fs/fg);
	        doc.documentElement.style.fontSize=nFs+'px';
	    }
	})(window,document);
//ajax封装调用
	var urs="";
	function ajaxsd(url,async,type,data,suFn,erFn){
		$.ajax({
			url:urs+url,
	 		xhrFields:{
	           withCredentials:true
	       	},
	//     	async:false,
			type:type,
	        dataType : "json",
	        data:data,
			success: function(data){
				suFn(data);
			},error: function(error){
	            erFn(error);
	            return function(){
	            	alert("登录已失效，请重新登录");
	            }
	        }
		});
	}

//上拉加载
//_loadIndex 为请求的页数    _loadState为请求状态  0 可以请求  1 正在请求  2 请求结束
	var _loadIndex =1,
	    _loadState = 0;
	function loadmore(element,url,type,dataObj,successFn,errorFn) {
	    $(element).on("scroll",function(){
	        //当前可视容器高度
	        var _elementHeight = $(element).outerHeight(),
	            //当前滚动区域高度
	            _elementChildHeight = $(element).children().outerHeight(),
	            //滚动条高度
	            _elementScroll = $(element).scrollTop();
	        //滚动区域 - 滚动条高度 > 可视高度  就是还可以滚动  表示没有滚动到底部  否则就到了底部
	        if(_elementChildHeight - _elementScroll - 10 > _elementHeight){            
	            //console.log('没到底') 
	        }else {
	            //console.log('到底了')           
	            //当状态为0 的时候进行加载，防止重复加载
	            if(_loadState == 0){       
	                //状态更新为1
	                _loadState = 1;
	                //增加页数
	                _loadIndex += 1;
	                //添加正在加载loadding
	                $(element).append('<p class="nowLoad">正在加载...</p>');
	                //请求当前页数ajax
	                ajaxLoad(_loadIndex);
	            }
	        }
	    });    
	    //ajax请求
	    function ajaxLoad(page) {        
	        //更新发向服务器的数据，添加页数key值
	        dataObj.page = page;
	        $.ajax({
	            url:urs+url,
		 		xhrFields:{
		           withCredentials:true
		       	},
	            type:type,
	            dataType:'json',
	            data:dataObj,
	            success:function (data) {
	                //数据渲染  ajajx回调
	                successFn(data);
	               //当数据不为空的时候，更新状态
	                if(data.length > 0){
	                    //更新状态 为 0
	                    _loadState = 0;
	                    //删除正在加载loadding
	//                  $('.nowLoad').remove();
	                    function hg(){
	                    	$(".nowLoad").remove();
	                    }
	                    setTimeout(hg,1200);
	                }else {                    
	                    //当数据长度小于等于0的时候，代表没有数据了，更新状态为2
	                    _loadState = 2;                    
	                    //删除正在加载loadding
	                    $('.nowLoad').remove();                    
	                    //更换loadding为没有数据
	                    $(element).after('<p class="endLoad">没有数据了...</p>');
	                    function fg(){
	                    	$(".endLoad").remove();
	                    }
	                    setTimeout(fg,1200);
	                }                
	            },
	            error:function (err) {                
	                //请求失败loadding
	                errorFn(err);                
	            }
	        })
	    }
	};
//上拉加载调用js
	/*loadmore('#wrapper','/store/tradeapi','post',{},function (data) {
	    $.each(data.data.list,function (key,val) {
	        $('#wrapper ul').append();
	    });
	},function () {   
	});*/


//地址栏传参
	function getRequest() {
  		var url=window.location.search; //获取url中"?"符后的字串
  		var theRequest = new Object();
  		if (url.indexOf("?") != -1) {
    		var str = url.substr(1);
    		strs = str.split("&");
    		for(var i = 0; i < strs.length; i ++) {
      			theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
    		}
  		}
  		return theRequest;
	}
	getRequest();//全部参数
	
	
//计算时间
	function times(time){
		var timea="";
		var time=parseInt(time/1000);//秒
		var fen=parseInt(time/60);//分
		var shi=parseInt(fen/60);//时
		var ri=parseInt(shi/24);//天
		var timestamp=new Date().getTime();//当前时间戳
		var kk=timestamp-time;//发表时的时间戳
		getMyDate(kk);
		function getMyDate(str){
		    var oDate = new Date(str),
		        oYear = oDate.getFullYear(),//年
		        oMonth = oDate.getMonth()+1,//月
		        oDay = oDate.getDate(),//日
		        oHour = oDate.getHours(),//时
		        oMin = oDate.getMinutes(),//分
		        oSen = oDate.getSeconds(),//秒
		        oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay);//最后拼接时间
		    return oTime;
		};
		//补0操作
		function getzf(num){
		    if(parseInt(num) < 10){
		        num = '0'+num;
		    }
		    return num;
		}
		if(time<60){
			timea=time+"秒前";
		}else if(fen<60){
			timea=fen+"分钟前";
		}else if(shi<24){
			timea=shi+"小时前";
		}else if(ri<7){
			timea=ri+"天前";
		}else{
			timea=getMyDate(kk);
		}
		return timea;
	}
//textarea
	function textareas(){
		//设置 textarea 的高度随着 内容 增加 自适应
		$(".txt").height($(".txt")[0].scrollHeight);
		$(".txt").on("keyup keydown", function(){
		    $(this).height(this.scrollHeight);
		})
	}
//loading
	function loading(){
		return html ='<div id="loading" style="width:100%;height:100%;background:#000000;filter:alpha(opacity=50);opacity:0.2;text-align:center;position:absolute;left:0px;top:0px;"><div style="width:32px;height:32px;position:fixed;top:45%;left:50%;margin-left:-16px;z-index:1000;"><img src="../img/loading.gif" /></div></div>';
	}
//图片加载失败时，动态添加也包含在内
	document.addEventListener("error", function (e) {
	  var elem = e.target;
	  if (elem.tagName.toLowerCase() == 'img') {
	    elem.src ="";
	  }
	}, true);



