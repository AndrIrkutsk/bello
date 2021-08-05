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
});