import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weatherinhelsinki`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getForecastFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/forecast`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getCoordinateWeatherFromApi = async (lon, lat) => {
  try {
    const response = await fetch(`${baseURL}/weatherbycoordinates?lon=${lon}&lat=${lat}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};

const getCoordinateForecastFromApi = async (lon, lat) => {
  try {
    const response = await fetch(`${baseURL}/forecastbycoordinates?lon=${lon}&lat=${lat}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      iconSoon: '',
      timeStamp: '',
      location: 'Helsinki',
      useLocation: false,
      error: '',
    };
  }

  async componentWillMount() {
    this.getWeather();
  }

  async getWeather() {
    const [weather, forecast] = await Promise.all([getWeatherFromApi(), getForecastFromApi()]);
    if (weather && forecast) {
      this.setState(
        {
          icon: weather.icon.slice(0, -1),
          iconSoon: forecast.weather.icon.slice(0, -1),
          timeStamp: `${new Date(forecast.time).getHours()}.00`,
          useLocation: false,
          location: 'Helsinki',
          error: '',
        });
    } else {
      this.setState({ error: 'Unbable to fetch weather' });
    }
  }

  async getWeatherByLocation() {
    window.navigator.geolocation.getCurrentPosition(async (pos) => {
      if (pos.coords) {
        const { longitude, latitude } = pos.coords;
        const [weather, forecast] = await Promise.all([
          getCoordinateWeatherFromApi(longitude, latitude),
          getCoordinateForecastFromApi(longitude, latitude),
        ]);
        if (weather && forecast) {
          this.setState({
            location: weather.name,
            icon: weather.weather[0].icon.slice(0, -1),
            iconSoon: forecast.weather.icon.slice(0, -1),
            timeStamp: `${new Date(forecast.time).getHours()}.00`,
            useLocation: true,
            error: '',
          });
        } else {
          this.setState({ error: 'Unable to get location-based weather' });
        }
      } else {
        this.setState({ error: 'Unable to get coordinates' });
      }
    }, (err) => {
      this.setState({ error: `Unable to get location, error:  ${err.message}` });
    });
  }

  render() {
    const { icon, iconSoon, timeStamp, location, useLocation, error } = this.state;
    const button = useLocation ?
      <button onClick={() => this.getWeather()}>Weather in Helsinki</button>
      :
      <button onClick={() => this.getWeatherByLocation()}>Weather by my location</button>;
    const message = error ? <h3>{error}</h3> : null;

    return (
      <div>
        <h2>Weather now in {location}</h2>
        <div className="icon">
          {icon && <img alt="weather_icon" src={`/img/${icon}.svg`} />}
        </div>
        {button}
        {message}
        <h2>Weather in {location} at {timeStamp}</h2>
        <div className="icon">
          {icon && <img alt="weather_icon" src={`/img/${iconSoon}.svg`} />}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
