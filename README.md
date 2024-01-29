# Weatherz

A simple web application to check out the wheather in your location and regions.

## Features

- Find out weather in your location
- Search your region weather
- Save your region or location weather

## Tech stack

- ReactJS
- OpenWeatherMap API

## How to use

1. Clone this repository
2. Open with Text editor (VS Code)
3. Run Terminal (bash)
4. Change to root (run : cd weatherz)
5. run : npm run dev
6. make sure all required dependencies are installed

## Contribute

If you want to contribute in this web app, just following this steps :

1. Fork this Repo
2. Create new Branch
3. Do your magic
4. Commit your changes
5. Push to your branch
6. Create new request pull

## Notes

Because OpenWeatherMap does not provide an Endpoint forecast API that accepts city parameters. So for now the weather forecast data for the next 5 days will display data from the user's location by default and is not affected by the selected saved city.
Google's geoencoding API (paid) is required to convert city names into coordinates that the Endpoint forecast API can accept.

Thank you!
