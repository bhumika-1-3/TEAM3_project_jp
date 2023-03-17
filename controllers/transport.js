const { format } = require("date-fns");
const axios = require("axios");
const dotenv = require("dotenv").config();

const getAirportCode = async (place) => {
  try {
    const options = {
      method: "GET",
      url: "https://skyscanner44.p.rapidapi.com/autocomplete",
      params: { query: place },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_SKYSCANNER_KEY,
        "X-RapidAPI-Host": "skyscanner44.p.rapidapi.com",
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
      method: "GET",
      url: "https://skyscanner44.p.rapidapi.com/search",
      params: {
        adults,
        origin: originCode,
        destination: destinationCode,
        departureDate: format(new Date(departureDate), "yyyy-MM-dd"),
        returnDate: format(new Date(returnDate), "yyyy-MM-dd"),
        currency: "INR",
      },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_SKYSCANNER_KEY,
        "X-RapidAPI-Host": "skyscanner44.p.rapidapi.com",
      },
    };
    console.log(options);
    const { data } = await axios.request(options);
    const flights = data.itineraries.buckets[0].items;
    res.status(200).json({
      message: "Flights Fetched",
      data: flights,
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
};
