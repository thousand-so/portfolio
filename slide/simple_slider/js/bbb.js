/*
* @name 	jQuery Slide
* @version 	1.0.0
* */
(function($) {
    "use strict";
    function mySlide(selector, speed, rollingSpeed, startNumber, fade, auto){
        this.$slide = $(selector);
        this.auto = null;
        this.playing = auto;
        this.speed = speed;
        this.rollingSpeed = rollingSpeed;
        this.fade = fade;
        this.start = startNumber;
        this.rerun = null;
        this.page = null;

        this.init();
        this.initEvent();
    }
    mySlide.prototype = {
        init : function(){
            this.$slideItem = this.$slide.find("li");
            this.$btnNext = this.$slide.find(".btn_next");
            this.$btnPrev = this.$slide.find(".btn_prev");
            this.$btnStop = this.$slide.find(".btn_stop");
            this.$btnPlay = this.$slide.find(".btn_play");
            this.$page = this.$slide.find(".btn_page");
            this.$pageItem = this.$page.find("button");

            this.len = this.$slideItem.length;
            this.target = this.start;
            this.current = this.start;

            var me = this;

            //기본 페이지 및 초기값 설정
            me.pageInit();
            if( this.len < 2 ){
                this.$slide.addClass("alone");
            }
            me.startSlide(this.start);
            this.$slideItem.each(function(index){
                $(this).attr("data-index", index);
            });

            //motion : fade 일 때,
            if( this.fade ) this.$slide.addClass("fade");

            //auto : true (play)
            if( this.playing ) me.play();

        },

        //페이지 초기설정
        pageInit : function(){
            for(var i=0; i < this.len; i++){
                var pageStr = "<button type='button' class='page"+(i+1)+"'>"+(i+1)+"</button>";
                this.$page.append(pageStr);
            }
            this.$pageItem = this.$page.find("button");
            this.$btnStop.addClass("on");
        },

        //시작 슬라이드 설정
        startSlide : function(){
            var me = this;
            this.$slideItem.eq(this.target).css("left", "0").addClass("is-active");

            //if( this.page != null ) clearTimeout(this.page);
            //this.page = setTimeout(function(){
            //	me.pagination();
            //}, 1);
            me.pagination();

            if( ! this.fade ){
                this.$slideItem.each(function(index){
                    if( index < this.target ){
                        $(this).css("left", "-100%");
                    }
                });
            }else{
                var speed = ( this.speed / 1000 ) ;
                var $list = this.$slideItem;
                setTimeout(function(){
                    $list.each(function(){
                        $(this).css({
                            "transition-duration" : speed +"s"
                        });
                    });
                }, 10);
            }
        },

        //페이지네이션
        pagination : function(){
            this.$pageItem.removeClass("is-active");
            this.$pageItem.eq(this.target).addClass("is-active");
        },

        slide : function(number){
            var me = this;

            if( number != this.target ) {
                me.stop();
                if (!this.$slideItem.is(":animated")) {
                    this.current = this.target;
                    this.target = number;
                    if ( ! this.fade ) {
                        if (this.current < this.target) { //next
                            this.$slideItem.eq(this.target).css("left", "100%").stop().animate({left: 0}, this.speed);
                            this.$slideItem.eq(this.current).stop().animate({left: -100 + "%"}, this.speed);
                        } else { //prev
                            this.$slideItem.eq(this.target).css("left", "-100%").stop().animate({left: 0}, this.speed);
                            this.$slideItem.eq(this.current).stop().animate({left: 100 + "%"}, this.speed);
                        }
                    }else{
                        this.$slideItem.eq(this.current).removeClass("is-active");
                        this.$slideItem.eq(this.target).addClass("is-active");
                    }
                    me.pagination();
                }

                //자동재생 : true 일때,
                //3초내 액션없으면 자동재생 시작
                if( this.playing ){
                    if( this.rerun != null ) clearTimeout( this.rerun );
                    this.rerun = setTimeout(function(){
                        me.play();
                    }, 3000);
                }
            }
        },

        next : function(){
            var me = this;
            var number = this.target + 1;
            if( number >= this.len ) number = 0;
            me.slide( number );
        },

        prev : function(){
            var me = this;
            var number = this.target - 1;
            if( number < 0 ) number = this.len - 1;
            me.slide( number );
        },

        rolling : function(){
            var me = this;
            this.target++;
            this.current = this.target -1 ;
            if( this.target >= this.len ){
                this.target = 0;
            }

            if ( ! this.fade ) {
                this.$slideItem.eq(this.target).css("left","100%").stop().animate({left:0},this.speed);
                this.$slideItem.eq(this.current).stop().animate({left:-100+"%"},this.speed);
            }else{
                this.$slideItem.eq(this.current).removeClass("is-active");
                this.$slideItem.eq(this.target).addClass("is-active");
            }
            me.pagination();
        },

        play : function(){
            var me = this;
            me.stop();
            this.auto = setInterval(function(){
                me.rolling();
            }, this.rollingSpeed);
            this.$btnStop.removeClass("on");
            this.$btnPlay.addClass("on");
        },

        stop : function(){
            clearInterval(this.auto);
            this.$btnPlay.removeClass("on");
            this.$btnStop.addClass("on");
        },

        //사용자 액션 이벤트
        initEvent : function(){
            var me = this;

            this.$btnNext.on("click", function(){
                me.next();
            });
            this.$btnPrev.on("click", function(){
                me.prev();
            });
            this.$btnPlay.on("click", function(){
                me.play();
                me.playing = true;
            });
            this.$btnStop.on("click", function(){
                me.stop();
                me.playing = false;
            });
            this.$pageItem.on("click", function(){
                var index = $(this).index();
                me.slide(index);
            });
            this.$slide.find(".swipe_inner").swipe({
                fingers:'all',
                swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData){
                    //if( fingerCount > 0 ){
                    me.next();
                    //}
                },
                swipeRight:function(event, direction, distance, duration, fingerCount, fingerData){
                    //if( fingerCount > 0 ){
                    me.prev();
                    //}
                },
                allowPageScroll:"auto"
            });
        },

    };

    $.slideDefaultOpt = {
        speed : 300,
        rollingSpeed : 3000,
        startNumber : 0, //0부터 시작
        auto : false,
        fade : false,
    };

    $.fn.mySlide = function(optionList){
        this.each(function(index){
            var options = $.extend(null, $.slideDefaultOpt, optionList);
            var slideShow = new mySlide(this, options.speed, options.rollingSpeed, options.startNumber, options.fade, options.auto );
        });
        return this;
    };

})(jQuery);