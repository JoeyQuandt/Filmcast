import {
  ActivateSlider,
  ActivateDetailSlider,
  ActiveHeroSlider,
} from "./utils.js";
import { renderSliders } from "./render.js";
import { renderDetails } from "./renderDetails.js";

const sPath = window.location.pathname;
const sPage = sPath.substring(sPath.lastIndexOf("/") + 1);
const popularAllGenre = document.getElementById("popular");
const popularTv = document.getElementById("popular-tv");
const popularMovie = document.getElementById("popular-movie");

const retrievedmovieSerieData = JSON.parse(
  localStorage.getItem("movieSerieData")
);

/*Fetch Api's*/
async function showPopularAllData(type, htmlType) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/trending/${type}/week?api_key=fa940f6d4f0f73fb45419d96bae71b25`
  );
  const data = await resp.json();
  renderSliders(data.results, htmlType);
  ActivateSlider();
  ActiveHeroSlider();
}

async function getSingleMovieShow(id, typeOfMedia) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/${typeOfMedia}/${id}?api_key=fa940f6d4f0f73fb45419d96bae71b25&language=en-US`
  );
  const data = await resp.json();
  renderDetails(data, typeOfMedia);
  ActivateDetailSlider();
}

function render() {
  if (sPage === "index.html" || sPage === "") {
    Promise.all([
      showPopularAllData("all", popularAllGenre),
      showPopularAllData("movie", popularMovie),
      showPopularAllData("tv", popularTv),
    ]);
  } else if (sPage === "details.html") {
    Promise.all([
      getSingleMovieShow(
        retrievedmovieSerieData.id,
        retrievedmovieSerieData.type
      ),
    ]);
  }
}

window.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM HAS LOADED");
});

render();
