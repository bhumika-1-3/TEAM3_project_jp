const axios = require("axios");
const { getCityDetails, getCityDetailsFn } = require("../controllers/places");

const getRestaurantsByLatLong = async (req, res) => {
  const { lat, long } = req.query;
  // console.log(req.query);
  const config = {
    headers: {
      "x-rapidapi-key": "bbf9d7c200mshaf9b9a5e512a3e9p1cbcc6jsn4f5364bf96a4",
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      useQueryString: true,
    },
    params: {
      limit: 10,
      currency: "INR",
      distance: "2",
      lunit: "km",
      lang: "en_US",
      latitude: lat,
      longitude: long,
      open_now: "true",
      restaurant_tagcategory_standalone: "10591",
    },
  };

  try {
    if (req.query == null || req.query.long == null || req.query.lat == null) {
      res.status(400).json({
        message: "Provide Longitute and Latitude",
      });
    } else {
      const response = await axios.get(
        "https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng",
        config
      );
      const restaurants = response.data.data;
      // console.log(restaurants);
      // return restaurants;
      res.status(203).json(restaurants);
    }
  } catch (error) {
    console.error(error);
  }
};

const getRestaurantsByCity = async (req, res) => {
  try {
    const { city } = req.params;
    const { coordinates } = await getCityDetailsFn(city);
    console.log(coordinates);
    if (!coordinates) {
      res.status(400).json({
        message: "City Not Found!",
      });
      return;
    }
    const { latitude, longitude } = coordinates;

    const config = {
      headers: {
        "x-rapidapi-key": "bbf9d7c200mshaf9b9a5e512a3e9p1cbcc6jsn4f5364bf96a4",
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        useQueryString: true,
      },
      params: {
        limit: 8,
        currency: "INR",
        distance: "10",
        lunit: "km",
        lang: "en_US",
        latitude: latitude,
        longitude: longitude,
        open_now: "true",
        restaurant_tagcategory_standalone: "10591",
      },
    };

    const response = await axios.get(
      "https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng",
      config
    );
    const restaurants = response.data.data;

    res.status(203).json(restaurants);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getRestaurantsByLatLong,
  getRestaurantsByCity,
};
