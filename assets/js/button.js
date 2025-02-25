// const button = document.querySelector('.menu__mobile_button');
// const menu = document.querySelector('.nav-list');

// button.addEventListener('click', () => {
//   button.classList.toggle('active');
//   button.classList.toggle('menu__mobile_button--active');
// });
// console.log(menu);
// document.addEventListener('DOMContentLoaded', () => {
//   const button = document.querySelector('.menu__mobile_button');
//   const menu = document.querySelector('.nav-list');

//   if (button && menu) {
//     button.addEventListener('click', () => {
//       console.log('Клик по бургеру!'); // Проверяем клик
//       button.classList.toggle('active');
//       menu.classList.toggle('menu__open'); // Добавляем класс для показа меню
//     });
//   } else {
//     console.error('Кнопка или меню не найдены!');
//   }
// });
// console.log('Кнопка:', document.querySelector('.menu__mobile_button'));
// console.log('Меню:', document.querySelector('.nav-list'));

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.menu__mobile_button');
  const menu = document.querySelector('.nav-list'); // Находим меню

  button.addEventListener('click', () => {
    console.log('✅ Кнопка нажата! 🎯');
    button.classList.toggle('active');
    menu.classList.toggle('open'); // Добавляем/убираем класс
  });
});
