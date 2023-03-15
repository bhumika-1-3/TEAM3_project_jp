const { amadeus } = require("../utils/amadeus");

const getCityDetails = async (req, res) => {
  try {
    const { cityName } = req.params;
    const { data } = await amadeus.referenceData.locations.get({
      keyword: cityName,
      subType: "CITY",
    });

    if (!data) {
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

const popularPlaces = async (req, res) => {
  try {
    const { cityName } = req.params;
    const { data } = await amadeus.referenceData.locations.get({
      keyword: cityName,
      subType: "CITY",
    });
    if (data) {
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
  popularPlaces,
  getCityDetails,
};
