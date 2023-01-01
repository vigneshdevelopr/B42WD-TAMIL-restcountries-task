const YOUR_API_KEY = "661716f8187b4f990aaf0a2b32f4e188";
const COUNTRIES_API_ENDPOINT = "https://restcountries.com/v3.1/all";
const WEATHER_API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";

let countryId = 0;

fetch(COUNTRIES_API_ENDPOINT)
  .then((response) => response.json())
  .then((data) => {
    const container = document.createElement("div");
    container.classList.add("container");

      const title = document.createElement("h1");
      title.setAttribute("id", "title");
      title.classList.add("text-center");
      title.textContent = "Country Details and Weather";
  
      container.appendChild(title);

    const row = document.createElement("div");
    row.classList.add("row");

    container.appendChild(row);

    data.forEach((element) => {
      const name = element.name.common;
      const flag = element.flags.png;
      const population = element.population;
      const region = element.region;
      const capital = element.capital;
      const coordinates = element.latlng;

      countryId++;
      const cardId = `country-${countryId}`;

      const card = document.createElement("div");
      card.classList.add("col-lg-10", "col-sm-12", "card");
      card.setAttribute("id", cardId);
      card.innerHTML = `
        <img src="${flag}" alt="${name}" class="flag"></img>
        <div class="card-header">
          <h5>${name}</h5>
        </div>
        <div class="card-body">
          <p>
            <span>Population : </span>${population}
          </p>
          <p>
            <span>Region : </span>${region}
          </p>
          <p>
            <span>Capital : </span>${capital}
          </p>
          <button class="btn btn-primary" data-id="${cardId}" >
            Click for Weather
          </button>
        </div>
      `;

      document.body.appendChild(card);

      const button = document.querySelector(`[data-id="${cardId}"]`);
      button.addEventListener("click", () => {
        fetch(`${WEATHER_API_ENDPOINT}?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${YOUR_API_KEY}`)
          .then((response) => response.json())
          .then((data) => {
            
            card.innerHTML = "";

            card.innerHTML = `
              <img src="${flag}" alt="${name}" class="flag"></img>
              <div class="card-header">
                <h5>${name}</h5>
              </div>
              <div class="card-body">
                <p>
                  <span>Temperature : </span>${data.main.temp}°C
                </p>
                <p>
                  <span>Humidity : </span>${data.main.humidity}%
                </p>
                <p>
                  <span>Pressure : </span>${data.main.pressure}
                </p>
              </div>
            `;
          });
      });
    });

    document.body.appendChild(container);
  });
