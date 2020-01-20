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
            notes: [
                { id: 0, text: ' 리액트 소개', url: '', checked: false },
                { id: 1, text: ' 리액트 소개', url: '', checked: true },
                { id: 2, text: ' 리액트 소개', url: '', checked: false },
            ],
        }
    }
    id = 3;

    componentDidMount() {
        // add when right click
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action == 'add-note-right') {
                sendResponse({ success: true });
                this.setState({
                    input: 'Add your Note!',
                    notes: notes.concat({
                        id: this.id++,
                        text: input,
                        url: request.url,
                        checked: false
                    })
                });
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
            chrome.runtime.sendMessage({ action: "add-note", url: tabs[0].url }, res => {
                this.setState({
                    input: 'Add your Note!',
                    notes: notes.concat({
                        id: this.id++,
                        text: input,
                        url: tabs[0].url,
                        checked: false
                    })
                });
                alert(res.success);
            })
        })



        /*
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const port = chrome.tabs.connect(tabs[0].id, { name: "connect" });

            port.postMessage({ action: "add-note" });

            port.onMessage.addListener(res => {
                console.log(res.success);
            })
        });
        */

        /*
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            console.log(tabs[0]);
            alert(tabs[0].id);
            
            chrome.tabs.sendMessage(tabs[0].id, { action: "add-note" }, res => {
                //console.log(res.success);
            })
           
        });
        */

        /*
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            alert(47654765756);
            chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
                alert(123123123);
                console.log(response.farewell);
            });
        });
        */

        /*
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            alert(47654765756);
            chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
                alert(123123123);
                console.log(response.farewell);
            });
        });
        */
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
            chrome.runtime.sendMessage({ action: "remove-note", url: tabs[0].url }, res => {
                this.setState({ notes: notes.filter(note => note.id !== id) });
                alert(res.success);
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