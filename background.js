/* eslint-disable no-undef */

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {

    // if (typeof window !== 'undefined') {
    //     console.log('You are on the browser in background.js')
    //     // can use localStorage here
    // } else {
    //     console.log('You are on the server in background.js')
    //     // can't use localStorage
    // }

    if (info.status == undefined && tab.status == 'complete') {
        console.log('inside: ', tabId, info.status, tab.status, tab.url)

        if (tab.url.startsWith('https://www.youtube.com/playlist?list=')) {
            console.log('get the youtube playlist linkage')
            chrome.storage.local.set({ 'domUrl': tab.url }, function () {
                console.log('onUpdated value is set to domUrl: ' + tab.url)
            })
            chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, doStuffWithDom)
        } else if ((tab.url.startsWith('https://www.youtube.com/channel/') || tab.url.startsWith('https://www.youtube.com/user/') || tab.url.startsWith('https://www.youtube.com/c/') || tab.url.startsWith('https://www.youtube.com/@')) && (tab.url.endsWith('/videos') || tab.url.endsWith('/playlists'))) {
            console.log('get the youtube playlists or videos linkage')
            chrome.storage.local.set({ 'domUrl': tab.url }, function () {
                console.log('onUpdated value is set to domUrl: ' + tab.url)
            })
            chrome.tabs.sendMessage(tab.id, { text: 'report_back_playlists_videos', linkage: tab.url }, doStuffWithDom)
        } else {
            console.log('onUpdated reset badge')
            chrome.action.setBadgeText({ text: '' }, () => { })
            chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 0] }, () => { })
            chrome.action.setTitle({ title: '' }, () => { })
        }
    }
})

chrome.tabs.onActivated.addListener(info => {
    console.log(info)
    console.log(info.tabId)

    chrome.tabs.get(info.tabId, function (tab) {

        if (info.status == undefined && tab.status == 'complete') {
            console.log(tab.url)

            if (tab.url.startsWith('https://www.youtube.com/playlist?list=')) {
                chrome.storage.local.set({ 'domUrl': tab.url }, function () {
                    console.log('onActivated value is set to domUrl: ' + tab.url)
                })
                chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, doStuffWithDom)
            } else if ((tab.url.startsWith('https://www.youtube.com/channel/') || tab.url.startsWith('https://www.youtube.com/user/') || tab.url.startsWith('https://www.youtube.com/c/') || tab.url.startsWith('https://www.youtube.com/@')) && (tab.url.endsWith('/videos') || tab.url.endsWith('/playlists'))) {
                chrome.storage.local.set({ 'domUrl': tab.url }, function () {
                    console.log('onActivated value is set to domUrl: ' + tab.url)
                })
                chrome.tabs.sendMessage(tab.id, { text: 'report_back_playlists_videos', linkage: tab.url }, doStuffWithDom)
            } else {
                console.log('onActivated reset badge')
                chrome.action.setBadgeText({ text: '' }, () => { })
                chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 0] }, () => { })
                chrome.action.setTitle({ title: '' }, () => { })
            }
        }

    })

})


chrome.action.onClicked.addListener(() => {
    chrome.action.getBadgeText({}, (res) => {
        console.log(res, JSON.stringify(res))
        if (res == 'ok') {
            const createOption = {
                url: 'helper.html',
                // url: 'openss://C:/CHROME_SPACE/hcs/learning/' + result.domContent + '.xlsm',
                focused: false,

                state: 'minimized',
                // width: 1,
                // height: 1,

                // type: "popup",
            }
            chrome.windows.create(createOption, () => { })
            return true
        }

        if (res == 'ng') {
            const createOption = {
                url: 'cmder.html',
                // url: 'openyt://',
                focused: false,

                state: 'minimized',
                // width: 1,
                // height: 1,

                // type: "popup",
            }
            chrome.windows.create(createOption, () => { })
            return true
        }
    })
})



function doStuffWithDom(domContent) {
    console.log('I received the following DOM content in doStuffWithDom:\n' + domContent)

    chrome.storage.local.set({ 'domContent': domContent }, function () {
        console.log('Value is set to ' + domContent)
    })

    const createOption = {
        url: 'app.html',
        focused: false,

        state: 'minimized',
        // width: 1,
        // height: 1,

        // type: "popup",

        // incognito: true,
        // alwaysOnTop: true,
        // top: 100,
        // left: 100,

    }

    chrome.windows.create(createOption, () => {
        setTimeout(() => {
            chrome.storage.local.get(['output', 'color', 'dtitle'], (result) => {
                console.log('onclick result.output: ', result.output)
                console.log('onclick result.color: ', result.color)
                console.log('onclick result.dtitle: ', result.dtitle)
                chrome.action.setBadgeText({ text: result.output }, () => { })
                chrome.action.setBadgeBackgroundColor({ color: result.color }, () => { })
                chrome.action.setTitle({ title: result.dtitle }, () => { })
            })
            // chrome.windows.remove(oWin.id)
        }, 3000)
    })

}


