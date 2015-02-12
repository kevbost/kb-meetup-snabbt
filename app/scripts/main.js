var snabbt,
    eventType,
    dataReturn,
    Deck
;

var Deck = (function(data){
    this.image_list = [];
    this.image_index = [];
    this.image_split = [];

    this.next_image = function(){
        if(this.image_index > this.image_list.length){ return; }
        return this.image_list[this.image_index++];
    };

    this.image_at = function(index){
        return this.image_list[index];
    };

    this.reset = function(){
        this.image_index = 0;
    };

    this.splitUp = function(arr, n) {
        //////////////////
        // use splitUp(arr, (arr.length / 4.5 or 4))
        // pulled from stackoverflow, the result is not always perfect
        // should be breaking image_list into arrays of 4, [0, 1, 2, 3]
        //////////////////
        var rest = arr.length % n, restUsed = rest, partLength = Math.floor(arr.length / n),
            result = [];
        for(var i = 0; i < arr.length; i += partLength) {
            var end = partLength + i, add = false;
            if(rest !== 0 && restUsed) { end++; restUsed--; add = true; }
            result.push(arr.slice(i, end));
            if(add) { i++; }
        }
        Deck.image_split.push(result);
    };

    this.create_meetup_elements = function(url, id) {
        $('#snabbt-stage').append(
            '<span class="img-container default center">' +
                '<img id="' + id + '" src="' + url + '" class="meetup-profile-thumbnail default">' +
            '</span>'
        );
    };

    this.create_meetup_images = function(data){
        var that = this;
        for (var i = 0; i < data.results.length; i++) {
            if (typeof data.results[i].photo === "object" && data.results[i].id != "173713472") {
                that.create_meetup_elements(data.results[i].photo.photo_link, data.results[i].id);
                that.image_list.push([data.results[i].photo.photo_link, data.results[i].id]);
            }
        }
        this.splitUp(Deck.image_list, (Deck.image_list.length / 4));
    };

    return this;
})();

var snabbt;

var Gridify = (function(){

    this.snabbt_attention = function(x, y, z, spring, deaccel){
        return {
            rotation: [x, y, z],
            springConstant: spring,
            springDeacceleration: deaccel
        };
    };

    this.gridify_wiggle = function(){
        var that = this;
        for (var i = 0; i < Deck.image_split[0].length; i++) {
            for (var x = 0; x < Deck.image_split[0][i].length; x++) {
                var img_split_id = document.getElementById(Deck.image_split[0][i][x][1]);
                if (x === 0) {
                    snabbt(img_split_id, 'attention', that.snabbt_attention(0, 0, 1, 10, 0.9) );
                }
                if (x === 1) {
                    snabbt(img_split_id, 'attention', that.snabbt_attention(0, 0, 2, 10, 0.9) );
                }
                if (x === 2) {
                    snabbt(img_split_id, 'attention', that.snabbt_attention(0, 0, 4, 10, 0.9) );
                }
                if (x === 3) {
                    snabbt(img_split_id, 'attention', that.snabbt_attention(0, 0, 6, 10, 0.9) );
                }
            }
        }
    };

    return this;
})();

