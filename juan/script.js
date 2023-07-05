const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "4c7644be5749ff57cb3cd3e80f76d300";
let currentPage = 1;

document.addEventListener("DOMContentLoaded", function() {
  const debouncedCargasPelis = debounce(cargasPelis, 2000);

  debouncedCargasPelis(currentPage);

  document.querySelector("#prev-page").addEventListener("click", function() {
    if (currentPage > 1) {
      currentPage--;
      debouncedCargasPelis(currentPage);
    }
  });

  document.querySelector("#next-page").addEventListener("click", function() {
    currentPage++;
    debouncedCargasPelis(currentPage);
  });

  document.querySelector("#page-input").addEventListener("change", function() {
    // Obtener el valor del input como un número
    let page = Number(this.value);
    // Validar que el valor sea mayor que cero
    if (page > 0) {
      // Actualizar la variable currentPage y cargar las películas de esa página
      currentPage = page;
      debouncedCargasPelis(currentPage);
    }
  });

  document.querySelector("#page-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let pageNumber = parseInt(document.querySelector("#page-input").value);
    if (pageNumber >= 1) {
      currentPage = pageNumber;
      debouncedCargasPelis(currentPage);
    }
  });
});

function cargasPelis(page) {
  fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`)
    .then(response => response.json())
    .then(data => {
      let moviesContainer = document.querySelector("#movies");
      moviesContainer.innerHTML = ""; // Clear previous movies from container
      for (let i = 0; i < data.results.length; i++) {
        let movie = data.results[i];
        let movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        let img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        let h2 = document.createElement("h2");
        h2.textContent = movie.title;
        h2.style.pointerEvents = "none"; // Disable pointer events on the h2 element
        movieDiv.appendChild(img);
        movieDiv.appendChild(h2);
        moviesContainer.appendChild(movieDiv);

        // Agregar evento click al elemento img de la película
        img.addEventListener("click", () => {
          // Crear elemento overlay
          let overlay = document.createElement("div");
          overlay.classList.add("overlay");
          overlay.style.zIndex = "1"; // Establecer z-index del overlay
          overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`; // Establecer imagen de fondo del overlay
          // Crear título de la película
          let h3 = document.createElement("h3");
          h3.textContent = movie.title;
          overlay.appendChild(h3);
          // Crear botón para salir del overlay
          let closeButton = document.createElement("button");
          closeButton.textContent = "X";
          closeButton.style.position = "absolute";
          closeButton.style.top = "10px";
          closeButton.style.right = "10px";
          closeButton.addEventListener("click", () => {
            overlay.remove();
          });
          overlay.appendChild(closeButton);
          // Obtener descripción de la película
          fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}&language=es-ES`)
            .then(response => response.json())
            .then(data => {
              // Crear elemento para la descripción de la película
              let p = document.createElement("p");
              p.textContent = data.overview;
              overlay.appendChild(p);
            })
            .catch(error => console.log(error));
          // Establecer estilo del overlay
          overlay.style.display = "flex";
          overlay.style.flexDirection = "column";
          overlay.style.justifyContent = "center";
          overlay.style.alignItems = "center";
          // Agregar overlay al contenedor de películas
          document.body.appendChild(overlay);
        });
      }

      // Actualizar número de página actual
      let pageNumber = document.querySelector("#page-number");
      pageNumber.textContent = ` ${page}`;
      pageNumber.style.display = "inline-block";
    })
    .catch(error => console.log(error));
}

function ocultarElementos() {
  $("h1").hide();
  $("#pagination").hide();
}

function buscarPelisDebounced(query) {
  ocultarElementos();
  fetch(`${API_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${query}`)
    .then(response => response.json())
    .then(data => {
      let html = `
        <ul class="movie-list">
      `;
      data.results.forEach(movie => {
        html += `
          <li class="movie-info contenedor">
            <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}"/>
            <div class="pad">
              <h3>${movie.title}</h3>
              <p>${movie.overview}</p>
              <p>Fecha de lanzamiento: ${movie.release_date}</p>
              <button class="view-more boton" data-movie-id="${movie.id}">Ver más</button>
            </div>
          </li>
        `;
      });
      html += `
        </ul>
      `;
      if (data.results.length === 0) {
        html = "<p>No se encontraron películas con ese nombre</p>";
      }
      $("#movies").empty().append(html);
    })
    .catch(error => console.log(error));
}


const buscarPelis = debounce(buscarPelisDebounced, 2000);

$("#search-form").on("submit", function(event) {
  event.preventDefault();
  const query = $("#search-input").val();
  buscarPelis(query);
});

function debounce(func, timeout = 2000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    showLoader(); // Show loader before executing function
    timer = setTimeout(() => {
      func.apply(this, args);
      hideLoader(); // Hide loader after executing function
    }, timeout);
  };
}

function detallesPeliDebounced(IDPeli) {
  fetch(`${API_URL}/movie/${IDPeli}?api_key=${API_KEY}&language=es-ES&append_to_response=videos,credits,images`)
    .then(response => response.json())
    .then(data => {
      let html = `
        <div class="movie-detail">
          <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" />
          <h2>${data.title}</h2>
          <p>${data.overview}</p>
          <p><b>Género:</b> ${data.genres.map(g => g.name).join(", ")}</p>
          <p><b>Fecha de lanzamiento:</b> ${data.release_date}</p>
          <p><b>Puntuación:</b> ${data.vote_average}</p>
          <h1>Reparto</h1>
          <div class="cast">
      `;
      let cast = data.credits.cast.slice(0, 5);
      let director = data.credits.crew.find(person => person.job === "Director");
      if (director) {
        html += `
        <div class="crew">
        <h2>Directores</h2>
        <div class="director">
          <img src="https://image.tmdb.org/t/p/w185/${director.profile_path}" />
          <p>${director.name}</p>
        </div>
      </div>
        `;
      }
      html += `
          </div>
          <h2>Actores principales</h2>
          <div class="cast">
      `;
      cast.forEach(actor => {
        html += `
          <div class="actor">
            <img src="https://image.tmdb.org/t/p/w185/${actor.profile_path}" />
            <p>${actor.name} (${actor.character})</p>
          </div>
        `;
      });
      html += `
          </div>
          <h2>Videos</h2>
          <ul>
      `;
      let videos = data.videos.results.slice(0, 3);
      videos.forEach(video => {
        html += `<li class="boton"><a href="https://www.youtube.com/watch?v=${video.key}" target="_blank">${video.name}</a></li>`;
      });
      html += `
          </ul>
        </div>
      `;
      $("#movies").empty().append(html);
    })
    .catch(error => console.log(error));
}

const detallesPeli = debounce(detallesPeliDebounced, 2000);

$("#movies").on("click", ".view-more", function(event) {
  const IDPeli = event.target.dataset.movieId;
  detallesPeli(IDPeli);
});
$("#search-form").submit(function(event) { 
  event.preventDefault();
  let query = $("#query").val().trim();
  if (query !== "") {
    buscarPelis(query);
  }
});

$(document).on("click", ".view-more", function(event) {
  event.preventDefault();
  let IDPeli = $(this).data("movie-id");
  detallesPeli(IDPeli);
});

let mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}


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

//Menu
const theBody = document.querySelector('body');
const openNav = document.querySelector('.menu-bar button');
const closeNav = document.querySelector('.close-nav button');
const Navbar = document.querySelector('.navbar');

// function bodyScroll(){
//     if(Navbar.classList.contains('show')){
//         theBody.classList.add('hide-scroll');
//     }
//     else if(theBody.classList.contains('hide-scroll')){
//         theBody.classList.remove('hide-scroll');
//     }
// }

function showHide(){
    Navbar.classList.toggle('show');
    // bodyScroll();
}

openNav.onclick = showHide;
closeNav.onclick = showHide;

//Scroll
window.sr = ScrollReveal();
    sr.reveal("div", {
        duration: 3000,
        origin: "bottom",
        distance: "-100px"
    });

//slider



    
    