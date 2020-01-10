var hoseo = window.hoseo || {};
hoseo.faculty = window.hoseo.faculty || {};

hoseo.faculty = (function ($) {
    var common = {

        slide: function(element) {
            var $layer = $(element);
            var $slider = $layer.find('.slider');
            if($slider.length > 0) {
                   $slider.each(function() {
                        $(this).slick({
                            dots:false,
                            speed:250,
                            infinite:true
                        })
                   });
            }
        },
        //slider와 썸네일 이미지 연결하는 slick method는 'slickGoTo'!!!!!!!.
        slideTab : function(element) {
            var $layer = $(element);
            var $slideTab = $layer.find('.slider_tab_wrap .slide_tab');
            $slideTab.on('click', function() {
                var $slickSlide = $layer.find('.slider .slick-slide');
                if(!$slickSlide.is(':animated')) {
                    var slideIdx = $(this).index();
                    $(this).siblings().removeClass('on');
                    $(this).addClass('on');
                    $(this).closest('.slide_wrap').find('.slider').slick('slickGoTo', slideIdx);

                }
            });
        },
        //slider 이동에 따른 썸네일 on효과 , 이미지 연동
        slideTabSet : function(element) {
            var $layer = $(element);
            var $slider = $layer.find('.slider');
            $slider.on("beforeChange", function(evet,slick,currentSlide,nextSlide) {
                if(!$slider.find('.slick-slide').is(':animated')) {
                    $(this).siblings('.slider_tab_wrap').find('.slide_tab').removeClass('on');
                    $(this).siblings('.slider_tab_wrap').find('.slide_tab').eq(nextSlide).addClass('on');
                    common.thumbnailSet();
                }
            });

        },
        //썸네일 호버시 data-img 변경
        thumbnailSet : function() {
            $('.slider_tab_wrap .slide_tab.').each(function() {
                var onSrc = $(this).find('img').attr("data-on"),
                    offSrc = $(this).find('img').attr("data-off") ;
                if($(this).hasClass('on')) {
                    $(this).find('img').attr('src', onSrc)
                } else {
                    $(this).find('img').attr('src', offSrc)
                }
            })
        },
        
        // facultySlideTabHoverOn : function(){
        //     $(".faculty .slider_tab_wrap .slide_tab button").on({
        //         mouseenter: function () {
        //             if(!$(this).parent().hasClass('on')){
        //                 var onSrc = $(this).find('img').attr("data-on");
        //                 $(this).find('img').attr('src', onSrc);
        //                 $(this).parent().addClass('active');
        //             }
        //         },
        //         mouseleave: function () {
        //             if(!$(this).parent().hasClass('on')){
        //                 $(this).parent().removeClass('active');
        //                 var offSrc = $(this).find('img').attr("data-off");
        //                 $(this).find('img').attr('src', offSrc);
        //             }
        //         }
        //     });
        // },
        // facultySlideTabHoverOff : function(){
        //     $(".faculty .slider_tab_wrap .slide_tab").off('mouseenter mouseleave');
        // },
        init : function(){
            common.slide('#container');
            common.slideTab('#container');
            common.slideTabSet('#container');
        }
    }
    $(document).ready(function () {
        common.init();
        // if($("#wrapper").hasClass("major")) {
        //     main.init();
        // }
        // if($("#wrapper").hasClass("sub")) {
        //     sub.init();
        // }
    });
    return{
        // openLayer : common.openLayer,
        // closeLayer : common.closeLayer,
        // galleryArray :sub.galleryArray,
    }
})(jQuery);