var Gridify = (function(){

    this.gridify_deck = function(){
        $('.img-container').addClass('col-xs-3 grid').removeClass('default');
        $('.meetup-profile-thumbnail').addClass('grid').removeClass('default');
        $('.gridify-btn').removeClass('hidden');
        this.gridify_manage();
    };

    this.gridify_manage = function(){
        for (var i = 0; i < Deck.image_split[0].length; i++) {
            for (var x = 0; x < Deck.image_split[0][i].length; x++) {
                var $img_split_id = $(document.getElementById(Deck.image_split[0][i][x][1]));
                if (x === 0) { $img_split_id.addClass('one'); }
                if (x === 1) { $img_split_id.addClass('two'); }
                if (x === 2) { $img_split_id.addClass('three'); }
                if (x === 3) { $img_split_id.addClass('four'); }
            }
        }
    };

    this.snabbt_attention = function(x, y, z, spring, deaccel){
        return {
            rotation: [x, y, z],
            springConstant: spring,
            springDeacceleration: deaccel
        };
    };

    this.gridify_wiggle = function(){
        var that = this;
        for (var i = 0; i < Deck.image_split[0].length; i++) {
            for (var x = 0; x < Deck.image_split[0][i].length; x++) {
                // var img_split_id = document.getElementById(Deck.image_split[0][i][x][1]);
                if (x === 0) {
                    snabbt($('.one'), 'attention', that.snabbt_attention(0, 0, 1, 1, 0) );
                }
                if (x === 1) {
                    snabbt($('.two'), 'attention', that.snabbt_attention(0, 0, 2, 1, 0) );
                }
                if (x === 2) {
                    snabbt($('.three'), 'attention', that.snabbt_attention(0, 0, 4, 1, 0) );
                }
                if (x === 3) {
                    snabbt($('.four'), 'attention', that.snabbt_attention(0, 0, 6, 1, 0) );
                }
            }
        }
    };

    this.gridify_multi_element_fancy = function(){

        var defaultPosition = {
            rotation:       [0, 0, 0],
            position:       [0, 0, 0],
            skew:           [0, 0],
            scale:          [1, 1],
            delay:          15000,
            perspective:    2000,
            easing:         'ease',
        };

        snabbt($('#snabbt-stage'), {
            rotation: [0, 2 * Math.PI, 0],
            duration: 16000,
            perspective: 1000,
        }).then(defaultPosition);

        snabbt($('.one').parent(), {
            perspective: 2000,
            rotation: [0.7, 0, 0],
            position: function(i, total) {
                var equ = [0, 0, (i * 20)];
                return equ;
            },
            scale: function(i, total) {
                var scale_equ = ((i / - total + 1) / Math.PI) + 0.5;
                var equ = [scale_equ, scale_equ];
                return equ;
            },
            delay: function(i) {
                return i * 50;
            },
            fromskew: [0, 0],
            skew: function(i, total) {
                var equ = [0, i / 10 - 0.2, 0];
                return equ;
            },

        }).then(defaultPosition);

        snabbt($('.two').parent(), {
            rotation: [-0.7, 0.7, 0],
            perspective: 2000,
            position: function(i, total) {
                var equ = [0, 0, (i * 10)];
                return equ;
            },
            scale: function(i, total) {
                var scale_equ = ((i / - total + 1) / Math.PI) + 0.5;
                var equ = [scale_equ, scale_equ];
                return equ;
            },
            delay: function(i) {
                return i * 50;
            },
            fromskew: [0, 0],
            skew: function(i, total) {
                var equ = [0, i / 10 - 0.4, 0];
                return equ;
            },

        }).then(defaultPosition);

        snabbt($('.three').parent(), {
            rotation: [-0.7, -0.7, 0],
            perspective: 2000,
            position: function(i, total) {
                var equ = [0, 0, (i * 10)];
                return equ;
            },
            scale: function(i, total) {
                var scale_equ = ((i / - total + 1) / Math.PI) + 0.5;
                var equ = [scale_equ, scale_equ];
                return equ;
            },
            delay: function(i) {
                return i * 50;
            },
            fromskew: [0, 0],
            skew: function(i, total) {
                var equ = [0, - i / 10 + 0.4, 0];
                return equ;
            },

        }).then(defaultPosition);

        snabbt($('.four').parent(), {
            rotation: [0.7, 0, 0],
            perspective: 2000,
            position: function(i, total) {
                var equ = [0, 0, (i * 20)];
                return equ;
            },
            scale: function(i, total) {
                var scale_equ = ((i / - total + 1) / Math.PI) + 0.5;
                var equ = [scale_equ, scale_equ];
                return equ;
            },
            delay: function(i) {
                return i * 50;
            },
            fromskew: [0, 0],
            skew: function(i, total) {
                var equ = [0, - i / 10 + 0.2, 0];
                return equ;
            },

        }).then(defaultPosition);
    };

    return this;
})();




