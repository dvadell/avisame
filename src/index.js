import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//     let message = {}
//     const logID = 'Main:';
//         navigator.serviceWorker.register('/sw.js')
        // .then( reg => {
        //     reg.active.postMessage({
        //         inSeconds: 1,
        //         text: 'Have some coffee'
        //     });
        //     console.log(logID, 'Sent this message:', message)
        // })
        // .catch(err => console.log('SW: Error:', err))

//         navigator.serviceWorker.addEventListener('message', (e) => {
//             console.log(logID, 'Received:', e.data)
//         })
//     })
// } else {
//     console.log('No serviceWorker support. I cant do it.');
// }
