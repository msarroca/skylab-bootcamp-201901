const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { query } } = req

    console.log(query)

    try {
        logic.searchArtists(query)
            .then((artists) => res.send({ artists }))
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