/* eslint-disable no-undef */

chrome.action.onClicked.addListener(() => {
    chrome.storage.local.get(['output', 'color', 'domContent', 'domUrl'], (result) => {
        console.log('onclick result.output: ', result.output)
        console.log('onclick result.color: ', result.color)
        console.log('onclick result.domContent: ', result.domContent)
        console.log('onclick result.domContent: ', result.domUrl)
        if (result.output == 'ok') {

            const createOption = {
                url: 'helper.html',
                // url: 'openss://C:/CHROME_SPACE/ytcheck/learn/' + result.domContent + '.xlsm',
                focused: false,

                state: 'minimized',
                // width: 1,
                // height: 1,

                // type: "popup",
            }

            chrome.windows.create(createOption, () => { })

            return true
        }

        if (result.output == 'ng') {

            const createOption = {
                url: 'cmder.html',
                // url: 'openss://C:/CHROME_SPACE/ytcheck/learn/' + result.domContent + '.xlsm',
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
}
)


chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (info.status == 'complete') {
        /* checking & injecting stuff */
        // console.log('tabId === tab.id: ', tabId === tab.id)
        console.log('tab.id: ', tab.id)
        console.log('tab.url: ', tab.url)
        // console.log('tab.title: ', tab.title)

        if (typeof window !== 'undefined') {
            console.log('You are on the browser in background.js')
            // can use localStorage here
        } else {
            console.log('You are on the server in background.js')
            // can't use localStorage
        }

        // chrome.action.getBadgeBackgroundColor({}, (res) => {
        //     console.log(JSON.stringify(res))
        // })
        
        try {
            if (tab.url.startsWith('https://www.youtube.com/playlist?list=')) {
                console.log('get the youtube playlist linkage')
                chrome.storage.local.set({ 'domUrl': tab.url }, function () {
                    console.log('Value is set to domUrl: ' + tab.url)
                })
                chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, doStuffWithDom)
            } else if ((tab.url.startsWith('https://www.youtube.com/channel/') || tab.url.startsWith('https://www.youtube.com/user/') || tab.url.startsWith('https://www.youtube.com/c/')) && (tab.url.endsWith('/videos') || tab.url.endsWith('/playlists'))) {
                console.log('get the youtube playlists or videos linkage')
                chrome.storage.local.set({ 'domUrl': tab.url }, function () {
                    console.log('Value is set to domUrl: ' + tab.url)
                })
                chrome.tabs.sendMessage(tab.id, { text: 'report_back_playlists_videos', linkage: tab.url }, doStuffWithDom)
            } else {
                chrome.action.setBadgeText({ text: '' }, () => { })
                chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 0] }, () => { })
                chrome.action.setTitle({ title: '' }, () => { })
            }
            console.log('Success to ytcheck for ' + tab.url)
        } catch (error) {
            console.error(error)
        }
    }
})

chrome.tabs.onActivated.addListener(reBadge)

async function reBadge(activeInfo) {
    try {

        console.log('activeInfo.tabId: ', activeInfo.tabId)

        chrome.tabs.get(activeInfo.tabId, function (tab) {
            console.log(tab.url)
            if (tab.url.startsWith('https://www.youtube.com/playlist?list=')) {
                chrome.storage.local.set({ 'domUrl': tab.url }, function () {
                    console.log('Value is set to domUrl: ' + tab.url)
                })
                chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, doStuffWithDom)
            } else if ((tab.url.startsWith('https://www.youtube.com/channel/') || tab.url.startsWith('https://www.youtube.com/user/') || tab.url.startsWith('https://www.youtube.com/c/')) && (tab.url.endsWith('/videos') || tab.url.endsWith('/playlists'))) {
                chrome.storage.local.set({ 'domUrl': tab.url }, function () {
                    console.log('Value is set to domUrl: ' + tab.url)
                })
                chrome.tabs.sendMessage(tab.id, { text: 'report_back_playlists_videos', linkage: tab.url }, doStuffWithDom)
            } else {
                console.log('reset badge here')
                chrome.action.setBadgeText({ text: '' }, () => { })
                chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 0] }, () => { })
                chrome.action.setTitle({ title: '' }, () => { })
            }
        })

        console.log('Success to reBadge for ' + tab.url)
    } catch (error) {
        console.error(error)
    }
}


function doStuffWithDom(domContent) {
    console.log('I received the following DOM content:\n' + domContent)

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


