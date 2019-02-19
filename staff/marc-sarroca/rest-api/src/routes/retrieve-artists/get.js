const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { artistId } } = req

    try {
        logic.retrieveArtist(artistId)
            .then((artist) => res.send(artist))
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