export default class Weather {
  constructor(objRefs) {
    this.objRefs = objRefs;
  }
  getFetch(cityName) {
    let apiKey = "e8547a33933c2c7537e9c7daa05d48e5";
    const { input, weather, city, temp, flex, humidity, wind } = this.objRefs;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    flex.innerHTML = "";
    input.value = "";
    let result = fetch(url)
      .then((response) => {
        if (!response.ok) return alert("Please use valid city name");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        weather.classList.remove("loading");
        city.textContent = `Weather in ${data.name}`;
        let celcium = Math.round(data.main.temp - 273.15);
        temp.textContent = `${celcium}°C`;
        const iconData = data.weather.map((el) => {
          const img = document.createElement("img");
          img.src = `https://openweathermap.org/img/wn/${el.icon}.png`;
          img.alt = el.description;
          img.classList.add("icon");
          const div = document.createElement("div");
          div.classList.add("description");
          div.textContent = el.description;
          console.dir(div);
          div.append(img);
          return div;
        });
        flex.prepend(...iconData);
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind speed: ${data.wind.speed} km/h`;
      })
      .catch((error) => {
        console.error(`Oops, something went wrong =(`, error);
      });
    return result;
  }
}
