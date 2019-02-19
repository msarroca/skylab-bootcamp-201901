const logic = require('../../logic')

module.exports = (req, res) => {
    const { headers: { authorization }, params: { id } } = req
    const token = authorization.split(' ')[1]

    console.log(token)

    try {
        logic.retrieveUser(id, token)
            .then((retriveUser) => res.send({ retriveUser }))
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(401).json({
            error: message
        })
    }
}