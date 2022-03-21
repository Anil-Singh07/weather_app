import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: 0,
      lat: 0,
      long: 0,
      wind: 0,
      humidity: 0,
      feelsLike: 0,
      city: "Bangalore",
      weatherType: "loading..",
      sunriseTime: 0,
      sunsetTime: 0,
      timeZone: 0,
    };
  }

  componentDidMount() {
    this.getData("Bangalore");
  }

  getData = (value) => {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        value +
        "&appid=81c345b9415ca251a92d00c1312548e0"
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          temperature: (json.list[0].main.temp - 273.15).toFixed(0),
          humidity: json.list[0].main.humidity,
          feelsLike: (json.list[0].main.feels_like - 273.15).toFixed(0),
          lat: json.city.coord.lat.toFixed(3),
          long: json.city.coord.lon.toFixed(3),
          wind: json.list[0].wind.speed,
          city: value,
          weatherType: json.list[0].weather[0].main,
          timeZone: json.city.timezone,
          sunriseTime: json.city.sunrise * 1000,
          sunsetTime: json.city.sunset * 1000,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <h1>Todays's weather</h1>
        <div
          className="city"
          onClick={() => {
            this.getData("Bangalore");
          }}
        >
          Bangalore
        </div>
        <div
          className="city"
          onClick={() => {
            this.getData("Delhi");
          }}
        >
          Delhi
        </div>
        <div
          className="city"
          onClick={() => {
            this.getData("Mumbai");
          }}
        >
          Mumbai
        </div>

        <div className="container">
          {/* WEATHER COMPONENT */}
          <div className="weather">
            <div className="container-inner">
              {/* LEFT SIDE CONTENT */}
              <div className="content-inner">
                <span className="primary">{this.state.city}</span>
                <span className="secondary  weather-lspace">
                  As of{"  "}
                  {new Date().toLocaleString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
                <span className="temp">{this.state.temperature}&deg;C</span>
                <span className="primary">{this.state.weatherType}</span>
                <span className="secondary  weather-lspace">weather type</span>
              </div>

              {/* RIGHT SIDE CONTENT */}
              <div className="content-inner right-side">
                <span className="primary">{this.state.humidity}%</span>
                <span className="secondary weather-rspace">Humidity</span>
                <span className="primary">{this.state.feelsLike}&deg;C</span>
                <span className="secondary weather-rspace">Feels like</span>
                <span className="primary">{this.state.wind}m/s</span>
                <span className="secondary weather-rspace">wind speed</span>
              </div>
            </div>
          </div>

          {/* DETAILS COMPONENT */}
          <div className="details">
            <div className="container-inner">
              {/* LEFT SIDE CONTENT */}
              <div className="content-inner">
                <span className="primary">{this.state.city}</span>
                <span className="secondary detail-lspace">Location</span>
                <span className="primary">
                  {this.state.lat},{this.state.long}
                </span>
                <span className="secondary detail-lspace">Co-ordinates</span>
                <span className="primary">
                  (GMT+{Math.floor(this.state.timeZone / 3600)}:
                  {Math.floor(
                    this.state.timeZone / 60 -
                      Math.floor(this.state.timeZone / 3600) * 60
                  )}
                  )
                </span>
                <span className="secondary detail-lspace"> Time Zone</span>
              </div>

              {/* RIGHT SIDE CONTENT */}
              <div className="content-inner right-side">
                <span className="primary">
                  {new Date(this.state.sunriseTime).toLocaleTimeString([], {
                    hour12: true,
                  })}
                </span>
                <span className="secondary  detail-rspace">sunrise Time</span>
                <span className="primary">
                  {new Date(this.state.sunsetTime).toLocaleTimeString([], {
                    hour12: true,
                  })}
                </span>
                <span className="secondary detail-rspace">sunset Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
