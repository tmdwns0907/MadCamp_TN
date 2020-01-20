import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StickyNoteItem from '../pages/js/StickyNoteItem';


/*
chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(message => {
        console.log("hihi");

        if (message.action == "add-note") {
            chrome.tabs.executeScript({ file: 'StickyNoteItem.bundle.js' });
            port.postMessage({ success: true });
        }
    });
});
*/

/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("hihi");
    console.log(sender.tab);
    //console.log(request);

    if (request.action == "add-note") {
        //chrome.tabs.executeScript({ file: 'StickyNoteItem.bundle.js' });
        sendResponse({ success: true });
    }
});
*/
/*
chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(message => {
        console.log("hihi");
        console.log(message);

        if (port.name == "connect") {
            if (message.action == "add-note") {
                const stickyNote = document.createElement('div');
                stickyNote.id = "stickyNote";
                document.body.appendChild(stickyNote);
                ReactDOM.render(<StickyNoteItem />, stickyNote);

                port.postMessage({ success: true });
            }
        }
    });
});
*/


/*
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('aslkdfjlkasjdf')
    alert(';asldkf;asldkf;asldfk;')
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.greeting == "hello")
        sendResponse({ farewell: "goodbye" });
});

*/

/*
var port = chrome.runtime.connect({ name: "connect" });

port.onMessage.addListener(function (message, sender) {
    if (message.action === "add-note") {
        console.log('123123');
        alert(message.action);

        port.postMessage({ success: true });

        const stickyNote = document.createElement('div');
        stickyNote.id = "stickyNote";
        document.body.appendChild(stickyNote);
        ReactDOM.render(<StickyNoteItem />, stickyNote);

    }
    return true;
});
*/

/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("hihi");
    console.log(sender.tab);

    if (request.action == "add-note") {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs.length === 0) {
                //sendResponse({});
            }

            console.log(tabs);
            setTimeout(() => {
                sendResponse({ success: true });
            }, 2000);
            return true;
        });
    }
    return true;
});
*/

// content - add note
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("hihihihihihi");
    console.log(request.action);
    /*
    if (request.action == "add-note-content") {
        const stickyNote = document.createElement('div');
        stickyNote.id = "stickyNote";
        document.body.appendChild(stickyNote);
        ReactDOM.render(<StickyNoteItem />, stickyNote);

        sendResponse({ success: true });

        return true;
    }*/
    return true;
});
