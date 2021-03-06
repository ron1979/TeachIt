const DBService = require('./DBService')
const mongo = require('mongodb');

function query(criteria = {}) {
    // criteria.name = {$regex : `.*${criteria.name}.*`};
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('user').find(criteria).toArray((err, users) => {
                    if (err) return reject(err);
                    delete users.password
                    resolve(users);
                })
            })

    });
}

function add(user) {
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('user').insert(user, (err, res) => {
                    if (err) return reject(err);
                    resolve(res.ops);
                    db.close();
                })
            })
    });
}

function remove(userId) {
    console.log(userId); 
    var userIdObj = mongo.ObjectID(userId);
    console.log(userIdObj);
    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('user').deleteOne({_id: userIdObj}, function (err, res) {
                if (err)    reject(err)
                else        resolve();
                db.close();
            });
        })
    });
}

function update(user) {
    user._id = new mongo.ObjectID(user._id);

    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            // db.collection('user').updateOne({_id : user._id}, user, function (err, updatedUser) {
            db.collection('user').findOneAndUpdate({_id : user._id}, user, {
                returnOriginal: false
            },  function (err, updatedUser) {
                if (err)    reject(err)
                else        resolve(updatedUser);
                db.close();
            });
        })
    });
}

function getById(userId) {
    userId = new mongo.ObjectID(userId);
    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('user').findOne({_id: userId}, function (err, user) {
                if (err)    reject(err)
                else        resolve(user);
                db.close();
            });
        })
    });
}

module.exports = {
    query,
    add,
    remove,
    update,
    getById
}