// login


//contextMenu - right click
chrome.runtime.onInstalled.addListener(details => {
    chrome.contextMenus.create({ id: 'add-sticky-note', title: 'Add new Note' });
})


// background -> popup & content
chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId == '1') {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs.length != 'undefined' && tabs.length == 1)
                var currentURL = tabs[0].url;

            if (typeof currentURL != 'undefined')
                console.log(currentURL);

            chrome.runtime.sendMessage({ action: 'add-note-right', url: currentURL }, res => {
                chrome.tabs.executeScript({ file: 'StickyNote.bundle.js' });
                chrome.tabs.insertCSS({ file: 'StickyNote.css' });
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
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
});

// background -> content
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("hihi");
    console.log(request.action);
    //console.log(request.url);

    switch (request.action) {
        case "add-note":
            sendResponse({ success: true });
            chrome.tabs.executeScript({ file: 'StickyNote.bundle.js' });
            chrome.tabs.insertCSS({ file: 'StickyNote.css' });

            const newNote = { 'text': request.text, 'url': request.url, 'id': request.id };
            const key = request.id;
            chrome.storage.sync.set({ key: newNote }, () => {
                message('Settings saved');
            });

            return true;

        case "remove-note":
            sendResponse({ success: true });
            chrome.tabs.executeScript({ file: 'removeStickyNote.bundle.js' });
            chrome.storage.sync.get(null, items => {
                items.note
            })
            return true;

        case "change-note":
            chrome.runtime.sendMessage({ action: "change-note-list", text: request.text, id: request.id }, res => {

            })
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
                        sendResponse({ success: user_info.email });
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