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

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      iconNow: '',
      iconSoon: '',
      timeStamp: '',
      lon: '',
      lat: '',
      location: 'Helsinki',
    };
  }

  async componentWillMount() {
    let weather;
    let forecast;
    if ('geolocation' in navigator) {
      this.getPosition();
    } else {
      weather = await getWeatherFromApi();
      forecast = await getForecastFromApi();
    }
    if (weather) this.setState({ icon: weather.icon.slice(0, -1) });
    if (forecast) {
      this.setState(
        {
          iconSoon: forecast.weather.icon.slice(0, -1),
          timeStamp: forecast.time.slice(11, 16),
        });
    }
  }

  getPosition() {
    window.navigator.geolocation.getCurrentPosition(async (pos) => {
      if (pos.coords) {
        this.setState({ lon: pos.coords.longitude, lat: pos.coords.latitude, location: pos.name });
        const res = await getCoordinateWeatherFromApi(this.state.lon, this.state.lat);
        this.setState({ location: res.name });
      }
    });
  }

  render() {
    const { icon, iconSoon, timeStamp, location } = this.state;

    return (
      <div>
        <h2>Weather now in {location}</h2>
        <div className="icon">
          {icon && <img alt="weather_icon" src={`/img/${icon}.svg`} />}
        </div>
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
