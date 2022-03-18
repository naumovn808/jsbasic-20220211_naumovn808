function initCarousel() {
  let btnRight = document.querySelector(".carousel__arrow_right");
  let btnLeft = document.querySelector(".carousel__arrow_left");
  let carouselInner = document.querySelector(".carousel__inner");
  let InnerWidth = carouselInner.offsetWidth;
  let i = 0;

  btnLeft.style.display = 'none';

  btnRight.addEventListener("click", () => {
    i++;
    carouselInner.style.transform = `translateX(-${i * InnerWidth}px)`;
    setArrow(i, btnRight, btnLeft);
  });

  btnLeft.addEventListener("click", () => {
    i--;
    carouselInner.style.transform = `translateX(-${i * InnerWidth}px)`;
    setArrow(i, btnRight, btnLeft);
  });
}

function setArrow(i, btnRight, btnLeft) {
  if (i == 0) {
    btnLeft.style.display = 'none';
  } else {
    btnLeft.style.display = '';
  }

  if (i >= 3) {
    btnRight.style.display = 'none';
  } else {
    btnRight.style.display = '';
  }
}
