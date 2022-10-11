

if (typeof window !== 'undefined') {
    console.log('You are on the browser in popup.js')
    // can use localStorage here
} else {
    console.log('You are on the server in popup.js')
    // can't use localStorage
}

