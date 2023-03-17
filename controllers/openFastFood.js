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
      'Give me two javascript array of objects in string format with 2 steet food giving the street food name,its expected price in ' +
      cityName +
      '. Dont give me the variable name declaration. Give only the array of objects';
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
