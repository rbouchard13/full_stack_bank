const MongoClient = require('mongodb').MongoClient;
const url = 
let db = null;

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    console.log("Connected successfully to db server");
    db = client.db('myproject');
});


function create(name, email, password) {
        var actNum;
        return new Promise((resolve,reject) => {
            const collection = db.collection('users');
            collection.find({}).toArray(function(err, docs) {
                err ? reject(err) : resolve(docs); 
                acct = Number(1000000 + (docs.length +1));
                const doc = {acct: acct,name,email: email.toLowerCase(),password,balance: 100};
                collection.insertOne(doc, {w:1}, function(err,result) {
                    err ? reject(err) : resolve(doc);
                    updateHist({name, email: email.toLowerCase(), acct},"Create Account",100)
                });
            });
        })
}

function updateHist(user,action,amount) {
    return new Promise((resolve,reject) => {
        const actcol = db.collection('account_history');
        const actlog = {acct: user.acct, name: user.name, Transaction: action,balance: amount,email: user.email.toLowerCase(), date: new Date().toString()}
        actcol.insertOne(actlog, {w:1}, function(err,result) {
            err ? reject(err) : resolve(actlog);
        });
    });  
}

function find(email) {
    return new Promise((resolve, reject) => {
        const customers = db.collection('users')
            .find({ email: email.toLowerCase() })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}


function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

function update(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email.toLowerCase() },
                { $set: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
    });
}

function all() {
        return new Promise((resolve,reject) => {
            const customers = db
                .collection('account_history')
                .find({})
                .toArray(function(err, docs) {
                    err ? reject(err) : resolve(docs);
                });
        })
}

module.exports = { create, findOne, find, update, all, updateHist };