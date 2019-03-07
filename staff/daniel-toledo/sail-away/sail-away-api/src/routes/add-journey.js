const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { sea, route, dates, description } } = req
    debugger
    try {
        return logic.addJourney(sea, route, dates, description)
            .then(id => res.json({ id }))

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}