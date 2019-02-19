const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { albumId } } = req
    console.log(albumId)
    try {
        logic.retrieveTracks(albumId)
            .then((tracks) => res.send(tracks))
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