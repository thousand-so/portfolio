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
        slideTab : function() {

        },
        init : function(){
            common.slide('#container');
            common.slideTab();
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