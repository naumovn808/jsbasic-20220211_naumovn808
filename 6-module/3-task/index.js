import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }

  createSlide(slideName, slidePrice, slideImage, slideId) {

    const newSlide = createElement(
      `<div class="carousel__slide" data-id=${slideId}>
      <img class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price"></span>
        <div class="carousel__title"></div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`);

    const image = newSlide.querySelector('.carousel__img');
    image.src = '/assets/images/carousel/' + slideImage;

    const price = slidePrice.toFixed(2);
    const priceValue = newSlide.querySelector('.carousel__price');
    priceValue.textContent = '€' + price;

    const cardTitle = newSlide.querySelector('.carousel__title');
    cardTitle.textContent = slideName;

    return newSlide;
  }


  render() {
    const newElem = createElement(
      `<div class="carousel">
    <!--Кнопки переключения-->
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">
    </div>
    </div>`);

    const carouselInner = newElem.querySelector('.carousel__inner');

    for (const slide of this.slides) {
      const newSlide = this.createSlide(slide.name, slide.price, slide.image, slide.id);
      carouselInner.append(newSlide);

      const productAddEvent = new CustomEvent("product-add", {
        detail: slide.id,
        bubbles: true
      });

      const carouselButton = newSlide.querySelector('.carousel__button');

      carouselButton.addEventListener('click', (event) => newElem.dispatchEvent(productAddEvent));
    }

    this._initCarousel(newElem);


    return newElem;


  }

  _initCarousel(newElem) {
    const buttonRight = newElem.querySelector('.carousel__arrow_right');
    const buttonLeft = newElem.querySelector('.carousel__arrow_left');
    const elemCarousel = newElem.querySelector('.carousel__inner');
    let countSlide = 0;

    buttonLeft.style.display = 'none';

    function btnRight() {
      countSlide++;
      elemCarousel.style.transform = `translateX(${-elemCarousel.offsetWidth * countSlide}px)`;

      if (countSlide == elemCarousel.querySelectorAll(".carousel__slide").length - 1) {
        buttonRight.style.display = 'none';
      } else {
        buttonLeft.style.display = 'flex';
      }

    }

    function btnLeft() {

      countSlide--;

      elemCarousel.style.transform = `translateX(${-elemCarousel.offsetWidth * countSlide}px)`;


      if (countSlide == 0) {
        buttonLeft.style.display = 'none';
      } else {
        buttonRight.style.display = 'flex';
      }

    }


    buttonRight.addEventListener('click', btnRight);
    buttonLeft.addEventListener('click', btnLeft);

    return newElem;
  }

}
