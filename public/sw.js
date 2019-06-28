const logID = 'serviceWorker:';
let locked = false;
let alarmList = []
let expiredAlarms = []
let intervalId;
let client;

setInterval(() => {
    console.log('Every 5 seconds:', alarmList.length, 'alarms' )
    if (client) {
        checkAlarms()
    }
}, 5 * 1000);

const checkAlarms = () => {
        let expiredAlarms = []
        let now = new Date().getTime()
        let newList = alarmList.filter(alarm => {
                        // console.log(logID, 'evaluating', alarm)
                        if (alarm.at < now) {
                            // console.log('Alarm', alarm.text, 'expired')
                            expiredAlarms.push(alarm)
                            return false;
                        }
                        return true;
                    })
        client.postMessage({
            type: 'alarmStatus',
            pendingAlarms: newList,
            expiredAlarms: expiredAlarms
        });
        alarmList = newList;
}

const checkThisAlarm = (alarm) => {
    let now = new Date().getTime()

    if (alarm.at < now) {
        expiredAlarms.push(alarm)
    }
    else {
        alarmList.push(alarm)
    }
    client.postMessage({
        type: 'alarmStatus',
        pendingAlarms: alarmList,
        expiredAlarms: expiredAlarms
    });
}

self.addEventListener('message', e => {
    // console.log('ServiceWorker: got message:', e.data)

    var promise = self.clients.matchAll().then(clientList => {
        clientList.forEach( currClient => {
            console.log('ServiceWorker: got message:', e.data)            
            if (currClient.id !== e.source.id || ! e.data.type || e.data.type !== 'setAlarm') {
                return;
            }

            client = currClient;
            checkThisAlarm(e.data)
        });
    });
    e.waitUntil(promise);
});

