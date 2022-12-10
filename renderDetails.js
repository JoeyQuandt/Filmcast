import { ActivateDetailSlider } from "./utils.js";
import MOVIE_API_KEY from "./apikey.js";

async function getSingleMovieShowDetails(id, getData, typeOfMedia) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/${typeOfMedia}/${id}/${getData}?api_key=${MOVIE_API_KEY}&language=en-US`
  );
  const data = await resp.json();
  ActivateDetailSlider();
  return data;
}

function renderDetails(data, typeOfMedia) {
  document.getElementById("details-wrapper").innerHTML = `
    <img class="details-header-image" src="https://image.tmdb.org/t/p/original/${
      data.backdrop_path
    }" alt="background-image"/>
    <div class="details-header-information">
      <img src="https://image.tmdb.org/t/p/w500/${
        data.poster_path
      }" alt="poster image" class="details-poster">
      <div class="details-header-text">
        <h1>${data.name ? data.name : data.title}</h1>
        <h2>${typeOfMedia}</h2>
        <div class="score">
            <p>${data.vote_average.toFixed(1)}</p>
        </div>
        <div class="details-time">
            <p>${
              data.episode_run_time ? data.episode_run_time : data.runtime
            }m | ${
    data.first_air_date ? data.first_air_date : data.release_date
  }</p>
        </div>
        <div id="genres" class="genres">
        </div>
        <p>
            ${data.overview}
        </p>
      </div>
    </div>
    `;
  data.genres.forEach((genre) => {
    document.getElementById("genres").innerHTML += `<p>${genre.name}</p>`;
  });

  document.getElementById("about-information").innerHTML = `
    <iframe id="trailer"
    src="">
    </iframe>
    <div class="about-text">
        <div class="details">
          <h3>Original Name</h3>
          <p>${
            data.original_name ? data.original_name : data.original_title
          }</p>
        </div>
        <div class="details">
          <h3>Summary</h3>
          <p>${data.overview}</p>
        </div>
    </div>
    `;
  document.getElementById("tv-season-slider").style.display = "none";
  if (typeOfMedia === "tv") {
    document.getElementById("tv-season-slider").style.display = "block";
    data.seasons.forEach((season) => {
      const poster = season.poster_path
        ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
        : "images/image_notfound.png";
      console.log(poster);
      document.getElementById("seasons").innerHTML += `
        <div>
          <img class="movie-image" alt="${season.name}" src="${poster}"/>
          <div class="genre-text">
            <h3>Season: ${season.season_number}</h3>
          </div>
        </div>
        `;
    });
  }

  getSingleMovieShowDetails(data.id, "/videos", typeOfMedia).then((data) => {
    const trailer = data.results[0].key;
    document.getElementById(
      "trailer"
    ).src = `https://www.youtube.com/embed/${trailer}`;
  });

  getSingleMovieShowDetails(data.id, "/credits", typeOfMedia).then((data) => {
    const castArray = data.cast;
    castArray.forEach((castMember) => {
      const castImage = castMember.profile_path
        ? `https://image.tmdb.org/t/p/w500/${castMember.profile_path}`
        : "images/profile.png";
      document.getElementById("details-cast").innerHTML += `
        <div>
          <img class="cast-image" src=${castImage} alt="cast member"/>
          <h3>${castMember.name}</h3>
          <p>${castMember.character}</p>
        </div>
        `;
    });
  });

  getSingleMovieShowDetails(data.id, "/recommendations", typeOfMedia).then(
    (data) => {
      const similarArray = data.results;
      similarArray.forEach((similarShow) => {
        document.getElementById("similar").innerHTML += `
        <div>
          <img data-id="${
            similarShow.id
          }" data-type="${typeOfMedia}" class="movie-image" alt="${
          similarShow.name
        }" src="${
          similarShow.poster_path
            ? `https://image.tmdb.org/t/p/w500/${similarShow.poster_path}`
            : "images/image_notfound.png"
        }"/>
          <div class="genre-text">
            <h3>${similarShow.name ? similarShow.name : similarShow.title}</h3>
          </div>
        </div>
        `;
      });
    }
  );
  getSingleMovieShowDetails(data.id, "/reviews", typeOfMedia).then((data) => {
    const reviewArray = data.results;

    if (Object.keys(reviewArray).length) {
      reviewArray.forEach((review) => {
        const profileImage = review.author_details.avatar_path
          ? `https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}`
          : "images/profile.png";

        document.getElementById("reviews-content").innerHTML += `
          <div class="review">
          <div class="profile-details">
            <img src="${
              profileImage.includes("avatar")
                ? "images/profile.png"
                : profileImage
            }" alt="profile"/>
            <div class="profile-details-text">
              <h3>${review.author}</h3>
              <p>${review.content}</p>
            </div>
          </div>
          <div class="profile-review-score">
            <span class="divider"></span>
            <div class="review-score">
              <h3>Score:${
                review.author_details.rating
                  ? review.author_details.rating
                  : "No Score"
              }</h3>
              <p>${review.created_at.substr(0, 10)}</p>
            </div>
          </div>
        </div>  
          `;
      });
    } else {
      document.getElementById("reviews-content").innerHTML = `
        <div class="no-reviews">
          <h1>We don't have any reviews</h1>
        </div>
        `;
    }
  });
}

export { renderDetails };
