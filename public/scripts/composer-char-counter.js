$(document).ready(function(){
  $("textarea").keyup(function(){
    $(this).siblings(".counter")[0].innerHTML = 140 - $(this)[0].textLength;
    if ($(this).siblings(".counter")[0].innerHTML < 0) {
      $(this).siblings(".counter").css({'color': 'red'});
    } else {
      $(this).siblings(".counter").css({'color': 'black'});
    }
  });
});
