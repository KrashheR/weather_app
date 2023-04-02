function setWeatherFrameStyle(error) {
  const weather = document.querySelector('.weather');
  const todayInfo = document.querySelector('.today-info');
  const weatherDetails = document.querySelector('.weather__details');
  const error404 = document.querySelector('.not-found');

  if (error) {
    weather.style.height = '400px';
    todayInfo.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'block';
    error404.classList.add('fade-in');
  } else {
    error404.style.display = 'none';
    error404.classList.remove('fade-in');
    todayInfo.style.display = '';
    todayInfo.classList.add('fade-in');
    weatherDetails.style.display = '';
    weatherDetails.classList.add('fade-in');
    weather.style.height = '500px';
  }
}

function setTodayImage(icon) {
  const todayImage = document.querySelector('.today-info__image');
  todayImage.src = `images/${icon}.webp`;
}

function setWeatherDetails(json) {
  const temperature = document.querySelector('.today-info__temperature');
  const description = document.querySelector('.today-info__description');
  const humidity = document.querySelector('.indicator_humidity .indicator__value');
  const wind = document.querySelector('.indicator_wind .indicator__value');
  const pressure = document.querySelector('.indicator_pressure .indicator__value');
  const feelsLike = document.querySelector('.indicator_feels-like .indicator__value');

  temperature.innerHTML = `${parseInt(json.main.temp, 10)}<span>°C</span>`;
  description.innerHTML = `${json.weather[0].description}`;
  feelsLike.innerHTML = `${parseInt(json.main.feels_like, 10)}<span>°C</span>`;
  humidity.innerHTML = `${json.main.humidity}%`;
  wind.innerHTML = `${parseInt(json.wind.speed, 10)} Km/h`;
  pressure.innerHTML = `${json.main.pressure} мм рт.ст.`;
}

function setVideo(weatherType) {
  const videoBg = document.querySelector('.video-bg__content');

  switch (weatherType) {
    case 'Clear':
      videoBg.src = 'video/clear_sky.mp4';
      break;

    case 'Rain':
      videoBg.src = 'video/rain.mp4';
      break;

    case 'Snow':
      videoBg.src = 'video/snow.mp4';
      break;

    case 'Clouds':
      videoBg.src = 'video/clouds.mp4';
      break;

    case 'Mist':
      videoBg.src = 'video/mist.mp4';
      break;

    case 'Storm':
      videoBg.src = 'video/storm.mp4';
      break;

    default:
      videoBg.src = '';
  }
}

document.querySelector('.search-box__button').addEventListener('click', () => {
  const APIKey = '26ca7d51d9b8b4f43d6a8367bfdd2f63';
  const city = document.querySelector('.search-box__input').value.trim();

  if (city === '') { return; }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=ru`)
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === '404') {
        setWeatherFrameStyle(true);
        return;
      }

      setWeatherFrameStyle();
      setTodayImage(json.weather[0].icon);
      setWeatherDetails(json);
      setVideo(json.weather[0].main);
    });
});
