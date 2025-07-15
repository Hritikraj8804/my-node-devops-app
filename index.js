const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from my Node.js DevOps App!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});