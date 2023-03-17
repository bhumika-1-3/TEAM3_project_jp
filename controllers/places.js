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

const getCityDetailsFn = async (cityName) => {
  try {
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

    return {
      message: "City Code Fetched!",
      cityCode,
      coordinates,
      completeData: data,
    };
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

const popularPlacesOpenTripMap = async (req, res) => {
  try {
    const { cityName } = req.params;
    const { data } = await axios.get(
      `http://api.opentripmap.com/0.1/en/places/geoname?lang=en&name=${cityName}&format=json&apikey=${process.env.OPENTRIP_API_KEY}`
    );

    if (!data || data.length === 0) {
      res.status(400).json({
        message: "City Not Found!",
      });
      return;
    }
    console.log(data);
    const response = await axios.get(
      `http://api.opentripmap.com/0.1/en/places/radius?lang=en&radius=10000&lat=${data.lat}&lon=${data.lon}&kinds=beaches,other_beaches,museums,architecture,historic_architecture,fortifications,other_archaeological_sites&format=json&apikey=${process.env.OPENTRIP_API_KEY}`
    );
    const results = response && response.data;
    if (!results || results.length === 0) {
      res.status(400).json({
        message: "No Places Found!",
      });
      return;
    }
    const filteredData = response.data.filter(
      (item) => item.name != "" && item.rate != 0
    );

    res.status(200).json({
      message: "Popular Places Fetched!",
      data: filteredData,
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

const popularPlacesSorted = async (req, res) => {
  try {
    const { cityName } = req.params;
    const { data } = await axios.get(
      `http://api.opentripmap.com/0.1/en/places/geoname?lang=en&name=${cityName}&format=json&apikey=${process.env.OPENTRIP_API_KEY}`
    );

    if (!data || data.length === 0) {
      res.status(400).json({
        message: "City Not Found!",
      });
      return;
    }
    console.log(data);
    const response = await axios.get(
      `http://api.opentripmap.com/0.1/en/places/radius?lang=en&radius=10000&lat=${data.lat}&lon=${data.lon}&kinds=beaches,other_beaches,museums,architecture,historic_architecture,fortifications,other_archaeological_sites&format=json&apikey=${process.env.OPENTRIP_API_KEY}`
    );
    const results = response && response.data;
    if (!results || results.length === 0) {
      res.status(400).json({
        message: "No Places Found!",
      });
      return;
    }
    const filteredData = response.data.filter(
      (item) => item.name != "" && item.rate != 0
    );

    res.status(200).json({
      message: "Popular Places Fetched!",
      data: filteredData,
    });
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
  getCityDetailsFn,
};
