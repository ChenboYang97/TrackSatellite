import React, { Component } from 'react';
import { FOOTER } from '../constants';

class Footer extends Component {
    render() { 
        return (
            <footer className='footer'>
                {FOOTER}
            </footer>
        );
    }
}
 
export default Footer;