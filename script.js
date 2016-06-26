/**
 * Created by preb on 01.06.16.
 */
// http://stackoverflow.com/questions/17583215/jquery-toggle-event-deprecated-what-to-use
$.fn.clicktoggle = function(a, b) {
    return this.each(function() {
        var clicked = false;
        $(this).on('click', function() {
            if (clicked) {
                clicked = false;
                return b.apply(this, arguments);
            }
            clicked = true;
            return a.apply(this, arguments);
        });
    });
};

$(document).ready(function () {
    $('#menu').find('li').hover(
        function() {
            $('ul', this).stop().slideToggle(200);
        }
    );

    $('#search').find('img').clicktoggle(
        function() {
            $(this).siblings('input').animate({width: 'show'}, 200);
        },
        function() {
            $(this).siblings('input').animate({width: 'hide'}, 200);
        }
    );

    $('#user-menu-panel').click(function() {
       $('#user-panel').fadeIn(400);
    });

    $('#panel-background').click(function () {
        $('#user-panel').fadeOut(400);
    });

    $('#menu-button').clicktoggle(
        function() {
            $('#mobile-menu').stop().slideToggle(200);//css('display', 'block');
        },
        function() {
            $('#mobile-menu').stop().slideToggle(200);;
        });

    (function() {
        var amount = $('#rotator-content').find('a').length, i;
        var links = '<a href="#" class="active"></a>\n';
        for(i = 1; i < amount; i++) {
            links += '<a href="#"></a>';
        }
        $(links).appendTo($('#rotator-nav'));
    })();

    function changeImage(newId) {
        var active_button = $('#rotator-nav').find('.active');
        var new_button = $('#rotator-nav').find('a').eq(newId);

        if(active_button[0] !== new_button[0]) {
            // change nav-button
            active_button.removeClass('active');
            new_button.addClass('active');
            // change image
            var active_image = $('#rotator-content').find('a.active'),
                new_image = $('#rotator-content').find('a').eq(newId);

            active_image.stop();
            new_image.stop();
            clearInterval(inter);

            if(newId > active_button.index()) {
                active_image.animate({left: -active_image.width()}, 500, function() {
                    active_image.css('left', -960);
                });
                new_image.css('left', new_image.width());
                new_image.animate({left: 0}, 500);
            } else {
                active_image.animate({left: active_image.width()}, 500, function() {
                    active_image.css('left', 960);
                });
                new_image.css('left', -new_image.width());
                new_image.animate({left: 0}, 500);
            }

            active_image.removeClass('active');
            new_image.addClass('active');
            inter = setInterval(intervalRotator, 7000)
        }
    }

    function intervalRotator() {
        var active = $('#rotator-content').find('a.active');
        if(active.next().length) {
            changeImage(active.index()+1);
        } else {
            changeImage(0);
        }
    }

    $('#rotator-nav').on('click', 'a', function(event) {
        event.preventDefault();
        changeImage($(this).index());
    });

    var inter = setInterval(intervalRotator, 7000);
});