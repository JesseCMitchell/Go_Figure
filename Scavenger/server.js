const express = require('express');
const cors = require('cors');
const port = 8000;
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./server/config/mongoose.config');
require('./server/routes/item.routes')(app);

app.listen(port, () => console.log(`You are now listening to port: ${port}`));
