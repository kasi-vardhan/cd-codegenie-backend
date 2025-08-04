
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

app.post('/generate-code', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: `Write code for: ${prompt}` }],
    });

    res.json({ code: response.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong!');
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
