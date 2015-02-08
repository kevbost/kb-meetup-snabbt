var snabbt,
    images_arr,
    dataReturn,
    eventType,

    Deck = (function(data){
        this.image_list = [];
        this.image_index = [];

        this.create_meetup_elements = function(url, id) {
            $('#snabbt-stage').append(
                '<span class="img-container center"><img id="' + id + '" src="' + url + '" class="meetup-profile-thumbnail"></span>'
            );
        };

        this.create_meetup_images = function(data) {
            var that = this;
            for (var i = 0; i < data.results.length; i++) {
                if (typeof data.results[i].photo === "object" && data.results[i].id != "173713472") {
                    that.create_meetup_elements(data.results[i].photo.photo_link, data.results[i].id);
                    that.image_list.push(data.results[i].id);
                }
            }
        };

        this.next_image = function(data){
            if(this.image_index > this.image_list.length){ return; }
            return this.image_list[this.image_index++];
        };

        this.image_at = function(index){
            return this.image_list[index];
        };

        this.reset = function(){
            this.image_index = 0;
        };

        return this;
    })(),

    rotate_container = function() {
        var container = document.getElementById('snabbt-stage');
        snabbt(container, {
            rotation: [0, 2 * Math.PI, 0],
            duration: 10000,
            perspective: 2000,
            loop: Infinity
        });
    },

    rotate_container_stop = function() {
        var container = document.getElementById('snabbt-stage');
        snabbt(container, 'stop');
    },

    rotate_container_reset = function() {
        var container = document.getElementById('snabbt-stage');
        snabbt(container, {
            fromrotation: [0, -2 * Math.PI, 0],
            duration: 1000,
            perspective: 2000,
            loop: 1
        });
    },

    rotate_container_xy = function() {
        var container = document.getElementById('snabbt-stage');
        snabbt(container, {
            rotation: [0, 2 * Math.PI, 2 * Math.PI],
            duration: 10000,
            perspective: 2000,
            loop: Infinity
        });
    },

    attention_shake = function($elem, arr, spring, deaccel) {
        $elem.snabbt('attention', {
            rotation: arr,
            springConstant: spring,
            springDeacceleration: deaccel
        });
    },

    waave_images = function() {
        snabbt(document.getElementById(Deck.image_list[Deck.image_index]), 'stop');
        Deck.reset();

        var interval = setInterval(function() {
            snabbt(document.getElementById(Deck.image_list[Deck.image_index]), 'attention', {
                rotation: [0, 0, 1],
                springConstant: 15,
                springDeacceleration: 0.9
            });
            if (Deck.image_index === Deck.image_list.length - 1) {
                clearInterval(interval);
                return Deck.reset();
            }
            Deck.next_image();
        }, 20);
    },

    waave_images_different = function(images) {
        snabbt(document.getElementById(Deck.image_list[Deck.image_index]), 'stop');
        Deck.reset();

        var interval = setInterval(function() {
            snabbt(document.getElementById(Deck.image_list[Deck.image_index]), {
                    scale: [0.9, 0.9],
                duration: 10
            })
            .then({
                scale: [1, 1],
                duration: 5000
            });
            if (Deck.image_index === Deck.image_list.length - 1) {
                clearInterval(interval);
                return Deck.reset();
            }
            Deck.next_image();
        }, 10);

    }
;


if (typeof document.body.ontouchend === "undefined") { eventType = "click"; } else { eventType = "touchend"; }

$(document)
    .ready(function() {
        $.ajax({
            url: 'https://api.meetup.com/2/members?order=name&group_urlname=CharlestonJS&offset=0&photo-host=public&format=json&page=100&sig_id=170928112&sig=0e6d35e4d5dbd43f7311ded495e31ba1d3ad39a6',
            dataType: 'jsonp',
            success: function(data) {
                Deck.create_meetup_images(data);
                return dataReturn = data;
            }
        });
        Deck.reset();
    })
    .on('mouseenter', '.meetup-profile-thumbnail', function(e) {
        attention_shake($(e.currentTarget), [0, 0, 1], 15, 0.9);
    })
    .on(eventType, '.wiggler', function() {
        attention_shake($('.meetup-profile-thumbnail'), [0, 0, 3], 15, 0.9);
    })
    .on(eventType, '.wiggler-in-order', function() {
        waave_images();
    })
    .on(eventType, '.wiggler-in-order-different', function() {
        waave_images_different();
    })
    .on(eventType, '.rotate', function() {
        rotate_container();
    })
    .on(eventType, '.rotate-xy', function() {
        rotate_container_xy();
    })
    .on(eventType, '.rotate-stop', function() {
        rotate_container_stop();
    })
    .on(eventType, '.rotate-reset', function() {
        rotate_container_reset();
    })
;
