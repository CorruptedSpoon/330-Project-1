import "./nav-component.js";
import "./footer-component.js";
import "./favorite-component.js";

let sotredFavorites = localStorage.getItem('favorites');
let favorites = document.querySelector('#favorites');
let favoritesArray = sotredFavorites.split('__split__');

for(let i=0;i<favoritesArray.length/2-1;i++){
    favorites.innerHTML += `<favorite-component class="column is-one-third" data-text="${favoritesArray[i*2]}" data-question="${favoritesArray[i*2+1]}"></favorite-component>`
}