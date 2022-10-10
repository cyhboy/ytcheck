/* eslint-disable no-undef */



if (typeof window !== 'undefined') {
    console.log('You are on the browser in popup.js')
    // can use localStorage here
} else {
    console.log('You are on the server in popup.js')
    // can't use localStorage
}


chrome.storage.local.get(['domContent'], function (result) {
    console.log('Value currently is ' + result.domContent)

    let myFile = 'learn/' + result.domContent + '.xlsm'

    console.log(myFile)


    // chrome.storage.local.set({ 'output': output, 'color': color }, function () {
    //     console.log('output and color is set', output, color)
    //     // window.close()
    // })

    chrome.runtime.getPackageDirectoryEntry(function (storageRootEntry) {
        storageRootEntry.getFile(myFile, {
        }, function (fileEntry) {
            fileEntry.file(function (file) {
                let output = 'ng'
                let color = 'red'
                let dtitle = 'yt index files is not available'
                console.log('file.name: ', file.name)
                console.log('modification: ', file.lastModifiedDate)
                let date1 = new Date(file.lastModified)
                let date2 = new Date()
                let diffTime = Math.abs(date2 - date1)
                let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                console.log(diffTime + ' milliseconds')
                console.log(diffDays + ' days')
                if (diffDays > 180) {
                    output = 'ok'
                    color = 'orange'
                    dtitle = 'yt index files outdated over half year'
                } else if (diffDays > 90) {
                    output = 'ok'
                    color = 'yellow'
                    dtitle = 'yt index files outdated over 3 months'
                } else if (diffDays > 30) {
                    output = 'ok'
                    color = 'blue'
                    dtitle = 'yt index file is pending for review'
                } else {
                    output = 'ok'
                    color = 'green'
                    dtitle = 'yt index file just review in passed month'
                }

                chrome.storage.local.set({ 'output': output, 'color': color, 'dtitle': dtitle }, function () {
                    console.log('output / color / dtitle is set again', output, color, dtitle)
                    window.close()
                })

                // chrome.storage.local.set({ 'color': color }, function () {
                //     console.log('color is set again', color)
                //     // window.close()
                // })
            })
        }, function () {
            let output = 'ng'
            let color = 'red'
            let dtitle = 'yt index files is not available'
            chrome.storage.local.set({ 'output': output, 'color': color, 'dtitle': dtitle }, function () {
                console.log('output / color / dtitle is set again', output, color, dtitle)
                window.close()
            })
        })


        // fileExists(storageRootEntry, myFile, function (isExist) {


        //     if (isExist) {
        //         console.log('file do exists')
        //         // alert("file do exists")
        //         // if (confirm("file do exists")) {
        //         //     window.close()
        //         // } else {
        //         //     window.close()
        //         output = 'ok'




        //     } else {
        //         console.log('file do not exists')
        //         // alert("file do not exists")
        //         output = 'ng'
        //         color = 'red'
        //     }


        // })

    })


    // setTimeout(() => {
    //     window.close()
    // }, 3000)
})



// function fileExists(storageRootEntry, fileName, callback) {
//     storageRootEntry.getFile(fileName, {
//         create: false
//     }, function () {
//         callback(true)
//     }, function () {
//         callback(false)
//     })
// }
