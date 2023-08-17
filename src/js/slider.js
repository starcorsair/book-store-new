const sliderBlock = document.querySelector('.slider__image');
const dotsBlock = document.querySelector('.slider__dots');
const images = [{
   src: "./img/banner1.png"
}, {
   src: "./img/banner2.png"
}, {
   src: "./img/banner3.png"
}];

document.addEventListener('DOMContentLoaded', initSlider);

function initSlider() {

   initImages();
   initDots();
   initAutoplay();


   function initImages() {
      images.forEach((image, index) => {
         let imgShow = `<img class="slider__img n${index} ${index === 0 ? 'slider__image-active' : ''} " src="${images[index].src}" data-index="${index}">`;
         sliderBlock.innerHTML += imgShow;
      })
   };

   function moveSlider(num) {
      sliderBlock.querySelector(".slider__image-active").classList.remove('slider__image-active');
      sliderBlock.querySelector(".n" + num).classList.add("slider__image-active");
      dotsBlock.querySelector('.slider__dot-active').classList.remove('slider__dot-active');
      dotsBlock.querySelector('.n' + num).classList.add('slider__dot-active');
   };

   function initDots() {
      images.forEach((image, index) => {
         let dot = `<div class="slider__dot n${index} ${index === 0 ? "slider__dot-active" : ""}" data-index="${index}"></div>`;
         dotsBlock.innerHTML += dot;
      });
      dotsBlock.querySelectorAll(".slider__dot").forEach(dot => {
         dot.addEventListener('click', function () {
            moveSlider(this.dataset.index);
         })
      })
   };

   function initAutoplay() {
      setInterval(() => {
         let curNumber = +sliderBlock.querySelector(".slider__image-active").dataset.index;
         let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
         moveSlider(nextNumber);
      }, 5000);
   }
}
