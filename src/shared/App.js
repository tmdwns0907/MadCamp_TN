import React, { Component } from 'react';
import { fire } from 'shared/Firebase'
import { Route } from 'react-router-dom';
import { StickyList, StickyNote } from 'pages';
import Menu from 'components/js/Menu';

class App extends Component {
    constructor() {
        super();
        fire();
    }
    
    render() {
        return (
            <div>
            <Menu />
            <Route exact path="/" component={StickyList} />
            <Route exact path="/sticky-note" component={StickyNote} />
        </div>
            
        )
    }
}

export default App;