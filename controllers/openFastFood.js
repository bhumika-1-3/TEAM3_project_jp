require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const findStreetFood = async (req, res) => {
  try {
    const { cityName } = req.params;
    const prompt =
      'Give me an english sentence of 2 steet food giving the street food name,its expected price in ' +
      cityName +
      '.';
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
    const data = response.data.choices[0].text;
    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : 'There was an issue on the server',
    });
  }
};

module.exports = { findStreetFood };
