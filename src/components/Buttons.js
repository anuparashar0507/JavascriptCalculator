import React, { Component } from 'react'

const clearStyle = { background: '#ac3939' },
operatorStyle = { background: '#666666' },
equalsStyle = {
  background: '#004466',
  position: 'absolute',
  height: 130,
  bottom: 5
};

export class Buttons extends Component {
    render() {
        return (
          <div>
            <button
              className="jumbo"
              id="clear"
              onClick={this.props.initialize}
              style={clearStyle}
              value="AC"
            >
              AC
            </button>
            <button
              id="divide"
              onClick={this.props.operators}
              style={operatorStyle}
              value="/"
            >
              /
            </button>
            <button
              id="multiply"
              onClick={this.props.operators}
              style={operatorStyle}
              value="x"
            >
              x
            </button>
            <button id="seven" onClick={this.props.numbers} value="7">
              7
            </button>
            <button id="eight" onClick={this.props.numbers} value="8">
              8
            </button>
            <button id="nine" onClick={this.props.numbers} value="9">
              9
            </button>
            <button
              id="subtract"
              onClick={this.props.operators}
              style={operatorStyle}
              value="‑"
            >
              ‑
            </button>
            <button id="four" onClick={this.props.numbers} value="4">
              4
            </button>
            <button id="five" onClick={this.props.numbers} value="5">
              5
            </button>
            <button id="six" onClick={this.props.numbers} value="6">
              6
            </button>
            <button
              id="add"
              onClick={this.props.operators}
              style={operatorStyle}
              value="+"
            >
              +
            </button>
            <button id="one" onClick={this.props.numbers} value="1">
              1
            </button>
            <button id="two" onClick={this.props.numbers} value="2">
              2
            </button>
            <button id="three" onClick={this.props.numbers} value="3">
              3
            </button>
            <button
              className="jumbo"
              id="zero"
              onClick={this.props.numbers}
              value="0"
            >
              0
            </button>
            <button id="decimal" onClick={this.props.decimal} value=".">
              .
            </button>
            <button
              id="equals"
              onClick={this.props.evaluate}
              style={equalsStyle}
              value="="
            >
              =
            </button>
          </div>
        );
      }
}

export default Buttons
