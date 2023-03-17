const cityName = 'Mumbai';
const budget = 50000;
const flight = [
  {
    id: '10075-2304060355--31475-0-11906-2304060510|11906-2304160015--31475-0-10075-2304160125',
    price: {
      raw: 16763.17,
      formatted: '₹ 16,764',
    },
    legs: [
      {
        id: '10075-2304060355--31475-0-11906-2304060510',
        origin: {
          id: 'BOM',
          name: 'Mumbai',
          displayCode: 'BOM',
          city: 'Mumbai',
          isHighlighted: false,
        },
        destination: {
          id: 'GOI',
          name: 'Goa',
          displayCode: 'GOI',
          city: 'Marmagao',
          isHighlighted: false,
        },
        durationInMinutes: 75,
        stopCount: 0,
        isSmallestStops: false,
        departure: '2023-04-06T03:55:00',
        arrival: '2023-04-06T05:10:00',
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -31475,
              logoUrl:
                'https://logos.skyscnr.com/images/airlines/favicon/04.png',
              name: 'AirAsia India',
            },
          ],
          operationType: 'fully_operated',
        },
        segments: [
          {
            id: '10075-11906-2304060355-2304060510--31475',
            origin: {
              flightPlaceId: 'BOM',
              parent: {
                flightPlaceId: 'IBOM',
                name: 'Mumbai',
                type: 'City',
              },
              name: 'Mumbai',
              type: 'Airport',
            },
            destination: {
              flightPlaceId: 'GOI',
              parent: {
                flightPlaceId: 'IGOI',
                name: 'Marmagao',
                type: 'City',
              },
              name: 'Goa',
              type: 'Airport',
            },
            departure: '2023-04-06T03:55:00',
            arrival: '2023-04-06T05:10:00',
            durationInMinutes: 75,
            flightNumber: '331',
            marketingCarrier: {
              id: -31475,
              name: 'AirAsia India',
              alternateId: '04',
              allianceId: 0,
            },
            operatingCarrier: {
              id: -31475,
              name: 'AirAsia India',
              alternateId: '04',
              allianceId: 0,
            },
          },
        ],
      },
      {
        id: '11906-2304160015--31475-0-10075-2304160125',
        origin: {
          id: 'GOI',
          name: 'Goa',
          displayCode: 'GOI',
          city: 'Marmagao',
          isHighlighted: false,
        },
        destination: {
          id: 'BOM',
          name: 'Mumbai',
          displayCode: 'BOM',
          city: 'Mumbai',
          isHighlighted: false,
        },
        durationInMinutes: 70,
        stopCount: 0,
        isSmallestStops: false,
        departure: '2023-04-16T00:15:00',
        arrival: '2023-04-16T01:25:00',
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -31475,
              logoUrl:
                'https://logos.skyscnr.com/images/airlines/favicon/04.png',
              name: 'AirAsia India',
            },
          ],
          operationType: 'fully_operated',
        },
        segments: [
          {
            id: '11906-10075-2304160015-2304160125--31475',
            origin: {
              flightPlaceId: 'GOI',
              parent: {
                flightPlaceId: 'IGOI',
                name: 'Marmagao',
                type: 'City',
              },
              name: 'Goa',
              type: 'Airport',
            },
            destination: {
              flightPlaceId: 'BOM',
              parent: {
                flightPlaceId: 'IBOM',
                name: 'Mumbai',
                type: 'City',
              },
              name: 'Mumbai',
              type: 'Airport',
            },
            departure: '2023-04-16T00:15:00',
            arrival: '2023-04-16T01:25:00',
            durationInMinutes: 70,
            flightNumber: '472',
            marketingCarrier: {
              id: -31475,
              name: 'AirAsia India',
              alternateId: '04',
              allianceId: 0,
            },
            operatingCarrier: {
              id: -31475,
              name: 'AirAsia India',
              alternateId: '04',
              allianceId: 0,
            },
          },
        ],
      },
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: false,
      isPartiallyChangeable: false,
      isCancellationAllowed: false,
      isPartiallyRefundable: false,
    },
    fareAttributes: {},
    tags: ['cheapest', 'third_shortest'],
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 0.862069,
    pricingOptions: [
      {
        agentIds: ['asin'],
        amount: 16763.17,
        bookingProposition: 'PBOOK',
      },
    ],
    deeplink:
      'https://www.skyscanner.net/transport/flights/bom/goi/230406/230416/config/10075-2304060355--31475-0-11906-2304060510|11906-2304160015--31475-0-10075-2304160125?adults=2&adultsv2=2&cabinclass=economy&children=0&childrenv2=&destinationentityid=27541888&originentityid=27539520&inboundaltsenabled=false&infants=0&outboundaltsenabled=false&preferdirects=false&ref=home&rtn=1',
  },
];

