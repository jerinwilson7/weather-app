const apiKey = '58ba930b2cb94337c416ae307809ef79';
const username = prompt('enter your name')
const title = document.querySelector('h2')


title.textContent = `Welcome, ${username}!`



// if(localStorage.getItem('city')){

// }


const getWeather = () => {
  
    const city = document.getElementById('city').value;
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    if(!city){
        alert('please enter a city');
        return;
    } 

    fetch(currentWeatherUrl)
        // .then(response=>response.json())
        .then(response => response.json())
        .then((data) => {
            // console.log(data);
            displayWeather(data)

        })
        .catch((error) => {
            console.log("Error fetching current URL", error);
            alert("Error fetching current weather try again")
        })

    fetch(forecastUrl)
        .then(response => response.json())
        .then((data) => {
            // console.log(data);
            displayHourlyForcast(data.list)

        })


        localStorage.setItem('city',city )
}


const displayWeather = (data) => {
    console.log(data);

    const temperatureContainer = document.querySelector('.temperature-container')
    const weatherInfo = document.querySelector('.weather-info')
    const weatherIcon = document.querySelector('.weather-icon')
    const hourlyForecastDiv = document.querySelector('.hourly-forecast')

    temperatureContainer.innerHTML = '';
    weatherInfo.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';

    if (data.cod === 404) {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;

    }
    else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const weatherDescription = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}&deg;C</p>`;
        const weatherHTML = `
              <p>${cityName}</p>
              <p>${weatherDescription}</p>`;

        temperatureContainer.innerHTML = temperatureHTML;
        weatherInfo.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = weatherDescription;

        showImage();
    }

}


const showImage = () => {
    const weatherIcon = document.querySelector('.weather-icon');
    weatherIcon.style.display = 'block'
}


const displayHourlyForcast = (data) => {

    const hourlyForecastDiv = document.querySelector('.hourly-forecast');
    const next24Hours = data.slice(0, 8)
    console.log(next24Hours);

    next24Hours.forEach(item=>{

        const dateTIme = new Date(item.dt * 1000);
        const hour = dateTIme.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        
        // const iconUrl = `https://openweathermap.org/img/wn/01d.png`;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
            <div class ="hourly-item">
                <span>${hour}:00</span>
                <img src = '${iconUrl}' alt = "Hourly weather icon">
                <span>${temperature}&deg;C<span>
                </div`;
        
            hourlyForecastDiv.innerHTML += hourlyItemHTML;
    })

}


// window.onload = () => {
//     const storedCity = localStorage.getItem('city');
//     if (storedCity) {
//         // If there's a stored city, fetch weather for that city
//         document.getElementById('city').value = storedCity;
//         getWeather();
//     }
// };

window.onload = () =>{
    const storedCity = localStorage.getItem('city');

    document.getElementById('city').value = storedCity;
    getWeather();
}