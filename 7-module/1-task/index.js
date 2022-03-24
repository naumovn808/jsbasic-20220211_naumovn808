import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.elem.className = 'ribbon';
    this.render(this.categories);
    this.elem.addEventListener('click', event => this.onClick(event));
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.itemActive = null;
    this.elem.addEventListener('ribbon-select', (event) => event.detail);

  }
  render(arr) {
    let ribbonMenu = arr.map(value => `<a href="#" class="ribbon__item" data-id="${value.id}">${value.name}</a>`).join('');
    this.elem.innerHTML = '<nav class="ribbon__inner">' + ribbonMenu + '</nav>';

    this.elem.querySelector('.ribbon__inner').insertAdjacentHTML('beforebegin', `
    <button class="ribbon__arrow ribbon__arrow_left"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></button>`);
    this.elem.querySelector('.ribbon__inner').insertAdjacentHTML('afterend', `
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></button>`);

  }
  scrollControl(event) {

    if ((this.ribbonInner.scrollWidth - this.ribbonInner.scrollLeft) === this.ribbonInner.clientWidth) {

      this.elem.querySelector('.ribbon__arrow_right').className = 'ribbon__arrow ribbon__arrow_right';
    }
    if (this.ribbonInner.scrollLeft == 0) {
      this.elem.querySelector('.ribbon__arrow_left').className = 'ribbon__arrow ribbon__arrow_left';
      this.elem.querySelector('.ribbon__arrow_right').className = 'ribbon__arrow ribbon__arrow_right ribbon__arrow_visible'
    }
  }
  onClick(event) {
    if (event.target.closest('.ribbon__arrow_right')) {
      this.ribbonInner.scrollBy(350, 0);
      this.elem.querySelector('.ribbon__arrow_left').className = 'ribbon__arrow ribbon__arrow_left ribbon__arrow_visible'
    }
    if (event.target.closest('.ribbon__arrow_left')) {
      this.ribbonInner.scrollBy(-350, 0);
    }
    this.ribbonInner.addEventListener('scroll', event => this.scrollControl(event));

    if (event.target.closest('.ribbon__item')) {
      event.preventDefault();
      if (this.itemActive) {
        this.itemActive.classList.remove('ribbon__item_active');
      }

      event.target.classList.add('ribbon__item_active');
      this.itemActive = event.target;
      let dataSet = event.target.dataset.id;
      if (dataSet == '') {
        dataSet = 'All';
      }
      let customEvent = new CustomEvent('ribbon-select', {
        detail: dataSet,
        bubbles: true
      });
      this.elem.dispatchEvent(customEvent);
    }
  }
}
