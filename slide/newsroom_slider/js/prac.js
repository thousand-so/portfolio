
function kvHeight(){
    if ($(window).width() < 769){
        var kv_height = $('.kv_slider ul').find('li').height();
        $('.kv_slider').height(kv_height);
        //console.log(kv_height);
    } else {
        $('.kv_slider').css({height:'100%'});
    }
}

function mbPic(){
    var bannerList = $('.banner_slide ul').find('li');
    if ($(window).width() < 769){
        bannerList.addClass('mb');
        bannerList.attr('style', 'background-image:url(https://i.pinimg.com/564x/31/f9/2b/31f92b7c1046e7f4b496c4eb0c643d31.jpg)');
    } else {
        bannerList.removeClass('mb');
    }
}


/*** slide ***/
function Slider(selector){
    this.slider = null;
    this.sliderItem = null;
    this.sliderTotalNum = null;
    this.navItem = null;
    this.playing = false;
    this.targetNum  = 0;
    this.currentNum = null;
    this.clickNum = null;
    this.auto = null;
    this.play_btn = null;
    this.asd = $(window);
    this.rollingSpeed = 3000;

    //초기화 메서드 호출
    this.init(selector);
    this.initEvent();
}

//요소 초기화
Slider.prototype.init = function(selector) {
    this.slider = $(selector);
    this.sliderItem = this.slider.find('li');
    this.sliderTotalNum = this.sliderItem.length;
    this.navGrp = this.slider.find('.indicator ul');
    this.navItem = this.slider.find('.indicator ul li');
    this.play_btn = this.slider.find('.play_btn');

    //첫번째 슬라이드 처음에 위치;
    this.sliderItem.eq(0).css('left', '0');

    this.mobile = false;
    this.mobileSize = 769;
    this.browserWidth = $(window).innerWidth();


};

//이벤트 등록
Slider.prototype.initEvent = function() {
    var objThis = this;

    objThis.addIndi($(this));
    // objThis.play();
    //인디케이터 클릭시 이동
    this.navItem.on('click', function(){
        var index = $(this).index();
        objThis.slide(index);
        $(this).addClass('stop');
    });

    this.play_btn.on('click', function(){
        if($(this).hasClass('stop')){
            objThis.play();
        } else {
            objThis.stop();
        }
    });

    objThis.swipe();


};

/*** touchSwipe ***/
Slider.prototype.swipe = function(){
    var objThis = this;
    if(this.sliderItem.length > 0){
        this.sliderItem.swipe({
            fingers: 'all',
            swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData){
                objThis.stop();
                objThis.prev();
            },
            swipeRight: function(event, direction, distance, duration, fingerCount, fingerData){
                objThis.next();
            },
            allowPageScroll: "auto"
        });
    }
};

/*** mb Change ***/
Slider.prototype.mbChange = function(){
    var objThis = this;
    if($(window).width() > 769){
        this.sliderItem.css('left', '0');
        objThis.stop();
    } else {

        objThis.play();
    }
};

Slider.prototype.addIndi = function(){
    for(var i = 1; i <= this.sliderTotalNum; i++){
        var sliderNav = "<li><button class='sprite'></button></li>";
        this.navGrp.append(sliderNav);
    }
    this.navItem = this.slider.find('.indicator ul li');
    this.navItem.eq(0).addClass('active');

};

//********* pagination 클릭시 ***********
Slider.prototype.slide = function(clickNum){
    if(clickNum != this.targetNum){
        var objThis = this;
        objThis.stop();

        this.currentNum  = this.targetNum;
        this.targetNum = clickNum;

        if(this.currentNum < this.targetNum){
            this.sliderItem.eq(this.targetNum).css('left', '100%').stop().animate({left:0+'%'});
            this.sliderItem.eq(this.currentNum).stop().animate({left:-100+'%'});
        } else {
            this.sliderItem.eq(this.targetNum).css('left', '-100%').stop().animate({left:0+'%'});
            this.sliderItem.eq(this.currentNum).stop().animate({left:100+'%'});
        }
        objThis.paging(this.targetNum);
    }
};

//********* 화살표 클릭시 ***********
Slider.prototype.next = function(){
    var objThis = this;
    objThis.stop();
    this.targetNum--;
    this.currentNum = this.targetNum +1;
    if(this.targetNum < 0){
        this.targetNum = this.sliderTotalNum -1;
    }
    this.sliderItem.eq(this.targetNum).css('left', '-100%').stop().animate({left:0+'%'});
    this.sliderItem.eq(this.currentNum).stop().animate({left:100+'%'});
    objThis.paging(this.targetNum);
};

Slider.prototype.prev = function(){
    var objThis = this;
    this.targetNum++;
    this.currentNum = this.targetNum -1;
    if(this.targetNum == this.sliderTotalNum){
        this.targetNum = 0;
    }

    this.sliderItem.eq(this.targetNum).css('left', '100%').stop().animate({left:0+'%'});
    this.sliderItem.eq(this.currentNum).stop().animate({left:-100+'%'});
    objThis.paging(this.targetNum);
};

Slider.prototype.play = function(){
    var objThis = this;
    if(this.playing == false){
        this.auto = setInterval(function(){
            if(objThis.sliderTotalNum > 1){
                objThis.prev();
            }
        }, this.rollingSpeed);
        this.playing = true;
    }
    this.play_btn.removeClass('stop');
};

Slider.prototype.stop = function(){
    clearInterval(this.auto);
    this.playing = false;
    this.play_btn.addClass('stop');
};

Slider.prototype.paging = function(number){
    this.navItem.each(function(){$(this).removeClass('active');});
    this.navItem.eq(number).addClass('active');
};




//ready
$(document).ready(function(){
    // this.mobileSize = 769;
    // this.browserWidth = $(window).innerWidth();
    kvHeight();
    mbPic();
    var kv = new Slider(".kv_slider");
    kv.play();
    var video = new Slider('.video');
    video.play();
    var photo = new Slider('.photo');
    photo.play();

    var banner = new Slider('.banner');
    banner.mbChange();
    // banner.resize();


    // if(this.browserWidth < this.mobileSize){
    //     console.log('bbbb');
    //     var banner = new Slider('.banner');
    // } else {
    //     console.log('pcccc');
    //     var banner = new Slider('.banner');
    // }

    //리사이즈 시
    $(window).on('resize', function(){
        // this.mobileSize = 769;
        // this.browserWidth = $(window).innerWidth();
        var browserWidth = $(window).outerWidth();
        kvHeight();
        mbPic();
        banner.mbChange();

        // if(this.browserWidth < this.mobileSize){
        //     console.log('bbbb');
        //     var banner = new Slider('.banner');
        // } else {
        //     console.log('pccccccc');
        //     var banner = new Slider('.banner');
        // }

    });
});