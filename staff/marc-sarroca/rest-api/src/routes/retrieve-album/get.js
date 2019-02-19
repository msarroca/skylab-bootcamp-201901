const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { albumId } } = req
    console.log(albumId)
    try {
        logic.retrieveAlbum(albumId)
            .then((album) => res.send(album))
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