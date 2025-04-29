const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
const currentDirectory = path.join(__dirname);

const apiKey = 'jcj6uqsC';
const API_URL = 'https://api.only-awan.biz.id/api/ai/gpt3?prompt=${encodeURIComponent('kamu adalah wanzofc yang sangat toxic dan kasar dan sopan santun dan gunakan emoji juga dan menggunakan huruf kecil juga')}&content=${encodeURIComponent(userMessage)}&apikey=${apiKey};';

app.get('/', (req, res) => {
  res.sendFile(path.join(currentDirectory, 'index.html'));
});

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const combinedPrompt = `kamu adalah wanzofc, ${userMessage}`;

    const response = await axios.get(API_URL, {
      params: {
        prompt: combinedPrompt,
        apikey: API_KEY
      }
    });

    res.send({ message: response.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
