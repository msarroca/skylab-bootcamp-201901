const uuid = require('uuid/v4')
const fs = require('fs')
const util = require('util')
const database = __dirname + '/artist-comments.json'
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const artistComment = {
    "file": database,

    add(comment) {

        comment.id = uuid()
        return readFile(database, { encoding: 'utf-8' })
            .then(file => JSON.parse(file))
            .then(file => {
                file.push(comment)
                return file
            })
            .then(file => JSON.stringify(file))
            .then(file => writeFile(database, file)
                .catch(error => {
                    throw Error(error.message)
                }))
            .catch(error => {
                throw Error(error.message)
            })


    },


    retrieve(commentId) {
        return readFile(database, { encoding: 'utf-8' })
            .then(file => JSON.parse(file))
            .then(file => {
                const comment = file.find(comment => comment.id === commentId)
                if (comment === undefined) {
                    throw Error('comment not find')
                } else {
                    return comment
                }
            })
            .catch(error => {
                throw Error(error.message)
            })


    },

    update(comment) {
        const { id } = comment
        return readFile(database, { encoding: 'utf-8' })
            .then(file => JSON.parse(file))
            .then(file => {
                const commentIndex = file.findIndex(comment => comment.id === id)
                file[commentIndex] = comment
                return file
            })
            .then(file => JSON.stringify(file))
            .then(file => writeFile(database, file))
            .catch(error => {
                throw Error(error.message);
            })

    },


    delete(commentId) {
        return readFile(database, { encoding: 'utf-8' })
            .then(file => JSON.parse(file))
            .then(file => {
                const commentIndex = file.findIndex(comment => comment.id === commentId)
                if (commentIndex === -1) {
                    throw Error('comment not find')
                } else {
                    file.splice(commentIndex, 1)
                    return file
                }
            })
            .then(file => JSON.stringify(file))
            .then(file => writeFile(database, file))
            .catch(error => {
                throw Error(error.message);
            })
    },


}

module.exports = artistComment