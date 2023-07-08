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

  document.querySelector("#input-pagina").addEventListener("change", function() {
    // Obtener el valor del form
    let page = Number(this.value);
    // Validar que el valor sea mayor que cero
    if (page > 0) {
      // Actualizar la variable currentPage y cargar las películas de esa pagina exacta
      currentPage = page;
      debouncedCargasPelis(currentPage);
    }
  });

  const pageForm = document.querySelector("#page-form");
  if (pageForm) {
    pageForm.addEventListener("submit", function(event) {
      event.preventDefault();
      let pageNumber = parseInt(document.querySelector("#input-pagina").value);
      if (pageNumber >= 1) {
        currentPage = pageNumber;
        debouncedCargasPelis(currentPage);
      }
    });
  }
});

async function cargasPelis(page) {
  try {
    const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`);
    const data = await response.json();
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
      img.addEventListener("click", debounce(async () => {
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
        const response = await fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}&language=es-ES`);
        const data = await response.json();
        // Crear elemento para la descripción de la película
        let p = document.createElement("p");
        p.textContent = data.overview;
        overlay.appendChild(p);
        // Establecer estilo del overlay

        // Agregar overlay al contenedor de películas
        document.body.appendChild(overlay);
      }, 2000));
    }
    // Actualizar número de página actual
    const pageNumber = document.querySelector("#numero-pagina");
    pageNumber.textContent = ` ${page}`;
    pageNumber.style.display = "inline-block";
  } catch (error) {
    console.log(error);
  }
}

function ocultarElementos() {
  const h1Elements = document.getElementsByTagName("h1");
  for (let i = 0; i < h1Elements.length; i++) {
    h1Elements[i].style.display = "none";
  }
  const paginacionElement = document.getElementById("paginacion");
  paginacionElement.style.display = "none";
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
  div.setAttribute("class", "autocompletado");

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
  const items = document.getElementsByClassName("autocompletado");

  // Iterar sobre los elementos "div" de sugerencias y cerrarlos
  for (let i = 0; i < items.length; i++) {
    if (elmnt !== items[i] && elmnt !== searchInput) {
      items[i].parentNode.removeChild(items[i]);
    }
  }
};

async function buscarPelisDebounced(query) {
  ocultarElementos();
  ocultarSlider();
  try {
    const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${query}`);
    const data = await response.json();
    let html = `
      <ul class="movie-list">
    `;
    data.results.forEach(movie => {
      html += `
        <li class="info-pelicula contenedor">
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
      <div class="no-resultados">
        <i class="fas fa-exclamation-triangle"></i>
        <p>No se encontraron películas con ese nombre</p>
        <a href="index.html" class="ir-a-casa boton">Ir al inicio</a>
      </div>
      `;
    }
    document.getElementById("movies").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}

const buscarPelis = debounce(buscarPelisDebounced, 2000);

document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-input");
  if (searchInput) {
    const query = searchInput.value;
    buscarPelis(query);
  }
});



async function detallesPeliDebounced(IDPeli) {
  try {
    const response = await fetch(`${API_URL}/movie/${IDPeli}?api_key=${API_KEY}&language=es-ES&append_to_response=videos,credits,images`);
    const data = await response.json();
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
    document.querySelector("#movies").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}

const detallesPeli = debounce(detallesPeliDebounced, 2000);

const moviesContainer = document.getElementById("movies");
moviesContainer.addEventListener("click", function(event) {
  const target = event.target;
  if (target.classList.contains("view-more")) {
    const IDPeli = target.getAttribute("data-movie-id");
    detallesPeli(IDPeli);
  }
});

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const queryInput = document.getElementById("query");
  let query = queryInput.value.trim();
  if (query !== "") {
    buscarPelis(query);
  }
});

const viewMoreButtons = document.querySelectorAll(".view-more");
for (let i = 0; i < viewMoreButtons.length; i++) {
  viewMoreButtons[i].addEventListener("click", function(event) {
    event.preventDefault();
    let IDPeli = this.getAttribute("data-movie-id");
    detallesPeli(IDPeli);
  });
}


let mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

const MAX_IN_PAGE = 20

function scrollFunction() {
  if (document.body.scrollTop > MAX_IN_PAGE|| document.documentElement.scrollTop > MAX_IN_PAGE) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}






    
    