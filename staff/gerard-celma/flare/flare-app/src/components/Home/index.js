'use strict'

import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
import Navigator from '../Navigator';
import MessagesSent from '../MessagesSent'

class Home extends Component {

    render() {
        const { showSearch } = this

        return <section className="home">
            <p>Welcome Home</p>

            <Navigator />
            <MessagesSent />
        </section>
    }
}

export default withRouter(Home)