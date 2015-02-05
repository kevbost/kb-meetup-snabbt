var snabbt,
  rotate_container = function() {
    var container = document.getElementById('snabbt-stage');
    snabbt(container, {
      rotation: [0, 2*Math.PI, 0],
      duration: 10000,
      perspective: 2000,
      loop: Infinity
    });
  },

  rotate_container_stop = function() {
    var container = document.getElementById('snabbt-stage');
    snabbt(container, {
      rotation: [0, 2*Math.PI, 0],
      duration: 1000,
      perspective: 2000,
      loop: 1
    });
  },

  create_meetup_elements = function(url){

    $('#snabbt-stage').append(
      '<span class="img-container center"><img src="' + url + '" class="meetup-profile-thumbnail"></span>'
      );
  },

  create_meetup_images = function(data){
    for (var i = 0; i < data.results.length; i++) {
      if (typeof data.results[i].photo === "object" && data.results[i].id != "173713472"){
        create_meetup_elements(data.results[i].photo.photo_link);
      }
    }
  },

  attention_shake = function( $elem, arr, spring, deaccel ) {
    $elem.snabbt('attention', {
      rotation: arr,
      springConstant: spring,
      springDeacceleration: deaccel,
    });
  }
;


var eventType;
if (typeof document.body.ontouchend === "undefined") {
  eventType = "click";
} else {
  eventType = "touchend";
}


$(document)
  .on('mouseenter', '.meetup-profile-thumbnail', function(e){
    attention_shake($(e.currentTarget), [0,0,1], 15, 0.9);
  })
  .on(eventType, '.wiggler', function(){
    attention_shake($('.meetup-profile-thumbnail'), [0,0,3], 15, 0.9);
  })
;

$(document).ready(function(){
    $.ajax({
        url:'https://api.meetup.com/2/members?order=name&group_urlname=CharlestonJS&offset=0&photo-host=public&format=json&page=100&sig_id=170928112&sig=0e6d35e4d5dbd43f7311ded495e31ba1d3ad39a6',
        dataType: 'jsonp',
        success: function(data){
          create_meetup_images(data);
        }
    });
});


