function buscarPelis(query) {
    $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=4c7644be5749ff57cb3cd3e80f76d300&language=es-ES&query=${query}`,
      success: function(data) {
        // Crea una lista de películas coincidentes
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
        // Agrega la lista de películas a la página
        $("#movies").empty().append(html);
      }
    });
  }
  
  function detallesPeli(IDPeli) {
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/${IDPeli}?api_key=4c7644be5749ff57cb3cd3e80f76d300&language=es-ES&append_to_response=videos,credits`,
      success: function(data) {
        // Con esto creamos una vista detallada de la peli, con la estructura que tendría un HTML
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
        // Con esto buscamos el cast, imagen del actor y su personaje en la peli
        let cast = data.credits.cast.slice(0, 5);
        cast.forEach(actor => {
          html += `
            <div class="actor">
              <img src="https://image.tmdb.org/t/p/w185/${actor.profile_path}" />
              <p>${actor.name} (${actor.character})</p>
            </div>
          `;
        }); ////Con esto buscamos al director e imagen del mismo
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
        // Con esto tenemos para buscar 3 videos como maximo de pelis.
        let videos = data.videos.results.slice(0, 3);
        videos.forEach(video => {
          html += `<li class="boton"><a href="https://www.youtube.com/watch?v=${video.key}" target="_blank">${video.name}</a></li>`;
        });
        html += `
            </ul>
          </div>
        `;
        // Borra todo el contenido con un empty y luego manda el nuevo con un append
        $("#movies").empty().append(html);
      }
    });
  }
  
  // Apenas se llena el formulario y le das submit se buscaran las peliculas aplicando la primera función
  $("#search-form").submit(function(event) { 
    event.preventDefault();
    let query = $("#query").val().trim();
    if (query !== "") {
      buscarPelis(query);
    }
  });
  
  // Cuando se hace clic en "Ver más" en una película, se obtiene información detallada de esa película
  $(document).on("click", ".view-more", function(event) {
    event.preventDefault();
    let IDPeli = $(this).data("movie-id");
    detallesPeli(IDPeli);
  });

//Boton top
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
