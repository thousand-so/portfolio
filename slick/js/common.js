var hoseo = window.hoseo || {};
hoseo.faculty = window.hoseo.faculty || {};

hoseo.faculty = (function ($) {
    var common = {

        
        init : function(){
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