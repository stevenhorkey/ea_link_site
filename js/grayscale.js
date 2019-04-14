function setHeight(jq_in){
  jq_in.each(function(index, elem){
      // This line will work with pure Javascript (taken from NicB's answer):
      elem.style.height = elem.scrollHeight+'px'; 
  });
}

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 100
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  $(window).resize(function() {
    var windowsize = $(window).width();
    if (windowsize < 550) {
      //if the window is greater than 440px wide then turn on jScrollPane..
      $("body").css({
        'padding-top': $(".navbar").outerHeight()/2
      })
      $(".navbar-brand").html('Steven Horkey')
      $("#drift-widget-container").hide();
      
    } else if (windowsize >992){
      $("#drift-widget-container").show();
      $(".project-text").each(function(){
        var vidHeight = $(".embed-responsive-item").outerHeight();
        $(this).css({
          'height': vidHeight
        });
      });
      $("body").css({
        'padding-top': 0
      })
    } else {
      $(".navbar-brand").html('Steven Horkey | Session Musician');
    }
  }).resize();

  setHeight($('contact-message'))

  // youtube optimization code from https://www.onqmarketing.com.au/youtube-embed-generator/
  !function(){for(var t=document.getElementsByClassName("onq-youtube-player"),e=0;e<t.length;e++)t[e].onclick=function(){var t=document.createElement("iframe"),e="true"==this.dataset.ssv?"1":"0",s="true"==this.dataset.spc?"1":"0",i="true"==this.dataset.sta?"1":"0",a="true"==this.dataset.dkc?"1":"0",r="true"==this.dataset.ecc?"1":"0",o="true"==this.dataset.eap?"1":"0";for(t.setAttribute("src","//www.youtube.com/embed/"+this.dataset.id+"?rel="+e+"&controls="+s+"&showinfo="+i+"&disablekb="+a+"&cc_load_policy="+r+"&autoplay="+o),t.setAttribute("frameborder","0"),t.setAttribute("id","youtube-iframe"),t.setAttribute("style","width: 100%; height: 100%; position: absolute; top: 0; left: 0;"),"true"==this.dataset.afs&&t.setAttribute("allowfullscreen","");this.firstChild;)this.removeChild(this.firstChild);this.appendChild(t)}}();

  

})(jQuery); // End of use strict
