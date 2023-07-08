//Boton top
$(document).ready(function(){
    let mybutton = document.getElementById("myBtn");
    
      $('.ir-arriba').click(function(){
        $('body, html').animate({
          scrollTop: '0px'
        }, 300);
      });
    window.onscroll = function() {scrollFunction()};
    
      $(window).scroll(function(){
        if( $(this).scrollTop() > 0 ){
          $('.ir-arriba').slideDown(300);
        } else {
          $('.ir-arriba').slideUp(300);
        }
      });
    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  });
    
  