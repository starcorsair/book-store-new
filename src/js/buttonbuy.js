const libraryBlock = document.querySelector('.library');
let numberActiveButtons = 0;
let menuIcon3 = document.querySelector('.n3');
const basketIcon = document.querySelector('.basket-icon');
const basketId = [];
const basketIconText = document.querySelector('.basket-icon__text')

libraryBlock.addEventListener('click', (event) => {
   if (event.target.classList.contains('info__buy')) {
      addClass();
      addBasketIcon(event);
      getIcons()
   }
})

function getIcons() {
   let basketArray = JSON.parse(localStorage.getItem('basketId'));
   if (!basketArray) {
      basketIcon.style.display = 'none';
      return
   } else{
      basketIcon.style.display = 'block';
      basketIconText.innerHTML = basketArray.length
   }
   if (basketIconText.innerText == 0) {
      basketIcon.style.display = 'none';
   }
}


function addClass() {
   event.target.classList.toggle('active__button');
   event.target.classList.contains('active__button') ? event.target.innerText = "in the cart" : event.target.innerText = "buy now"
}

function addBasketIcon(event) {
   if (!event.target.classList.contains('active__button')) {
      // если имеет активный класс удаляю из массива айди
      let deleteId = basketId.indexOf(event.target.dataset.id)
      if (deleteId !== -1) {
         basketId.splice(deleteId, 1);
      }

   } else {
      // если нет- добавляю
      basketId.push(event.target.dataset.id)

   }
   // сохраняю массив как стоку
   localStorage.setItem("basketId", JSON.stringify(basketId));

}

