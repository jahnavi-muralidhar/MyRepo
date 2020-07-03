const winston = require('winston');
const logger = winston.createLogger({
    transports: [ new winston.transports.Console, {}]
    //transports: [ new winston.transports.File, { filename:'filelog.log' }]
  });

module.exports = function(err, req, res, next){
    logger.log(err.message, err);
    res.status(500).send('Something failed');
}