(function($) {
    "use strict";

    var videos, lightboxVideo, lightboxYoutubeVideo;

    // DOCUMENT.READY FUNCTION start
    $(document).ready(function() {
        console.log($(window).width());

        // item photos
        var urlPhotos = 'img/works/';
        var coef = 1;

        lightboxVideo = document.getElementById('lightbox-video');
        lightboxYoutubeVideo = document.getElementById('lightbox-youtube-video');
        videos = document.querySelectorAll('video');

        $('.photo').each(function(key, value) {
            $(this).css('background-image', 'url(' + urlPhotos + $(this).data('photo-src') + ')').fadeIn("slow");
        });

        if($(window).width() <= '640'){
            $('.photo:not(.first)').each(function(){
                $(this).addClass('mobile');
            });

            $('.box-description, .box-menu-works').each(function(){
                $(this).parent().parent().parent().css("height", $(this).height() + 40);
            });

            $('.lower-page-works .col-item:nth-child(2)').each(function(){
                $(this).children('.row-item:eq(0)').css("margin-top", $(this).children('.row-item:eq(1)').height());
                $(this).css('position', 'relative');
                $(this).children('.row-item:eq(1)').css({"position": 'absolute', 'top': '0'});
            });
        }

        $('.photo:not(.first)').each(function(key, value) {
            if($(this).hasClass("xarkovskaya-marka")) coef = 0.75;
            if($(this).hasClass("rektor")) coef = 0.6;
            if($(this).hasClass("kolbasa") || $(this).hasClass("sebek-water") || $(this).hasClass("dorogi") || $(this).hasClass("sud")) coef = 0.55;

            if(!$(this).hasClass("mobile")){
                $(this).css("height", $(this).width() * coef);
                $(this).parent().css("height", $(this).width() * coef);
            }
        });

        // tooltip
        $('.tooltip').each(function(key, value) {
            if ($(this).hasClass('active')) {
                $(this).append('<sup class="box-tooltip active">' + $(this).text() + '</sup>');
            } else {
                $(this).append('<sup class="box-tooltip">' + $(this).text() + '</sup>');
            }
        });
        
        // sidebar
        $('.menu-button').on("click", function() {
            if ($('body').hasClass('mobile-experience')) {
                $("body").removeClass('mobile-experience');
                $("body>*:not(#header)").css("opacity", "1");
                $('#header').css("box-shadow", "0px 0px 0px black");
            } else {
                $("body").addClass('mobile-experience');
                $("body>*:not(#header)").css("opacity", "0.2");
                $('#header').css("box-shadow", "10px 10px 20px grey");
            }
            navWorksWidth($(window).scrollTop());
        });
        //hide menu
        $('body>*:not(#header)').on("click", function() {
            if ($('body').hasClass('mobile-experience')) {
                $("body").removeClass('mobile-experience');
                $("body>*:not(#header)").css("opacity", "1");
                $('#header').css("box-shadow", "0px 0px 0px black");
            }
        });
        // hidden container
        $('.open-hidden-container').on("click", function() {
            if ($('.hidden-container, .hidden-container-left').hasClass('open')) {
                $(".hidden-container, .hidden-container-left").removeClass('open');
                $(".hidden-container, .hidden-container-left").addClass('close');
            } else {
                $(".hidden-container, .hidden-container-left").removeClass('close');
                $(".hidden-container, .hidden-container-left").addClass('open');
            }
        });

        $('.photo .youtube-follow').each(function() {
            $(this).attr("href", "https://www.youtube.com/watch?v=" + this.parentNode.parentNode.getAttribute('data-youtube-id'));
        });

        $('.photo .bt-nav').on("click", function() {
            $(this).addClass('open');
            $('.lightbox').show();
            $(lightboxYoutubeVideo).width($(window).width())
                                   .height($(window).height())
                                   .attr('src', "https://www.youtube.com/embed/" + this.parentNode.parentNode.getAttribute('data-youtube-id') + "?autoplay=1");
            setTimeout(function() { $('.lightbox').addClass('open'); }, 40);
        });

        $('.play-video').on('click', function(){
            
            var iframe = document.createElement('iframe');
            var iframeBox = this.parentNode.parentNode;
            iframe.className = 'video-youtube';
            iframe.setAttribute('src', "https://www.youtube.com/embed/" + this.parentNode.parentNode.getAttribute('data-youtube-id') + "?autoplay=1");
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('frameborder', 0);
            iframeBox.appendChild(iframe);
            
            iframeBox = this.parentNode;
            $(iframeBox).hide();
            $(iframeBox).siblings('.hover-effect').hide();
        });

        $("#check-rektor input, #check-marka input").change(function(){
            if($(this).is(":checked"))
            {
                var videoBlock = document.getElementById($(this).data("id"));
                $(videoBlock).attr("data-youtube-id", $(this).data("video-src"));
                $(videoBlock).children().children('.youtube-follow').attr("href", "https://www.youtube.com/watch?v=" + $(this).data("video-src"));
            }
        });

        // $('.hero-fullscreen').on('click', function(){
        //     var sss = this.querySelector('#bgndVideo');
        //     $(sss).YTPPlay();
        // });

        $(document).on("click", ".close-lightbox", function() {
            $('.lightbox, .photo').removeClass('open');
            setTimeout(function() {
                $(lightboxYoutubeVideo).removeAttr('src');
                $('.lightbox').hide();
            }, 400);
        });
        // navMobile
        navMobile();

        // Demidenko
        if($(window).width() >= '640')
        {
            $('video').each(function(){
                var prop = $(this).width() / $(this).height();
                var videoCont = $(this).parent().parent();
                $(videoCont).height($(videoCont).width() / prop);
            });
        }

        $('#lightbox-video').on('click', function(){
            if(lightboxVideo.paused)
                lightboxVideo.play();
            else
                lightboxVideo.pause();
        });

        $('#check-marka input').on('change', function(){
            $('#xarkovskaya-marka iframe').remove();
            $('#xarkovskaya-marka').children().css('display', 'block');
        });

        $('#check-rektor input').on('change', function(){
            $('#rektor iframe').remove();
            $('#rektor').children().css('display', 'block');
        });

    });
    // DOCUMENT.READY FUNCTION end

    // WINDOW.SCROLL FUNCTION start
    // scroll
    $(window).scroll(function() {
        $('#mouse-down').hide();
        var scrollTop = $(window).scrollTop();
        var scrollTop2 = $(window).scrollTop() + $('.box-menu-works').height();
        // header
        if ($(window).width() > 880) {
            if (scrollTop < ($('#page-home').height() - 70)) {
                if ($('body').hasClass('open')) {
                    $("body").removeClass('mobile-experience');
                    $("body").css('padding-left', '0');
                    $("#header").stop().animate({
                        left: '-50px'
                    }, 300, function() {
                        // end animation
                        $("body").removeClass('secondary-experience open');
                        $("#header").css('left', 0).css('top', '-70px');
                        $("#header").stop().animate({
                            top: '0'
                        }, 300);
                    });
                } else {
                    $("#header").stop().animate({
                        top: '0'
                    }, 300, function() {
                        // end animation
                        $("body").removeClass('secondary-experience');
                    });
                }
            } else {
                if ($('body').hasClass('secondary-experience')) {
                    $("#header").css('top', 0);
                } else {
                    $("#header").stop().animate({
                        top: '-70px'
                    }, 300, function() {
                        // end animation
                        $("body").addClass('secondary-experience open');
                        $("#header").css('top', 0).css('left', '-50px');
                        $("#header").stop().animate({
                            left: '0'
                        }, 300);
                        $("body").css('padding-left', '0');
                    });
                }
            }

            if($(window).scrollTop() < 90)
                $('#logo').css('top', 90 - $(window).scrollTop());
        }
        navWorksWidth(scrollTop);
        // navigation
        if (scrollTop >= $("#page-home").offset().top && scrollTop < $("#page-about").offset().top) {
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='page-home']").addClass('active');
        } else if (scrollTop >= $("#page-about").offset().top && scrollTop < $("#item-page-1").offset().top) {
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='page-about']").addClass('active');
        } else if (scrollTop >= $("#item-page-1").offset().top && scrollTop < $("#item-1").offset().top) {
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='item-page-1']").addClass('active');
        } else if (scrollTop2 >= $("#item-1").offset().top && scrollTop2 < $("#item-2").offset().top) {
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='item-1']").addClass('active');
        } else if (scrollTop2 >= $("#item-2").offset().top && scrollTop2 < $("#item-page-2").offset().top) {
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='item-2']").addClass('active');
        } else if (scrollTop >= $("#item-page-2").offset().top && scrollTop < $("#item-1-1").offset().top) {
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='item-page-2']").addClass('active');
        } else if (scrollTop2 >= $("#item-1-1").offset().top && scrollTop2 < $("#item-1-2").offset().top) {
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='item-1-1']").addClass('active');
        } else if (scrollTop2 >= $("#item-1-2").offset().top && scrollTop2 < $("#item-1-3").offset().top) {
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='item-1-2']").addClass('active');
        } else if (scrollTop2 >= $("#item-1-3").offset().top && scrollTop2 < $("#item-page-3").offset().top) {
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='item-1-3']").addClass('active');
        } else if (scrollTop >= $("#item-page-3").offset().top && scrollTop < $("#item-2-1").offset().top) {
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='item-page-3']").addClass('active');
        } else if (scrollTop2 >= $("#item-2-1").offset().top && scrollTop2 < $("#item-2-2").offset().top) {
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='item-2-1']").addClass('active');
        } else if (scrollTop2 >= $("#item-2-2").offset().top && scrollTop2 < $("#page-services").offset().top) {
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='item-2-2']").addClass('active');
        } else if (scrollTop >= $("#page-services").offset().top && scrollTop < $("#page-testimonials").offset().top) { //page-news
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='page-services']").addClass('active');
        // } else if (scrollTop >= $("#page-news").offset().top && scrollTop < $("#page-testimonials").offset().top) {
        //     $('nav .navscroll').removeClass('active');
        //     $("nav").find("[data-idpage='page-news']").addClass('active');
        } else if (scrollTop >= $("#page-testimonials").offset().top && scrollTop < $("#page-contact").offset().top) {
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='page-testimonials']").addClass('active');
        } else if (scrollTop >= $("#page-contact").offset().top && scrollTop < $("#page-footer-credits").offset().top) {
            $('nav .navscroll').removeClass('active');
            $("nav").find("[data-idpage='page-contact']").addClass('active');
        }
    });
    // WINDOW.SCROLL FUNCTION end
	
	
    // WINDOW.RESIZE FUNCTION start
    $(window).resize(function() {
        navMobile();
        navWorksWidth($(window).scrollTop());
    });
    // WINDOW.RESIZE FUNCTION end
	
	
    // WINDOW.LOAD FUNCTION start
    $(window).load(function() {
        navWorksWidth($(window).scrollTop());
    });
    // WINDOW.LOAD FUNCTION end

    //
    function navWorksWidth(scrollTop) {
        if ($(window).width() > 900) {
            // item page 1
            if (scrollTop > ($("#item-page-1").offset().top + ($("#page-home").height())) && scrollTop < ($("#item-page-2").offset().top - 70)) {
                $("#menu-item-page-1").addClass('fixed');
                if ($(window).width() > 880) {
                    if ($('body').hasClass('mobile-experience')) {
                        $("#menu-item-page-1").css('width', ($(window).width() / 2) - 200 + 'px');
                    } else {
                        $("#menu-item-page-1").css('width', ($(window).width() / 2) - 0 + 'px');
                    }
                }
            } else {
                $('#menu-item-page-1').removeClass('fixed').css('width', '50%');
            }
            // item page 2
            if (scrollTop > ($("#item-page-2").offset().top + ($("#page-home").height())) && scrollTop < ($("#item-page-3").offset().top - 70)) {
                $("#menu-item-page-2").addClass('fixed');
                if ($(window).width() > 880) {
                    if ($('body').hasClass('mobile-experience')) {
                        $("#menu-item-page-2").css('width', ($(window).width() / 2) - 200 + 'px');
                    } else {
                        $("#menu-item-page-2").css('width', ($(window).width() / 2) - 0 + 'px');
                    }
                }
            } else {
                $('#menu-item-page-2').removeClass('fixed').css('width', '50%');
            }
            // item page 3
            if (scrollTop > ($("#item-page-3").offset().top + ($("#page-home").height())) && scrollTop < ($("#page-services").offset().top - 70)) {
                $("#menu-item-page-3").addClass('fixed');
                if ($(window).width() > 880) {
                    if ($('body').hasClass('mobile-experience')) {
                        $("#menu-item-page-3").css('width', ($(window).width() / 2) - 200 + 'px');
                    } else {
                        $("#menu-item-page-3").css('width', ($(window).width() / 2) - 0 + 'px');
                    }
                }
            } else {
                $('#menu-item-page-3').removeClass('fixed').css('width', '50%');
            }
        }
    }

    function navMobile() {
        if ($(window).width() < 900) {
            $("body").addClass("secondary-experience mobile open");
        } else {
            $("body").removeClass("secondary-experience mobile");
        }
    }

    function validateMail(obj){
        if(/.+@.+\..+/i.test($(obj).val())) return 0;
        else return 1; }


})(jQuery);