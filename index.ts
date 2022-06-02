const api = {
  key: "d1628e7879526860e44520bd44eb7c37",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric",
};

const city: HTMLElement = document.querySelector(".city");
const date: HTMLElement = document.querySelector(".date");
const containerImg: HTMLElement = document.querySelector(".container-img");
const containerTemp: HTMLElement = document.querySelector(".container-temp");
const tempNumber: HTMLElement = document.querySelector(".container-temp div");
const tempUnit: HTMLElement = document.querySelector(".container-temp span");
const weatherT: HTMLElement = document.querySelector(".weather");
const searchInput: HTMLInputElement = document.querySelector(".form-control");
const searchButton: HTMLElement = document.querySelector(".btn");
const lowHigh: HTMLElement = document.querySelector(".low-high");

window.addEventListener("load", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    alert("Este navegador não suporte Geolocalização");
  }
  function setPosition(position: any) {
    console.log(position);
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    coordResults(lat, long);
  }

  function showError(error: { message: any }) {
    alert(`erro: ${error.message}`);
  }
});

function coordResults(lat: any, long: any) {
  fetch(
    `${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`http error: status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      alert(error.message);
    })
    .then((response) => {
      displayResults(response);
    });
}

function displayResults(weather: {
  name: any;
  sys: { country: any };
  weather: { description: any }[];
  main: { temp: number; temp_min: number; temp_max: number };
}) {
  console.log(weather);

  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  date.innerText = dateBuilder(now);

  

  let iconName = weather.weather[0].icon;
  containerImg.innerHTML = `<img src="./icons/${iconName}.png">`;

  let temperature = `${Math.round(weather.main.temp)}`;
  tempNumber.innerHTML = temperature;
  tempUnit.innerHTML = `°c`;

  weatherT.innerHTML = weather.weather[0].description;

  lowHigh.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function dateBuilder(d: Date) {
  let days = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  let months = [
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

  let day = days[d.getDay()]; //getDay: 0-6
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
let tempNumberNow: any;

containerTemp.addEventListener("click", changeTemp);
function changeTemp() {
  tempNumberNow = tempNumber.innerHTML;

  if (tempUnit.innerHTML === "ºc") {
    let f = tempNumberNow * 1.8 + 32;
    tempUnit.innerHTML = "ºf";
    tempNumber.innerHTML = Math.round(f);
  } else {
    let c = (tempNumberNow - 32) / 1.8;
    tempUnit.innerHTML = "ºf";
    tempNumber.innerHTML = Math.round(c);
  }
}

function searchResults(city: string) {
  fetch(
    `${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`http error: status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      alert(error.message);
    })
    .then((response) => {
      displayResults(response);
    });
}

searchButton.addEventListener("click", function () {
  searchResults(searchInput.value);
});

searchInput.addEventListener("keypress", enter);
function enter(event: { keyCode: any }) {
  const key = event.keyCode;
  if (key === 13) {
    searchResults(searchInput.value);
  }
}

export {};
function f(f: any): string {
  throw new Error("Function not implemented.");
}
