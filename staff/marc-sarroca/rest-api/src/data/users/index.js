'use strict'
const { MongoClient, ObjectId } = require('mongodb')
const user = {
    collection: null,

    add(user) {
        // TODO validate user and its fields (type and content)

        return this.collection.insertOne(user)
            .then(res => res.insertedId.toString())
    },
    findEmail(userEmail) {
        return this.collection.findOne({ email: userEmail })

    },

    findId(userId) {
        return this.collection.findOne({ _id: ObjectId(userId.toString()) })

    },

    updateUser(userId, props) {
        return this.collection.findOneAndUpdate({ _id: ObjectId(userId.toString()) }, { $set: props })
    },

    deleteUser(userId) {

        return this.collection.deleteOne({ _id: ObjectId(userId.toString()) })
    }


    // cars.deleteOne({ model: 'Micra' })

}


// cars.findOneAndUpdate({ brand: 'Nissan', model: 'Micra', year: 2005 }, { $set: { year: 2002 } })
//     .then(console.log)


// cars.findOne({ brand: 'Nissan', model: 'Micra', year: 2006 })
//     .then(car => {
//         debugger

module.exports = user