const car = ['YeCar'];
const placesOfAttraction = [
  {
    message: 'Popular Places Fetched!',
    data: [
      {
        xid: 'N648848209',
        name: 'Belapur Fort',
        dist: 3382.00662507,
        rate: 3,
        osm: 'node/648848209',
        kinds:
          'fortifications,historic,interesting_places,other_fortifications',
        point: {
          lon: 73.02870178222656,
          lat: 19.008819580078125,
        },
      },
      {
        xid: 'W708635268',
        name: 'Belapur Fort',
        dist: 3760.01677778,
        rate: 3,
        osm: 'way/708635268',
        wikidata: 'Q4881907',
        kinds:
          'fortifications,historic,interesting_places,other_fortifications',
        point: {
          lon: 73.02840423583984,
          lat: 19.005020141601562,
        },
      },
      {
        xid: 'W250491658',
        name: 'Mumbai Trans Harbour Link',
        dist: 7948.91339661,
        rate: 3,
        osm: 'way/250491658',
        wikidata: 'Q2723192',
        kinds: 'bridges,architecture,interesting_places,other_bridges',
        point: {
          lon: 72.95721435546875,
          lat: 18.991539001464844,
        },
      },
      {
        xid: 'N3532191558',
        name: 'masjid',
        dist: 9459.90698673,
        rate: 1,
        osm: 'node/3532191558',
        kinds: 'cultural,museums,interesting_places,other_museums',
        point: {
          lon: 72.92969512939453,
          lat: 19.06121826171875,
        },
      },
      {
        xid: 'W853277772',
        name: 'Anushaktingar Main Gate',
        dist: 9571.77126064,
        rate: 1,
        osm: 'way/853277772',
        kinds: 'fortifications,defensive_walls,historic,interesting_places',
        point: {
          lon: 72.92510223388672,
          lat: 19.042728424072266,
        },
      },
      {
        xid: 'W848968690',
        name: 'Mumbai Trans Harbour Link',
        dist: 9583.73721986,
        rate: 3,
        osm: 'way/848968690',
        wikidata: 'Q2723192',
        kinds: 'bridges,architecture,interesting_places,other_bridges',
        point: {
          lon: 72.9390869140625,
          lat: 18.990236282348633,
        },
      },
    ],
  },
];
const restaurents = ['A++', 'B++', 'C++', 'D++'];
const hotel = [
  {
    min_total_price: 7839.10398122668,
    zip: '400059',
    city: 'Mumbai',
    hotel_name: 'VITS Mumbai International Airport',
    hotel_id: 286405,
    review_score: 8.5,
    review_score_word: 'Very good',
    address: 'Andheri Kurla Road',
    district_id: 3287,
    latitude: 19.1119459788461,
    longitude: 72.8712147474289,
    Image:
      'https://cf.bstatic.com/xdata/images/hotel/max1280x900/110420277.jpg?k=aecc94860411809b626495946a68efa0d672084eb8f1307c7749bb0e2013bbcd&o=',
  },
];
const startdate = '18-03-2023';
const enddate = '20-03-2023';
const NoOFDays = 3;
const itenary = { trip: NoOFDays + ' days ' + cityName + ' itenary', days: [] };
// let event = new Date(flight[0].legs[0].departure);
// console.log(typeof event);
// event = new Date(event.getTime() - event.getTimezoneOffset() * 60000).toJSON();
// const hours = event.getHours;
// console.log(hours);
let destIter = 0;
let restuarIter = 0;
let item1 = {
  name: 'Start journey by taking flight',
  source: flight[0].legs[0].origin.name,
  destination: flight[0].legs[0].destination.name,
  start_time: flight[0].legs[0].departure,
  end_time: flight[0].legs[0].arrival,
};
let item2 = {
  name: 'Check in to Hotel ' + hotel[0].hotel_name,
  location: hotel[0].address,
  duration: '1 hour',
};
let hour = flight[0].legs[0].arrival.substring(11, 13);
let item3;
hour = parseInt(hour);
if (hour < 16) {
  item3 = { name: placesOfAttraction[0].data[0].name, duration: '2hrs' };
  let item4 = { name: 'Return Hotel ,Have dinner and take rest' };
  itenary.days.push({ day: 'Day 1', items: [item1, item2, item3, item4] });
} else {
  item3 = { name: 'Have dinner and take rest' };
  itenary.days.push({ day: 'Day 1', items: [item1, item2, item3] });
}
console.log(itenary.days[0].items);

for (let i = 2; i < NoOFDays; i++) {
  let item1 = { name: placesOfAttraction[0].data[0].name, duration: '2hrs' };
  itenary.days.push({ day: 'Day ' + i, items: [] });
}

require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

function parseString(dataFromServer) {
  var parsedJSON = JSON.parse(dataFromServer.d);
  for (var i = 0; i < parsedJSON.length; i++) {
    alert(parsedJSON[i].Id);
  }
}

const findStreetFood = async (req, res) => {
  try {
    const { cityName } = req.params;
    const prompt =
      'Give me only one javascript array containing names of street food or local food in ' +
      cityName +
      '. Dont give me the variable name declaration. Give only the array.';
    // console.log(prompt);
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    let data = response.data.choices[0].text;
    // console.log(data);
    let data2 = data.replace(/(\r\n|\r|\n)/g, '');
    data2 = data2.replace(/ /g, '');
    data2 = data2.replace('.', '');
    console.log(data2);
    data2 = JSON.parse(data2);
    return res.status(200).json({
      success: true,
      data: data2,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { findStreetFood };
