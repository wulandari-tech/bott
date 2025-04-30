import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';
import os from 'os';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd())));

app.post('/api/chatbot', async (req, res) => {
    const userMessage = req.body.message;
    const apiKey = 'jcj6uqsC'; // Ganti dengan API key Anda jika berbeda
    const apiUrl = `https://api.only-awan.biz.id/api/ai/gpt3?prompt=${encodeURIComponent('kamu adalah wanzofc yang sangat toxic dan kasar dan sopan santun dan gunakan emoji juga dan menggunakan huruf kecil juga')}&content=${encodeURIComponent(userMessage)}&apikey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.result && data.data.status) {
            const botResponse = data.data.data;
            res.json({
                creator: "WANZOFC TECH",
                result: true,
                message: "GPT-3 AI Response",
                data: {
                    status: true,
                    data: botResponse
                }
            });
        } else {
            console.error('Error from API:', data);
            res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan.', data: data }); // Sertakan data dalam response error
        }
    } catch (error) {
        console.error('Error fetching bot response:', error);
        res.status(500).json({ error: 'Gagal terhubung ke server AI.', details: error.message }); // Sertakan detail error
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.use((req, res) => {
    res.status(404).send("Sorry, that route doesn't exist!");
});

const host = '0.0.0.0';
app.listen(port, host, () => {
    console.log(`Server berjalan di http://${host}:${port}`);

    const ifaces = os.networkInterfaces();
    let internalIP = '';

    Object.keys(ifaces).forEach(function (ifname) {
        let alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                return;
            }

            if (alias >= 1) {
                console.log(ifname + '-' + alias, iface.address);
                internalIP = iface.address;
            } else {
                console.log(ifname, iface.address);
                internalIP = iface.address;
            }
            ++alias;
        });
    });

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            console.log(`Server juga dapat diakses melalui IP publik Anda: http://${data.ip}:${port}`);
            console.log(`Server juga dapat diakses melalui IP Lokal Anda: http://${internalIP}:${port}`);
        })
        .catch(error => console.error('Error fetching public IP:', error));
});
