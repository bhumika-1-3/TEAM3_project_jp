const axios = require('axios');
const { popularPlacesSorted } = require('./places');

const itenaryJson = async (req, res) => {
  try {
    const {
      cityName,
      budget,
      adults,
      children,
      departureDate,
      returnDate,
      origin,
      destination,
      no_of_rooms,
    } = req.params;
    const flight = await axios.get(
      `https://jpmc-project.onrender.com/api/transport/flights/${origin}/${destination}/${departureDate}/${returnDate}/${adults}/${children}/`
    );

    const hotel = await axios.get(
      `https://jpmc-project.onrender.com/api/hotels/all/${destination}/${adults}/${children}/${budget}/${departureDate}/${returnDate}/${no_of_rooms}`
    );

    const placesOfAttraction = await axios.get(
      `https://jpmc-project.onrender.com/api/places/popular/${destination}`
    );
    // console.log(placesOfAttraction.data);
    console.log(hotel.data.data[0]);
    const placesOfAttractionSorted = await popularPlacesSorted(
      hotel.data.data[0],
      placesOfAttraction.data.data
    );
    // console.log(placesOfAttractionSorted);
    const restaurents = await axios.get(
      `https://jpmc-project.onrender.com/api/restaurants/${destination}`
    );

    let destIter = 0;
    let restuarIter = 0;
    let NoOFDays =
      parseInt(returnDate.substring(9, 11)) -
      parseInt(departureDate.substring(9, 11));
    const itenary = {
      trip: NoOFDays + ' days ' + destination + ' itenary',
      days: [],
    };
    let item1 = {
      name: 'Start journey by taking flight',
      source: flight.data.data[0].legs[0].origin.name,
      destination: flight.data.data[0].legs[0].destination.name,
      start_time: flight.data.data[0].legs[0].departure,
      end_time: flight.data.data[0].legs[0].arrival,
    };
    let item2 = {
      name: 'Check in to Hotel ' + hotel.data.data[0].hotel_name,
      location: hotel.data.data[0].address,
      duration: '1 hour',
    };
    let hour = flight.data.data[0].legs[0].arrival.substring(11, 13);
    let item3;
    hour = parseInt(hour);
    if (hour < 16) {
      item3 = {
        name: placesOfAttractionSorted[destIter].name,
        duration: '2hrs',
      };
      destIter++;
      let item4 = { name: 'Return Hotel ,Have dinner and take rest' };
      itenary.days.push({ day: 'Day 1', items: [item1, item2, item3, item4] });
    } else {
      item3 = { name: 'Have dinner and take rest' };
      itenary.days.push({ day: 'Day 1', items: [item1, item2, item3] });
    }
    for (let i = 2; i < NoOFDays; i++) {
      item1 = {
        name: 'Visit ' + placesOfAttractionSorted[destIter].name,
        duration: '2hrs',
        time: 'Morning',
      };
      destIter++;
      item2 = {
        name: 'Have Lunch at ' + restaurents.data[restuarIter].name,
        location: restaurents.data[restuarIter].location_string,
        start_time: '01:00 PM',
        end_time: '02:00 PM',
      };
      restuarIter++;
      item3 = {
        name: 'Visit ' + placesOfAttractionSorted[destIter].name,
        duration: '2hrs',
        time: 'Afternoon',
      };
      destIter++;
      let item4 = {
        name: 'Have Dinner at ' + restaurents.data[restuarIter].name,
        location: restaurents.data[restuarIter].location_string,
        start_time: '07:00 PM',
        end_time: '08:00 PM',
      };
      restuarIter++;
      let item5 = {
        name: 'Visit ' + placesOfAttractionSorted[destIter].name,
        duration: '1hrs',
        time: 'Night',
      };
      destIter++;
      let item6 = {
        name: 'Return to your Hotel',
      };
      itenary.days.push({
        day: 'Day ' + i,
        items: [item1, item2, item3, item4, item5, item6],
      });
    }
    item1 = {
      name: 'Have BreakFast at your Hotel',
      duration: '1hrs',
      start_time: '07:00 AM',
      end_time: '08:00 AM',
    };
    item2 = {
      name: 'End journey by taking flight',
      source: flight.data.data[0].legs[1].origin.name,
      destination: flight.data.data[0].legs[1].destination.name,
      start_time: flight.data.data[0].legs[1].departure,
      end_time: flight.data.data[0].legs[1].arrival,
    };
    itenary.days.push({
      day: 'Day ' + NoOFDays,
      items: [item1, item2],
    });

    res.status(200).json({
      message: 'Here is the itinary',
      itinary: itenary,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};
// const cityName = 'Mumbai';
// const budget = 50000;
// const flight = [''];

// const car = ['YeCar'];
// const placesOfAttraction = [
//   {
//     message: 'Popular Places Fetched!',
//     data: [
//       {
//         xid: 'N648848209',
//         name: 'Belapur Fort',
//         dist: 3382.00662507,
//         rate: 3,
//         osm: 'node/648848209',
//         kinds:
//           'fortifications,historic,interesting_places,other_fortifications',
//         point: {
//           lon: 73.02870178222656,
//           lat: 19.008819580078125,
//         },
//       },
//       {
//         xid: 'W708635268',
//         name: 'Belapur Fort',
//         dist: 3760.01677778,
//         rate: 3,
//         osm: 'way/708635268',
//         wikidata: 'Q4881907',
//         kinds:
//           'fortifications,historic,interesting_places,other_fortifications',
//         point: {
//           lon: 73.02840423583984,
//           lat: 19.005020141601562,
//         },
//       },
//       {
//         xid: 'W250491658',
//         name: 'Mumbai Trans Harbour Link',
//         dist: 7948.91339661,
//         rate: 3,
//         osm: 'way/250491658',
//         wikidata: 'Q2723192',
//         kinds: 'bridges,architecture,interesting_places,other_bridges',
//         point: {
//           lon: 72.95721435546875,
//           lat: 18.991539001464844,
//         },
//       },
//       {
//         xid: 'N3532191558',
//         name: 'masjid',
//         dist: 9459.90698673,
//         rate: 1,
//         osm: 'node/3532191558',
//         kinds: 'cultural,museums,interesting_places,other_museums',
//         point: {
//           lon: 72.92969512939453,
//           lat: 19.06121826171875,
//         },
//       },
//       {
//         xid: 'W853277772',
//         name: 'Anushaktingar Main Gate',
//         dist: 9571.77126064,
//         rate: 1,
//         osm: 'way/853277772',
//         kinds: 'fortifications,defensive_walls,historic,interesting_places',
//         point: {
//           lon: 72.92510223388672,
//           lat: 19.042728424072266,
//         },
//       },
//       {
//         xid: 'W848968690',
//         name: 'Mumbai Trans Harbour Link',
//         dist: 9583.73721986,
//         rate: 3,
//         osm: 'way/848968690',
//         wikidata: 'Q2723192',
//         kinds: 'bridges,architecture,interesting_places,other_bridges',
//         point: {
//           lon: 72.9390869140625,
//           lat: 18.990236282348633,
//         },
//       },
//     ],
//   },
// ];
// const restaurents = ['A++', 'B++', 'C++', 'D++'];
// const hotel = [
//   {
//     min_total_price: 7839.10398122668,
//     zip: '400059',
//     city: 'Mumbai',
//     hotel_name: 'VITS Mumbai International Airport',
//     hotel_id: 286405,
//     review_score: 8.5,
//     review_score_word: 'Very good',
//     address: 'Andheri Kurla Road',
//     district_id: 3287,
//     latitude: 19.1119459788461,
//     longitude: 72.8712147474289,
//     Image:
//       'https://cf.bstatic.com/xdata/images/hotel/max1280x900/110420277.jpg?k=aecc94860411809b626495946a68efa0d672084eb8f1307c7749bb0e2013bbcd&o=',
//   },
// ];

// // const a = await popularPlacesSorted(hotel[0]);
// console.log('here');
// // console.log(a);
// const startdate = '18-03-2023';
// const enddate = '20-03-2023';
// const NoOFDays = 3;
// const itenary = { trip: NoOFDays + ' days ' + cityName + ' itenary', days: [] };
// // let event = new Date(flight[0].legs[0].departure);
// // console.log(typeof event);
// // event = new Date(event.getTime() - event.getTimezoneOffset() * 60000).toJSON();
// // const hours = event.getHours;
// // console.log(hours);
// let destIter = 0;
// let restuarIter = 0;
// let item1 = {
//   name: 'Start journey by taking flight',
//   source: flight[0].legs[0].origin.name,
//   destination: flight[0].legs[0].destination.name,
//   start_time: flight[0].legs[0].departure,
//   end_time: flight[0].legs[0].arrival,
// };
// let item2 = {
//   name: 'Check in to Hotel ' + hotel[0].hotel_name,
//   location: hotel[0].address,
//   duration: '1 hour',
// };
// let hour = flight[0].legs[0].arrival.substring(11, 13);
// let item3;
// hour = parseInt(hour);
// if (hour < 16) {
//   item3 = { name: placesOfAttraction[0].data[0].name, duration: '2hrs' };
//   let item4 = { name: 'Return Hotel ,Have dinner and take rest' };
//   itenary.days.push({ day: 'Day 1', items: [item1, item2, item3, item4] });
// } else {
//   item3 = { name: 'Have dinner and take rest' };
//   itenary.days.push({ day: 'Day 1', items: [item1, item2, item3] });
// }
// console.log(itenary.days[0].items);

// for (let i = 2; i < NoOFDays; i++) {
//   let item1 = { name: placesOfAttraction[0].data[0].name, duration: '2hrs' };
//   itenary.days.push({ day: 'Day ' + i, items: [] });
// }

// require('dotenv').config();
// const { Configuration, OpenAIApi } = require('openai');

// const configuration = new Configuration({
//   apiKey: process.env.OPEN_AI_KEY,
// });
// const openai = new OpenAIApi(configuration);

// function parseString(dataFromServer) {
//   var parsedJSON = JSON.parse(dataFromServer.d);
//   for (var i = 0; i < parsedJSON.length; i++) {
//     alert(parsedJSON[i].Id);
//   }
// }

// const findStreetFood = async (req, res) => {
//   try {
//     const { cityName } = req.params;
//     const prompt =
//       'Give me only one javascript array containing names of street food or local food in ' +
//       cityName +
//       '. Dont give me the variable name declaration. Give only the array.';
//     // console.log(prompt);
//     const response = await openai.createCompletion({
//       model: 'text-davinci-003',
//       prompt: prompt,
//       temperature: 0.7,
//       max_tokens: 256,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     });
//     let data = response.data.choices[0].text;
//     // console.log(data);
//     let data2 = data.replace(/(\r\n|\r|\n)/g, '');
//     data2 = data2.replace(/ /g, '');
//     data2 = data2.replace('.', '');
//     console.log(data2);
//     data2 = JSON.parse(data2);
//     return res.status(200).json({
//       success: true,
//       data: data2,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

module.exports = { itenaryJson };
