for(var i=0;i<area.length;i++){
     $(".initial_border").append('<div class="initial">'+area[i]["initial"]+'</div>');
}

$(".initial").click(function() {

     $(this).addClass('initial_active').siblings().removeClass('initial_active');

     $(".choose_area").empty();
     var index=$(this).index();
     for(var i=0;i<area[index].city.length;i++){
       $(".choose_area").append('<div class="area">'+area[index].city[i]+'</div>');
     }

	 $(".area").click(function() {
	     $(".search").text($(this).html());
	 });

	$(".area").click(function() {
		$(this).addClass('active').siblings().removeClass('active');
	});

});


var banner=$('#top_nav').height();

$('#banner_height').height(banner);