import React, { Component } from 'react';

import NoteTemplate from '../../components/js/NoteTemplate';
import NoteItemList from '../../components/js/NoteItemList';
import Form from '../../components/js/Form';

class StickyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: 'Add your Note!',
            url: '',
            notes: [],
        }
    }

    componentDidMount() {
        chrome.runtime.sendMessage({ action: "get-user-info" }, res => {
            //this.changeState(res.state);
            alert(res.success);
        })

        chrome.runtime.sendMessage({ action: "load-notes" }, res => {
            console.log()
            this.setState({ notes: res.note_list });
        })

        // add when right click
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            switch (request.action) {
                case 'add-note-right':
                    sendResponse({ success: true });
                    this.setState({
                        input: 'Add your Note!',
                        notes: this.state.notes.concat({
                            id: this.id++,
                            text: input,
                            url: request.url,
                            checked: false
                        })
                    });
                    return true;

                case 'change-note-list':
                    sendResponse({ success: 'change note!!!' });
                    this.setState({
                        notes: this.state.notes.map(note => {
                            if (note.id === request.id) {
                                return ({
                                    ...note,
                                    text: request.text,
                                });
                            }
                            else {
                                return note;
                            }
                        })
                    })
                    return true;
            }
            return true;
        })
    }

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }

    handleCreate = () => {
        const { input, notes } = this.state;

        // popup -> background
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.runtime.sendMessage({ action: "add-note", url: tabs[0].url, text: this.state.input }, res => {
                this.setState({
                    input: 'Add your Note!',
                    notes: notes.concat({
                        id: res.id,
                        text: input,
                        url: tabs[0].url,
                        checked: false
                    })
                });
            })
        })
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

        //popup -> background
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.runtime.sendMessage({ action: "remove-note", id: id }, res => {
                this.setState({ notes: notes.filter(note => note.id !== id) });
                //alert(res.success);
            })
        })

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
            <div>
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
            </div>
        )
    }
};

export default StickyList;