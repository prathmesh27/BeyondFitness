jQuery(document).ready(function(){
"use strict";

  var height = $('.gallery-detail').height();
  var divide = height/2;
  $('.gallery-detail').css({
      "margin-top": -divide
  });

  var height2 = $('.effect > span').height()+50;
  var divide2 = height2/2;
  $('.effect > span').css({
      "margin-top": -divide2
  });

  var height3 = $('.effect > ul').height();
  var divide3 = height3/2;
  $('.effect > ul').css({
      "margin-top": -divide3
  });


/* =============== Sticky Header ===================== */
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 70) {
        $("header").addClass("sticky");
    }
    else{
        $("header").removeClass("sticky");
    }
}); 

/* =============== Responsive Header ===================== */
$('header > span').click(function(){
  $("nav").fadeToggle();
});

/* =============== Smooth Scrolling ===================== */
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 2000);
      }
    }
  });
});


var lastId,
    topMenu = $("nav"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }                   
});	

/*** AJAX CONTACT FORM ***/ 
$('#contactform').submit(function(){
    var action = $(this).attr('action');
    $("#message").slideUp(750,function() {
    $('#message').hide();
        $('#submit')
        .after('<img src="images/ajax-loader.gif" class="loader" />')
        .attr('disabled','disabled');
    $.post(action, {
        name: $('#name').val(),
        email: $('#email').val(),
        comments: $('#comments').val(),
        verify: $('#verify').val()
    },
        function(data){
            document.getElementById('message').innerHTML = data;
            $('#message').slideDown('slow');
            $('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
            $('#submit').removeAttr('disabled');
            if(data.match('success') != null) $('#contactform').slideUp('slow');

        }
    );
    });
    return false;
});




});


$(window).load(function(){
  jQuery("body a[data-rel^='prettyPhoto']").prettyPhoto({
      theme: "facebook",
  });

  $('.overlay').fadeOut(2000);
});



