var axios = require('axios');
var request = require('request');


const getCurrent = async (req, res) => {
    try {
        if (req.query == null || req.query.long == null || req.query.lat == null) {
            res.status(400).json({
                message: 'Provide Longitute and Latitude',
            })
        }
        else {


            const { lat, long } = req.query;
            var currentData = null;
            var previousData = null;
            var options = [
                {
                    method: 'GET',
                    url: `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=8c3ebc1bb1534fe5b1d221cb7ae9d207`,
                },
                {
                    method: 'GET',
                    url: `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${long}&start_date=2023-03-12&end_date=2023-03-15&key=8c3ebc1bb1534fe5b1d221cb7ae9d207`,
                },
            ]


            // const responses = await Promise.all(options.map((option) => request(option)));
            // const results = responses.map((response) => {
            //     response.body
            //     console.log(response);
            // });
            request(options[0], function (error, response) {
                if (error) throw new Error(error);
                currentData = response.body;

            });
            request(options[1], function (error, response) {
                if (error) throw new Error(error);
                previousData = response.body;
                res.status(200).json({
                    message: 'API requests successful!',
                    previousData,
                    currentData,
                })
            });

        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

module.exports = {
    getCurrent,
};
