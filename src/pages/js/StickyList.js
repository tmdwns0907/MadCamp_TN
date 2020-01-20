import React, { Component } from 'react';

import NoteTemplate from '../../components/js/NoteTemplate';
import NoteItemList from '../../components/js/NoteItemList';
import Form from '../../components/js/Form';
import StickyNote from './StickyNote';

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


        chrome.runtime.sendMessage({ action: "add-note" }, res => {
            console.log(res.success);
            alert(res.success);
        })




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
            <StickyNote></StickyNote>
            </div>
        )
    }
};

export default StickyList;