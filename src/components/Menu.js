import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    const activeStyle = {
        color: 'green',
        //fontSize: '2rem'
    };

    return (
        <div>
            <ul>
                <li><NavLink exact to="/" activeStyle={activeStyle}>StickyList</NavLink></li>
                <li><NavLink exact to="/sticky-note" activeStyle={activeStyle}>StickyNote</NavLink></li>
            </ul>
            <hr/>
        </div>
    );
};

export default Menu;