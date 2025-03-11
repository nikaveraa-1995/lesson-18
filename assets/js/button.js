document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.menu__mobile_button');
  const menu = document.querySelector('.nav-list');

  button.addEventListener('click', () => {
    button.classList.toggle('active');
    menu.classList.toggle('open'); // Добавляем/убираем класс
  });
});
