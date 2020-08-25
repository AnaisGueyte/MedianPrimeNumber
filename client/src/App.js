import React, { Component } from "react";
import logo from "./logo.png";
import woman_picture from "./woman-maths.png";
import "./App.css";
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "", number: "", n_number: '' };
    }

    // Control int input only, no text 
    handleChange(evt) {
        const n_number = (evt.target.validity.valid) ? evt.target.value : this.state.n_number;
        this.setState({ n_number });
    }

    // Get Value from submit button
    handleInput = event => {
        this.setState({ number: event.target.value });
    };

    // Listen to click event
    numberSubmitted = async e => {
        e.preventDefault();

        console.log(this.state.number);

        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.number }),
            });
        const body = await response.text();
    
        this.setState({ apiResponse: body });
    };

    callApi = async () => {
        const response = await fetch('/');
        const body = await response.text();
        if (response.status !== 200) throw Error(body.message);
    
        return body;
    };

    componentDidMount() {
    this.callApi()
      .then(res => this.setState({ apiResponse: res.express }))
      .then(console.log(this.state.apiResponse))
      .catch(err => console.log(err));
    }


    render() {
        return (

            <div id="section">
                <div className="game-area">
                    <header className="header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to <br/> My Median Prime Number</h1>
                    </header>
                    
                    <div className="input-section">
                        <p> Enter a number so to find its median!</p>
                        <p id="inputLine"><input type="text" pattern="[0-9]*" onInput={this.handleChange.bind(this)} value={this.state.n_number} placeholder="Enter number" onChange={this.handleInput}></input><button className="submit-btn" onClick={this.numberSubmitted}>Find my Median</button></p>
                    </div>

                    <p className="App-intro">{this.state.apiResponse}</p>

                </div>

                <div className="picture-area">
                    <img src={woman_picture} className="" alt="woman with a calculator"/>
                </div>
            </div>
        );
    }
}

export default App;
