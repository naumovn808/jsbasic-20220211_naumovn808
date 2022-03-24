export default class StepSlider {
  constructor({
    steps,
    value = 0
  }) {
    this.steps = steps;
    this.value = value;
    this.slider = null;
    this.render();
    this.slider__steps = this.elem.querySelector('.slider__steps').children;
    this.rener_firs_step();
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
    this.elem.addEventListener('click', event => this.onclick(event));

  }

  creat_element(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }

  get_list_content() {
    let fragment = new DocumentFragment();

    for (let i = 0; i < this.steps; i++) {
      let li = document.createElement('span');

      fragment.append(li);
    }

    return fragment;
  }

  onclick(event) {
    let leftPart = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelativePart = leftPart / this.elem.offsetWidth;
    this.value = Math.round(leftRelativePart * (this.steps - 1));
    this.valuePrecent = this.value / (this.steps - 1) * 100;




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

    this.elem.querySelector('.slider__thumb').style.left = `${this.valuePrecent}%`;
    this.elem.querySelector('.slider__value').textContent = this.value;
    this.elem.querySelector('.slider__progress').style.width = `${this.valuePrecent}%`;

    let event_dispatch = new CustomEvent(
      'slider-change', {
        detail: this.value,
        bubbles: true
      }
    )
    this.elem.dispatchEvent(event_dispatch);
  }

  rener_firs_step() {
    this.slider__steps[this.value].classList.add('slider__step-active');
    this.slider = this.slider__steps[this.value];
    this.elem.querySelector('.slider__thumb').style.left = `${this.value}%`;
    this.elem.querySelector('.slider__value').textContent = this.value;
    this.elem.querySelector('.slider__progress').style.width = `${this.value}%`;



  }
}
