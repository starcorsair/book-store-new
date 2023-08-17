// ключ: AIzaSyDiVkGxk913kJRUS4zXkaaxqJXcvvOqRLw
// запрос API: https://www.googleapis.com/books/v1/volumes?q="subject:Business"&key=<AIzaSyDiVkGxk913kJRUS4zXkaaxqJXcvvOqRLw>&printType=books&startIndex=0&maxResults=6&langRestrict=en
const listGenres = document.querySelector('.aside__list');
const genres = document.querySelectorAll('.aside__link');
const libraryBlock = document.querySelector('.library');
const buttonLoad = document.querySelector('.load-more');
const basketIcon = document.querySelector('.basket-icon');
const basketIconText = document.querySelector('.basket-icon__text');
let basketArray = JSON.parse(localStorage.getItem('basketId'));
let buttonsBuy = document.getElementsByClassName('info__buy')



document.addEventListener('DOMContentLoaded', showLibrary());
listGenres.addEventListener('click', (event) => {

   if (event.target.classList.contains('aside__link')) {
      genres.forEach(link => {
         if (link.classList.contains('aside__link-active')) {
            link.classList.remove('aside__link-active');
            event.target.classList.add('aside__link-active')
         } else {
            event.target.classList.add('aside__link-active')
         }
      })
   }
});
listGenres.addEventListener('click', (event) => {
   if (event.target.classList.contains('aside__link')) {
      clearBlock();
      serverRequest()
   }
})

function showLibrary() {

   addActiveClass();
   serverRequest();
}

function addActiveClass() {
   document.querySelector('.aside__link').classList.add('aside__link-active');
}


function serverRequest(startIndex) {
   const libraryCards = document.querySelectorAll('.cards');
   startIndex = libraryCards.length
   const activeLi = document.querySelector('.aside__link-active');

   fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${activeLi.dataset.parameter}"&key=AIzaSyDwcg7FESXg7Chw9uYYdpEkgmLBZd_z44o&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`)
      .then((response) => response.json())
      .then((json) => {
         loadLibrary(json);
         
      })
      .catch((reason) => {
         // console.log('ошибка')
      });

   function loadLibrary(apiData) {
      let basketArray = JSON.parse(localStorage.getItem('basketId'));

      for (let i = 0; i <= apiData.items.length; i++) {
         function showStars() {
            const coloredStars = ` <svg width="12" height="12" viewBox="0 0 194.6 185.1">
         <path fill="#F2C94C" d="M97.3,0 127.4,60.9 194.6,70.7 145.9,118.1 157.4,185.1 97.3,153.5 37.2,185.1 48.6,118.1 0,70.7 67.2,60.9"/>
      </svg>`;
            const emptyStars = `<svg width="12" height="12" viewBox="0 0 194.6 185.1">
      <path fill="#EEEDF5" d="M97.3,0 127.4,60.9 194.6,70.7 145.9,118.1 157.4,185.1 97.3,153.5 37.2,185.1 48.6,118.1 0,70.7 67.2,60.9"/>
   </svg>`;

            if (Math.ceil(apiData.items[i].volumeInfo.averageRating) == 5) {
               return coloredStars.repeat(5)
            } else if (Math.ceil(apiData.items[i].volumeInfo.averageRating) == 4) {
               return coloredStars.repeat(4) + emptyStars
            } else if (Math.ceil(apiData.items[i].volumeInfo.averageRating) == 3) {
               return coloredStars.repeat(3) + emptyStars.repeat(2)
            } else if (Math.ceil(apiData.items[i].volumeInfo.averageRating) == 2) {
               return coloredStars.repeat(2) + emptyStars.repeat(3)
            } else if (Math.ceil(apiData.items[i].volumeInfo.averageRating)) {
               return coloredStars.repeat(1) + emptyStars.repeat(4)
            } else {
               return ''
            }
         };
         libraryBlock.innerHTML += `
   <div class="library__cards cards">
      <div class="cards__img">
         <img src="${apiData.items[i].volumeInfo.hasOwnProperty('imageLinks') ? apiData.items[i].volumeInfo.imageLinks.thumbnail : "https://dummyimage.com/212x300/bfbfbf/3d3d3d.png"}" alt="img">
      </div>
      <div class="cards__info info">
         <p class="info__authors">${apiData.items[i].volumeInfo.hasOwnProperty('author') ? apiData.items[i].volumeInfo.authors : ''}</p>
         <p class="info__title">${apiData.items[i].volumeInfo.title.length > 50 ? apiData.items[i].volumeInfo.title.substr(0, 50) + '...' : apiData.items[i].volumeInfo.title}</p>
         <div class="info__ratings">
            <p class="info__average-rating">${apiData.items[i].volumeInfo.hasOwnProperty('averageRating') ? showStars() : ""}</p>
            <p class="info__ratings-count">${apiData.items[i].volumeInfo.hasOwnProperty('ratingsCount') ? apiData.items[i].volumeInfo.ratingsCount + "  " + "review" : ''}</p>
         </div>
         <p class="info__description">${apiData.items[i].volumeInfo.hasOwnProperty('description') ? apiData.items[i].volumeInfo.description.substr(0, 85) + "..." : " "}</p>
         <p class="info__price">${apiData.items[i].saleInfo.hasOwnProperty('retailPrice') ? apiData.items[i].saleInfo.retailPrice.amount + '  ' + apiData.items[i].saleInfo.retailPrice.currencyCode : ''}</p>
         <button 
            class="info__buy ${(basketArray === null) ? '' :
            basketArray.includes(apiData.items[i].id) ? 'active__button' : ''
         }" 
            data-id="${apiData.items[i].id}">
            ${(basketArray === null) ? 'buy now' :
            basketArray.includes(apiData.items[i].id) ? "in the cart" :
            'buy now'
         }
         </button>
      </div>
   </div>
   `;
      };
   }
}
function clearBlock() {
   document.querySelector('.library').innerHTML = '';
}



buttonLoad.addEventListener('click', () => {
   const libraryCards = document.querySelectorAll('.cards');
   let startIndex = libraryCards.length
   serverRequest(startIndex)
})



document.addEventListener('DOMContentLoaded', () => {
   if (JSON.parse(localStorage.getItem('basketId')).length === 0) {
      basketIcon.style.display = 'none'
   } else {
      basketIcon.style.display = 'block';
      basketIconText.innerText = basketArray.length
   }
})