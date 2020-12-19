var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//var db_url = process.env.MONGODB_URI || "mongodb+srv://shiqi:lsq20111993@cluster0.kgtgi.mongodb.net/cs5500?retryWrites=true&w=majority";//mongodb://localhost:27017/restaurant";
//var client = mongoose.connect(db_url, { useNewUrlParser: true });

//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;

