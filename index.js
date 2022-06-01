"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api = {
    key: "d1628e7879526860e44520bd44eb7c37",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric",
};
var city = document.querySelector(".city");
var date = document.querySelector(".date");
var containerImg = document.querySelector(".container-img");
var containerTemp = document.querySelector(".container-temp");
var tempNumber = document.querySelector(".container-temp div");
var tempUnit = document.querySelector(".container-temp span");
var weatherT = document.querySelector(".weather");
var searchInput = document.querySelector(".form-control");
var searchButton = document.querySelector(".btn");
var lowHigh = document.querySelector(".low-high");
searchButton.addEventListener("click", function () {
    searchResults(searchInput.value);
});
searchInput.addEventListener("keypress", enter);
function enter(event) {
    key = event.keyCode;
    if (key === 13) {
        searchResults(searchInput.value);
    }
}
