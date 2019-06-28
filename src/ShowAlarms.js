import React, { Component } from 'react'


export class ShowAlarms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alarms: []
        }
    }

    componentWillMount() {
        const logID = 'ShowAlarms -> render:'
        navigator.serviceWorker.addEventListener('message', (e) => {
            console.log(logID, 'Received:', e.data)
            this.setState(state => {
                return { alarms: [...state.alarms, e.data] }
            })
        })
    }

    render() {
        return <ul>
            {
                this.state.alarms.map((alarm,i) => <li key={i}>{alarm}</li>) 
            }
        </ul>
    }
}

export default ShowAlarms;