
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
  