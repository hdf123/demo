//rem大小设置、ajax封装、上拉加载
	(function(win,doc){
	    //浏览器缩放大小时
	    win.onresize=function(){
	        change();
	    };
	    change();
	    function change(){
	        var Fs=doc.documentElement.clientWidth;
	        var nFs=Fs/(Fs/100);
	        //字体大小为100px;
	        doc.documentElement.style.fontSize=nFs+'px';
	    }
	})(window,document);