const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { artistId } } = req
    try {
        logic.retrieveAlbums(artistId)
            .then((albums) => res.send(albums))
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