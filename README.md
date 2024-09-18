# SeaBnB

Seabnb was created as a learning exercise and acts as a demonstration of fundamental programming skills. The site is a play on Airbnb, and allows adventurers to book travel on seafaring vessels.

![SeaBnB planner in action](/src/assets/SeaBnBPlanner.gif)

The planning page lets you explore travel options by selecting start and end ports. The list of available vessels are filtered by the vessel's home port. Prices are calculated based on the vessel's price per day and length of journey. If the user is logged in they can save bookings, and browse them on a nicely styled page.

![SeaBnB booked trip example](/src/assets/SeaBnBBooking.png)

The [backend](https://github.com/bmcloutier/seabnb-api) was created with Ruby on Rails using a PostgreSQL database. JWT and bcrypt gems allow for authentication.

This frontend was created with React.js using Tailwindcss for styling. Maps were created with the MapboxGL library and currency conversion uses ExchangeRate-API.

## Requirements

- SeaBnB backend serving on port 3000 (Repo and installation instructions [here](https://github.com/bmcloutier/seabnb-api))
- Node.js (Installation instructions [here](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs))
- API key for Mapbox (Signup for free [here](https://account.mapbox.com/auth/signup/?page=/maps))
- API key for ExchangeRate-API (Signup for free [here](https://app.exchangerate-api.com/sign-up))

## Installation

Install React Router, Axios, MapboxGL, and Tailwindcss:

```bash
nmp install --save react-router-dom
npm install --save axios
npm install --save mapbox-gl
npm install -D tailwindcss postcss autoprefixer
```

Create a .env file in the project directory and include your API keys in the following format:

```bash
VITE_MAPBOX_API_KEY=abc123-your-secret-key
VITE_EXCHANGE_API_KEY=abc123-your-secret-key
```

## Usage

In your terminal, run the following command:

```bash
npm run dev
```

You should now be able to open the SeaBnB webpage in a browser!

## Roadmap

Here are a few improvements I'd like to explore:

- A method of verifying vessel availability prior to booking.
- A better selection method for each vessel.
- User preferences for currency and home port.
- Review model per vessel.
- Stretch goal: route path finding to avoid land!
