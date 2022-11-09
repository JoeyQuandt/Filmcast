import { ActivateSlider, getMultipleRandom} from "./utils.js";
const popularAllGenre = document.getElementById("popular")
const popularTv = document.getElementById("popular-tv")
const popularMovie = document.getElementById("popular-movie")
const heroSlider = document.getElementById("hero-slider")



async function showPopularAllData(type,htmlType){
  const resp = await fetch(`https://api.themoviedb.org/3/trending/${type}/week?api_key=fa940f6d4f0f73fb45419d96bae71b25`)
  const data = await resp.json()
  render(data.results,htmlType)
  console.log(data)
  ActivateSlider()
}


showPopularAllData("movie",popularMovie)
showPopularAllData("all",popularAllGenre)
showPopularAllData("tv",popularTv)



function render(data,htmlType){
  let popularAll =""
  data.forEach(popularMovieSerie => {

    popularAll+=
    `
    <div>
      <img class="movie-image" alt="${popularMovieSerie.title}" src="https://image.tmdb.org/t/p/w500/${popularMovieSerie.poster_path}" alt="cyberpunk"/>
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
          <button class="play-btn">Play<i class="fa-solid fa-play"></i></button><button class="list-btn">Add to Wishlist<i class="fa-solid fa-clipboard-list"></i></button>
        </div>
      </div>
      `
      heroSlider.innerHTML=hero
    })

  }
}






















