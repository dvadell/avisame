import React, { Component } from 'react';
import RemindMeForm from './RemindMeForm'
import ShowAlarms from './ShowAlarms'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceWorker: undefined
    }
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

  componentWillMount() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // const logID = 'Main:';
        this.setState({serviceWorker: navigator.serviceWorker.register('/sw.js')});
      })
    } else {
        console.log('No serviceWorker support. I cant do it.');
    }
    this.askForPermissionForNotifications()
  }

  render() {
    return (
      <div className="App">
        <RemindMeForm serviceWorker={this.state.serviceWorker} />
        <ShowAlarms   serviceWorker={this.state.serviceWorker} />
      </div>
    )
  }
}

export default App;
