import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Header extends Component {
    render() {
        return (
            <div className="App__header">
                <h1>
                    <Link to="/">Noteful</Link>{' '}
                    </h1>

            </div>)
    }
}

export default Header;