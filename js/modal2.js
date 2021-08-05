$(document).ready(function(){

  $('.button').click(function(){
    var buttonId = $(this).attr('id');
    $('#modal-container').removeAttr('class').addClass(buttonId);
    $('body').addClass('modal-active');
  });
  
  /* open mobile menu */
  $('.mobile-menu__burger').click(function(event){
    $('.mobile-menu__burger, .mobile-menu__cont').toggleClass('active');
    $('body').toggleClass('lock');
  });

  /* spoiler */
  $('.spoiler__title').click(function(event){
    if($('.spoiler').hasClass('one')){
      $('.spoiler__title').not($(this)).removeClass('active');
      $('.spoiler__text').not($(this).next()).slideUp(300);
    }
    $(this).toggleClass('active').next().slideToggle(300);
  });


  /* ------------------------------ */
  /* scroll jQuery -- js scroll or jQuery scroll */
  $('a[data-scroll]').on("click", function (e) {
    var anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top - 50
    }, 1000);
    e.preventDefault();
  });
  
  // Navigation Close On Click Function
  $(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
      $(this).collapse('hide');
    }
  });
  
  $(window).on("scroll", function(){
    /*
    * ----------------------------------------------------------------------------------------
    *   header On Scroll Animation
    * ----------------------------------------------------------------------------------------
    */  
   
   var header = $(".header");
   if (header.offset().top > 50) {
     header.addClass("nav-collapsed");
    } else {
      header.removeClass("nav-collapsed");
    }        
  });
  /* ------------------------------ */
});
