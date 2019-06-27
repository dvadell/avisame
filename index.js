if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
    let message = {}
    const logID = 'Main:';
        navigator.serviceWorker.register('/sw.js')
        .then( reg => {
            reg.active.postMessage({
                inSeconds: 1,
                text: 'Have some coffee'
            });
            console.log(logID, 'Sent this message:', message)
        })
        .catch(err => console.log('SW: Error:', err))

        navigator.serviceWorker.addEventListener('message', (e) => {
            console.log(logID, 'Received:', e.data)
        })
    })
} else {
    console.log('No serviceWorker support. I cant do it.');
}
