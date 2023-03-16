const { amadeus } = require("../utils/amadeus");
const dotenv = require("dotenv").config();
const axios = require("axios");

const getCityDetails = async (req, res) => {
  try {
    const { cityName } = req.params;
    const { data } = await amadeus.referenceData.locations.get({
      keyword: cityName,
      subType: "CITY",
    });

    if (!data || data.length === 0) {
      res.status(400).json({
        message: "City Not Found!",
      });
      return;
    }
    const cityCode = data[0].iataCode;
    const coordinates = data[0].geoCode;

    res.status(200).json({
      message: "City Code Fetched!",
      cityCode,
      coordinates,
      completeData: data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const popularPlacesOpenTripMap = async (req, res) => {
  try {
    const { cityName } = req.params;
    const { data } = await axios.get(
      `http://api.opentripmap.com/0.1/en/places/geoname?lang=en&name=${cityName}&apikey=${process.env.OPENTRIP_API_KEY}`
    );

    if (!data || data.length === 0) {
      res.status(400).json({
        message: "City Not Found!",
      });
      return;
    }
    console.log(data);
    const response = await axios.get(
      `http://api.opentripmap.com/0.1/en/places/radius?lang=en&radius=10000&lat=${data.lat}&lon=${data.lon}&rate=3,3h&format=json&apikey=${process.env.OPENTRIP_API_KEY}`
    );
    const results = response && response.data;
    if (!results || results.length === 0) {
      res.status(400).json({
        message: "No Places Found!",
      });
      return;
    }
    res.status(200).json({
      message: "Popular Places Fetched!",
      data: response.data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const popularPlacesAmadeus = async (req, res) => {
  try {
    const { cityName } = req.params;
    const { data } = await amadeus.referenceData.locations.get({
      keyword: cityName,
      subType: "CITY",
    });
    console.log(data);
    if (data.length > 0) {
      const coordinates = data[0].geoCode;
      const response =
        await amadeus.referenceData.locations.pointsOfInterest.get({
          ...coordinates,
        });
      // console.log(res.data);
      res.status(200).json({
        message: "Popular Places Fetched!",
        data: response.data,
      });
    } else {
      res.status(400).json({
        message: "City Not Found!",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  popularPlacesAmadeus,
  getCityDetails,
  popularPlacesOpenTripMap,
};
