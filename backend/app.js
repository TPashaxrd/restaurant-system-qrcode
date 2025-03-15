const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); 
const path = require('path');

const app = express();
const port = 5000;

const messagesFilePath = path.join(__dirname, 'messages.json');

app.use(cors());
app.use(bodyParser.json());

app.get('/api/messages', (req, res) => {
  fs.readFile(messagesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Mesajlar alınırken bir hata oluştu.' });
    }

    const messages = JSON.parse(data || '[]'); 
    res.json(messages);
  });
});

app.post('/api/messages', (req, res) => {
  const { username, gender, message } = req.body;

  if (!username || !gender || !message) {
    return res.status(400).json({ error: "Eksik veri" });
  }

  const newMessage = {
    id: Date.now(), 
    username,
    gender,
    message,
    timestamp: new Date().toISOString(),
  };

  fs.readFile(messagesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Mesajlar kaydedilirken bir hata oluştu.' });
    }

    const messages = JSON.parse(data || '[]');
    messages.push(newMessage);

    fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Mesaj dosyasına yazılırken bir hata oluştu.' });
      }
      res.status(201).json({ message: "Mesaj başarıyla gönderildi", newMessage });
    });
  });
});

app.listen(port, () => {
  console.log(`Server at working http://localhost:${port}`);
});