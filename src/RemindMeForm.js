import React, { Component } from 'react'

const parseMessage = (message) => {
    // remind me in 60 seconds go to lunch
    let words = message.split(' ')
    let pointer = words.indexOf('in')
    pointer++;
    let number = words[pointer];       // 60
    pointer++;
    if (words[pointer][0] === 'm') {   // m(inutes) 
        number = number * 60;
    }
    if (words[pointer][0] === 'h') {   // h(ours) 
        number = number * 60 * 60;
    }
    pointer++;
    let text = words.slice(pointer)
    let mensaje = {
        at: new Date().getTime() + number * 1000,
        text: text.join(' ')
    }
    console.log('parseMessage:', mensaje)
    return mensaje;
}


export class RemindMeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messageText: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('handling Submit...');
        // const logID = 'RemindMeForm -> handleSubmit:'

        let parsedMessage = parseMessage(this.state.messageText)
        this.props.serviceWorker.then( reg => {  
            reg.active.postMessage({
                type: 'setAlarm',
                at: parsedMessage.at,
                text: parsedMessage.text
            });
            this.setState({ messageText: '' })
        })
        .catch(err => console.log('SW: Error:', err))
    }

    handleReminder = (event) => {
        this.setState({
            messageText: event.target.value
        })
        // console.log('messageText:', this.state.messageText)
    }

    render() {
        return(
            <form className="pa4 black-80">
                <label className="f6 b db mb2">
                    Example: remind me in a minute take a rest <br/>
                    <textarea onChange={this.handleReminder}
                            style={{width: "100%", height: "200px"}}
                            value={this.state.messageText} ></textarea>
                    <button type="submit" onClick={this.handleSubmit}>Create alarm</button>
                </label>
            </form>
        )
    }
}

export default RemindMeForm;