if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
        .then( reg => {
            reg.active.postMessage('update the cache');
            // console.log(reg)
        })
        .catch(err => console.log('SW: Error:', err))

        navigator.serviceWorker.addEventListener('message', (e) => {
            console.log('index.js received:', e.data)
        })
    })
} else {
    console.log(ÂÂ'No serviceWorker support. I cant do it.');
}
