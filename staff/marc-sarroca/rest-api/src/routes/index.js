
module.exports = {
    register: {
        post: require('./register/post')
    },

    authenticate: {
        post: require('./authenticate/post')
    },

    retrieve: {
        get: require('./retrieve/get')
    },

    notFound: {
        get: require('./not-found/get')
    },

    searchArtists: {
        get: require('./search-artists/get')
    },
    retrieveArtist: {
        get: require('./retrieve-artists/get')
    },
    retrieveAlbums: {
        get: require('./retrieve-albums/get')
    },
    retrieveAlbum: {
        get: require('./retrieve-album/get')
    },
    retrieveTracks: {
        get: require('./retrieve-tracks/get')
    },
    retrieveTrack: {
        get: require('./retrieve-track/get')
    }

}