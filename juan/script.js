const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "4c7644be5749ff57cb3cd3e80f76d300";
let currentPage = 1;

document.addEventListener("DOMContentLoaded", function() {
  const debouncedCargasPelis = debounce(cargasPelis, 500);

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
      movieDiv.appendChild(img);
      movieDiv.appendChild(h2);
      moviesContainer.appendChild(movieDiv);
    }
  })
  .catch(error => console.log(error));
}

function buscarPelis(query) {
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
      $("#movies").empty().append(html);
    })
    .catch(error => console.log(error));
}

function debounce(func, timeout = 5000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const buscarPelisDebounced = debounce(buscarPelis, 5000);

$("#search").on("keyup", function() {
  const query = $(this).val();
  buscarPelisDebounced(query);
});

function detallesPeli(IDPeli) {
  fetch(`${API_URL}/movie/${IDPeli}?api_key=${API_KEY}&language=es-ES&append_to_response=videos,credits`)
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
          <h2>Actores principales</h2>
          <div class="cast">
      `;
      let cast = data.credits.cast.slice(0, 5);
      cast.forEach(actor => {
        html += `
          <div class="actor">
            <img src="https://image.tmdb.org/t/p/w185/${actor.profile_path}" />
            <p>${actor.name} (${actor.character})</p>
          </div>
        `;
      });
      let director = data.credits.crew.find(person => person.job === "Director");
      if (director) {
        html += `
          <div class="actor">
            <img src="https://image.tmdb.org/t/p/w185/${director.profile_path}" />
            <p>${director.name} (Director)</p>
          </div>
        `;
      }
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



    
    