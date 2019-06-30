import React, { Component } from 'react'


export class ShowAlarms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pendingAlarms: [],
            expiredAlarms: []
        }
    }

    componentWillMount() {
        // const logID = 'ShowAlarms -> render:'
        navigator.serviceWorker.addEventListener('message', e => {
            // Messages look like this: {
            //     type: 'alarmStatus',
            //     pendingAlarms: newList,
            //     expiredAlarms: expiredAlarms
            // }
            if (e.data.type === 'alarmStatus') {
                // console.log(logID, 'Received:', e.data)
                this.setState(state => {
                    return {
                        pendingAlarms: e.data.pendingAlarms,
                        expiredAlarms: [...state.expiredAlarms, ...e.data.expiredAlarms]
                    }
                })
            }            
        })
    }


    componentDidMount = () => {
        window.addEventListener('load', () => {
            if (this.props.serviceWorker) {
                this.props.serviceWorker.then( reg => {          
                    reg.active.postMessage({
                        type: 'registerToAlarmList'
                    });
                })
                .catch(err => console.log('SW: Error:', err))
            } else {
                console.log(this.props)
            }
            this.askForPermissionForNotifications()
        })
    }

    askForPermissionForNotifications() {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
          console.log("This browser does not support desktop notification");
          return
        }
      
        // Let's check whether notification permissions have already been granted
        if (Notification.permission !== "denied") {
          Notification.requestPermission()
        }
    }

    render() {
        var now = new Date().getTime()
        return (
            <div>
                <ul>
                {
                    this.state.pendingAlarms.map(
                        (alarm,i) => 
                            <li key={i}>{alarm.text} expires in {Math.ceil((alarm.at - now) / 1000) } seconds</li>
                    ) 
                }
                </ul>
                <ul>
                {
                    this.state.expiredAlarms.map((alarm,i) => <li key={i}>{alarm.text} DONE</li>) 
                }
                </ul>
            </div>
        )
    }
}

export default ShowAlarms;