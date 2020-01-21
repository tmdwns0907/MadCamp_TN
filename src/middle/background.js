// login


//contextMenu - right click
chrome.runtime.onInstalled.addListener(details => {
    chrome.contextMenus.create({ id: 'add-sticky-note', title: 'Add new Note' });
})


// background -> popup & content
chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId == 'add-sticky-note') {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs.length != 'undefined' && tabs.length == 1)
                var currentURL = tabs[0].url;

            if (typeof currentURL != 'undefined')
                console.log(currentURL);

            chrome.runtime.sendMessage({ action: 'add-note-right', url: currentURL }, res => {
                chrome.tabs.executeScript({ file: 'StickyNote.bundle.js' });
                chrome.tabs.insertCSS({ file: 'StickyNote.css' });

                chrome.storage.sync.get('maxID', id => {
                    // if empty
                    if (isNaN(parseInt(id))) {
                        chrome.storage.sync.set({ 'maxID': 0 }, () => {
                            sendResponse({ id: 0 });
                        });
                    }
                    else {
                        chrome.storage.sync.set({ 'maxID': id + 1 }, () => {
                            if (chrome.extension.lastError) {
                                alert('An error occurred: ' + chrome.extension.lastError.message);
                            }
                        })
                        sendResponse({ id: id + 1 });
                    }
                })

                chrome.storage.sync.get('Notes', items => {
                    var allKeys = Object.keys(items);
                    var list = [];
                    var parsedItems = Object.keys(items).map(key => items[key]);
                    var maxID = 0;

                    console.log(allKeys);
                    console.log(parsedItems[0]);

                    for (var key in parsedItems[0]) {
                        console.log(key, parsedItems[0][key]);
                        list.push({
                            id: key,
                            text: parsedItems[0][key].text,
                            url: parsedItems[0][key].url,
                            checked: false,
                        })
                    }

                    if (typeof parsedItems[0] !== 'undefined' && parsedItems[0].length > 0)
                        maxID = parsedItems[0].length.toString();

                    else maxID = 0;

                    list.push({
                        id: maxID,
                        text: 'Add you Note!',
                        url: currentURL,
                        checked: false
                    });

                    console.log(list);

                    chrome.storage.sync.set({ 'Notes': list }, () => {
                        if (chrome.extension.lastError) {
                            alert('An error occurred: ' + chrome.extension.lastError.message);
                        }
                    });
                })

                console.log(res.success);
            });

        })
    }
})


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

//login
// @corecode_begin getProtectedData
const STATE_START = 1;
const STATE_ACQUIRING_AUTHTOKEN = 2;
const STATE_AUTHTOKEN_ACQUIRED = 3;


chrome.storage.onChanged.addListener((changes, namespace) => {
    for (var key in changes) {
        var storageChange = changes[key];
        console.log(`Storage key ${key} in namespace ${namespace} changed. Old value was ${storageChange.oldValue}, new value is ${storageChange.newValue}.`);
    }
});

