const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4000;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/authenticate', async (req, res) => {
  const { code } = req.body;
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }, {
      headers: {
        'Accept': 'application/json'
      }
    });

    res.json({ access_token: response.data.access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log('Server is running on http://localhost:4000');
});
