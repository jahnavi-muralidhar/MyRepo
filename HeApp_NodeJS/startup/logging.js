const winston = require('winston');
module.exports = function() {
    winston.handleExceptions(
        new winston.transports.File( { filename : 'uncaughtExceptions.log' })
    )
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
}
