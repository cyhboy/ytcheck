/* eslint-disable no-undef */


if (typeof window !== 'undefined') {
    console.log('You are on the browser in cmder.js')
    // can use localStorage here
} else {
    console.log('You are on the server in cmder.js')
    // can't use localStorage
}


chrome.storage.local.get(['domUrl'], function (result) {
    console.log('Value of domUrl currently is ' + result.domUrl)
    let newLocation = new URL('openyt://' + result.domUrl)
    // openss://C:/CHROME_SPACE/ytcheck/learn/窃客学院_安卓必学之MVCMVPMVVMNDK和JNcmake快速入门Android动画AndroidmustlearnMVCMVPMVVMNDKandJNcmakequickstartAndroidanimation.xlsm
    window.location = newLocation

    // setTimeout(() => {
    //     window.close()
    // }, 1000)
})



