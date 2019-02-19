const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { trackId } } = req
    try {
        logic.retrieveTrack(trackId)
            .then((track) => res.send(track))
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