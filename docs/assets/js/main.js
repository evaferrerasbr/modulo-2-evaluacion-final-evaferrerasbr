"use strict";const resultsSection=document.querySelector(".js-section--results"),favoriteSection=document.querySelector(".js-section--favorites"),resultsList=document.querySelector(".js-list--results"),favoritesList=document.querySelector(".js-list--favorites"),button=document.querySelector(".js-btn"),buttonReset=document.querySelector(".js-reset");let search="",searchedShows=[],favoriteShows=[],favoriteIdArray=[],savedFavorites=[];function handlerEvent(){search=document.querySelector(".js-input").value,searchedShows=[],""===search?emptySearchMessage():searchShows()}function emptySearchMessage(){resultsList.innerHTML="",resultsSection.innerHTML="";const e=document.createElement("p"),t=document.createTextNode("¡Tienes que introducir tu búsqueda primero!");resultsSection.appendChild(e),e.appendChild(t),e.classList.add("message")}function searchShows(){fetch("//api.tvmaze.com/search/shows?q="+search).then(e=>e.json()).then(e=>{if(0===e.length)notFound();else{for(let t=0;t<e.length;t++)searchedShows.push(e[t].show);paintShows(),listenSearch()}})}function notFound(){resultsList.innerHTML="",resultsSection.innerHTML="";const e=document.createElement("p"),t=document.createTextNode("Lo sentimos, no hemos encontrado lo que buscas. ¡Prueba de nuevo!");resultsSection.appendChild(e),e.appendChild(t),e.classList.add("message")}function paintShows(){resultsList.innerHTML="",resultsSection.innerHTML="";for(let e=0;e<searchedShows.length;e++){const t=document.createElement("li"),s=document.createElement("img"),o=document.createElement("h3"),a=document.createTextNode(""+searchedShows[e].name);resultsList.appendChild(t),t.appendChild(s),t.appendChild(o),o.appendChild(a),t.setAttribute("id",searchedShows[e].id),t.classList.add("list--item","js-list--item");for(const s of favoriteShows)parseInt(s.id)===searchedShows[e].id&&t.classList.add("favorite");o.classList.add("title--show"),searchedShows[e].image?s.setAttribute("src",searchedShows[e].image.medium):s.setAttribute("src","https://via.placeholder.com/210x295/ffffff/666666/?text=TV"),s.classList.add("img")}}function listenSearch(){const e=document.querySelectorAll(".js-list--item");for(const t of e)t.addEventListener("click",getFavorites)}function notFavoritesYet(){const e=document.createElement("p"),t=document.createTextNode("Todavía no tienes ninguna serie favorita");favoriteSection.appendChild(e),e.appendChild(t),e.classList.add("message")}function getFavorites(e){const t=e.currentTarget,s=t.querySelector(".img"),o={name:t.querySelector("h3").innerHTML,image:s.src,id:e.currentTarget.id};favoriteIdArray=favoriteShows.map((function(e){return parseInt(e.id)}));const a=parseInt(t.id),i=favoriteIdArray.indexOf(a);-1===i?favoriteShows.push(o):favoriteShows.splice(i,1),paintFavorite(),0===favoriteShows.length&&notFavoritesYet(),paintShows(),listenSearch(),setLocalStorage()}function paintFavorite(){favoritesList.innerHTML="",favoriteSection.innerHTML="";for(let e=0;e<favoriteShows.length;e++){const t=document.createElement("li"),s=document.createElement("img"),o=document.createElement("h3"),a=document.createElement("button"),i=document.createTextNode("X"),r=document.createTextNode(""+favoriteShows[e].name);favoritesList.appendChild(t),t.appendChild(s),t.appendChild(a),t.appendChild(o),a.appendChild(i),o.appendChild(r),t.classList.add("list--item--fav"),o.classList.add("title--show"),s.src=favoriteShows[e].image,s.classList.add("img--fav"),a.classList.add("btn--delete","js-remove"),a.setAttribute("data-id",favoriteShows[e].id),a.addEventListener("click",removeFavorites)}setLocalStorage()}function removeFavorites(e){for(let t=0;t<favoriteShows.length;t++)parseInt(e.currentTarget.dataset.id)===parseInt(favoriteShows[t].id)&&favoriteShows.splice([t],1);paintFavorite(),0===favoriteShows.length&&notFavoritesYet(),paintShows(),listenSearch()}function setLocalStorage(){const e=JSON.stringify(favoriteShows);localStorage.setItem("favorites",e)}function getLocalStorage(){const e=localStorage.getItem("favorites");savedFavorites=JSON.parse(e),null===savedFavorites||(favoriteShows=savedFavorites,paintFavorite()),listenSearch(),0===favoriteShows.length&&(favoritesList.innerHTML="",notFavoritesYet())}function resetFavorites(){favoriteShows=[],localStorage.removeItem("favorites"),paintFavorite(),notFavoritesYet(),paintShows(),listenSearch()}notFavoritesYet(),getLocalStorage(),button.addEventListener("click",handlerEvent),buttonReset.addEventListener("click",resetFavorites);