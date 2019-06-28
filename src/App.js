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

  componentWillMount() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const logID = 'Main:';
        this.setState({serviceWorker: navigator.serviceWorker.register('/sw.js')});
      })
    } else {
        console.log('No serviceWorker support. I cant do it.');
    }
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
