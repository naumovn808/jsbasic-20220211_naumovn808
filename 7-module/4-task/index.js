export default class StepSlider {
  constructor({
    steps,
    value
  }) {
    this.steps = steps;
    this.value = value;
    this.slider = null;
    this.render();
    this.slider__steps = this.elem.querySelector('.slider__steps').children;
    this.slider__thumb = this.elem.querySelector('.slider__thumb');
    this.slider__thumb.ondragstart = () => false;
    this.rener_firs_step();
    this.leftPart;
    this.valuePrecent;
    this.shiftX;

  }

  creat_element(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }

  render() {
    this.elem = this.creat_element(`  <div class="slider">
    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">2</span>
    </div>
    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: 50%;"></div>
    <!--Шаги слайдера-->
    <div class="slider__steps">
    </div>
  </div>`);

    this.elem.querySelector('.slider__steps').append(this.get_list_content());


  }

  get_list_content() {
    let fragment = new DocumentFragment();

    for (let i = 0; i < this.steps; i++) {
      let li = document.createElement('span');

      fragment.append(li);
    }

    return fragment;
  }

  rener_firs_step() {
    this.slider__steps[this.value].classList.add('slider__step-active');
    this.slider = this.slider__steps[this.value];
    this.leftPrecent = this.value / (this.steps - 1) * 100;
    this.elem.querySelector('.slider__thumb').style.left = `${this.leftPrecent}%`;
    this.elem.querySelector('.slider__value').textContent = this.value;
    this.elem.querySelector('.slider__progress').style.width = `${this.leftPrecent}%`;

    this.slider__thumb.addEventListener('pointerdown', event => this.pointerDown(event));

    this.updead = event => this.pointerUp(event);

    //window.addEventListener('pointerup', this.updead);

    //this.elem.addEventListener('pointerup', event => this.onclick(event));

    this.elem.addEventListener('click', event => this.onclick(event));
  }

  pointerDown(event) {
    event.preventDefault();
    this.shiftX = event.clientX - this.slider__thumb.getBoundingClientRect().left;


    this.slider__thumb.style.touchAction = "none";


    this.poiner_move = event => this.onclickMove(event);
    window.addEventListener('pointermove', this.poiner_move)
  }
  onclickMove(event) {
    this.elem.classList.add('slider_dragging');
    this.leftPart = event.clientX - this.elem.getBoundingClientRect().left;
    this.leftRelativePart = this.leftPart / this.elem.offsetWidth;


    if (this.leftRelativePart < 0) {
      this.leftRelativePart = 0;
    }

    if (this.leftRelativePart > 1) {
      this.leftRelativePart = 1;
    }
    this.leftPrecent = this.leftRelativePart * 100;
    this.value = Math.round(this.leftRelativePart * (this.steps - 1));

    this.elem.querySelector('.slider__thumb').style.left = `${this.leftPrecent}%`;
    this.elem.querySelector('.slider__value').textContent = this.value;
    this.elem.querySelector('.slider__progress').style.width = `${this.leftPrecent}%`;

    if (this.slider) {
      this.slider.classList.remove('slider__step-active');
    }

    for (let i = 0; i < this.slider__steps.length; i++) {
      this.slider__steps[i];
      if (i === this.value) {
        this.slider__steps[i].classList.add('slider__step-active');
        this.slider = this.slider__steps[i];
      }
    }
    window.addEventListener('pointerup', this.updead);
  }

  pointerUp(event) {
    this.elem.classList.remove('slider_dragging');
    window.removeEventListener('pointermove', this.poiner_move);
    this.leftPrecent = this.value / (this.steps - 1) * 100;
    this.elem.querySelector('.slider__thumb').style.left = `${this.leftPrecent}%`;
    this.elem.querySelector('.slider__progress').style.width = `${this.leftPrecent}%`;

    let custum_event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(custum_event);
    setTimeout(window.removeEventListener('pointerup', this.updead), 1);
  }

  onclick(event) {
    this.leftPart = event.clientX - this.elem.getBoundingClientRect().left;
    this.leftRelativePart = this.leftPart / this.elem.offsetWidth;
    this.value = Math.round(this.leftRelativePart * (this.steps - 1));
    this.leftPrecent = this.value / (this.steps - 1) * 100;

    this.elem.style.touchAction = "none";


    if (this.slider) {
      this.slider.classList.remove('slider__step-active');
    }

    for (let i = 0; i < this.slider__steps.length; i++) {
      this.slider__steps[i];
      if (i === this.value) {
        this.slider__steps[i].classList.add('slider__step-active');
        this.slider = this.slider__steps[i];
        break;
      }
    }

    this.elem.querySelector('.slider__thumb').style.left = `${this.leftPrecent}%`;
    this.elem.querySelector('.slider__value').textContent = this.value;
    this.elem.querySelector('.slider__progress').style.width = `${this.leftPrecent}%`;

    let custum_event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(custum_event);
  }

}
