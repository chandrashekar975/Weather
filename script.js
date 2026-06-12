
async function fetchWeatherData(event) {
    event.preventDefault();
    let cityname = document.getElementById("ip").value;
    let API_KEY = "4c72598e3b97bf4bbd81a79368fb2031";
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`);
    let forecastdata = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${API_KEY}&units=metric`);

    const weather = await data.json();
    const forecast = await forecastdata.json();
    display(weather, forecast);
}

function display(weather, forecast) {
    let dp = document.getElementById("display-weather");
    let cur_fah = (9 / 5 * weather.main.temp + 32).toFixed(2);
    let htmlContent = `<div class="text-center text-white h3 mb-5"><span class="fw-bold fst-italic">Current Temp: </span>${weather.main.temp}&deg;C/${cur_fah}&deg;F</div>`;

    const iconMap = {
        'Clear': 'bi-sun-fill text-warning',
        'Clouds': 'bi-clouds-fill text-light',
        'Rain': 'bi-cloud-rain-heavy-fill text-light',
        'Drizzle': 'bi-cloud-drizzle-fill text-light',
        'Thunderstorm': 'bi-cloud-lightning-rain-fill text-warning',
        'Snow': 'bi-snowflake text-primary',
        'Atmosphere': 'bi-cloud-haze-fill text-light',
        'Mist': 'bi-moisture text-light',
        'Haze': 'bi-cloud-haze2-fill text-light',
        'Fog': 'bi-cloud-fog-fill text-light'
    };

    htmlContent += `<div class="container mt-4"><div class="row justify-content-center g-3">`;

    for (let i = 8; i < forecast.list.length; i += 8) {
        let dayData = forecast.list[i];

        let date = new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        let weatherCondition = dayData.weather[0].main;
        let iconClass = iconMap[weatherCondition] || 'bi-cloud-fill text-light';
        let max_fah = (9 / 5 * dayData.main.temp_max + 32).toFixed(1);
        let min_fah = (9 / 5 * dayData.main.temp_min + 32).toFixed(1);
        htmlContent += `
                    <div class="col-6 col-sm-4 col-md-2 card bg-secondary text-white border-0 p-3 text-center rounded-3 shadow mx-1">
                        <div class="fw-bold small mb-2">${date}</div>
                        <div class="fs-1 my-2"><i class="bi ${iconClass}"></i></div>
                        <div class="fw-bold mt-2">Max Temp:${dayData.main.temp_max.toFixed(1)}&deg;C/${max_fah}&deg;F</div>
                        <div class="fw-bold mt-2">Min Temp:${dayData.main.temp_min.toFixed(1)}&deg;C/${min_fah}&deg;F</div>
                        <div class="text-light small text-capitalize opacity-75 mt-1">${dayData.weather[0].description}</div>
                    </div>`;
    }

    htmlContent += `</div></div>`;
    dp.innerHTML = htmlContent;
}

