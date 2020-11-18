
    var latte = window.latte || {};

    latte = (function($){
        var common = {
            cat : function() {
                var sec_1 = ["works_top0 works_left0", "works_top0 works_left2", "works_top1 works_left0", "works_top1 works_left1", "works_top1 works_left2", "works_top2 works_left0", "works_top2 works_left1", "works_top3 works_left0", "works_top3 works_left1", "works_top3 works_left2"],
                    sec_2 = ["works_top0 works_left0", "works_top0 works_left1", "works_top1 works_left0", "works_top1 works_left1", "works_top1 works_left2", "works_top2 works_left0", "works_top2 works_left2", "works_top3 works_left0", "works_top3 works_left1", "works_top3 works_left2"],
                    sec_3 = ["works_top0 works_left0", "works_top0 works_left1", "works_top0 works_left2", "works_top1 works_left1", "works_top1 works_left2", "works_top2 works_left0", "works_top2 works_left1", "works_top3 works_left0", "works_top3 works_left1", "works_top3 works_left2"];

                $('.first_set').each(function() {
                    var length = $(this).find('li').length;
                    switch(length) {
                        case 1 : $(this).css("padding-bottom", "33.8461%");
                        case 2 : $(this).css("padding-bottom", "33.8461%");
                            break;
                        case 3 : $(this).css("padding-bottom", "67.6923%");
                            sec_1[2] = "works_p2_top1";
                        case 4 : $(this).css("padding-bottom", "67.6923%");
                            sec_1[3] = "works_p2_top1";
                            sec_1[4] = "works_p2_top1 works_left1";
                            // sec_1[4] = "works_p2_top1 ";
                            break;
                        case 5 : $(this).css("padding-bottom", "101.5384%");
                            sec_1[2] = "works_p3_top1";
                            sec_1[3] = "works_p3_top1 works_left1";
                            sec_1[4] = "works_p3_top1 works_left2";
                        case 6 : $(this).css("padding-bottom", "101.5384%");
                            sec_1[2] = "works_p3_top1";
                            sec_1[3] = "works_p3_top1 works_left1";
                            sec_1[4] = "works_p3_top1 works_left2";
                            sec_1[5] = "works_p3_top2";
                        case 7 : $(this).css("padding-bottom", "101.5384%");
                            sec_1[2] = "works_p3_top1";
                            sec_1[3] = "works_p3_top1 works_left1";
                            sec_1[4] = "works_p3_top1 works_left2";
                            sec_1[5] = "works_p3_top2";
                            sec_1[6] = "works_p3_top2 works_left1";
                            break;
                        case 8 : $(this).css("padding-bottom", "135.3846%");
                        case 9 : $(this).css("padding-bottom", "135.3846%");
                        case 10 : $(this).css("padding-bottom", "135.3846%");
                            break;
                    }
                    $(this).find('li').each(function(index){
                        $(this).addClass(sec_1[index]);
                    });
                });


            },
            init : function() {
                this.cat();
            }
        };

    $(document).ready(function() {
        common.init();
    });

    return {

    }

})(jQuery);