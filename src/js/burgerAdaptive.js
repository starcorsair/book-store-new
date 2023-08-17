const menuBurger = document.querySelector('.menu-burger');
const dropdownBox = document.querySelector('.dropdown-box');
const dropdownBoxClose = document.querySelector('.dropdown-box__close');
const modal = document.querySelector('.modal')

menuBurger.addEventListener('click', () => {
   menuBurger.style.display = 'none';
   dropdownBox.style.display = 'block';
   modal.style.display = 'block';
});

dropdownBoxClose.addEventListener('click', () => {
   menuBurger.style.display = 'block';
   dropdownBox.style.display = 'none';
   modal.style.display = 'none';
})