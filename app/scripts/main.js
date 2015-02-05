var PANCAKE_COUNT = 40;





function create_pancake(container, index) {
  var pancake = document.createElement('div');
  pancake.className = 'pancake';
  pancake.style.background = '#D82222';

  container.appendChild(pancake);
  return pancake;
}

var Stack = (function(){
  this.pancakes = [];
  this.pancake_index = [];

  for (var i = 0; i < PANCAKE_COUNT; i++) {
    var container = document.getElementById('snabbt-stage');
    this.pancakes.push(create_pancake(container, i));
  }

  this.next_pancake = function() {
    if(this.pancake_index > 51)
      return;
    return this.pancakes[this.pancake_index++];
  };

  this.pancake_at = function(index) {
    return this.pancakes[index];
  };

  this.reset = function() {
    this.pancake_index = 0;
  };
  return this;
})();



function rotate_container() {
  var container = document.getElementById('snabbt-stage');
  snabbt(container, {
    rotation: [0, 2*Math.PI, 0],
    duration: 10000,
    perspective: 2000,
    loop: Infinity
  });
}

function rotate_container_stop() {
  var container = document.getElementById('snabbt-stage');
  snabbt(container, {
    rotation: [0, 2*Math.PI, 0],
    duration: 1000,
    perspective: 2000,
    loop: 1
  });
}

function create_meetup_images(data){
  for (var i = 0; i < data.results.length; i++) {
    if (typeof data.results[i].photo == "object"){
      create_meetup_elements(data.results[i].photo.thumb_link);
    }
  };
}

function create_meetup_elements(url){

  $('#snabbt-stage').append(
    '<img src="' + url + '" class="meetup-profile-thumbnail">'
    )
}


function attentionShakeAnimationElement( $elem ) {
  $elem.snabbt('attention', {
    rotation: [0, 0, 1],
    springConstant: 15,
    springDeacceleration: 0.9,
  });
}

function attentionShakeAnimationEvent( e ) {
  $(e.currentTarget).snabbt('attention', {
    rotation: [0, 0, 1],
    springConstant: 15,
    springDeacceleration: 0.9,
  });
}

$(document).on('mouseenter', '.meetup-profile-thumbnail', function(e){
  $(e.currentTarget).snabbt('attention', {
    rotation: [0, 0, 1],
    springConstant: 15,
    springDeacceleration: 0.9,
  });
})

$(document).ready(function(){
    $.ajax({
        url:'https://api.meetup.com/2/members?order=name&group_urlname=CharlestonJS&offset=0&photo-host=public&format=json&page=100&sig_id=170928112&sig=0e6d35e4d5dbd43f7311ded495e31ba1d3ad39a6',
        dataType: 'jsonp',
        success: function(data){
          create_meetup_images(data);
        }
    });
})





// // Specify the local route you'd like to hit
// app.use('/api/collections/:collId', function(req, res) {

// // Form the actual remote url that you'd like your request forwarded to
// var url = "http://your-really-cool-api.com/v1/collections/" + req.params.collId;

// // Log your request to the console, if you like
// reportProxy(req, url);

// // Pipe it there, and pipe it back. WOW!
// req.pipe(request(url)).pipe(res); });

// // Specify the local route you'd like to hit
// // Form the actual remote url that you'd like your request forwarded to
// // Log your request to the console, if you like
// // Pipe it there, and pipe it back. WOW!
// app.use('/api/collections/:collId', function(req, res) {
//   var url = "http://your-really-cool-api.com/v1/collections/" + req.params.collId;
//   reportProxy(req, url);
//   req.pipe(request(url)).pipe(res);
// });