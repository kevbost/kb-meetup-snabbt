var snabbt,eventType,dataReturn,Deck,Deck=function(){return this.image_list=[],this.image_index=[],this.image_split=[],this.next_image=function(){return this.image_index>this.image_list.length?void 0:this.image_list[this.image_index++]},this.image_at=function(t){return this.image_list[t]},this.reset=function(){this.image_index=0},this.splitUp=function(t,e){for(var n=t.length%e,i=n,a=Math.floor(t.length/e),o=[],r=0;r<t.length;r+=a){var s=a+r,c=!1;0!==n&&i&&(s++,i--,c=!0),o.push(t.slice(r,s)),c&&r++}Deck.image_split.push(o)},this.create_meetup_elements=function(t,e){$("#snabbt-stage").append('<span class="img-container default center"><img id="'+e+'" src="'+t+'" class="meetup-profile-thumbnail default"></span>')},this.create_meetup_images=function(t){for(var e=this,n=0;n<t.results.length;n++)"object"==typeof t.results[n].photo&&"173713472"!=t.results[n].id&&(e.create_meetup_elements(t.results[n].photo.photo_link,t.results[n].id),e.image_list.push([t.results[n].photo.photo_link,t.results[n].id]));this.splitUp(Deck.image_list,Deck.image_list.length/4)},this}(),snabbt,Gridify=function(){return this.snabbt_attention=function(t,e,n,i,a){return{rotation:[t,e,n],springConstant:i,springDeacceleration:a}},this.gridify_wiggle=function(){for(var t=this,e=0;e<Deck.image_split[0].length;e++)for(var n=0;n<Deck.image_split[0][e].length;n++){var i=document.getElementById(Deck.image_split[0][e][n][1]);0===n&&snabbt(i,"attention",t.snabbt_attention(0,0,1,10,.9)),1===n&&snabbt(i,"attention",t.snabbt_attention(0,0,2,10,.9)),2===n&&snabbt(i,"attention",t.snabbt_attention(0,0,4,10,.9)),3===n&&snabbt(i,"attention",t.snabbt_attention(0,0,6,10,.9))}},this}(),Gridify=function(){return this.gridify_deck=function(){$(".img-container").addClass("col-xs-3 grid").removeClass("default"),$(".meetup-profile-thumbnail").addClass("grid").removeClass("default"),$(".gridify-btn").removeClass("hidden"),this.gridify_manage()},this.gridify_manage=function(){for(var t=0;t<Deck.image_split[0].length;t++)for(var e=0;e<Deck.image_split[0][t].length;e++){var n=$(document.getElementById(Deck.image_split[0][t][e][1]));0===e&&n.addClass("one"),1===e&&n.addClass("two"),2===e&&n.addClass("three"),3===e&&n.addClass("four")}},this.snabbt_attention=function(t,e,n,i,a){return{rotation:[t,e,n],springConstant:i,springDeacceleration:a}},this.gridify_wiggle=function(){for(var t=this,e=0;e<Deck.image_split[0].length;e++)for(var n=0;n<Deck.image_split[0][e].length;n++)0===n&&snabbt($(".one"),"attention",t.snabbt_attention(0,0,1,1,0)),1===n&&snabbt($(".two"),"attention",t.snabbt_attention(0,0,2,1,0)),2===n&&snabbt($(".three"),"attention",t.snabbt_attention(0,0,4,1,0)),3===n&&snabbt($(".four"),"attention",t.snabbt_attention(0,0,6,1,0))},this.gridify_multi_element_fancy=function(){var t={rotation:[0,0,0],position:[0,0,0],skew:[0,0],scale:[1,1],delay:15e3,perspective:2e3,easing:"ease"};snabbt($("#snabbt-stage"),{rotation:[0,2*Math.PI,0],duration:16e3,perspective:1e3}).then(t),snabbt($(".one").parent(),{perspective:2e3,rotation:[.7,0,0],position:function(t){var e=[0,0,20*t];return e},scale:function(t,e){var n=(t/-e+1)/Math.PI+.5,i=[n,n];return i},delay:function(t){return 50*t},fromskew:[0,0],skew:function(t){var e=[0,t/10-.2,0];return e}}).then(t),snabbt($(".two").parent(),{rotation:[-.7,.7,0],perspective:2e3,position:function(t){var e=[0,0,10*t];return e},scale:function(t,e){var n=(t/-e+1)/Math.PI+.5,i=[n,n];return i},delay:function(t){return 50*t},fromskew:[0,0],skew:function(t){var e=[0,t/10-.4,0];return e}}).then(t),snabbt($(".three").parent(),{rotation:[-.7,-.7,0],perspective:2e3,position:function(t){var e=[0,0,10*t];return e},scale:function(t,e){var n=(t/-e+1)/Math.PI+.5,i=[n,n];return i},delay:function(t){return 50*t},fromskew:[0,0],skew:function(t){var e=[0,-t/10+.4,0];return e}}).then(t),snabbt($(".four").parent(),{rotation:[.7,0,0],perspective:2e3,position:function(t){var e=[0,0,20*t];return e},scale:function(t,e){var n=(t/-e+1)/Math.PI+.5,i=[n,n];return i},delay:function(t){return 50*t},fromskew:[0,0],skew:function(t){var e=[0,-t/10+.2,0];return e}}).then(t)},this}(),Wiggler=function(){return this.attention_shake=function(t,e,n,i){t.snabbt("attention",{rotation:e,springConstant:n,springDeacceleration:i})},this.waave_images=function(){snabbt(document.getElementById(Deck.image_list[Deck.image_index][1]),"stop"),Deck.reset();var t=setInterval(function(){return snabbt(document.getElementById(Deck.image_list[Deck.image_index][1]),"attention",{rotation:[0,0,1],springConstant:15,springDeacceleration:.9}),Deck.image_index===Deck.image_list.length-1?(clearInterval(t),Deck.reset()):void Deck.next_image()},50)},this.waave_images_different=function(){snabbt(document.getElementById(Deck.image_list[Deck.image_index][1]),"stop"),Deck.reset();var t=setInterval(function(){return snabbt(document.getElementById(Deck.image_list[Deck.image_index][1]),{scale:[.9,.9],duration:10}).then({scale:[1.2,1.2],duration:50}).then({scale:[1,1],duration:50}),Deck.image_index===Deck.image_list.length-1?(clearInterval(t),Deck.reset()):void Deck.next_image()},30)},this.multi_element_demo=function(){snabbt(document.querySelectorAll(".meetup-profile-thumbnail"),{fromRotation:[0,0,0],rotation:function(t,e){return[0,0,t/(e-1)*(Math.PI/2)]},delay:function(t){return 50*t},easing:"spring"}).then({rotation:[0,0,0],delay:function(t,e){return 50*(e-t-1)},easing:"ease"})},this}(),Snbbt_Reference=function(t,e,n,i,a,o,r,s,c,u,l,g,d){snabbt(t,"attention",{position:e,rotation:n,scale:i,width:a,height:o,opacity:r,duration:s,delay:c,loop:u,rotationPost:l,springConstant:g,springDeacceleration:d})},Rotate=function(){return this.rotate_container=function(){var t=document.getElementById("snabbt-stage");snabbt(t,{rotation:[0,2*Math.PI,0],duration:1e4,perspective:2e3,loop:1/0})},this.rotate_container_xy=function(){var t=document.getElementById("snabbt-stage");snabbt(t,{rotation:[0,2*Math.PI,2*Math.PI],duration:1e4,perspective:2e3,loop:1/0})},this.rotate_container_stop=function(){var t=document.getElementById("snabbt-stage");snabbt(t,"stop")},this.rotate_container_reset=function(){var t=document.getElementById("snabbt-stage");snabbt(t,{rotation:[0,0,0],duration:1e3,perspective:2e3,loop:1})},this}();eventType="undefined"==typeof document.body.ontouchend?"click":"touchend",$(document).ready(function(){$.ajax({url:"https://api.meetup.com/2/members?order=name&group_urlname=CharlestonJS&offset=0&photo-host=public&format=json&page=100&sig_id=170928112&sig=0e6d35e4d5dbd43f7311ded495e31ba1d3ad39a6",dataType:"jsonp",success:function(t){Deck.create_meetup_images(t);var e=t;return e}}),Deck.reset()}).on(eventType,".wiggler",function(){Wiggler.attention_shake($(".meetup-profile-thumbnail"),[0,0,3],15,.9)}).on(eventType,".wiggler-in-order",function(){Wiggler.waave_images()}).on(eventType,".wiggler-in-order-different",function(){Wiggler.waave_images_different()}).on(eventType,".multi-element-demo",function(){Wiggler.multi_element_demo()}).on(eventType,".rotate",function(){Rotate.rotate_container()}).on(eventType,".rotate-xy",function(){Rotate.rotate_container_xy()}).on(eventType,".rotate-stop",function(){Rotate.rotate_container_stop()}).on(eventType,".rotate-reset",function(){Rotate.rotate_container_reset()}).on(eventType,".gridify",function(){Gridify.gridify_deck()}).on(eventType,".gridify-wiggle",function(){Gridify.gridify_wiggle()}).on(eventType,".gridify-multi-element-fancy",function(){Gridify.gridify_multi_element_fancy()});