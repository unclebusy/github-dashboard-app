const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/auth/github', async (req, res) => {
  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', null, {
      params: {
        client_id: "Ov23liNCaE4oo7EGfH0D",
        client_secret: "ae7b456cf7629400bffa72d0a1c451c6c77c21a8",
        code: req.query.code,
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

