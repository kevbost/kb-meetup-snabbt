var snabbt,

  rotate_container = function() {
    'use strict';
    var container = document.getElementById('snabbt-stage');
    snabbt(container, {
      rotation: [0, 2*Math.PI, 0],
      duration: 10000,
      perspective: 2000,
      loop: Infinity
    });
  },

  rotate_container_stop = function() {
    'use strict';
    var container = document.getElementById('snabbt-stage');
    snabbt(container, {
      rotation: [0, 2*Math.PI, 0],
      duration: 1000,
      perspective: 2000,
      loop: 1
    });
  },

  create_meetup_elements = function(url){
    'use strict';

    $('#snabbt-stage').append(
      '<img src="' + url + '" class="meetup-profile-thumbnail">'
      );
  },


  create_meetup_images = function(data){
    'use strict';
    for (var i = 0; i < data.results.length; i++) {
      if (typeof data.results[i].photo === "object"){
        create_meetup_elements(data.results[i].photo.thumb_link);
      }
    }
  },

  attentionShakeAnimationElement = function( $elem ) {
    'use strict';
    $elem.snabbt('attention', {
      rotation: [0, 0, 1],
      springConstant: 15,
      springDeacceleration: 0.9,
    });
  };

$(document).on('mouseenter', '.meetup-profile-thumbnail', function(e){
  'use strict';
  $(e.currentTarget).snabbt('attention', {
    rotation: [0, 0, 1],
    springConstant: 15,
    springDeacceleration: 0.9,
  });
});

$(document).ready(function(){
  'use strict';
    $.ajax({
        url:'https://api.meetup.com/2/members?order=name&group_urlname=CharlestonJS&offset=0&photo-host=public&format=json&page=100&sig_id=170928112&sig=0e6d35e4d5dbd43f7311ded495e31ba1d3ad39a6',
        dataType: 'jsonp',
        success: function(data){
          create_meetup_images(data);
        }
    });
});


