import "./footer-component.js";
import "./nav-component.js";

const favorites = localStorage.getItem("favorites");

if(!favorites) {
    localStorage.setItem("favorites", []);
}