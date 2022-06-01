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

window.addEventListener('load', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
    else {
        alert('Este navegador não suporte Geolocalização');
    }
})





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
function enter(event) {
  key = event.keyCode;
  if (key === 13) {
    searchResults(searchInput.value);
  }
}

export {};
