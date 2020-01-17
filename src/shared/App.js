import React, { Component } from 'react';
import { fire } from 'shared/Firebase'
import NoteTemplate from '../components/NoteTemplate';
import Form from '../components/Form';
import NoteItemList from '../components/NoteItemList';
import { Route } from 'react-router-dom';
import { Home, About, Posts } from 'pages';
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
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route path="/about/:name" component={About}/>
            <Route path="/posts" component={Posts}/>
        </div>
            
        )
    }
}

export default App;