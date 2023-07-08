
//Loader
window.onload = function(){
    var contenedor = document.getElementById("contenedor_carga");
  
    contenedor.style.visibility = "hidden";
    contenedor.style.opacity = "0";
  }
  
  function showLoader() {
    var contenedor = document.getElementById("contenedor_carga");
    contenedor.style.visibility = "visible";
    contenedor.style.opacity = "1";
  }
  
  function hideLoader() {
    var contenedor = document.getElementById("contenedor_carga");
    contenedor.style.visibility = "hidden";
    contenedor.style.opacity = "0";
  }
  