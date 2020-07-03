const error = require('./middleware/error');
const authorizeMiddleware = require('./middleware/auth');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const express = require('express');
const config = require('config');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

if (!config.get('jwtSecretKey')) {
  console.error('FATAL ERROR! No secret key defined.');
  console.log(process.env);
  process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));