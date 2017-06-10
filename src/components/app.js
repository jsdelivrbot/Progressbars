import React, {Component} from 'react';
import Progress from 'react-progressbar';
import './progress.css';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 0,
            buttons: [],
            bars: []
        }

        this._selectBar = this._selectBar.bind(this);
        this._updateProgress = this._updateProgress.bind(this);

        this._getBars();
    }

    _getBars() {
        const self = this;
        axios.get('http://frontend-exercise.apps.staging.digital.gov.au/bars')
          .then(function (response) {

              let bars = [];
              response.data.bars.forEach(function (value) {
                  bars.push({ total: value, percentage: value })
              });
              self.setState({ bars, buttons: response.data.buttons });
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    _selectBar(event) {
        this.setState({ select: event.target.value });
    }

    _updateProgress(amount) {
        let bars = this.state.bars;

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

        this.setState({ bars });
    }

    render() {

        const bars = this.state.bars.map((bar, index) => {

            let color;
            if (bar.total > 100) color = 'red';

            return (
                <div key={index}>
                    <div className="label">{bar.total}%</div>
                    <Progress className="bar bar-one" color={color} completed={bar.percentage} height={28} >
                    </Progress>
                </div>
            );
        });

        const barOptions = this.state.bars.map((bar, index) => {
            return (
                <option key={index} value={index}>#Progress {index + 1}</option>
            );
        });

        const buttons = this.state.buttons.sort().map((button, index) => {

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

        return (
            <div className="container">
                <div className="col-md-12">
                    <div className="progressbars">
                        <h1>Progress Bars Demo</h1>

                        { bars }
                        <div className="progressbars-controls">
                            <select value={this.state.select} onChange={this._selectBar}>
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
