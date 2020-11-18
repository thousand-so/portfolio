/*** slider ***/
//함수 단위 방식 - 인스턴스를 여러개 만들 수 있다.

function Slider(selector){

    this.slider = null;
    this.sliderList = null;
    this.totalNum = null;
    this.targetNum = 0;
    this.currentNum = null;
    this.clickNum = null;
    this.prev = null;
    this.next = null;

    this.navGrp = null;
    this.navItem = null;
    this.play_btn = null;
    this.auto  = null;
    this.playing = false;


    this.init(selector);
    this.initEvent();
}

Slider.prototype.init = function(selector){
    this.slider = $(selector);
    this.sliderList = this.slider.find('li');
    this.totalNum = this.sliderList.length;
    this.navGrp = this.slider.find('.indicator ul');
    this.prev = $('.prev');
    this.next = $('.next');

};

Slider.prototype.initEvent = function(){
    var objThis = this;
    objThis.sliderList.eq(0).css('left', '0');
    objThis.addIndi($(this));

    // this.play_btn.on('click', function(){
    //     objThis.play();
    // });

    this.navItem.on('click', function(){
        var index = $(this).index();
        objThis.slide(index);
    });
    this.prev.on('click', function(){
        objThis.targetNum--;
        objThis.movePrev();
    });
    this.next.on('click', function(){
        objThis.targetNum++;
        objThis.moveNext();
    });

};

Slider.prototype.addIndi = function(){
    for(var i = 1; i <= this.totalNum; i++){
        var sliderNav = "<li><button>'slide '+i+'번'</button></li>";
        this.navGrp.append(sliderNav);
    }
    this.navItem = this.navGrp.find('li')
    this.navItem.eq(0).addClass('active');
};

Slider.prototype.slide =  function(clickNum){
    if(clickNum != this.targetNum){
        var objThis = this;

        this.currentNum = this.targetNum;
        this.targetNum = clickNum;

        if(this.currentNum < this.targetNum){
            this.sliderList.eq(this.targetNum).css('left', '100%').stop().animate({left:0}, 500);
            this.sliderList.eq(this.currentNum).stop().animate({left:-100+'%'}, 500);
        } else {
            this.sliderList.eq(this.targetNum).css('left', '-100%').stop().animate({left:0}, 500);
            this.sliderList.eq(this.currentNum).stop().animate({left:100+'%'}, 500);
        }
        objThis.paging(this.targetNum);
    }
};

Slider.prototype.paging = function(number){
    this.navItem.removeClass('active');
    this.navItem.eq(number).addClass('active');
};

Slider.prototype.moveNext = function () {
    if (!this.sliderList.is(':animated')) {

    var objThis = this;

    this.currentNum = this.targetNum -1;
    if(this.targetNum >= this.totalNum) {
        this.targetNum = 0;
    }
    this.sliderList.eq(this.targetNum).css('left', '100%').stop().animate({left:0}, 500);
    this.sliderList.eq(this.currentNum).css('left', '0').stop().animate({left:'-100%'}, 500);

    objThis.paging(this.targetNum);
    }

};

Slider.prototype.movePrev = function () {
    if (!this.sliderList.is(':animated')) {

    var objThis = this;

    this.currentNum = this.targetNum +1;
    if(this.targetNum < 0) {
        this.targetNum = this.totalNum -1;
    }
    this.sliderList.eq(this.targetNum).css('left', '-100%').stop().animate({left:'0%'}, 500);
    this.sliderList.eq(this.currentNum).css('left', '0').stop().animate({left:'100%'}, 500);

    objThis.paging(this.targetNum);
    }

};

$(document).ready(function(){

    var slider = new Slider('.slider');

    //리사이즈
    $(window).on('resize', function(){

    });
});

