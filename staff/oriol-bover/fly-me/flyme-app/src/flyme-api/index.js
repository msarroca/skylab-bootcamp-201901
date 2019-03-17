const flymeApi = {
    url: 'http://localhost:8000/api',

    registerUser(name, surname, email, password, passwordConfirm) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name is empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw Error('surname is empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(`${passwordConfirm} is not a string`)
        if (!passwordConfirm.trim().length) throw Error('password confirm is empty')

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(res => res)
    },

    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch(`${this.url}/user/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(res => res)
    },

    retrieveUser(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/user`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => res)
    },

    updateUser(token, data) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/user/update`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => res)
    },

    updateUserImage(token, image) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (!image) throw Error('image is empty')
        // if (image.constructor !== Object) throw TypeError(`${image} is not an object`)

        let formData = new FormData()
        formData.append('image', image)

        return fetch(`${this.url}/user/photo`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })

    },

    startDrone(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        //TODO droneId
        const droneId = '5c80f001cdda345041068f1c'

        return fetch(`${this.url}/drone/start`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ droneId })
        })
            .then(res => res.json())
            .then(res => res)
    },

    stopDrone(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        //TODO droneId
        const droneId = '5c80f001cdda345041068f1c'

        return fetch(`${this.url}/drone/stop`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ droneId })
        })
            .then(res => res.json())
            .then(res => res)
    },


    getHistory(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        //TODO droneId
        const droneId = '5c80f001cdda345041068f1c'

        return fetch(`${this.url}/drone/history`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ droneId })
        })
            .then(res => res.json())
            .then(res => res)

    },

    sendCommand(token, command) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof command !== 'string') throw TypeError(`${command} is not a string`)
        if (!command.trim().length) throw Error('command is empty')

        //TODO droneId
        const droneId = '5c80f001cdda345041068f1c'

        return fetch(`${this.url}/drone/command`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ droneId, command })
        })
            .then(res => res.json())
            .then(res => res)
    },

    addDrone(token, data) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/drone`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => res)
    },

    retrieveDrone(token, droneId) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof droneId !== 'string') throw TypeError(`${droneId} is not a string`)
        if (!droneId.trim().length) throw Error('droneId is empty')

        return fetch(`${this.url}/drone/${droneId}`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => res)
    },

    retrieveDronesFromUser(token, userId) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return fetch(`${this.url}/user/${userId}/drones`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => res)
    },

    updateDrone(token, data) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/drone/update`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => res)
    },

    deleteDrone(token, droneId) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof droneId !== 'string') throw TypeError(`${droneId} is not a string`)
        if (!droneId.trim().length) throw Error('droneId is empty')

        return fetch(`${this.url}/drone`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ droneId })
        })
            .then(res => res.json())
            .then(res => res)
    },

    createProgram(token, name, orders) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name is empty')

        if (orders.length == 0) throw Error('orders are empty')

        return fetch(`${this.url}/program`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, orders })
        })
            .then(res => res.json())
            .then(res => res)
    },

    retrieveAllFlights(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/flights`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => res)
    },

    retrieveFlightsFromUser(token, userId) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return fetch(`${this.url}/user/${userId}/flights`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => res)
    },

    retrieveFlight(token, flightId) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof flightId !== 'string') throw TypeError(`${flightId} is not a string`)
        if (!flightId.trim().length) throw Error('flightId is empty')

        return fetch(`${this.url}/flight/${flightId}`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => res)
    },

    sendEmail(token, data) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/sendemail`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => res)
    }
}

export default flymeApi