$(function() {


// var $videoList = $(".youtube .sub li .img_wrap > div");

//     $videoList.click(function(){
//             var videoSrc = $(this).attr('data-src')
//             $videoList.removeClass('on');
//             $(this).addClass('on');            
//             $('.youtube .main iframe').attr('src',videoSrc);                 
//     });

/*
var $imgList = $(".gallery .img_wrap li");

	$imgList.on("click", function() {

		var imgSrc = $(this).attr("src");
		$(this).attr("src",imgSrc);




	});


*/

	var count = 0;
	var $slideList = $(".gallery_pop .slide li");
	var totalNum = $slideList.length;
	var $imgList = $(".gallery .img_wrap li");
	// var $pageNavItem = $(".imgList").find("button");
	var speed = 1000;

	


	$(".slide_btn .next").on("click", function() {
		if(!$slideList.is(':animated')){
			count++;
			slide_move();
			paging();
		}

	});

	$(".slide_btn .prev").on("click", function() {
		if(!$slideList.is(':animated')){
			count--;
			slide_move();
			paging();
		}
	});

	function slide_move() {
		if ( count >= totalNum ) { 	// 마지막 슬라이드면 처음으로 돌아가기
			count = 0;
		}
		else if ( count < 0 ) {		// 처음 슬라이드면 마지막 슬라이드 보이기?
			count = totalNum-1;
		}

		$slideList.hide();
		$slideList.eq(count).fadeIn(speed);	// 현재 슬라이드 보이기
		fadeEffect();
	}

	function fadeEffect() {
		
		$imgList.removeClass("on");
		$imgList.eq(count).addClass("on");
		$slideList.removeClass('on');
		$slideList.eq(count).addClass("on");

	}

	$imgList.on("click", function() {	// 이미지 클릭하면 슬라이드 나타남

		var index = $(this).index();
		count = index;
		$imgList.eq(count).addClass("on");
		$slideList.eq(count).addClass("on");

		$slideList.hide();
		$slideList.show();// 현재 슬라이드 보이기
		fadeEffect();


		$(".gallery_pop").addClass("on");
	});

	function paging() { 

		
		$slideList.each(function() { $(this).removeClass("on"); });
		$slideList.eq(count).addClass('on');
	}

	$(".gallery_pop .btn_close").on("click", function() {

		$(".gallery_pop").removeClass("on");
	});
});


