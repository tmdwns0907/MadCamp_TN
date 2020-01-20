import React, { Component } from 'react';
import { fire } from '../shared/Firebase'
import { Route, Switch } from 'react-router-dom';
import { StickyList, StickyNote } from '../pages/js';
//import Menu from '../components/js/Menu';
import * as Popup from '../middle/popup';

class App extends Component {
    constructor() {
        super();
        fire();
    }


    render() {
        return (
            <div>
                {
                    //<Menu />
                }


                <Route path="/" component={StickyList} />

            </div>

        )
    }
}

export default App;