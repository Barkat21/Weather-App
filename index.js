const apiKey = "20dc3341c5958a571ce43a2ab26b9ab0";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = cityInputEl.value;

  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not Ok");
    }

    const data = await response.json();

    const temperatue = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = [
      `Feels like : ${Math.round(data.main.feels_like)}`,
      `Humidity : ${data.main.humidity}`,
      `Wind speed : ${data.wind.speed}`,
    ];

    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

    weatherDataEl.querySelector(".temperature").textContent = `${temperatue}°C`;
    weatherDataEl.querySelector(".discription").textContent = `${description}`;
    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div> ${detail} </div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".discription").textContent =
      "An error happened, please check your input and try again";

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}
