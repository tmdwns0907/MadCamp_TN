import React, { Component } from 'react';

import NoteTemplate from '../../components/js/NoteTemplate';
import NoteItemList from '../../components/js/NoteItemList';
import Form from '../../components/js/Form';

class StickyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            notes: [
                { id: 0, text: ' 리액트 소개', url: '', checked: false },
                { id: 1, text: ' 리액트 소개', url: '', checked: true },
                { id: 2, text: ' 리액트 소개', url: '', checked: false },
            ]
        }
    }
    id = 3;


    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }

    handleCreate = () => {
        const { input, notes, url } = this.state;
        this.setState({
            input: '',
            notes: notes.concat({
                id: this.id++,
                text: input,
                url: '',
                checked: false
            })
        });

        chrome.windows.create({ url: 'https://madcamp-tn.firebaseapp.com/sticky-note', type: 'popup', width: 320, height: 320 });
        //chrome.windows.create({ url: `${index}/sticky-note`, type: 'popup', width: 320, height: 320 });
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
            checked: !selected.checked
        };

        this.setState({ notes: nextNotes });
    }

    handleRemove = (id) => {
        const { notes } = this.state;
        this.setState({ notes: notes.filter(note => note.id !== id) });
    }

    render() {
        const { input, url, notes } = this.state;
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
                    input={input}
                    url={url}
                    onKeyPress={handleKeyPress}
                    onChange={handleChange}
                    onCreate={handleCreate} />
            )}>
                <NoteItemList notes={notes} onToggle={handleToggle} onRemove={handleRemove} />
            </NoteTemplate>
        )
    }
};

export default StickyList;