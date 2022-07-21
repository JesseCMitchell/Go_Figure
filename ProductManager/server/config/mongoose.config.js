/** @format */

const mongoose = require('mongoose');
const db_name = 'productsdb';
mongoose
	.connect(process.env.cloud_uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Database connection established'))
	.catch(err => console.log('There was an error', err));
