import React, { Component } from 'react';
import { fire } from '../shared/Firebase'
import { Route, Switch } from 'react-router-dom';
import { StickyList, StickyNote } from '../pages';
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
                <Switch>
                    <Route path="/sticky-note" component={StickyNote} />
                    <Route path="/" component={StickyList} />
                </Switch>
            </div>

        )
    }
}

export default App;