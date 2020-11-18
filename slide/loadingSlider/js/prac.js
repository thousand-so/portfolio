(function($){

    "use strict";

    function Slider(selector, speed, rollingSpeed) {

        this.slider = $(selector);
        this.sliderList = null;
        this.totalNum = null;
        this.targetNum = 0;
        this.currentNum = null;
        this.prev = null;
        this.next = null;
        this.play_btn = null;
        this.navGrp = null;
        this.navItem = null;
        this.playing = false;
        this.auto = null;
        this.rollNav = null;

        this.speed = speed;
        this.rollingSpeed = rollingSpeed;

        this.init();
        this.initEvent();
    }

    Slider.prototype = {

        init : function() {

            this.sliderList = this.slider.find('li');
            this.totalNum = this.sliderList.length;
            this.prev = this.slider.find('.prev');
            this.next = this.slider.find('.next');
            this.play_btn = this.slider.find('.play_btn');
            this.navGrp = this.slider.find('.indicator ul');
            this.navItem = this.navGrp.find('li');

        },

        initEvent : function() {
            var objThis = this;
            objThis.sliderList.eq(0).css('left', '0');
            objThis.addIndi();
            objThis.play();

            this.navItem.on('click', function(){
                var index = $(this).index();
                objThis.target = $(this).index();
                // objThis.navItem.eq(index).addClass('active');
                objThis.slide(index);
            });

            this.play_btn.on('click', function(){
                if($(this).hasClass('stop')) {
                    objThis.play();
                } else {
                    objThis.stop();
                }
            });

        },

        addIndi : function() {

            for(var i = 1; i <= this.totalNum; i++) {
                var sliderNav = "<li><button><span>'slide'+ i +'번'</span></button></li>";
                this.navGrp.append(sliderNav);
            }
            this.navItem = this.navGrp.find('li');
            this.navItem.find('span').attr('style', "");
            this.navItem.removeClass('active');
            this.navItem.eq(this.target).addClass('active');
        },

        paging : function() {
            var objThis = this;
            objThis.target = this.target;
            this.navItem.find('span').attr('style', "");
            this.navItem.removeClass('active');
            this.navItem.eq(this.target).addClass('active');
        },

        rollingIndi : function() {
            $('.indicator ul li').find('span').attr('style', "");
            this.navItem.removeClass('active');

            var percent = 0;
            var time = this.rollingSpeed / 100;
            var $indi = this.navItem.eq(this.targetNum).find('span');

            if(this.rollNav != null) clearInterval(this.rollNav);
            this.rollNav = setInterval(function(){
                percent++;
                if(percent > 100) percent = 0;
                $indi.css('width', percent + '%');
            }, time)
        },

        slide : function(clickNum) {
            var objThis = this;

            if(clickNum != this.targetNum) {
                objThis.stop();

                this.currentNum = this.targetNum;
                this.targetNum = clickNum;

                if(this.currentNum < this.targetNum) {
                    this.sliderList.eq(this.targetNum).css('left', '100%').stop().animate({left:0+'%'});
                    this.sliderList.eq(this.currentNum).stop().animate({left:-100+'%'});
                } else {
                    this.sliderList.eq(this.targetNum).css('left', '-100%').stop().animate({left:0+'%'});
                    this.sliderList.eq(this.currentNum).stop().animate({left:100+'%'});
                }
                objThis.paging();
                // this.navItem.find('span').attr('style', "");
            }
        },

        rolling : function() {
            var objThis = this;

            this.targetNum++;
            this.currentNum = this.targetNum - 1;
            if(this.targetNum >= this.totalNum) {
                this.targetNum = 0;
            }
            this.sliderList.eq(this.targetNum).css('left', '100%').stop().animate({left:0+'%'});
            this.sliderList.eq(this.currentNum).stop().animate({left:-100+'%'});

            objThis.paging();
            objThis.rollingIndi();
        },

        play : function() {
            var objThis = this;
            objThis.stop();
            objThis.rollingIndi(this.targetNum);
            if(this.playing == false) {
                this.auto = setInterval(function() {
                    if(objThis.totalNum > 1) {
                        objThis.rolling();
                    }
                }, this.rollingSpeed);
                this.playing = true;
            }
            this.play_btn.removeClass('stop');
        },

        stop : function() {
            clearInterval(this.auto);
            this.playing = false;
            // this.play_btn.removeClass('stop');
            this.play_btn.addClass('stop');

            clearInterval(this.rollNav);
            this.navItem.find('span').attr('style', "");

        }

    };














    $.slideDefaultOpt = {
        speed: 300,
        rollingSpeed: 3000
    };


    $.fn.Slider = function(alpha) {
        this.each(function(index) {
            var options = $.extend(null, $.slideDefaultOpt, alpha);
            var slide = new Slider(this, options.speed, options.rollingSpeed);
        });
        return this;
    };

    $(document).ready(function(){
        $('.slider').Slider({
            speed:500,
            rollingSpeed: 2000
        });
    });



})(jQuery);