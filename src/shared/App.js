import React, { Component } from 'react';
import { fire } from 'shared/Firebase'

class App extends Component {
    constructor() {
        super();
        fire();
    }
    
    render() {
        return (
            <div>
                Hello React-Router
            </div>
        );
    }
}

export default App;