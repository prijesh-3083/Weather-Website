const cityInp = document.querySelector(".inp");
const srchBtn = document.querySelector(".sbtn");
const castAllDiv = document.querySelector(".line");
const apiKey = "";

const printDtl = (weatherItem) => {
    return `<div class="line">
                <h5>${(weatherItem.main.temp - 273.15).toFixed()}℃</h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h5>${weatherItem.wind.speed}K/h</h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h5>${weatherItem.main.humidity}%</h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h5>(${weatherItem.dt_txt.split(" ")[0].slice(5, 10)})</h5>
                <br>
            </div>`;
}

const getWeatherDetails = (loc, lat, lon) => {
    const weatherApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
    fetch(weatherApiUrl)
        .then((res) => {
            return res.json();
        })
        .then((data) => {

            const perDayForcasst = [];
            const fiveDayCast = data.list.filter((forecast) => {
                const fDate = new Date(forecast.dt_txt).getDate();
                if (!perDayForcasst.includes(fDate)) {
                    return perDayForcasst.push(fDate);
                }
            });

            let inp = document.querySelector(".inp");
            let lc1 = document.querySelector(".lc");
            lc1.innerText = inp.value;
            let t = document.querySelector(".temp");
            t.innerText = `${(data.list[0].main.temp - 273.15).toFixed()}℃`;

            cityInp.value = "";
            castAllDiv.innerHTML = "";
            console.log(fiveDayCast);
            fiveDayCast.forEach((weatherItem) => {
                castAllDiv.insertAdjacentHTML("beforeend", printDtl(weatherItem));
            });
            // let airw = document.querySelector(".airw");
            airw.innerText = `${data.list[0].wind.speed} Km/hr`;
            // let airq = document.querySelector(".airq");
            aird.innerText = `${data.list[0].wind.deg} º`;
            // let airh = document.querySelector(".airh");
            airh.innerText = `${data.list[0].main.humidity} %`;
            // let airu = document.querySelector(".airu");
            airp.innerText = `${data.list[0].main.pressure} hPa`;

            let atmImg = document.querySelector(".atmimg");
            atmImg.setAttribute("src",`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`);
            
        })
        .catch(() => {
            alert("An error occured while fetching the  weather forecast!");
        });
}

const getLocCoordinates = () => {
    const loc = cityInp.value.trim();
    if (!loc) return;

    const GEOapiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=1&appid=${apiKey}`

    fetch(GEOapiURL)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            // console.log(data);
            if (!data.length) {
                return alert(`No coordinates found for ${loc}!`);
            }
            const { name, lat, lon } = data[0];
            getWeatherDetails(name, lat, lon);
        })
        .catch(() => {
            alert("An error occured while fetching the  coordinates!");
        });
}

srchBtn.addEventListener("click", getLocCoordinates);