const logID = 'serviceWorker:';

// So what do we do on Timeout
const doSomethingOnTimeout = (client, message) => {
    console.log(logID, client, 'NOW do', message.text)
    client.postMessage('NOW do ' + message.text);
}

self.addEventListener("install", e => {
  console.log("SW: installed");
});

self.addEventListener('message', e => {
    console.log('ServiceWorker: got message:', e.data)


    var promise = self.clients.matchAll().then(clientList => {
        clientList.forEach( client => {
            console.log('ServiceWorker: got message:', e.data)
            message = e.data;

            if (client.id !== e.source.id) {
                return;
            }

            // client.postMessage('As you command, mi king');
            client.postMessage('NOW do ' + message.text);
            setTimeout(() => {
                doSomethingOnTimeout(client, message)
            }, message.inSeconds * 1000)
        });
    });
    e.waitUntil(promise);
});

