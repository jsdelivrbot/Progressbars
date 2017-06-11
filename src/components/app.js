import React, { Component } from 'react';

// import progress bar component
import Progress from './progress';

// Import css modules.
import './progress.css';

// import AJAX wrapper.
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            select: 0,
            buttons: [],
            bars: []
        }

        // Bind context to functions
        this._selectBar = this._selectBar.bind(this);
        this._updateProgress = this._updateProgress.bind(this);
    }

    componentWillMount() {
        // Call function to get data from Api
        this._getBars();
    }
    _getBars() {

        //Consume Api
        const self = this;
        axios.get('http://frontend-exercise.apps.staging.digital.gov.au/bars')
          .then(function (response) {

              // Create new dataset with bar total amount and percentage
              let bars = [];
              response.data.bars.forEach(function (value) {
                  bars.push({ total: value, percentage: value })
              });

              // Add data set to state
              return self.setState({ bars, buttons: response.data.buttons });
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    _selectBar(event) {
        // Add selected option to state
        this.setState({ select: event.target.value });
    }

    _updateProgress(amount) {
        let bars = this.state.bars;


        // Check if total exceeds 100 or less than 0 update percentage and total accordingly
        if ((bars[this.state.select].total + amount) > 100) {
            bars[this.state.select].percentage = 100;
            bars[this.state.select].total = bars[this.state.select].total + amount;
        } else if ((bars[this.state.select].total + amount) < 0) {
            bars[this.state.select].percentage = 0;
            bars[this.state.select].total = 0;

        } else {
            bars[this.state.select].percentage = bars[this.state.select].percentage + amount;
            bars[this.state.select].total = bars[this.state.select].total + amount
        }

        // Update state with updated bar data.
        this.setState({ bars });
    }

    render() {

        let buttons, bars, barOptions;

        // Map bar data to progress bars JSX
        bars = this.state.bars.map((bar, index) => {
            let color;

            // Check if total exceeds 100 if so change background to red.
            if (bar.total > 100) color = 'red';

            return (
                <div key={index}>
                    <div className="label">{bar.total}%</div>
                    <Progress className="bar bar-one" color={color} completed={bar.percentage} height={28} >
                    </Progress>
                </div>
            );
        });

        // Map bars to options JSX for select box
        barOptions = this.state.bars.map((bar, index) => {
            return (
                <option key={index} className="option" value={index}>#Progress {index + 1}</option>
            );
        });

        // Map buttons data to buttons JSX
        buttons = this.state.buttons.sort((a, b) => a - b).map((button, index) => {
            if (button > 0) {
                return (
                    <button key={index} className="button" onClick={() => this._updateProgress(button)}>+ {button}</button>
                );
            } else {
                return (
                    <button key={index} className="button" onClick={() => this._updateProgress(button)}>{button}</button>
                );
            }
        });

        // Return JSX
        return (
            <div className="container">
                <div className="col-md-12">
                    <div className="progressbars">
                        <h1>Progress Bars Demo</h1>

                        { bars }

                        <div className="progressbars-controls">
                            <select className="select" value={this.state.select} onChange={this._selectBar}>
                                {barOptions}
                            </select>
                            { buttons }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
