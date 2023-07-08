function cambiarModo() { 
    var cuerpoweb = document.body; 
    cuerpoweb.classList.toggle("oscuro"); 

    // Obtener el elemento del icono
    var icono = document.getElementById("icono");

    // Si el icono es el sol, cambiarlo a la luna y viceversa
    if (icono.classList.contains("fa-sun")) {
      icono.classList.remove("fa-sun");
      icono.classList.add("fa-moon");
    } else {
      icono.classList.remove("fa-moon");
      icono.classList.add("fa-sun");
    }
  } 