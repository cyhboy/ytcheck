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
        console.log('tabId === tab.id: ', tabId === tab.id)
        console.log('tab.id: ', tab.id)
        console.log('tab.url: ', tab.url)
        console.log('tab.title: ', tab.title)

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
    }
})

chrome.tabs.onActivated.addListener(reBadge)

async function reBadge(activeInfo) {
    try {
        // console.log('activeInfo.status: ', activeInfo.status)
        console.log('activeInfo.tabId: ', activeInfo.tabId)
        // if (activeInfo.status == 'complete') {
        //     // how to fetch tab url using activeInfo.tabid
        chrome.tabs.get(activeInfo.tabId, function (tab) {
            console.log(tab.url)
            if (tab.url.startsWith('https://www.youtube.com/playlist?list=')) {
                chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, doStuffWithDom)
            } else if ((tab.url.startsWith('https://www.youtube.com/channel/') || tab.url.startsWith('https://www.youtube.com/user/')) && (tab.url.endsWith('/videos') || tab.url.endsWith('/playlists'))) {
                chrome.tabs.sendMessage(tab.id, { text: 'report_back_playlists_videos', linkage: tab.url }, doStuffWithDom)
            } else {
                console.log('reset badge here')
                chrome.action.setBadgeText({ text: '' }, () => { })
                chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 0] }, () => { })
                chrome.action.setTitle({ title: '' }, () => { })
            }
        })
        // }
        console.log('Success.')
    } catch (error) {
        console.error(error)
    }
}

// console.log('info.status: ', info.status)
// if (info.status == 'complete') {
//     // how to fetch tab url using activeInfo.tabid
//     chrome.tabs.get(activeInfo.tabId, function (tab) {
//         if (tab.url.startsWith('https://www.youtube.com/playlist?list=')) {
//             console.log(tab.url)
//         } else {
//             console.log('reset badge here')
//             chrome.action.setBadgeText({ text: '' }, () => { })
//             chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 0] }, () => { })
//         }
//     })
// }

// async function moveToFirstPosition(activeInfo) {
//     try {
//         await chrome.tabs.move(activeInfo.tabId, {index: 0})
//         console.log('Success.')
//     } catch (error) {
//         if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
//             setTimeout(() => moveToFirstPosition(activeInfo), 50)
//         } else {
//             console.error(error)
//         }
//     }
// }






// chrome.tabs.onActivated.addListener(function (activeInfo) {

// })

// chrome.browserAction.onClicked.addListener(

// )

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

    // chrome.action.setBadgeText({ text: "ng" }, () => { })
    // chrome.action.setBadgeBackgroundColor({ color: "red" }, () => { })

    // chrome.runtime.sendMessage({
    //     text: "domContent",
    //     data: {
    //         thefilename: domContent
    //     }
    // })

    // chrome.tabs.sendMessage(chrome.tabs[0].id, {
    //     text: 'dom_content',
    //     data: {
    //         thefilename: domContent
    //     }

    // })

    // myFile = "builder-icon.png"
    // localStorage["current_workbook"] = myFile


    // fileExists(storageRootEntry, myFile, function (answer) {
    //     if (answer) {
    //         console.log("file do exists")
    //     } else {
    //         console.log("file do not exists")
    //     }
    // }
    // )
}

// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//     // If the received message has the expected format...
//     if (message.method === 'send') {
//         chrome.action.setBadgeText({ text: message.output }, () => { })
//         chrome.action.setBadgeBackgroundColor({ color: message.color }, () => { })
//     }
//     return true
// })

// function fileExists(storageRootEntry, fileName, callback) {
//     storageRootEntry.getFile(fileName, {
//         create: false
//     }, function () {
//         callback(true);
//     }, function () {
//         callback(false);
//     });
// }