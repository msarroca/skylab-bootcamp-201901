require('dotenv').config()

require('isomorphic-fetch')

const express = require('express')
const bodyParser = require('body-parser')
const { register, authenticate, retrieve, notFound, searchArtists, retrieveArtist, retrieveAlbums, retrieveAlbum, retrieveTracks, retrieveTrack } = require('./routes')
const { env: { PORT }, argv: [, , port = PORT || 8080] } = process
const app = express()
const jsonBodyParser = bodyParser.json()
const { SPOTIFY_API_TOKEN } = process.env
const spotifyApi = require('../src/spotify-api/index')
spotifyApi.token = SPOTIFY_API_TOKEN

app.post('/register', jsonBodyParser, register.post)
app.post('/authenticate', jsonBodyParser, authenticate.post)
app.get('/retrieve/:id', retrieve.get)
app.get('/search/:query', searchArtists.get)
app.get('/artist/:artistId', retrieveArtist.get)
app.get('/artist/:artistId/albums', retrieveAlbums.get)
app.get('/albums/:albumId', retrieveAlbum.get)
app.get('/albums/:albumId/tracks', retrieveTracks.get)
app.get('/tracks//:trackId', retrieveTrack.get)
app.get('*', notFound.get)

app.listen(port, () => console.log(`server running on port ${port}`))