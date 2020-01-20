import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StickyNoteItem from '../pages/js/StickyNoteItem';

// login
/*
chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: 'index.html' });
});
*/



// recognize focus change
chrome.windows.onFocusChanged.addListener(winId => {
    chrome.tabs.query({ 'windowId': winId, 'active': true }, tabs => {
        if (tabs.length != 'undefined' && tabs.length == 1)
            var currentURL = tabs[0].url;

        if (typeof currentURL != 'undefined')
            console.log(currentURL);
    })
}, {
    windowTypes: ['normal'],
});


//background -> content injection
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete') {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            console.log("hihi");
            console.log(request.action);

            if (request.action == "add-note") {
                sendResponse({ success: true });

                chrome.tabs.executeScript({ file: 'StickyNoteItem.bundle.js' });
                return true;
            }
            return true;
        });
    }
})

// recognize removed note
/*
chrome.windows.onRemoved.addListener(winId => {
    chrome.tabs.query({ 'windowId': winId, 'windowType': 'popup' }, tabs => {
        if (tabs.length != 'undefined' && tabs.length == 1)
            var removedURL = tabs[0].url;
        chrome.runtime.sendMessage({ url: removedURL }, res => { })
    })
});
*/

// add note
/*
chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(message => {
        console.log("hihi");
        console.log(message);

        if (port.name == "connect") {
            if (message.action == "add-note") {
                chrome.tabs.executeScript({ file: 'StickyNoteItem.bundle.js', runAt: 'document_end' }, () => {
                    const stickyNote = document.createElement('div');
                    stickyNote.id = "stickyNote";
                    document.body.appendChild(stickyNote);
                    ReactDOM.render(<StickyNoteItem />, stickyNote);
                });
                port.postMessage({ success: true });
            }
        }
    });
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
                return;
            }

            console.log(tabs);
            chrome.tabs.executeScript({ file: 'StickyNoteItem.bundle.js' }, () => {
                const stickyNote = document.createElement('div');
                stickyNote.id = "stickyNote";
                document.body.appendChild(stickyNote);
                ReactDOM.render(<StickyNoteItem />, stickyNote);
            });
            //sendResponse({ success: true });
        });
    }
    return true;
});
*/

/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("hihi");
    console.log(sender.tab);

    if (request.action == "add-note") {
        chrome.tabs.executeScript({ file: 'StickyNoteItem.bundle.js' });
        //sendResponse({ success: true });
    }
});
*/

/*
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            alert(47654765756);
            chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
                alert(123123123);
                console.log(response.farewell);
            });
        });
    }
});
*/
/*
chrome.runtime.onConnect.addListener(function (port) {
    console.log('asdfasdfasdfasdf')
    port.postMessage({ action: "add-note" });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs[0].id);
    });
});
*/

/*
chrome.runtime.onConnect.addListener(port => {
    console.log('connected ', port);

    if (port.name === 'connect') {
        port.onMessage.addListener(message => {
            console.log('hihihihi');
        });
    }
});
*/

/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("hihi");
    console.log(request.action);

    if (request.action == "add-note") {
        sendResponse({ success: true });
        chrome.runtime.sendMessage({ action: "add-note-content" }, res => {
            //console.log(res.request);
            //console.log(res.sender);

            console.log(res.success);
            //alert(res.success);

        })

        return true;
    }
    return true;
});
*/