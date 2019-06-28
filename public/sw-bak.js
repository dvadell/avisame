const logID = 'serviceWorker:';
let locked = false;
let alarmList = []
let intervalId;
let client;

setInterval(() => {
    console.log('Every 5 seconds: locked:', locked ? 'Y' : 'N', alarmList.length, 'alarms' )
    if (!locked && client) {
        locked = true;
        checkAlarms()
        locked = false;
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

self.addEventListener('message', e => {
    // console.log('ServiceWorker: got message:', e.data)

    var promise = self.clients.matchAll().then(clientList => {
        clientList.forEach( currClient => {
            client = currClient;
            console.log('ServiceWorker: got message:', e.data)            
            if (client.id !== e.source.id || ! e.data.type || e.data.type !== 'setAlarm') {
                return;
            }

            intervalId = setInterval(() => {
                console.log('immediate setInterval', locked ? 'locked' : 'not locked')
                if (!locked) {
                    locked = true;
                    alarmList.push(e.data);
                    checkAlarms()
                    locked = false;
                    clearInterval(intervalId);
                }
            }, 100);


        });
    });
    e.waitUntil(promise);
});

