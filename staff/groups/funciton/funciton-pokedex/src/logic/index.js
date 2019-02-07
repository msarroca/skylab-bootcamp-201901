

import pokemonApi from '../apipokemon'
import userApi from '../user-api'
/**
 * Abstraction of business logic.
 */
const logic = {
    //Pokemon Side
    retrievePokemon(query) {

        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')

        return pokemonApi.searchPokemonByName(query)
    },

    retrieveAllPokemons() {

        if (arguments.length !== 0) throw Error('Too many args')
        return pokemonApi.searchAllPokemons()
    },


    // __userId__: null,
    // __userApiToken__: null,

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(email, username, password, passwordConfirmation) {
        if (typeof username !== 'string') throw TypeError(username + ' is not a string')

        if (!username.trim().length) throw Error('username cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return userApi.register(email, username, password, passwordConfirmation)
            .then(() => { })
    },

    /**
     * Logins a user by its credentials.
     * 
     * @param {string} username 
     * @param {string} password 
     */
    loginUser(user, password) {
        if (typeof user !== 'string') throw TypeError(user + ' is not a string')

        if (!user.trim().length) throw Error('user cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticate(user, password)
            .then(({ id, token }) => {
                this.__userId__ = id
                this.__userApiToken__ = token
                return ({ id, token, user })
            })
    },


    toggleFavorite(id, token, pokemonName) {

        if (typeof id !== 'string') throw TypeError(id + ' is not a string');

        if (!id.trim().length) throw Error('id cannot be empty');

        if (typeof token !== 'string') throw TypeError(token + ' is not a string');

        if (!token.trim().length) throw Error('token cannot be empty');

        if (typeof pokemonName !== 'string') throw TypeError(pokemonName + ' is not a string');

        if (!pokemonName.trim().length) throw Error('pokemonName cannot be empty');


        return userApi.retrieve(id, token)
            .then((data) => {
                let favorites = data.favorites
                if (!favorites || !favorites.length) { //Caso sin favoritos o que el usuario los haya borrado todos
                    //En este caso creamos el array de favoritos, con el primer elemento el favorito clickado
                    // favorites = JSON.parse(JSON.stringify(([pokemonName])))

                    favorites = {
                        'favorites': [pokemonName]
                    }
                    return userApi.update(id, token, favorites)
                        .then(() => true)
                } else {
                    //Si favoritos existe, hay dos opciones, que exista o no
                    if (favorites.includes(pokemonName)) {
                        //Quitarlo de favoritos
                        let index = favorites.indexOf(pokemonName)
                        favorites.splice(index, 1)

                        let favorites2 = {
                            'favorites': favorites
                        }
                        return userApi.update(id, token, favorites2)
                            .then(() => true)
                    } else {
                        favorites.push(pokemonName)
                        let favorites2 = {
                            'favorites': favorites
                        }

                        return userApi.update(id, token, favorites2)
                            .then(() => true)
                        //añadirlo al array de favoritos al final
                    }
                }
            })
    },

    getFavorites(id, token) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string');

        if (!id.trim().length) throw Error('id cannot be empty');

        if (typeof token !== 'string') throw TypeError(token + ' is not a string');

        if (!token.trim().length) throw Error('token cannot be empty');

        return userApi.retrieve(id, token)
            .then(({ favorites }) => {
                if (!favorites || favorites.length == 0) {
                    return null
                } else {
                    return favorites //Devuelve un array de pokemons({name})
                }
            })
    },
}

export default logic