var Wiggler = (function(){

    this.attention_shake = function($elem, arr, spring, deaccel) {
        $elem.snabbt('attention', {
            rotation: arr,
            springConstant: spring,
            springDeacceleration: deaccel
        });
    };

    this.waave_images = function() {
        snabbt(document.getElementById(Deck.image_list[Deck.image_index][1]), 'stop');
        Deck.reset();

        var interval = setInterval(function() {
            snabbt(document.getElementById(Deck.image_list[Deck.image_index][1]), 'attention', {
                rotation: [0, 0, 1],
                springConstant: 15,
                springDeacceleration: 0.9
            });
            if (Deck.image_index === Deck.image_list.length - 1) {
                clearInterval(interval);
                return Deck.reset();
            }
            Deck.next_image();
        }, 50);
    };

    this.waave_images_different = function(images) {
        snabbt(document.getElementById(Deck.image_list[Deck.image_index][1]), 'stop');
        Deck.reset();

        var interval = setInterval(function() {
            snabbt(document.getElementById(Deck.image_list[Deck.image_index][1]), {
                scale: [0.9, 0.9],
                duration: 10
            })
            .then({
                scale: [1.2, 1.2],
                duration: 50
            }).then({
                scale: [1, 1],
                duration: 50
            });
            if (Deck.image_index === Deck.image_list.length - 1) {
                clearInterval(interval);
                return Deck.reset();
            }
            Deck.next_image();
        }, 30);

    };

    this.multi_element_demo = function(){
        snabbt(document.querySelectorAll('.meetup-profile-thumbnail'), {
          fromRotation: [0, 0, 0],
          rotation: function(i, total) {
            return [0, 0, (i/(total - 1)) * (Math.PI/2)];
          },
          delay: function(i) {
            return i * 50;
          },
          easing: 'spring',
        }).then({
          rotation: [0, 0, 0],
          delay: function(i, total) {
            return (total - i - 1) * 50;
          },
          easing: 'ease',
        });
    };

    return this;
})();





var Snbbt_Reference = function($elem, position, rotation, scale, width, height, opacity, duration, delay, loop, rotationPost, spring, deaccel) {
    snabbt( $elem, 'attention', {
        position: position,
        rotation: rotation,
        scale: scale,
        width: width,
        height: height,
        opacity: opacity,
        duration: duration,
        delay: delay,
        loop: loop,
        rotationPost: rotationPost,
        springConstant: spring,
        springDeacceleration: deaccel
    });
};



var Rotate = (function(){

    this.rotate_container = function() {
        var container = document.getElementById('snabbt-stage');
        snabbt(container, {
            rotation: [0, 2 * Math.PI, 0],
            duration: 10000,
            perspective: 2000,
            loop: Infinity
        });
    };

    this.rotate_container_xy = function() {
        var container = document.getElementById('snabbt-stage');
        snabbt(container, {
            rotation: [0, 2 * Math.PI, 2 * Math.PI],
            duration: 10000,
            perspective: 2000,
            loop: Infinity
        });
    };

    this.rotate_container_stop = function() {
        var container = document.getElementById('snabbt-stage');
        snabbt(container, 'stop');
    };

    this.rotate_container_reset = function() {
        var container = document.getElementById('snabbt-stage');
        snabbt(container, {
            rotation: [0, 0, 0],
            duration: 1000,
            perspective: 2000,
            loop: 1
        });
    };
    return this;
})();












if (typeof document.body.ontouchend === "undefined") { eventType = "click"; } else { eventType = "touchend"; }


$(document)
    .ready(function() {
        $.ajax({
        url: 'https://api.meetup.com/2/members?order=name&group_urlname=CharlestonJS&offset=0&photo-host=public&format=json&page=100&sig_id=170928112&sig=0e6d35e4d5dbd43f7311ded495e31ba1d3ad39a6',
        dataType: 'jsonp',
        success: function(data) {
        Deck.create_meetup_images(data);
        var dataReturn = data;
        return dataReturn;
        }
        });
        Deck.reset();
    })
    .on(eventType, '.wiggler', function(){
        Wiggler.attention_shake($('.meetup-profile-thumbnail'), [0, 0, 3], 15, 0.9);
    })
    .on(eventType, '.wiggler-in-order', function() {
        Wiggler.waave_images();
    })
    .on(eventType, '.wiggler-in-order-different', function() {
        Wiggler.waave_images_different();
    })
    .on(eventType, '.multi-element-demo', function(){
        Wiggler.multi_element_demo();
    })
    .on(eventType, '.rotate', function(){
        Rotate.rotate_container();
    })
    .on(eventType, '.rotate-xy', function() {
        Rotate.rotate_container_xy();
    })
    .on(eventType, '.rotate-stop', function() {
        Rotate.rotate_container_stop();
    })
    .on(eventType, '.rotate-reset', function() {
        Rotate.rotate_container_reset();
    })
    .on(eventType, '.gridify', function() {
        Gridify.gridify_deck();
    })
    .on(eventType, '.gridify-wiggle', function() {
        Gridify.gridify_wiggle();
    })
    .on(eventType, '.gridify-multi-element-fancy', function() {
        Gridify.gridify_multi_element_fancy();
    })
;