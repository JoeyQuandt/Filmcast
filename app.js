import { ActivateSlider } from "./utils.js";
const popularAllGenre = document.getElementById("popular")
const popularTv = document.getElementById("popular-tv")
const popularMovie = document.getElementById("popular-movie")
const heroSlider = document.getElementById("hero-slider")



async function showPopularAllData(type,htmlType){
  const resp = await fetch(`https://api.themoviedb.org/3/trending/${type}/week?api_key=fa940f6d4f0f73fb45419d96bae71b25`)
  const data = await resp.json()
  render(data.results,htmlType)
  ActivateSlider()
}


showPopularAllData("movie",popularMovie)
showPopularAllData("tv",popularTv)
showPopularAllData("all",popularAllGenre)



function render(data,htmlType){
  let popularAll =""
  data.forEach(popularMovieSerie => {

    popularAll+=
    `
    <div>
      <img class="movie-image" alt="${popularMovieSerie.title}" src="https://image.tmdb.org/t/p/w500/${popularMovieSerie.poster_path}" alt="cyberpunk"/>
      <div class="genre-text">
        <h3>${popularMovieSerie.title ? popularMovieSerie.title : popularMovieSerie.name}</h3>
        <p id="${popularMovieSerie.genre_ids}"></p>
      </div>
    </div>
    `
    htmlType.innerHTML=popularAll


    TvGenres(popularMovieSerie.genre_ids,popularMovieSerie.media_type).then(data=>{
      document.getElementById(`${popularMovieSerie.genre_ids}`).innerHTML=`${popularMovieSerie.media_type} | ${data}`
    })
  });
  if(htmlType===popularAllGenre){
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

function getMultipleRandom(arr,num){
  const shuffled = [...arr].sort(()=>0.5-Math.random());
  return shuffled.slice(0,num)
}


async function TvGenres(ids,mediaType){
  const genreArray = ids
  let matchingGenre = []
  const resp = await fetch(`https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=fa940f6d4f0f73fb45419d96bae71b25&language=en-US`)
  const data = await resp.json()
  data.genres.forEach(genre=>{
    if(genreArray.includes(genre.id)){
      matchingGenre.push(genre.name)
    }
  })
  return matchingGenre
}


















