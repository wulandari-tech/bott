import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd())));

app.post('/api/chatbot', async (req, res) => {
    const userMessage = req.body.message;
    const apiKey = 'jcj6uqsC';
    const apiUrl = `https://api.only-awan.biz.id/api/ai/gpt3?prompt=${encodeURIComponent('kamu adalah wanzofc yang sangat toxic dan kasar dan sopan santun dan gunakan emoji juga dan menggunakan huruf kecil juga')}&content=${encodeURIComponent(userMessage)}&apikey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.result && data.data.status && data.data.data) {
            res.json({ response: data.data.data });
        } else {
            console.error("Error from API:", data);
            res.status(500).json({ error: 'Terjadi kesalahan dari API.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Gagal terhubung ke server AI.' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
