const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { name, surname, email, password, passwordConfirm } } = req


    try {
        logic.registerUser(name, surname, email, password, passwordConfirm)
            //then(res => res.json(res))
            .then(() => res.send({ status: 'usuario registrado' }))
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