(function($) {

    "use strict";

    var browserWidth = window.innerWidth;

    function list_hover(){
        if(browserWidth > 768) {
            $("#gnb li a").on('mouseenter', function(){
                $(this).addClass('on')
            });
            $("#gnb li a").on('mouseleave', function(){
                $(this).removeClass('on')
            });
            if($('#gnb li a').hasClass('active')) {
                $(this).removeClass('on')
            } else {

            }
        }
    }
    // list_hover();

    function GnbEvent(selector) {
        this.gnb = $(selector);
        this.gnbList = null;
        this.twDepth = null;
        this.section = null;

        this.init();
        this.initEvent();

    }

    GnbEvent.prototype = {
        init : function () {
            this.gnbList  = this.gnb.find('#gnb > ul > li');
            this.twDepth = this.gnbList.parents().find('ul li');
            this.section = $('.section');

        },

        initEvent : function() {
            var objThis = this;

            this.gnbList.on('mouseenter', function(e) {
                objThis.index = $(this).index();
                objThis.mouseEnter();
            });
            this.gnbList.on('mouseleave', function(e) {
                objThis.index = $(this).index();
                objThis.mouseLeave();
            });
            this.gnbList.on('click', function(e) {
                objThis.index = $(this).index();
                objThis.gnbActive();
            });
            this.section.each(function() {
                objThis.index = $(this).index();
                objThis.gnbScroll();
            });

            $(window).on('resize', function() {
                objThis.gnbScroll();
            });

            $(window).on('scroll', function() {
                objThis.gnbScroll();
            });

        },

        mouseEnter : function() {
            this.gnbList.eq(this.index).addClass('on');
            if(this.gnbList.eq(this.index).hasClass('active')) {
                this.gnbList.eq(this.index).removeClass('on');
            }
        },

        mouseLeave : function() {
            this.gnbList.eq(this.index).removeClass('on')
        },

        gnbActive : function() {

            var index = this.gnbList.eq(this.index).index();
            var top = $('.section').eq(this.index).offset().top;

            if(index == 0) {
                top = 0;
            }
            $('html, body').stop().animate({'scrollTop' : top}, 500);

        },

        gnbScroll : function() {

            var windowScroll = $(window).scrollTop();
            var sectionHeight = this.section.eq(this.index).innerHeight();
            var sectionScroll = this.section.eq(this.index).offset().top;
            var sectionBottom = sectionHeight + sectionScroll;

            if(windowScroll >= sectionScroll && windowScroll <= sectionBottom) {
                console.log(windowScroll);
                this.gnbList.removeClass('active');
                this.gnbList.eq(this.index).addClass('active');
            }


        }




    };

    $(document).ready(function() {
        var gnb = new GnbEvent('header');
    });



})(jQuery);