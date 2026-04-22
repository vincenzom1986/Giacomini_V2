const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_SOURCE = process.env.BRANDWATCH_API || 'https://giacominipercezione-production.up.railway.app/api/brandwatch';

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint per non avere CORS
app.get('/api/brandwatch', async (req, res) => {
  try {
    const response = await fetch(API_SOURCE);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.json({
      mock: true,
      data: {
        totalMentions: 10,
        sentiment: { positive: 30, neutral: 70, negative: 0 },
        sov: [
          { brand: 'Giacomini', share: 22 },
          { brand: 'Caleffi', share: 35 },
          { brand: 'Ivar', share: 18 },
          { brand: 'FAR Rubinetterie', share: 15 },
          { brand: 'RBM', share: 10 }
        ],
        recentPosts: []
      }
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Giacomini V2 running on ${PORT}`));
