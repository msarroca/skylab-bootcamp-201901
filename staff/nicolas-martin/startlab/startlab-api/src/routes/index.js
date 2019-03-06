module.exports = {

    // User API
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    isAdmin: require('./is-admin'),

    // CRUD exercise
    createExercise: require('./exercise/create'),
    retrieveExercise: require('./exercise/retrieve'),
    updateExercise: require('./exercise/update'),
    deleteExercise: require('./exercise/delete'),
    listExercises: require('./exercise/list'),

    getExercisesFromUser: require('./get-exercises-from-user'),

    // Code sanity
    checkCode: require('./check-code'),

    notFound: require('./not-found')
}