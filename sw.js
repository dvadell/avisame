self.addEventListener("install", e => {
  console.log("SW: installed");
});

self.addEventListener('message', e => {
    console.log('ServiceWorker: got message:', e.data)
    var promise = self.clients.matchAll().then(clientList => {
        clientList.forEach( client => {
            console.log('ServiceWorker: got message:', e.data)
            console.log('SW: event is:', e)
            console.log('Client:', client)
            if (client.id !== e.source.id) {
                return;
            }
            client.postMessage('As you command, mi king');
        });
    });
    e.waitUntil(promise);
});

