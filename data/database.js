const dotenv = require('dotenv');
dotenv.config();

const dns = require('dns');
const MongoClient = require('mongodb').MongoClient;
let database; 
const initDb = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }
    dns.setServers([process.env.DNS_SERVER || '8.8.8.8']);
    MongoClient.connect(process.env.MONGODB)
        .then((client) => {
            database = client; 
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized!');
    }
    return database;};

    module.exports = {
        initDb,
        getDatabase,
    };