const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;
const databaseName = new URL(process.env.MONGODB).pathname.slice(1);

const getAll = async (req, res) => {
    const contacts = await mongodb.getDatabase().db(databaseName).collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
};

const getSingle = async (req, res) => {
    const contact = await mongodb.getDatabase().db(databaseName).collection('contacts').findOne({ _id: new objectId(req.params.id) });
    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
};

module.exports = {
    getAll,
    getSingle,
};