/**
 * Created by preb on 01.06.16.
 */
// http://stackoverflow.com/questions/17583215/jquery-toggle-event-deprecated-what-to-use
$.fn.clickToggle = function(a, b) {
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

    $('#search').find('i').clickToggle(
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

    $('#close-button').click(function () {
        $('#user-panel').fadeOut(400);
    });

    $('#menu-button').clickToggle(
        function() {
            $('#mobile-menu').stop().slideToggle(200);//css('display', 'block');
        },
        function() {
            $('#mobile-menu').stop().slideToggle(200);
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
        var rotatorNav = $('#rotator-nav'),
            activeButton = rotatorNav.find('.active'),
            newButton = rotatorNav.find('a').eq(newId);

        if(activeButton[0] !== newButton[0]) {
            // change nav-button
            activeButton.removeClass('active');
            newButton.addClass('active');
            // change image
            var rotatorContent = $('#rotator-content'),
                activeImage = rotatorContent.find('a.active'),
                newImage = rotatorContent.find('a').eq(newId);

            activeImage.stop();
            newImage.stop();
            clearInterval(inter);

            if(newId > activeButton.index()) {
                activeImage.animate({left: -activeImage.width()}, 500, function() {
                    activeImage.css('left', -960);
                });
                newImage.css('left', newImage.width());
                newImage.animate({left: 0}, 500);
            } else {
                activeImage.animate({left: activeImage.width()}, 500, function() {
                    activeImage.css('left', 960);
                });
                newImage.css('left', -newImage.width());
                newImage.animate({left: 0}, 500);
            }

            activeImage.removeClass('active');
            newImage.addClass('active');
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