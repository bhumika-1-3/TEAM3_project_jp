const { amadeus } = require('../utils/amadeus');
const axios = require('axios');
const dotenv = require('dotenv').config({ path: '../.env' });

const getDestination = async (cityName) => {
  const options = {
    method: 'GET',
    url: 'https://booking-com.p.rapidapi.com/v1/hotels/locations',
    params: { name: cityName, locale: 'en-gb' },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_BOOKING_KEY,
      'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
    },
  };
  const response2 = await axios
    .request(options)
    .then(function (response) {
      const extracted_data = [];
      for (x in response.data) {
        extracted_data.push(response.data[x].dest_id);
      }
      return extracted_data;
    })
    .catch(function (error) {
      console.error(error.message);
    });
  return response2;
};

const getHotels = async (
  destinationId,
  adults,
  children,
  checkin_date,
  checkout_date,
  no_of_room
) => {
  const options = {
    method: 'GET',
    url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
    params: {
      adults_number: parseInt(adults),
      dest_type: 'city',
      filter_by_currency: 'INR',
      checkout_date: checkout_date,
      checkin_date: checkin_date,
      order_by: 'price',
      locale: 'en-gb',
      dest_id: parseInt(destinationId),
      units: 'metric',
      room_number: no_of_room,
      categories_filter_ids: 'class::2,class::4,free_cancellation::1',
      children_number: children,
      children_ages: '5,0',
      page_number: '0',
      include_adjacency: 'true',
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_BOOKING_KEY,
      'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
    },
  };
  const response2 = await axios
    .request(options)
    .then(function (response) {
      const extracted_data = [];

      for (x in response.data.result) {
        extracted_data.push({
          min_total_price: response.data.result[x].min_total_price,
          zip: response.data.result[x].zip,
          city: response.data.result[x].city,
          hotel_name: response.data.result[x].hotel_name,
          hotel_id: response.data.result[x].hotel_id,
          review_score: response.data.result[x].review_score,
          review_score_word: response.data.result[x].review_score_word,
          address: response.data.result[x].address,
          district_id: response.data.result[x].district_id,
          latitude: response.data.result[x].latitude,
          longitude: response.data.result[x].longitude,
          Image: response.data.result[x].max_photo_url,
        });
      }
      return extracted_data;
    })
    .catch(function (error) {
      console.error(error.message);
    });
  return response2;
};

const returnHotels = async (req, res) => {
  try {
    const {
      cityName,
      adults,
      children,
      price,
      checkin_date,
      checkout_date,
      no_of_rooms,
    } = req.params;
    const destinationIds = await getDestination(cityName);
    console.log(destinationIds);
    let hotelList = [];

    const hotel = await getHotels(
      destinationIds[0],
      adults,
      children,
      checkin_date,
      checkout_date,
      no_of_rooms
    );

    if (hotel) {
      hotelList = [...hotel];
    }

    const myHotels = hotelList.filter(function (inst) {
      return inst.min_total_price < price;
    });
    res.status(200).json({
      success: true,
      data: myHotels,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  returnHotels,
};
