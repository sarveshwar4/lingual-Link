const mongosse = require('mongoose');
const { MONGO_URI } = require('../config/serverConfig');
const connectToDatabase = async () => {
    try{
       const connect = await mongosse.connect(MONGO_URI);
       return connect;
    }
    catch(error){

    }
}
module.exports = connectToDatabase;