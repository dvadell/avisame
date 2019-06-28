import React, { Component } from 'react'


export class RemindMeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messageText: ''
        }
    }

    componentDidMount() {
        // 
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('handling Submit...');
        const logID = 'RemindMeForm -> handleSubmit:'
        this.props.serviceWorker.then( reg => {
            reg.active.postMessage({
                inSeconds: 5,
                text: this.state.messageText
            });
            console.log(logID, 'Sent this message:', this.state.messageText)
        })
        .catch(err => console.log('SW: Error:', err))
    }

    handleReminder = (event) => {
        this.setState({
            messageText: event.target.value
        })
        console.log('messageText:', this.state.messageText)
    }

    render() {
        return(
            <form className="pa4 black-80">
                <label className="f6 b db mb2">
                    Example: remind me in a minute take a rest <br/>
                    <textarea onChange={this.handleReminder}
                            style={{width: "100%", height: "200px"}}
                            value={this.state.messageText} ></textarea>
                    <button type="submit" onClick={this.handleSubmit}>Enviar comentario</button>
                </label>
            </form>
        )
    }
}

export default RemindMeForm;