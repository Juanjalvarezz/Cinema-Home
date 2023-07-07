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
    // Obtener el valor del form
    let page = Number(this.value);
    // Validar que el valor sea mayor que cero
    if (page > 0) {
      // Actualizar la variable currentPage y cargar las películas de esa pagina exacta
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
      moviesContainer.innerHTML = ""; // Desaparecer pelis del container anterior
      for (let i = 0; i < data.results.length; i++) {
        let movie = data.results[i];
        let movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        let img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        let h2 = document.createElement("h2");
        h2.textContent = movie.title;
        h2.style.pointerEvents = "none"; // Quitar puntero del h2
        movieDiv.appendChild(img);
        movieDiv.appendChild(h2);
        moviesContainer.appendChild(movieDiv);

        // Agregar evento click a la imagen del poster
        img.addEventListener("click", debounce(() => {
          // Crear elemento overlay
          let overlay = document.createElement("div");
          overlay.classList.add("overlay");
          overlay.style.zIndex = "1"; // Establecer z-index del overlay
          overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`; // Establecer imagen de fondo del overlay
          // Crear título de la película
          let h3 = document.createElement("h3");
          h3.textContent = movie.title;
          overlay.appendChild(h3);
           // Crear elemento para la imagen del poster
             let img = document.createElement("img");
             img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
             img.alt = movie.title;
             overlay.appendChild(img);
             overlay.style.zIndex = 1000;
          // Crear botón para salir del overlay
          let closeButton = document.createElement("button");
          closeButton.textContent = "X";
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

          // Agregar overlay al contenedor de películas
          document.body.appendChild(overlay);
        }, 2000));
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
function ocultarSlider() {
  const sliderContainer = document.querySelector('.slider-top');
  sliderContainer.style.display = 'none';
}

/*AUTOCOMPLETADO*/
const searchInput = document.getElementById("query");

const searchAutocomplete = async () => {
  // Obtener el valor actual del input
  const query = searchInput.value.toLowerCase();

  // Hacer una solicitud a la API de autocompletado de TMDb en inglés
  const responseEn = await axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`);

  // Hacer una solicitud a la API de autocompletado de TMDb en español
  const responseEs = await axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=es`);

  // Filtrar los resultados para obtener solo los títulos de las películas en inglés y español
  const titlesEn = responseEn.data.results.map((movie) => movie.title);
  const titlesEs = responseEs.data.results.map((movie) => movie.title);

  // Combinar los títulos de las películas en inglés y español
  const titles = [...new Set([...titlesEn, ...titlesEs])];

  // Inicializar el autocompletado con los títulos de películas como fuente de datos
  autocomplete(searchInput, titles);
};

// Inicializar el autocompletado cuando se escriba en el input
searchInput.addEventListener("input", searchAutocomplete);

const autocomplete = (input, arr) => {
  // Cerrar cualquier lista de sugerencias abierta
  closeAllLists();

  // Si el input está vacío, no mostrar ninguna sugerencia
  if (!input.value) {
    return false;
  }

  // Crear un elemento "div" que contendrá las sugerencias
  const div = document.createElement("div");
  div.setAttribute("class", "autocomplete-items");

  // Agregar el elemento "div" como hijo del input
  input.parentNode.appendChild(div);

  // Iterar sobre los elementos del arreglo de sugerencias
  for (let i = 0; i < arr.length; i++) {
    // Si la sugerencia comienza con el valor del input, mostrarla
    if (arr[i].toLowerCase().startsWith(input.value.toLowerCase())) {
      // Crear un elemento "div" para la sugerencia
      const suggestion = document.createElement("div");
      suggestion.innerHTML = `<strong>${arr[i].substr(0, input.value.length)}</strong>${arr[i].substr(input.value.length)}`;
      suggestion.setAttribute("class", "autocomplete-item");

      // Agregar un listener para cuando se haga clic en la sugerencia
      suggestion.addEventListener("click", () => {
        // Establecer el valor del input como la sugerencia seleccionada
        input.value = arr[i];

        // Cerrar la lista de sugerencias
        closeAllLists();
        
        // Hacer la búsqueda con la sugerencia seleccionada
        buscarPelis(input.value);
      });

      // Agregar la sugerencia como hijo del elemento "div" de sugerencias
      div.appendChild(suggestion);
    }
  }
};

const closeAllLists = (elmnt) => {
  // Obtener todos los elementos "div" de sugerencias
  const items = document.getElementsByClassName("autocomplete-items");

  // Iterar sobre los elementos "div" de sugerencias y cerrarlos
  for (let i = 0; i < items.length; i++) {
    if (elmnt !== items[i] && elmnt !== searchInput) {
      items[i].parentNode.removeChild(items[i]);
    }
  }
};

function buscarPelisDebounced(query) {
  ocultarElementos(); 
  ocultarSlider()
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
        html = `
        <div class="no-results">
        <i class="fas fa-exclamation-triangle"></i>
        <p>No se encontraron películas con ese nombre</p>
        <a href="index.html" class="go-to-home boton">Ir al inicio</a>
        </div>
        `;

$("#movies").empty().append(html);
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


//// EL HEADER
         const menuBtn = document.querySelector(".menu-icon span");
         const searchBtn = document.querySelector(".search-icon");
         const cancelBtn = document.querySelector(".cancel-icon");
         const items = document.querySelector(".nav-items");
         const form = document.querySelector("form");
         menuBtn.onclick = ()=>{
           items.classList.add("active");
           menuBtn.classList.add("hide");
           searchBtn.classList.add("hide");
           cancelBtn.classList.add("show");
         }
         cancelBtn.onclick = ()=>{
           items.classList.remove("active");
           menuBtn.classList.remove("hide");
           searchBtn.classList.remove("hide");
           cancelBtn.classList.remove("show");
           form.classList.remove("active");
           cancelBtn.style.color = "#ff3d00";
         }
         searchBtn.onclick = ()=>{
           form.classList.add("active");
           searchBtn.classList.add("hide");
           cancelBtn.classList.add("show");
         }
///////


/////SLIDER
const tvshows = () => {
  fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=45b49c30d379e8a24e7a536d9c44d2d9&language=es-VE`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        console.log('No tienes acceso a la base de datos. Llave incorrecta.');
      } else if (response.status === 404) {
        console.log('Lo siento, la serie que buscas no existe.');
      } else {
        console.log('Lo siento, ha ocurrido un error en la conexión con el servidor.');
      }
    })
    .then(data => {
      const tvshows = data.results;
      const sliderContainer = document.querySelector('.slider-top__container');
      let sliderIndex = 0;
      
      const createSlider = () => {
        sliderContainer.innerHTML = '';
        tvshows.forEach((tvshow, index) => {
          if (index === sliderIndex) {
            sliderContainer.innerHTML += `
              <div class="slider-top__top">
                <img class="slider-top__backdrop" src="https://image.tmdb.org/t/p/original/${tvshow.backdrop_path}" alt="${tvshow.name}">
                <div class="slider-top__div">
                  <h3 class="slider-top__title">${tvshow.name}</h3>
                  <p class="slider-top__year">${tvshow.first_air_date.slice(0, 4)}</p>
                  <div class="slider-top__rate">${tvshow.vote_average}</div>
                  <p class="slider-top__summary">${tvshow.overview.slice(0, 300)}...</p>
                </div>
              </div>
            `;
            const rateElement = document.querySelector('.slider-top__rate');
            if (tvshow.vote_average >= 8) {
              rateElement.classList.add('slider-top__rate--green');
            } else if (tvshow.vote_average >= 6) {
              rateElement.classList.add('slider-top__rate--yellow');
            } else {
              rateElement.classList.add('slider-top__rate--red');
            }
          }
        });
      };
      
      const debouncedCreateSlider = debounce(createSlider, 750);
      debouncedCreateSlider();
      
      const sliderLeft = document.querySelector('.slider-top__arrow--left');
      const sliderRight = document.querySelector('.slider-top__arrow--right');
      
      sliderLeft.addEventListener('click', () => {
        sliderIndex--;
        if (sliderIndex < 0) {
          sliderIndex = tvshows.length - 1;
        }
        debouncedCreateSlider();
      });
      
      sliderRight.addEventListener('click', () => {
        sliderIndex++;
        if (sliderIndex >= tvshows.length) {
          sliderIndex = 0;
        }
        debouncedCreateSlider();
      });
      
    })
    .catch(error => {
      console.log('Lo siento, ha ocurrido un error:', error);
    });
};


tvshows();
`use strict`
//para traer los elementos del document.
const container = document.querySelector('.slider-top__container')

//Scroll
window.sr = ScrollReveal();
    sr.reveal("div", {
        duration: 3000,
        origin: "bottom",
        distance: "-100px"
    });

//slider




    
    