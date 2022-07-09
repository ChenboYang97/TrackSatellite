import logo from "../assets/images/logo_x_white.svg";
import React, { Component } from 'react';
import { TITLE } from "../constants";

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p className="title">
                    {TITLE}
                </p>
            </header>
        );
    }
}

export default Header;