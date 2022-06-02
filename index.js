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
window.addEventListener("load", function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
    else {
        alert("Este navegador não suporte Geolocalização");
    }
    function setPosition(position) {
        console.log(position);
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        coordResults(lat, long);
    }
    function showError(error) {
        alert("erro: ".concat(error.message));
    }
});
function coordResults(lat, long) {
    fetch("".concat(api.base, "weather?lat=").concat(lat, "&lon=").concat(long, "&lang=").concat(api.lang, "&units=").concat(api.units, "&APPID=").concat(api.key))
        .then(function (response) {
        if (!response.ok) {
            throw new Error("http error: status ".concat(response.status));
        }
        return response.json();
    })
        .catch(function (error) {
        alert(error.message);
    })
        .then(function (response) {
        displayResults(response);
    });
}
function displayResults(weather) {
    console.log(weather);
    city.innerText = "".concat(weather.name, ", ").concat(weather.sys.country);
    var now = new Date();
    date.innerText = dateBuilder(now);
    var iconName = weather.weather[0].icon;
    containerImg.innerHTML = "<img src=\"./icons/".concat(iconName, ".png\">");
    var temperature = "".concat(Math.round(weather.main.temp));
    tempNumber.innerHTML = temperature;
    tempUnit.innerHTML = "\u00B0c";
    weatherT.innerHTML = weather.weather[0].description;
    lowHigh.innerHTML = "".concat(Math.round(weather.main.temp_min), "\u00B0c / ").concat(Math.round(weather.main.temp_max), "\u00B0c");
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function dateBuilder(d) {
    var days = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
    ];
    var months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];
    var day = days[d.getDay()]; //getDay: 0-6
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    return "".concat(day, ", ").concat(date, " ").concat(month, " ").concat(year);
}
var tempNumberNow;
containerTemp.addEventListener("click", changeTemp);
function changeTemp() {
    tempNumberNow = tempNumber.innerHTML;
    if (tempUnit.innerHTML === "ºc") {
        var f_1 = tempNumberNow * 1.8 + 32;
        tempUnit.innerHTML = "ºf";
        tempNumber.innerHTML = Math.round(f_1);
    }
    else {
        var c = (tempNumberNow - 32) / 1.8;
        tempUnit.innerHTML = "ºf";
        tempNumber.innerHTML = Math.round(c);
    }
}
function searchResults(city) {
    fetch("".concat(api.base, "weather?q=").concat(city, "&lang=").concat(api.lang, "&units=").concat(api.units, "&APPID=").concat(api.key))
        .then(function (response) {
        if (!response.ok) {
            throw new Error("http error: status ".concat(response.status));
        }
        return response.json();
    })
        .catch(function (error) {
        alert(error.message);
    })
        .then(function (response) {
        displayResults(response);
    });
}
searchButton.addEventListener("click", function () {
    searchResults(searchInput.value);
});
searchInput.addEventListener("keypress", enter);
function enter(event) {
    var key = event.keyCode;
    if (key === 13) {
        searchResults(searchInput.value);
    }
}
function f(f) {
    throw new Error("Function not implemented.");
}
