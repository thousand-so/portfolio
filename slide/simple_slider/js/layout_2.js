/*** slider ***/
//오브젝트 리터럴 방식
//주 용도는 여러개의 데이터 포장용 - 인스턴스를 여러개 만들 수 없기 때문에 코드 재사용을 위해 사용하기 보단 여러개의 데이터를 묶어 값을 보관하거나 함수의 매개변수(파라미터) 값으로 전달할 때 주로 사용 ( 주로 json형태로 데이터를 생성하여 변수에 보관할 때 사용하는 듯 )

//$.fn  플러그인을 이용한 슬라이드 함수

(function($) {

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

        this.speed = speed;
        this.rollingSpeed = rollingSpeed;

        this.init();
        this.initEvent();

        console.log('hahaha');
    }
    Slider.prototype = {
        init : function() {
            var objThis = this;
            this.sliderList = this.slider.find('li');
            this.totalNum = this.sliderList.length;
            this.prev = $('.prev');
            this.next = $('.next');
            this.play_btn = $('.play_btn');
            this.navGrp = this.slider.find('.indicator ul');

            objThis.play();
        },

        initEvent : function() {
            var objThis = this;
            objThis.sliderList.eq(0).css('left', '0');
            objThis.addIndi($(this));

            this.navItem.on('click', function(){
                var index = $(this).index();
                objThis.slide(index);
            });

            this.next.on('click', function() {
                objThis.moveNext();
            });

            this.prev.on('click', function() {
                objThis.movePrev();
            });

            this.play_btn.on('click', function() {
                if($(this).hasClass('stop')) {
                    objThis.play();
                } else {
                    objThis.stop();
                }
            });
        },

        addIndi : function() {
            for(var i = 1; i <= this.totalNum; i++) {
                var sliderNav = "<li><button>'slide' + i '번'</button></li>";
                this.navGrp.append(sliderNav);
            }
            this.navItem = this.navGrp.find('li');
            this.navItem.eq(0).addClass('active');
        },

        paging : function(number) {
            this.navItem.removeClass('active');
            this.navItem.eq(number).addClass('active');
        },

        slide : function(clickNum) {
            if(clickNum != this.targetNum) {
                var objThis = this;
                objThis.stop();

                this.currentNum = this.targetNum;
                this.targetNum = clickNum;

                if(this.currentNum < this.targetNum) {
                    this.sliderList.eq(this.targetNum).css('left', '100%').stop().animate({left:0 + '%'}, this.speed);
                    this.sliderList.eq(this.currentNum).stop().animate({left: -100+'%'});
                } else {
                    this.sliderList.eq(this.targetNum).css('left', '-100%').stop().animate({left:0 + '%'}, this.speed);
                    this.sliderList.eq(this.currentNum).stop().animate({left: 100+'%'});
                }
                objThis.paging(this.targetNum);
            }
        },

        moveNext : function() {
            var objThis = this;
            objThis.stop();

            this.targetNum++;
            this.currentNum = this.targetNum -1;
            if(this.targetNum == this.totalNum) {
                this.targetNum = 0;
            }
            this.sliderList.eq(this.targetNum).css('left', '100%').stop().animate({left:0+'%'});
            this.sliderList.eq(this.currentNum).stop().animate({left: -100+'%'});
            objThis.paging(this.targetNum)
        },

        movePrev : function() {
            var objThis = this;
            objThis.stop();

            this.targetNum--;
            this.currentNum = this.targetNum +1;
            if(this.targetNum < 0) {
                this.targetNum = this.totalNum -1;
            }
            this.sliderList.eq(this.targetNum).css('left', '-100%').stop().animate({left:0+'%'});
            this.sliderList.eq(this.currentNum).stop().animate({left: 100+'%'});
            objThis.paging(this.targetNum)
        },

        play : function () {
            var objThis = this;
            if(this.playing == false) {
                this.auto = setInterval(function() {
                    if(objThis.totalNum > 1) {
                        objThis.moveNext();
                    }
                }, this.rollingSpeed);
                this.playing = true;
            }
            this.play_btn.removeClass('stop');
        },

        stop : function() {
            clearInterval(this.auto);
            this.playing = false;
            this.play_btn.addClass('stop');
        }

    };


    $.slideDefaultOpt = {
        speed: 300,
        rollingSpeed: 300
    };

    $.fn.Slider = function(alpha) {
            this.each(function(index){

                var options = $.extend(null, $.slideDefaultOpt, alpha); //$.slideDefaultOpt과 alpha 값이 merge 되어 options에 담긴다.
                //혹은 아래와같이.
                //var options = $.extend({color:"#556b2f", backgroundColor:"white"}, alpha);
                var slider = new Slider(this, options.speed, options.rollingSpeed);
                // var slider = new Slider(this, this.speed, this.rollingSpeed);
            });
            return this;
    };

    $(document).ready(function(){
        $('.slider').Slider({
            speed: 500,
            rollingSpeed: 3000,
            // auto: true
        });
    });

})(jQuery);


