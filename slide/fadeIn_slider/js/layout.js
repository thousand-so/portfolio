/*** slider ***/
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

    this.prev = this.slider.find('.prev');
    this.next = this.slider.find('.next');
    this.navGrp = this.slider.find('.indicator ul');
    this.play_btn = this.slider.find('.indicator .play_btn');


};

Slider.prototype.initEvent = function(){
    var objThis = this;
    objThis.sliderList.eq(0).fadeIn();
    objThis.addIndi($(this));
    objThis.play();

    this.navItem.on('click', function(){
        var index = $(this).index();
        objThis.slide(index);
        //console.log(index);
    });

    this.prev.on('click', function(){
        objThis.targetNum--;
        objThis.move();
        objThis.stop();
        this.play_btn.addClass('stop');
    });

    this.next.on('click', function(){
        objThis.targetNum++;
        objThis.move();
        objThis.stop();
        this.play_btn.addClass('stop');
    });

    this.play_btn.on('click', function(){
        if($(this).hasClass('stop')) {
            $(this).removeClass('stop');
            objThis.play();
        } else {
            $(this).addClass('stop');
            objThis.stop();
        }
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
    if(!this.sliderList.is(':animated')){
        if(clickNum != this.targetNum){
            var objThis = this;

            objThis.stop();

            // this.currentNum = this.targetNum;
            this.targetNum = clickNum;

            this.sliderList.fadeOut();
            this.sliderList.eq(this.targetNum).fadeIn();

            objThis.paging(this.targetNum);
        }
    }
};

Slider.prototype.move = function(){
    var objThis = this;

        if (this.targetNum >= this.totalNum) {
            this.targetNum = 0;
        } else if (this.targetNum < 0) {
            this.targetNum = this.totalNum - 1;
        }

        this.sliderList.fadeOut();
        this.sliderList.eq(this.targetNum).fadeIn(500);

        objThis.paging(this.targetNum);
};

Slider.prototype.play = function(){
    var objThis = this;
    this.play_btn.removeClass('stop');
    timer = setInterval(function(){
        objThis.targetNum++;
        objThis.move();
    }, 5000);
};

Slider.prototype.stop = function(){
    clearInterval(timer);
    this.play_btn.addClass('stop');
    return false;
};

Slider.prototype.paging = function(number){
    this.navItem.removeClass('active');
    this.navItem.eq(number).addClass('active');
};

$(document).ready(function(){

    var slider = new Slider('.slider');

    //리사이즈
    $(window).on('resize', function(){

    });
});

