/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  const a = " ";
  for (let i = 0; i < name.length; i++) {
    if (name[i] == a) {
      alert("не должно быть пробелов");
    }
  }
  if (name == "") {
    alert("укажите ваше имя");
  } else if (name.length < 4) {
    alert("должно быть минимум 4 символа");
  }
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}

sayHello();
