'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import './index.sass'

function Nav(props) {

    const {toggleMenu, isLanding} = props

    let [menuDisplayer, setMenuDisplayer] = useState('nav__icon')

    function handleOnClick(){
        if (menuDisplayer==='nav__icon') {
            setMenuDisplayer('nav__icon open')
            toggleMenu(true)
        }
        else {
            setMenuDisplayer('nav__icon')
            toggleMenu(false)
        }
    }

    function handleLogin(){
        props.history.push('/login')
    }

    function handleRegister(){
        props.history.push('/register')
    }

    let navClass = isLanding? 'navbar nav nav-landing': 'navbar nav'
    return (
        <nav className={navClass}>
            <div className={menuDisplayer} onClick={()=>handleOnClick()}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
        </nav>)
}

export default withRouter(Nav)