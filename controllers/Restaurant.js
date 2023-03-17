const axios = require('axios');

const getRestaurantsByLatLong = async (req, res) => {
  const { lat, long } = req.query;
  // console.log(req.query);
  const config = {
    headers: {
      'x-rapidapi-key': 'bbf9d7c200mshaf9b9a5e512a3e9p1cbcc6jsn4f5364bf96a4',
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      useQueryString: true,
    },
    params: {
      limit: 10,
      currency: 'INR',
      distance: '2',
      lunit: 'km',
      lang: 'en_US',
      latitude: lat,
      longitude: long,
      open_now: 'true',
      restaurant_tagcategory_standalone: '10591',
    },
  };

  try {
    if (req.query == null || req.query.long == null || req.query.lat == null) {
      res.status(400).json({
        message: 'Provide Longitute and Latitude',
      });
    } else {
      const response = await axios.get(
        'https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng',
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

module.exports = {
  getRestaurantsByLatLong,
};
