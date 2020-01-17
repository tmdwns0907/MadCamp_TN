import React, { Component } from 'react';
import { fire } from 'shared/Firebase'
import NoteTemplate from '../components/NoteTemplate';
import Form from '../components/Form';
import NoteItemList from '../components/NoteItemList';
import { Route } from 'react-router-dom';
import { StickyList, StickyNote } from 'pages';
import Menu from 'components/Menu';

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