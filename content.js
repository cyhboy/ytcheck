/* eslint-disable no-misleading-character-class */
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

        let author = ''
        let title = ''


        if (document.readyState !== 'complete') {
            try {
                if (author == '') {
                    author = document.querySelector('#text > a').text
                }
                title = document.querySelector('#title > yt-formatted-string > a').text
            } catch (error) {
                console.error(error)
                author = ''
                sleep(1000)
            }

            try {
                if (title == '') {
                    title = document.querySelector('#title > yt-formatted-string > a').text
                }
            } catch (error) {
                console.error(error)
                title = ''
                sleep(1000)
            }

        }

        if (author == '') {
            author = document.querySelector('#text-container > yt-formatted-string').textContent
        }

        if (title == '') {
            title = document.querySelector('#title > yt-formatted-string > a').text
        }

        author = author.replace(/[/\\?\-👨‍💻 ，, +()（）.%*：:|"<>]/g, '')
        title = title.replace(/[/\\?\-👨‍💻 ，, +()（）.%*：:|"<>]/g, '')

        // author = author.replace(/[^\w\s]/gi, '')
        // title = title.replace(/[^\w\s]/gi, '')

        console.log('author: ', author)
        console.log('title: ', title)

        let domContent = author + '_' + title

        sendResponse(domContent)

        return true
    }

    if (msg.text === 'report_back_playlists_videos') {

        let author = ''
        let title = ''

        if (document.readyState !== 'complete') {
            if (author == '') {
                try {
                    author = document.querySelector('#text > a').text
                } catch (error) {
                    console.log(error)
                    author = ''
                    sleep(1000)
                }
            }
        }

        if (author == '') {
            author = document.querySelector('#text-container > yt-formatted-string').textContent
        }

        title = msg.linkage

        author = author.replace(/[/\\?\-👨‍💻 ，, +()（）.%*：:|"<>]/g, '')
        // author = author.replace(/[^\w\s]/gi, '')

        let loc = title.lastIndexOf('/')
        title = title.slice(loc + 1)

        console.log('author: ', author)
        console.log('title: ', title)

        let domContent = author + '_' + title

        sendResponse(domContent)

        return true
    }

})


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
