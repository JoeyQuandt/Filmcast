const navBar = document.querySelector("nav");
const genreSliders = document.querySelectorAll(".genre-slider");
const header = document.querySelector(".header-slider");
const detailSliders = document.querySelectorAll(".season-slider");

/*Blaze slider*/
function ActivateSlider() {
  new BlazeSlider(header);
  genreSliders.forEach((el) => {
    new BlazeSlider(el, {
      all: {
        enableAutoplay: false,
        slidesToScroll: 3,
        slidesToShow: 5,
        transitionDuration: 300,
      },
      "(max-width: 900px)": {
        slidesToShow: 2,
        slidesToShow: 2,
        slidesGap: "40px",
      },
      "(max-width: 500px)": {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    });
  });
}

function ActivateDetailSlider() {
  detailSliders.forEach((el) => {
    new BlazeSlider(el, {
      all: {
        enableAutoplay: false,
        slidesToScroll: 3,
        slidesToShow: 5,
        transitionDuration: 300,
      },
      "(max-width: 900px)": {
        slidesToShow: 2,
        slidesToShow: 2,
        slidesGap: "40px",
      },
      "(max-width: 500px)": {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    });
  });
}

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

/*Scrolling active*/
window.addEventListener("scroll", function () {
  let windowPosition = window.scrollY > 0;

  navBar.classList.toggle("navigation-section-scroll-active", windowPosition);
});

export { ActivateSlider, getMultipleRandom, ActivateDetailSlider };
