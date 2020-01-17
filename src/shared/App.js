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

        this.state = {
            input: '',
            notes: [],
        }
    }
    id = 0;

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }

    // add
    handleCreate = () => {
        const { input, notes } = this.state;
        this.setState({
            input: '',
            notes: notes.concat({
                id: this.id++,
                text: input,
                checked: false,
            })
        });
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter')
            this.handleCreate();
    }

    handleToggle = (id) => {
        const { notes } = this.state;

        const index = notes.findIndex(note => note.id === id);
        const selected = notes[index];

        const nextNotes = [...notes];

        nextNotes[index] = {
            ...selected,
            checked: !selected.checked,
        };

        this.setState({ notes: nextNotes });
    }

    handleRemove = (id) => {
        const { notes } = this.state;
        this.setState({ notes: notes.filter(note => note.id !== id) });
    }

    render() {
        const { input, notes } = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove
        } = this;
        return (
            <NoteTemplate form={(
                <Form
                    value={input}
                    onKeyPress={handleKeyPress}
                    onChange={handleChange}
                    onCreate={handleCreate} />
            )}>
                <NoteItemList notes={notes} onToggle={handleToggle} onRemove={handleRemove} />
            </NoteTemplate>
        )
    }
    //render() {
    /*
    return (
        <div>
            <Menu />
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route path="/about/:name" component={About}/>
            <Route path="/posts" component={Posts}/>
        </div>
    );
    */
    //}
}

export default App;