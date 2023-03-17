const { amadeus } = require("../utils/amadeus");
const dotenv = require("dotenv").config();
const axios = require("axios");
const geolib = require("geolib");

const sampleHotel = {
  min_total_price: 87908.3517894745,
  zip: "400059",
  city: "Mumbai",
  hotel_name: "VITS Mumbai International Airport",
  hotel_id: 286405,
  review_score: 8.5,
  review_score_word: "Very good",
  address: "Andheri Kurla Road",
  district_id: 3287,
  latitude: 19.1119459788461,
  longitude: 72.8712147474289,
  Image:
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/110420277.jpg?k=aecc94860411809b626495946a68efa0d672084eb8f1307c7749bb0e2013bbcd&o=",
};

const samplePopularPlaces = [
  {
    xid: "N5056120381",
    name: "BEST Museum",
    dist: 2939.27164454,
    rate: 1,
    osm: "node/5056120381",
    kinds: "cultural,museums,interesting_places,other_museums",
    point: {
      lon: 72.8777084350586,
      lat: 19.046688079833984,
    },
  },
  {
    xid: "W431512593",
    name: "Sion Fort",
    dist: 3305.43919086,
    rate: 7,
    osm: "way/431512593",
    wikidata: "Q7525357",
    kinds: "fortifications,historic,interesting_places,castles",
    point: {
      lon: 72.8675765991211,
      lat: 19.046613693237305,
    },
  },
  {
    xid: "N537762970",
    name: "Riwa Fort",
    dist: 3380.13743312,
    rate: 6,
    osm: "node/537762970",
    wikidata: "Q7338999",
    kinds:
      "architecture,historic_architecture,fortifications,historic,interesting_places,destroyed_objects,other_fortifications",
    point: {
      lon: 72.86016845703125,
      lat: 19.050989151000977,
    },
  },
  {
    xid: "N3532191558",
    name: "masjid",
    dist: 5119.4126799,
    rate: 1,
    osm: "node/3532191558",
    kinds: "cultural,museums,interesting_places,other_museums",
    point: {
      lon: 72.92969512939453,
      lat: 19.06121826171875,
    },
  },
];
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
    console.log(popularPlacesSorted(sampleHotel, samplePopularPlaces));
    const { data } = await axios.get(
      `http://api.opentripmap.com/0.1/en/places/geoname?lang=en&name=${cityName}&format=json&apikey=${process.env.OPENTRIP_API_KEY}`
    );

    if (!data || data.length === 0) {
      res.status(400).json({
        message: "City Not Found!",
      });
      return;
    }

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

const popularPlacesSorted = async (hotel, places) => {
  const { latitude, longitude } = hotel;
  const distPlaces = places.map((place) => {
    const { lat, lon } = place.point;
    const distance = geolib.getDistance(
      {
        latitude,
        longitude,
      },
      {
        latitude: lat,
        longitude: lon,
      }
    );
    return {
      place,
      distance,
    };
  });
  const sortedPlaces = distPlaces
    .sort((a, b) => a.distance - b.distance)
    .reverse();
  const onlySortedPlaces = sortedPlaces.map((item) => item.place);
  return onlySortedPlaces;
};

module.exports = {
  popularPlacesAmadeus,
  getCityDetails,
  popularPlacesOpenTripMap,
  getCityDetailsFn,
  popularPlacesSorted,
};
