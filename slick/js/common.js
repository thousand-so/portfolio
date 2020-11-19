var hoseo = window.hoeso || {};
hoseo.faculty = window.hoseo.faculty || {};

hoseo.faculty = (function($) {
    var common = {

        slide : function(el) {
            var $layer = $(el);
            var $slider = $layer.find('.slider');

            if($slider.length > 0) {
                $slider.each(function() {
                    $(this).slick({
                        dots:false,
                        speed:250,
                        infinite:true
                    })
                })
            }
        },
        //slider와 썸네일 이미지 연결하는 slick method는 'slickGoTo'.
        slideTab: function(el) {
            var $layer = $(el);
            var $slideTab = $layer.find('.slider_tab_wrap .slide_tab');
            $slideTab.on('click', function() {
                var $slickSlide = $layer.find('.slider.slick-slider');
                if(!$slickSlide.is(':animated')) {
                    console.log('!animated');
                    var slideIdx = $(this).index();
                    console.log(`this(tab)의 인덱스는 ${slideIdx} 번 입니다`);
                    $(this).siblings().removeClass('on');
                    $(this).addClass('on');
                    $(this).closest('#container').find('.slider').slick('slickGoTo', slideIdx);
                }
            })
        },
        //slider 이동에 따른 썸네일 on효과 및 이미지 연동
        slideTabSet: function(el) {
            var $layer = $(el);
            var $slider = $layer.find('.slider');
            $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                if(!$slider.is(':animated')) {
                    $(this).parent().siblings('.slider_tab_wrap').find('.slide_tab').removeClass('on');
                    $(this).parent().siblings('.slider_tab_wrap').find('.slide_tab').eq(nextSlide).addClass('on');
                    common.thumbnailSet();
                }
            })
        },
        //썸네일 호버에따른 data-img 변경
        thumbnailSet : function() {
            $('.slider_tab_wrap .slide_tab').each(function() {
                var onSrc = $(this).find('img').attr('data-on'),
                    offSrc = $(this).find('img').attr('data-off');
                if($(this).hasClass('on')) {
                    $(this).find('img').attr('src', onSrc);
                } else {
                    $(this).find('img').attr('src', offSrc);
                }
            });
        },

        init : function() {
            common.slide('#container');
            common.slideTab('#container');
            common.slideTabSet('#container');
        }
    }
    $(document).ready(function() {
        common.init();
    });
    return {

    }
})(jQuery);