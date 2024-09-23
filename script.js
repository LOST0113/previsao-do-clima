const token = "bafefc436757b720dfe5e1382a9371a2";
const weatherData = document.querySelector("#weather-data");
const search = document.querySelector("#search");
const searchInput = document.querySelector("#search input");
const searchButton = document.querySelector("#search button");
const local = document.querySelector("#local");
const climaIcon = document.querySelector("#clima-icon");
const temperatura = document.querySelector("#temperatura");
const temperaturaDesc = document.querySelector("#temperatura-desc");
const tempMax = document.querySelector("#temp-max div p");
const tempMin = document.querySelector("#temp-min div p");
const humidade = document.querySelector("#humidade div p");
const vento = document.querySelector("#vento div p");
const alert = document.querySelector("#alert");

const showAlert = (text) => {
    alert.innerHTML = text;
}

const showInfo = (json) => {
    console.log(json)
    showAlert("");
    weatherData.classList.add("show");
    local.innerHTML = `${json.city}, ${json.country}`;
    climaIcon.setAttribute("src", `http://openweathermap.org/img/wn/${json.icon}@2x.png`)
    temperatura.innerHTML = `${json.temp.toFixed(1).toString().replace(".", ",")}<sup>°C</sup>`;
    temperaturaDesc.innerHTML = json.desc;
    tempMax.innerHTML = `${json.tempMax.toFixed(1).toString().replace(".", ",")}<sup>°C</sup>`;
    tempMin.innerHTML = `${json.tempMin.toFixed(1).toString().replace(".", ",")}<sup>°C</sup>`;
    humidade.innerHTML = `${json.humidity}%`;
    vento.innerHTML = `${json.wind} km/h`;
}

const searchCity = async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=${token}&units=metric&lang=pt_br`;

    const resultado = await fetch(apiUrl);
    const json = await resultado.json();

    if(json.cod == 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            desc: json.weather[0].description,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            humidity: json.main.humidity,
            wind: json.wind.speed,
            icon: json.weather[0].icon
        });
    } else {
        weatherData.classList.remove("show");
        showAlert("Não foi possivel localizar a cidade");
    }

}

search.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = searchInput.value;

    if(!city) {
        return alert("Pesquisa Vazia");
    }

    searchCity(city);
})