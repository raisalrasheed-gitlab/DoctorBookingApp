const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const Admin = require('./db/models/admin-schema');
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('*', (req, res) => {
  res.status(404).json({ message: 'no route found' });
});
app.listen(8001, () => {
  console.log('app is running @ http://localhost:8001');
});
