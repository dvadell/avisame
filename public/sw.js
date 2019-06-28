const logID = 'serviceWorker:';
let alarmList = []



// So what do we do on Timeout
const doSomethingOnTimeout = (client, message) => {
    client.postMessage('NOW do ' + message.text);
}

self.addEventListener('message', e => {
    console.log('ServiceWorker: got message:', e.data)

    var promise = self.clients.matchAll().then(clientList => {
        clientList.forEach( client => {
            console.log('ServiceWorker: got message:', e.data)
            alarmList.push(e.data);

            if (client.id !== e.source.id) {
                return;
            }

            setInterval(() => { 
                newList = alarmList.filter(alarm => {
                            console.log(logID, 'evaluating', alarm)
                            alarm.inSeconds = alarm.inSeconds - 1;
                            if (alarm.inSeconds < 1) {
                                console.log('La alarma', alarm.message, 'expiró')
                                doSomethingOnTimeout(client, alarm)
                                return false;
                            }
                            return true;
                        })
                alarmList = newList;
            }, 1000);
        });
    });
    e.waitUntil(promise);
});

