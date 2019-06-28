import { Component } from 'react'


export class ShowAlarms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messageText: ''
        }
    }

    componentWillMount() {
        const logID = 'ShowAlarms -> render:'
        navigator.serviceWorker.addEventListener('message', (e) => {
            console.log(logID, 'Received:', e.data)
            this.setState({
                messageText: e.data
            })
        })
    }

    render() {


        return this.state.messageText
    }
}

export default ShowAlarms;