// background -> content
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("hihi");
    console.log(request.action);
    //console.log(request.url);

    switch (request.action) {
        case "add-note":
            chrome.tabs.executeScript({ file: 'StickyNote.bundle.js' });
            chrome.tabs.insertCSS({ file: 'StickyNote.css' });

            chrome.storage.sync.get('maxID', id => {
                // if empty
                if (isNaN(parseInt(id))) {
                    chrome.storage.sync.set({ 'maxID': 0 }, () => {
                        sendResponse({ id: 0 });
                    });
                }
                else {
                    chrome.storage.sync.set({ 'maxID': id + 1 }, () => {
                        if (chrome.extension.lastError) {
                            alert('An error occurred: ' + chrome.extension.lastError.message);
                        }
                    })
                    sendResponse({ id: id + 1 });
                }
            })

            chrome.storage.sync.get('Notes', items => {
                var allKeys = Object.keys(items);
                var list = [];
                var parsedItems = Object.keys(items).map(key => items[key]);
                var maxID = 0;

                console.log(allKeys);
                console.log(parsedItems[0]);

                for (var key in parsedItems[0]) {
                    console.log(key, parsedItems[0][key]);
                    list.push({
                        id: key,
                        text: parsedItems[0][key].text,
                        url: parsedItems[0][key].url,
                        checked: false,
                    })
                }

                if (typeof parsedItems[0] !== 'undefined' && parsedItems[0].length > 0)
                    maxID = parsedItems[0].length.toString();

                else maxID = 0;

                list.push({
                    id: maxID,
                    text: request.text,
                    url: request.url,
                    checked: false
                });

                console.log(list);

                chrome.storage.sync.set({ 'Notes': list }, () => {
                    if (chrome.extension.lastError) {
                        alert('An error occurred: ' + chrome.extension.lastError.message);
                    }
                });
            })
            return true;

        case "remove-note":
            sendResponse({ success: true });
            chrome.tabs.executeScript({ file: 'removeStickyNote.bundle.js' });

            chrome.storage.sync.get('Notes', items => {
                var NoteList = Object.keys(items).map(key => items[key])[0];
                console.log(NoteList);

                NoteList = NoteList.filter(it => it.id !== request.id);

                console.log(NoteList);

                chrome.storage.sync.set({ 'Notes': NoteList }, () => { })
            })

            chrome.storage.sync.get('maxID', id => {
                console.log(id);

                chrome.storage.sync.set({ 'maxID': id - 1 }, () => {
                    if (chrome.extension.lastError) {
                        alert('An error occurred: ' + chrome.extension.lastError.message);
                    }
                })
            })
            return true;

        case "remove-note-content":
            return true;


        case "change-note":
            chrome.storage.sync.get(request.id, item => {
                const change = {
                    text: request.text,
                };
                /*
                chrome.storage.sync.set({ maxID: id - 1 }, () => {
                    if (chrome.extension.lastError) {
                        alert('An error occurred: ' + chrome.extension.lastError.message);
                    }
                })
                */
            })

            chrome.runtime.sendMessage({ action: "change-note-list", text: request.text, id: request.id }, res => {
                console.log(res.success);
            })
            return true;

        case "load-notes":
            chrome.storage.sync.get('Notes', (items) => {
                var list = [];
                var parsedItems = Object.keys(items).map(key => items[key]);

                console.log(parsedItems);

                for (var key in parsedItems[0]) {
                    console.log(key, parsedItems[0][key]);
                    list.push({
                        id: key,
                        text: parsedItems[0][key].text,
                        url: parsedItems[0][key].url,
                        checked: false,
                    })
                }

                console.log(list);

                chrome.storage.sync.get('maxID', id => {
                    // if empty
                    if (isNaN(parseInt(id))) {
                        chrome.storage.sync.set({ 'maxID': 0 }, maxID => {
                            sendResponse({ maxID: maxID, note_list: list });
                        })
                    }
                    else sendResponse({ maxID: id, note_list: list });
                })
            });

            return true;

        case "sign-in":
            sendResponse({ state: STATE_ACQUIRING_AUTHTOKEN });
            chrome.identity.getAuthToken({ interactive: true }, token => {
                if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError);
                    sendResponse({ state: STATE_START });
                } else {
                    console.log(`Token acquired: ${token}. See chrome://identity-internals for details.`);
                    sendResponse({ state: STATE_AUTHTOKEN_ACQUIRED });
                }
            });
            // @corecode_end getAuthToken
            return true;

        case "sign-out":
            //this.user_info_div.innerHTML = "";
            chrome.identity.getAuthToken({ interactive: false }, current_token => {
                if (!chrome.runtime.lastError) {
                    // @corecode_begin removeAndRevokeAuthToken
                    // @corecode_begin removeCachedAuthToken
                    // Remove the local cached token
                    chrome.identity.removeCachedAuthToken({ token: current_token }, () => { });

                    console.log(current_token);
                    // @corecode_end removeCachedAuthToken

                    // Make a request to revoke token in the server
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', `https://accounts.google.com/o/oauth2/revoke?token=${current_token}`);
                    xhr.send();
                    // @corecode_end removeAndRevokeAuthToken

                    // Update the user interface accordingly
                    sendResponse({ state: STATE_START });
                    console.log('Token revoked and removed from cache. Check chrome://identity-internals to confirm.');
                }
                console.log(current_token);
            });
            return true;

        case "get-user-info":
            //getUserInfo(false);
            xhrWithAuth('GET',
                'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
                true,
                (error, status, response) => {
                    if (!error && status == 200) {
                        sendResponse({ state: STATE_AUTHTOKEN_ACQUIRED });
                        console.log(response);
                        var user_info = JSON.parse(response);

                        //this.user_info_div.innerHTML = "Hello " + user_info.name;
                        //fetchImageBytes(user_info);
                    }
                    //else sendResponse({ state: STATE_START });
                    chrome.identity.getProfileUserInfo(user_info => {
                        sendResponse({ success: user_info.id });
                    })
                });


            return true;
    }
    return true;
});

xhrWithAuth = (method, url, interactive, callback) => {
    var access_token;
    var retry = true;

    console.log('bububububbu')
    getToken();

    function getToken() {
        chrome.identity.getAuthToken({ interactive: interactive }, token => {
            if (chrome.runtime.lastError) {
                callback(chrome.runtime.lastError);
                return;
            }

            access_token = token;
            console.log(token);
            requestStart();
        });
    }

    function requestStart() {
        var xhr = new XMLHttpRequest();
        xhr.open(method, `${url}&access_token=${access_token}`);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.onload = requestComplete;
        xhr.send();
    }

    function requestComplete() {
        if (this.status == 401 && retry) {
            retry = false;
            chrome.identity.removeCachedAuthToken({ token: access_token }, getToken);
        }
        else callback(null, this.status, this.response);
    }
}

/*
fetchImageBytes = user_info => {
    if (!user_info || !user_info.picture) return;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', user_info.picture, true);
    xhr.responseType = 'blob';
    xhr.onload = this.onImageFetched;
    xhr.send();
}


onImageFetched = e => {
    if (this.status != 200) return;
    var imgElem = document.createElement('img');
    var objUrl = window.URL.createObjectURL(this.response);
    imgElem.src = objUrl;
    imgElem.style.width = '24px';
    imgElem.onload = () => { window.URL.revokeObjectURL(objUrl); }
    this.user_info_div.insertAdjacentElement("afterbegin", imgElem);
}
*/


/*
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete') {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            console.log("hihi");
            console.log(request.action);
            console.log(tab.url);

            if (request.action == "add-note") {
                sendResponse({ success: true, url: tab.url });

                chrome.tabs.executeScript({ file: 'StickyNote.bundle.js' });
                return true;
            }
            return true;
        });
    }
})
*/

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