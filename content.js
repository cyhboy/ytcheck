/* eslint-disable no-undef */
// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...

    if (typeof window !== 'undefined') {
        console.log('You are on the browser in content.js')
        // can use localStorage here
    } else {
        console.log('You are on the server in content.js')
        // can't use localStorage
    }

    if (msg.text === 'report_back') {
        // if (sender.status == 'complete') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument

        let author = ''
        let title = ''
        let cnt = 0
        //document.addEventListener('DOMContentLoaded', function () {
        while (document.readyState !== 'complete' || author == '' || title == '') {
            sleep(1000)
            try {
                author = document.querySelector('#text > a').text
                title = document.querySelector('#title > yt-formatted-string > a').text
            } catch (error) {
                author = ''
                title = ''
            }
            cnt = cnt + 1
            if (cnt == 3) {
                break
            }
        }

        if (author == '') {
            author = document.querySelector('#text-container > yt-formatted-string').textContent
        }

        if (title == '') {
            title = document.querySelector('#title > yt-formatted-string > a').text
        }

        author = author.replace(/[/\\?\-，, +()（）%*：:|"<>]/g, '')
        title = title.replace(/[/\\?\-，, +()（）%*：:|"<>]/g, '')

        console.log('author: ', author)
        console.log('title: ', title)

        let domContent = author + '_' + title

        // chrome.storage.local.set({ 'domContent': domContent }, function () {
        //     console.log('Value is set to ' + domContent)
        // })

        sendResponse(domContent)
        //}, false)
        // }
        return true
    }

    if (msg.text === 'report_back_playlists_videos') {
        // if (sender.status == 'complete') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        let author = ''
        let title = ''
        let cnt = 0
        while (document.readyState !== 'complete' || author == '') {
            sleep(1000)
            try {
                author = document.querySelector('#text > a').text

            } catch (error) {
                console.log(error)
                author = ''
            }
            cnt = cnt + 1
            if (cnt == 3) {
                break
            }
        }

        if (author == '') {
            author = document.querySelector('#text-container > yt-formatted-string').textContent
        }

        //document.addEventListener('DOMContentLoaded', function () {


        title = msg.linkage

        author = author.replace(/[/\\?\-，, +()（）%*：:|"<>]/g, '')
        let loc = title.lastIndexOf('/')
        title = title.slice(loc + 1)

        console.log('author: ', author)
        console.log('title: ', title)

        let domContent = author + '_' + title

        // chrome.storage.local.set({ 'domContent': domContent }, function () {
        //     console.log('Value is set to ' + domContent)
        // })

        sendResponse(domContent)
        //}, false)
        // }
        return true
    }

})


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}