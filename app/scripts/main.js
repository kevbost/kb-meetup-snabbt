var snabbt,
    eventType,
    dataReturn,

    Deck = (function(data){
        this.image_list = [];
        this.image_index = [];
        this.image_split = [];

        this.splitUp = function(arr, n) { // use splitUp(arr, (arr.length / 4.5 or))
            var rest = arr.length % n,
                restUsed = rest,
                partLength = Math.floor(arr.length / n),
                result = [];
            for(var i = 0; i < arr.length; i += partLength) {
                var end = partLength + i,
                    add = false;
                if(rest !== 0 && restUsed) {
                    end++;
                    restUsed--;
                    add = true;
                }
                result.push(arr.slice(i, end));
                if(add) {
                    i++;
                }
            }
            Deck.image_split.push(result);
            // return Deck.clear_and_rebuild(result);
        };

        this.create_meetup_elements = function(url, id) {
            $('#snabbt-stage').append(
                '<span class="img-container default center"><img id="' + id + '" src="' + url + '" class="meetup-profile-thumbnail default"></span>'
            );
        };

        this.create_meetup_images = function(data) {
            var that = this;
            for (var i = 0; i < data.results.length; i++) {
                if (typeof data.results[i].photo === "object" && data.results[i].id != "173713472") {
                    that.create_meetup_elements(data.results[i].photo.photo_link, data.results[i].id);
                    that.image_list.push([data.results[i].photo.photo_link, data.results[i].id]);
                }
            }
            // var list = Deck.image_list;
            this.splitUp(Deck.image_list, (Deck.image_list.length / 4));
        };

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

        this.create_meetup_elements_split = function(url, id) {
            $('#snabbt-stage').append(
                '<row>' +
                    '<div class="col-xs-3 center">' +
                    '<span class="img-container-default center"><img id="' + id + '" src=' + url + ' class="meetup-profile-thumbnail"></span>' +
                    '</div>' +
                '</row>'
            );
        };

        this.clear_and_rebuild = function(data){
            $('#snabbt-stage').html(' ');
            var url, id;

            for (var i = 0; i < this.image_split[0].length; i++) {
                for (var x = 0; x < this.image_split[0][i].length; x++) {
                    url = this.image_split[0][i][x][0];
                    id = this.image_split[0][i][x][1];
                    this.create_meetup_elements_split(url, id);
                }
            }
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
            rotation: [0, 0, 0],
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
        }, 20);
    },



    waave_images_different = function(images) {
        snabbt(document.getElementById(Deck.image_list[Deck.image_index][1]), 'stop');
        Deck.reset();

        var interval = setInterval(function() {
            snabbt(document.getElementById(Deck.image_list[Deck.image_index][1]), {
                    scale: [0.9, 0.9],
                duration: 10
            })
            .then({
                scale: [1.2, 1.2],
                duration: 1000
            }).then({
                scale: [1, 1],
                duration: 50
            });
            if (Deck.image_index === Deck.image_list.length - 1) {
                clearInterval(interval);
                return Deck.reset();
            }
            Deck.next_image();
        }, 10);

    },




    gridify_manage = function(){
        for (var i = 0; i < Deck.image_split[0].length; i++) {
            for (var x = 0; x < Deck.image_split[0][i].length; x++) {
                if (x === 0) {
                    $(document.getElementById(Deck.image_split[0][i][x][1])).addClass('one');
                }
                if (x === 1) {
                    $(document.getElementById(Deck.image_split[0][i][x][1])).addClass('two');
                }
                if (x === 2) {
                    $(document.getElementById(Deck.image_split[0][i][x][1])).addClass('three');
                }
                if (x === 3) {
                    $(document.getElementById(Deck.image_split[0][i][x][1])).addClass('four');
                }
            }
        }
    },



    gridify_deck = function(){
        $('.img-container').addClass('col-xs-3 grid').removeClass('default');
        $('.meetup-profile-thumbnail').addClass('grid').removeClass('default');
        $('.gridify-btn').removeClass('hidden');
        gridify_manage();
    },



    gridify_shift = function(){

        $('.one').snabbt({});

    },



    gridify_wiggle = function(){

        for (var i = 0; i < Deck.image_split[0].length; i++) {
            for (var x = 0; x < Deck.image_split[0][i].length; x++) {
                if (x === 0) {
                    snabbt(document.getElementById(Deck.image_split[0][i][x][1]), {
                        rotation: [0, 0, 1],
                        delay: 1000
                    });
                }
                if (x === 1) {
                    snabbt(document.getElementById(Deck.image_split[0][i][x][1]), {
                        rotation: [0, 0, 2],
                        delay: 1000
                    });
                }
                if (x === 2) {
                    snabbt(document.getElementById(Deck.image_split[0][i][x][1]), {
                        rotation: [0, 0, 3],
                        delay: 1000
                    });
                }
                if (x === 3) {
                    snabbt(document.getElementById(Deck.image_split[0][i][x][1]), {
                        rotation: [0, 0, 4],
                        delay: 1000
                    });
                }
            }
        }
    },



    multi_element_demo = function(){
        snabbt(document.querySelectorAll('img'), {
            fromRotation: [0, 0, 0],
            rotation: function(i, total) {
                return [0, 0, (i / (total - 1)) * (Math.PI / 2)];
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
    },

    multi_element_implimentation = function(){
        snabbt($('.one'), {
            fromRotation: [0, 0, 0],
            rotation: function(i, total) {
                return [0, (i / (total - 5)) * (Math.PI / 2), 0];
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
    },

    multi_element_simultaneous = function(){

        var defaultPosition = {
            rotation:       [0, 0, 0],
            position:       [0, 0, 0],
            skew:           [0, 0],
            scale:          [1, 1],
            delay:          5000,
            perspective:    0,
            easing:         'ease',
        };

        snabbt($('#snabbt-stage'), {
            fromRotation: [0, 0, 0],
            rotation: [0, 2 * Math.PI, 0],
            duration: 6000,
            perspective: 1000,
        }).then(defaultPosition);

        snabbt($('.one').parent(), {
            fromRotation: [0, 0, 0],
            // fromPerspective: 200,
            perspective: 2000,
            rotation: [0, 0.7, 0],
            fromPosition: [0, 0, 0],
            position: [0, 0, 0],
            scale: function(i, total) {
                var scale_equ = ((i / - total + 1) / Math.PI) + 0.5;
                var equ = [scale_equ, scale_equ];
                // window.console.log(equ);
                return equ;
            },
            delay: function(i) {
                return i * 50;
            },
            fromskew: [0, 0],
            skew: function(i, total) {
                var equ = [0, i / 10 - 0.2, 0];
                // window.console.log(equ);
                return equ;
            },

        }).then(defaultPosition);

        snabbt($('.two').parent(), {
            fromRotation: [0, 0, 0],
            rotation: [0, 0.7, 0],
            fromPosition: [0, 0, 0],
            perspective: 100,
            position: [0, 0, 0],
            scale: function(i, total) {
                var scale_equ = ((i / - total + 1) / Math.PI) + 0.5;
                var equ = [scale_equ, scale_equ];
                // window.console.log(equ);
                return equ;
            },
            delay: function(i) {
                return i * 50;
            },
            fromskew: [0, 0],
            skew: function(i, total) {
                var equ = [0, i / 10 - 0.4, 0];
                // window.console.log(equ);
                return equ;
            },

        }).then(defaultPosition);

        snabbt($('.three').parent(), {
            fromRotation: [0, 0, 0],
            rotation: [0, 0.7, 0],
            fromPosition: [0, 0, 0],
            perspective: 100,
            position: [0, 0, 0],
            scale: function(i, total) {
                var scale_equ = ((i / - total + 1) / Math.PI) + 0.5;
                var equ = [scale_equ, scale_equ];
                // window.console.log(equ);
                return equ;
            },
            delay: function(i) {
                return i * 50;
            },
            fromskew: [0, 0],
            skew: function(i, total) {
                var equ = [0, - i / 10 + 0.4, 0];
                // window.console.log(equ);
                return equ;
            },

        }).then(defaultPosition);

        snabbt($('.four').parent(), {
            fromRotation: [0, 0, 0],
            rotation: [0, 0.7, 0],
            fromPosition: [0, 0, 0],
            perspective: 2000,
            position: [0, 0, 0],
            scale: function(i, total) {
                var scale_equ = ((i / - total + 1) / Math.PI) + 0.5;
                var equ = [scale_equ, scale_equ];
                // window.console.log(equ);
                return equ;
            },
            delay: function(i) {
                return i * 50;
            },
            fromskew: [0, 0],
            skew: function(i, total) {
                var equ = [0, - i / 10 + 0.2, 0];
                // window.console.log(equ);
                return equ;
            },

        }).then(defaultPosition);
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
    .on(eventType, '.multi-element-demo', function() {
        multi_element_demo();
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
    .on(eventType, '.gridify', function() {
        gridify_deck();
    })
    .on(eventType, '.gridify-wiggle', function() {
        gridify_wiggle();
    })

;



Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};
