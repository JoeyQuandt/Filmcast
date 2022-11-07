const header = document.querySelector('.header-slider')
const genreSliders = document.querySelectorAll(".genre-slider")


new BlazeSlider(header)

genreSliders.forEach(el => {
  new BlazeSlider(el,{
    all: {
      enableAutoplay: false,
      slidesToScroll: 3,
      slidesToShow: 5,
      transitionDuration: 300
    },
    "(max-width: 900px)": {
      slidesToShow: 2,
      slidesToShow: 2,
      slidesGap: "40px"
    },
    "(max-width: 500px)": {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  })
})




/*
new BlazeSlider(slider, {
  all: {
    enableAutoplay: true,
    slidesToScroll: 3,
    slidesToShow: 3,
    transitionDuration: 300
  },
  "(max-width: 900px)": {
    slidesToShow: 2,
    slidesToShow: 2,
    slidesGap: "40px"
  },
  "(max-width: 500px)": {
    slidesToShow: 1,
    slidesToScroll: 1
  }
});
*/