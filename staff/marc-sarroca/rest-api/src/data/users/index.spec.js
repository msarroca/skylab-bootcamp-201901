'use strict'

require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb')
const users = require('.')
const { expect } = require('chai')

const { env: { DB_URL } } = process

describe('user', () => {
    let client

    before(() =>
        MongoClient.connect(DB_URL, { useNewUrlParser: true })
            .then(_client => {
                client = _client
                users.collection = client.db().collection('users')
            })
    )

    beforeEach(() => users.collection.deleteMany())

    describe('add', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        it('should succeed on correct data', () =>
            users.add(_user)
                .then(id => {
                    expect(id).to.exist
                    expect(id).to.be.a('string')

                    return users.collection.findOne({ _id: ObjectId(id) })
                })
                .then(({ name, surname, email, password }) => {
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
        )
    })

    describe('find', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        it('should succeed on correct find data', () =>
            users.collection.insertOne(_user)
                .then(() => users.findEmail(_user.email))

                .then(({ name, surname, email, password }) => {

                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                }))
    })

    describe('update', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }
        const data = { name: 'Mamahueco' }
        let __id

        beforeEach(() =>
            users.collection.insertOne(_user)
                .then(res => __id = res.insertedId.toString())
        )
        it('should succeed on correct update data', () =>
            users.updateUser(__id, data)
                .then(() => users.collection.findOne({ _id: ObjectId(__id.toString()) }))
                .then(({ name, surname, email, password }) => {
                    expect(name).to.equal(data.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                }))
    })

    describe('delete', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }
        let __id

        beforeEach(() =>
            users.collection.insertOne(_user)
                .then(res => __id = res.insertedId.toString())
        )
        it('should succeed on correct delete user', () =>
            users.deleteUser(__id)
                .then(() => users.collection.findOne({ _id: ObjectId(__id.toString()) }))
                .then(user => {
                    expect(user).to.equal(null)
                }))
    })



    after(() =>
        users.collection.deleteMany()
            .then(() => client.close())
    )
})