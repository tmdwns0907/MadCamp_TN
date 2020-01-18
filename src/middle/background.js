chrome.windows.onFocusChanged.addListener(winId => {
    chrome.tabs.query({ 'windowId': winId, 'active': true }, tabs => {
        if (tabs.length != 'undefined' && tabs.length == 1)
            var currentURL = tabs[0].url;

        if (typeof currentURL != 'undefined')
            console.log(currentURL);

        /*
        chrome.tabs.sendMessage(tabs[0].id, { data: tabs[0] }, function (response) {
            console.log('success');
        });
        */
    })
}, {
    windowTypes: ['normal'],
})