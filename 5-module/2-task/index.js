function toggleText() {
  // ваш код...
  document.querySelector('.toggle-text-button')
    .addEventListener('click', function () {
      let a = document.getElementById('text');
      if (a.hidden === true) {
        a.hidden = false;
      } else if (a.hidden === false) {
        a.hidden = true;
      }
    });
}
