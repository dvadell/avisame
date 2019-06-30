const logID = 'serviceWorker:';
let alarmList = []
let expiredAlarms = []
let clients = []; 

setInterval(() => {
    console.log('Every 5 seconds:', alarmList.length, 'alarms' )
    if (clients.length) {
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
                            self.registration.showNotification(alarm.text)
                            expiredAlarms.push(alarm)
                            return false;
                        }
                        return true;
                    })
        clients.map(client => {
            client.postMessage({
                type: 'alarmStatus',
                pendingAlarms: newList,
                expiredAlarms: expiredAlarms
            });
        })
        
        alarmList = newList;
}

const checkThisAlarm = (alarm) => {
    let now = new Date().getTime()

    if (alarm.at < now) {
        self.registration.showNotification(alarm.text, {image: "/public/alert.png"})
        expiredAlarms.push(alarm)
    }
    else {
        alarmList.push(alarm)
    }
    clients.map(client => {
        client.postMessage({
            type: 'alarmStatus',
            pendingAlarms: alarmList,
            expiredAlarms: expiredAlarms
        });
    })
}

const validateAlarm = (alarm) => {
    if (isNaN(alarm.at)) {
        return false
    }
    if (!alarm.text) {
        return false
    }
    return true
}

self.addEventListener('message', e => {
    // console.log('ServiceWorker: got message:', e.data)

    var promise = self.clients.matchAll().then(clientList => {
        clients = clientList;

        if (! e.data.type || e.data.type !== 'setAlarm') {
            return;
        }
        validateAlarm(e.data) && checkThisAlarm(e.data)
    });
    e.waitUntil(promise);
});