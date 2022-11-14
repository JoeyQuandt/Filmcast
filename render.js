import { getMultipleRandom } from "./utils.js"

const heroSlider = document.getElementById("hero-slider")
const popularAllGenre = document.getElementById("popular")
const popularTv = document.getElementById("popular-tv")
const popularMovie = document.getElementById("popular-movie")
const movieSerieData = {
 'id':"",
 'type':""
}



document.addEventListener("click",function(e){
  if(e.target.dataset.id){
    location.href = 'details.html';
    movieSerieData.id=e.target.dataset.id
    movieSerieData.type=e.target.dataset.type

    localStorage.setItem('movieSerieData', JSON.stringify(movieSerieData));
  }
})


function renderSliders(data,htmlType){
    let popularAll =""
    data.forEach(popularMovieSerie => {
      popularAll+=
      `
      <div>
        <img data-id="${popularMovieSerie.id}" data-type=${popularMovieSerie.media_type} class="movie-image" alt="${popularMovieSerie.title}" src="https://image.tmdb.org/t/p/w500/${popularMovieSerie.poster_path}" alt="cyberpunk"/>
        <div class="genre-text">
          <h3>${popularMovieSerie.title ? popularMovieSerie.title : popularMovieSerie.name}</h3>
          <p>${popularMovieSerie.media_type} | Rating: ${popularMovieSerie.vote_average.toFixed(1)}</p>
        </div>
      </div>
      `
      htmlType.innerHTML=popularAll
    });
    if(htmlType===popularTv){
      let randomPopular= getMultipleRandom(data,4)
      let hero=""
      randomPopular.forEach(slider=>{
        hero+=
        `
        <div class="movie">
          <img class="movie-background" src="https://image.tmdb.org/t/p/original/${slider.backdrop_path}" alt="background">
          <div class="movie-text">
            <h1>${slider.title ? slider.title : slider.name}</h1>
            <p>
              ${slider.overview}
            </p>
            <button data-id="${slider.id}" data-type=${slider.media_type} class="play-btn">Play<i class="fa-solid fa-play"></i></button><button class="list-btn">Add to Wishlist<i class="fa-solid fa-clipboard-list"></i></button>
          </div>
        </div>
        `
        heroSlider.innerHTML=hero
      })
    }
}


export {renderSliders}