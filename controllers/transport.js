const { format } = require('date-fns');
const axios = require('axios');
const dotenv = require('dotenv').config();

const getAirportCode = async (place) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://skyscanner44.p.rapidapi.com/autocomplete',
      params: { query: place },
      headers: {
        'X-RapidAPI-Key': '5448749687msh39a94d676c7ec32p1cd131jsn3f50f76928ff',
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
      },
    };
    const { data } = await axios.request(options);
    return data[0].iata_code;
  } catch (error) {
    console.log(error);
  }
};

const getBestFlights = async (req, res) => {
  try {
    const { origin, destination, departureDate, returnDate, adults, children } =
      req.params;
    const originCode = await getAirportCode(origin);
    const destinationCode = await getAirportCode(destination);
    const options = {
      method: 'GET',
      url: 'https://skyscanner44.p.rapidapi.com/search',
      params: {
        adults,
        origin: originCode,
        destination: destinationCode,
        departureDate: format(new Date(departureDate), 'yyyy-MM-dd'),
        returnDate: format(new Date(returnDate), 'yyyy-MM-dd'),
        currency: 'INR',
      },
      headers: {
        'X-RapidAPI-Key': '5448749687msh39a94d676c7ec32p1cd131jsn3f50f76928ff',
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
      },
    };
    console.log(options);
    const { data } = await axios.request(options);
    if (!data || data.length === 0 || data.itineraries.buckets.length === 0) {
      res.status(400).json({
        message: 'No Flights Found!',
      });
      return;
    }
    const flights = data.itineraries.buckets[0].items;
    res.status(200).json({
      message: 'Flights Fetched',
      data: flights,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const getLocationData = async (query) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://skyscanner44.p.rapidapi.com/autocomplete-rentacar',
      params: { query },
      headers: {
        'X-RapidAPI-Key': '5448749687msh39a94d676c7ec32p1cd131jsn3f50f76928ff',
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
      },
    };
    const { data } = await axios.request(options);
    return data[0].entity_id;
  } catch (error) {
    console.log(error);
  }
};

const getBestCarRental = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.params;
    const locationId = await getLocationData(location);
    const options = {
      method: 'GET',
      url: 'https://skyscanner44.p.rapidapi.com/search-rentacar',
      params: {
        pickupId: locationId,
        pickupDate: format(new Date(pickupDate), 'yyyy-MM-dd'),
        pickupTime: '10:00',
        returnDate: format(new Date(returnDate), 'yyyy-MM-dd'),
        returnTime: '10:00',
        currency: 'INR',
      },
      headers: {
        'X-RapidAPI-Key': '5448749687msh39a94d676c7ec32p1cd131jsn3f50f76928ff',
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
      },
    };

    const { data } = await axios.request(options);
    const cars = Object.keys(data.providers);
    const mostRatedCar = cars.reduce((prev, curr) => {
      if (data.providers[prev].rating > data.providers[curr].rating) {
        return prev;
      } else {
        return curr;
      }
    });

    res.status(200).json({
      message: 'Car Fetched',
      data: data.providers[mostRatedCar],
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getBestFlights,
  getBestCarRental,
};
