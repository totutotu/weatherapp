# Weatherapp (for Eficode)

This is my solution to the Eficode weatherapp challenge. The app is running on google cloud.

## Development

#### Init

 Make sure you have [Docker](https://www.docker.com/) and [docker compose](https://docs.docker.com/compose/) installed.

Navigate to the backend folder and create a .env file with a apikey to the weatherservice by running the commands: 

```
cd backend/
echo "APPID={your own apikey here}" > .env
```

#### Running

From the root of the project run 

`docker-compose up`

The app is found in your browser at localhost:80

Start hacking!

## Exercises completed


### Mandatory

* [x] Get yourself an API key to make queries in the [openweathermap](http://openweathermap.org/).

* [x] Either run the app locally (using `npm i && npm start`) or move to the next step.

* [x] Add **Dockerfile**'s in the *frontend* and the *backend* directories to run them virtually on any environment having [docker](https://www.docker.com/) installed. It should work by saying e.g. `docker build -t weatherapp_backend . && docker run --rm -i -p 9000:9000 --name weatherapp_backend -t weatherapp_backend`. If it doesn't, remember to check your api key first.

* [x] Add a **docker-compose.yml** -file connecting the frontend and the backend, enabling running the app in a connected set of containers.

### Optional (do as many as you like)

* [x] The application now only reports the current weather. It should probably report the forecast e.g. a few hours from now. (tip: [openweathermap api](https://openweathermap.org/forecast5))

* [x] The developers are still keen to run the app and its pipeline on their own computers. Share the development files for the container by using volumes, and make sure the containers are started with a command enabling hot reload.

* [x] There are [eslint](http://eslint.org/) errors. Sloppy coding it seems. Please help.

* [x] The app currently reports the weather only for location defined in the *backend*. Shouldn't it check the browser location and use that as the reference for making a forecast? (tip: [geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation))

* [x] Set up the weather service in a free cloud hosting service, e.g. [AWS](https://aws.amazon.com/free/) or [Google Cloud](https://cloud.google.com/free/). 
 **Comment**: App is running in google cloud but location based weather is not working since using a non-secure connection prohibits the use of geolocation.

*  [ ] Write [ansible](http://docs.ansible.com/ansible/intro.html) playbooks for installing [docker](https://www.docker.com/) and the app itself.

* [ ] There are no tests. Where are the tests? (tip: [mocha](https://mochajs.org/) or [robot framework](http://robotframework.org/)) Disclaimer: this is not an easy task. If you really want to try writing robot tests, start by creating a third container that gives expected weather data, and direct the backend queries there by redefining the **MAP_ENDPOINT**.
