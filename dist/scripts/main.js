var snabbt,rotate_container=function(){var e=document.getElementById("snabbt-stage");snabbt(e,{rotation:[0,2*Math.PI,0],duration:1e4,perspective:2e3,loop:1/0})},rotate_container_stop=function(){var e=document.getElementById("snabbt-stage");snabbt(e,{rotation:[0,2*Math.PI,0],duration:1e3,perspective:2e3,loop:1})},create_meetup_elements=function(e){$("#snabbt-stage").append('<span class="img-container center"><img src="'+e+'" class="meetup-profile-thumbnail"></span>')},create_meetup_images=function(e){for(var t=0;t<e.results.length;t++)"object"==typeof e.results[t].photo&&"173713472"!=e.results[t].id&&create_meetup_elements(e.results[t].photo.photo_link)},attention_shake=function(e,t,n,o){e.snabbt("attention",{rotation:t,springConstant:n,springDeacceleration:o})},eventType;eventType="undefined"==typeof document.body.ontouchend?"click":"touchend",$(document).on("mouseenter",".meetup-profile-thumbnail",function(e){attention_shake($(e.currentTarget),[0,0,1],15,.9)}).on(eventType,".wiggler",function(){attention_shake($(".meetup-profile-thumbnail"),[0,0,3],15,.9)}),$(document).ready(function(){$.ajax({url:"https://api.meetup.com/2/members?order=name&group_urlname=CharlestonJS&offset=0&photo-host=public&format=json&page=100&sig_id=170928112&sig=0e6d35e4d5dbd43f7311ded495e31ba1d3ad39a6",dataType:"jsonp",success:function(e){create_meetup_images(e)}})});