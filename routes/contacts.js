const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let contacts;

const initDb = (callback) => {
    if (contacts) {
        console.log('Db is already initialized!');
        return callback(null, contacts);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            contacts = client;
            callback(null, contacts);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!contacts) {
        throw Error('Db has not been initialized.')
    }
    return contacts;
};

module.exports = {
    initDb,
    getDatabase,
};