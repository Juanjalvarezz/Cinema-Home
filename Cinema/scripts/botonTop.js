//Boton top
document.addEventListener("DOMContentLoaded", function() {
  let mybutton = document.getElementById("myBtn");
  
  mybutton.addEventListener("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
  
  window.onscroll = function() {scrollFunction()};
  

  const MAX_IN_PAGE = 20
  function scrollFunction() {
    if (document.body.scrollTop > MAX_IN_PAGE || document.documentElement.scrollTop > MAX_IN_PAGE) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
});
    
  