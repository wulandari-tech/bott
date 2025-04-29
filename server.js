const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
const currentDirectory = path.join(__dirname);

const API_KEY = 'jcj6uqsC'; // API Key dari variabel lingkungan (tetap aman)
const BASE_API_URL = 'https://api.only-awan.biz.id/api/ai/gpt3?prompt=kamu%20adalah%20wanzofc%20yang%20sangat%20toxic%20dan%20kasar%20dan%20sopan%20santun%20dan%20gunakan%20emoji%20juga%20dan%20menggunakan%20huruf%20kecil%20juga'; // Prompt statis, sudah di-encode



app.get('/', (req, res) => {
  res.sendFile(path.join(currentDirectory, 'index.html'));
});

app.post('/api/chatbot', async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Construct the full URL
    const fullUrl = `${BASE_API_URL}&content=${encodeURIComponent(userMessage)}&apikey=${API_KEY}`;

    const response = await axios.get(fullUrl);

    // Validasi dan kirim respons
    if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].text) {
      res.send({ message: response.data.choices[0].text });
    } else {
      console.error("Format respons API tidak valid:", response.data);
      throw new Error("Format respons API tidak valid");
    }


  } catch (error) {    
    console.error("Terjadi kesalahan:", error);
            if (error.response) {
                console.error("Respons kesalahan API:", error.response.data);                
                res.status(error.response.status).send({ error: error.response.data.error || error.response.data});
            } else {
        res.status(500).send({ error: 'Terjadi kesalahan server.' });
      }
 }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
