function setHeight(jq_in){
  jq_in.each(function(index, elem){
      // This line will work with pure Javascript (taken from NicB's answer):
      elem.style.height = elem.scrollHeight+'px'; 
  });
}

function openOrderModal(type){
  $("#orderModal").modal('show');
  if(type !== 'demo')  $("#order-form-title").html('Order Form: ' + type);
  else $("#order-form-title").html('Order Form');
  $("#order-form").attr('name',type);
}

function submitForm(whichForm){
  // send form response to email
  // e.preventDefault();
  var $form = $('#'+whichForm);
  var submitButton = $form.find("button[type='submit']");
  var $data = JSON.parse(JSON.stringify($form.serializeArray()));
  submitButton.prop('disabled',true);
  submitButton.html('Submitting. Please Wait...');

  var message = "New " + whichForm + " submission...\n\n\n";
  $data.forEach(function(field){
    message += field.name + ': ' + field.value + '\n\n';
  });

  // console.log($form, message);

  var data = {
    message: message,
    sendTo: "steven@sessionsongs.com",
    subject: "New Session " + whichForm + " submission"
  };
  // $.post('https://sessionsbysteven.herokuapp.com/api/sendEmails',data, function(res){
  //   console.log(res);
  //   if(res === 'success'){
  //     $(".form-response").remove();
  //     var formResponse = $('<div class="bg-success p-3 mx-auto my-3 round text-center form-response">Submission Successful</div>');
  //     formResponse.insertAfter(submitButton);
  //     $form[0].reset();
  //   } 
  //   else {
  //     var formResponse = $('<div class="bg-danger p-3 mx-auto my-3 text-white round text-center">Error. Email directly at steven@sessionsongs.com</div>');
  //     formResponse.insertAfter(submitButton);
  //     alert('Sorry, there was an error in submitting your form. Please email me directly at steven@sessionsongs.com');
  //   }
  // });

  $.ajax({
    type: "POST",
    url: "https://sessionsbysteven.herokuapp.com/api/sendEmail",
    data: data,
    success: function(msg){
      $(".form-response").remove();
      // var formResponse = $('<div class="bg-success p-3 mx-auto my-3 round text-center form-response">Submission Successful</div>');
      // formResponse.insertAfter(submitButton);
      $form[0].reset();
      submitButton.html('Submission Successful');

      setTimeout(function(){
        $(".form-response").fadeOut();
        submitButton.html('Submit Another');

      }, 4000)
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      var formResponse = $('<div class="bg-danger p-3 mx-auto my-3 text-white round text-center">Error. Please email me directly at <a href="mailto:steven@sessionsongs.com">steven@sessionsongs.com</a></div>');
      formResponse.insertAfter(submitButton);
      // alert('Sorry, there was an error in submitting your form. Please email me directly at <a href="mailto:steven@sessionsongs.com">steven@sessionsongs.com</a>')
    }
  });

  // $form[0].reset();
  
  submitButton.prop('disabled',false);

  // setTimeout(function(){
  //   formReponse.fadeOut('slow');
  // },5000);
  
  return false;
}

function formatAMPM(date) {
  // from stack overflow - bbrame
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function loadDrift(){
  !function() {
    var t = window.driftt = window.drift = window.driftt || [];
    if (!t.init) {
      if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
      t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
      t.factory = function(e) {
        return function() {
          var n = Array.prototype.slice.call(arguments);
          return n.unshift(e), t.push(n), t;
        };
      }, t.methods.forEach(function(e) {
        t[e] = t.factory(e);
      }), t.load = function(t) {
        var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
        o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
        var i = document.getElementsByTagName("script")[0];
        i.parentNode.insertBefore(o, i);
      };
    }
  }();
  drift.SNIPPET_VERSION = '0.3.1';
  drift.load('9e38fpgvg92f');
}

function deleteDrift(){
  $("#drift-widget-container").remove();
}

(function($) {
  "use strict"; // Start of use strict

  AOS.init();
  $("#mstime").html(formatAMPM(new Date));

  

  // $("#initVocals").click(function(){openOrderModal('vocals')});
  // $("#initGuitar").click(function(){openOrderModal('guitar')});
  // $("#initDemo").click(function(){openOrderModal('demo')});
  $(".initOrder").click(function(){openOrderModal('order')});

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
    if (windowsize < 650) {
      //if the window is greater than 440px wide then turn on jScrollPane..
      console.log('mobile display');
      deleteDrift();
      setTimeout(function(){
        console.log('please hide sc bs')
        // $("#vocal_sc_embed").contents();
      }, 3000)
      $("body").css({
        'padding-top': $(".navbar").outerHeight()/3
      })
      $(".nav-tagline").hide();

      $(".navbar-brand").html('Session Songs<br/><small style="font-size:13px;" class="d-block">Professional Guitar <br/>& Vocal Tracks</small>');
      $(".navbar-brand").css('font-size','20px');
    } else if (windowsize < 992){
      $(".nav-tagline").show();
      $(".navbar-brand").html('Session Songs');
    } else{
      $("body").css({
        'padding-top': '0px'
      });
      console.log("this big")
      $(".nav-tagline").hide();
      $(".navbar-brand").html('Session Songs<br/><small class="d-block">Professional Guitar <br/>& Vocal Tracks</small>');
      $("#drift-widget").show();
      $(".project-text").each(function(){
        var vidHeight = $(".embed-responsive-item").outerHeight();
        $(this).css({
          'height': vidHeight
        });
      });
      $(".nav-tagline").hide();
      // loadDrift();
    }
  }).resize();

  setHeight($('contact-message'))

  // youtube optimization code from https://www.onqmarketing.com.au/youtube-embed-generator/
  !function(){for(var t=document.getElementsByClassName("onq-youtube-player"),e=0;e<t.length;e++)t[e].onclick=function(){var t=document.createElement("iframe"),e="true"==this.dataset.ssv?"1":"0",s="true"==this.dataset.spc?"1":"0",i="true"==this.dataset.sta?"1":"0",a="true"==this.dataset.dkc?"1":"0",r="true"==this.dataset.ecc?"1":"0",o="true"==this.dataset.eap?"1":"0";for(t.setAttribute("src","//www.youtube.com/embed/"+this.dataset.id+"?rel="+e+"&controls="+s+"&showinfo="+i+"&disablekb="+a+"&cc_load_policy="+r+"&autoplay="+o),t.setAttribute("frameborder","0"),t.setAttribute("id","youtube-iframe"),t.setAttribute("style","width: 100%; height: 100%; position: absolute; top: 0; left: 0;"),"true"==this.dataset.afs&&t.setAttribute("allowfullscreen","");this.firstChild;)this.removeChild(this.firstChild);this.appendChild(t)}}();

  

})(jQuery); // End of use strict
