import React, { Component } from 'react'
import Buttons from './Buttons'
import Formula from './Formula'
import Output from './Output'

// VARS:
const isOperator = /[x/+‑]/,
  endsWithOperator = /[x+‑/]$/,
  endsWithNegativeSign = /\d[x/+‑]{1}‑$/
  

export class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentVal: '0',
          prevVal: '0',
          formula: '',
          currentSign: 'pos',
          lastClicked: ''
        };
        this.maxDigitWarning = this.maxDigitWarning.bind(this);
        this.handleOperators = this.handleOperators.bind(this);
        this.handleEvaluate = this.handleEvaluate.bind(this);
        this.initialize = this.initialize.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
        this.handleNumbers = this.handleNumbers.bind(this);
      }
    
      maxDigitWarning() {
        this.setState({
          currentVal: 'Digit Limit Met',
          prevVal: this.state.currentVal
        });
        setTimeout(() => this.setState({ currentVal: this.state.prevVal }), 1000);
      }
    
      handleEvaluate() {
        if (!this.state.currentVal.includes('Limit')) {
          let expression = this.state.formula;
          while (endsWithOperator.test(expression)) {
            expression = expression.slice(0, -1);
          }
          expression = expression
            .replace(/x/g, '*')
            .replace(/‑/g, '-')
            .replace('--', '+0+0+0+0+0+0+');
          let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
          this.setState({
            currentVal: answer.toString(),
            formula:
              expression
                .replace(/\*/g, '⋅')
                .replace(/-/g, '‑')
                .replace('+0+0+0+0+0+0+', '‑-')
                .replace(/(x|\/|\+)‑/, '$1-')
                .replace(/^‑/, '-') +
              '=' +
              answer,
            prevVal: answer,
            evaluated: true
          });
        }
      }
    
      handleOperators(e) {
        if (!this.state.currentVal.includes('Limit')) {
          const value = e.target.value;
          const { formula, prevVal, evaluated } = this.state;
          this.setState({ currentVal: value, evaluated: false });
          if (evaluated) {
            this.setState({ formula: prevVal + value });
          } else if (!endsWithOperator.test(formula)) {
            this.setState({
              prevVal: formula,
              formula: formula + value
            });
          } else if (!endsWithNegativeSign.test(formula)) {
            this.setState({
              formula:
                (endsWithNegativeSign.test(formula + value) ? formula : prevVal) +
                value
            });
          } else if (value !== '‑') {
            this.setState({
              formula: prevVal + value
            });
          }
        }
      }
    
      handleNumbers(e) {
        if (!this.state.currentVal.includes('Limit')) {
          const { currentVal, formula, evaluated } = this.state;
          const value = e.target.value;
          this.setState({ evaluated: false });
          if (currentVal.length > 21) {
            this.maxDigitWarning();
          } else if (evaluated) {
            this.setState({
              currentVal: value,
              formula: value !== '0' ? value : ''
            });
          } else {
            this.setState({
              currentVal:
                currentVal === '0' || isOperator.test(currentVal)
                  ? value
                  : currentVal + value,
              formula:
                currentVal === '0' && value === '0'
                  ? formula === ''
                    ? value
                    : formula
                  : /([^.0-9]0|^0)$/.test(formula)
                  ? formula.slice(0, -1) + value
                  : formula + value
            });
          }
        }
      }
    
      handleDecimal() {
        if (this.state.evaluated === true) {
          this.setState({
            currentVal: '0.',
            formula: '0.',
            evaluated: false
          });
        } else if (
          !this.state.currentVal.includes('.') &&
          !this.state.currentVal.includes('Limit')
        ) {
          this.setState({ evaluated: false });
          if (this.state.currentVal.length > 21) {
            this.maxDigitWarning();
          } else if (
            endsWithOperator.test(this.state.formula) ||
            (this.state.currentVal === '0' && this.state.formula === '')
          ) {
            this.setState({
              currentVal: '0.',
              formula: this.state.formula + '0.'
            });
          } else {
            this.setState({
              currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
              formula: this.state.formula + '.'
            });
          }
        }
      }
    
      initialize() {
        this.setState({
          currentVal: '0',
          prevVal: '0',
          formula: '',
          currentSign: 'pos',
          lastClicked: '',
          evaluated: false
        });
      }
    
      render() {
        return (
          <div>
            <div className="calculator">
              <Formula formula={this.state.formula.replace(/x/g, '⋅')} />
              <Output currentValue={this.state.currentVal} />
              <Buttons
                decimal={this.handleDecimal}
                evaluate={this.handleEvaluate}
                initialize={this.initialize}
                numbers={this.handleNumbers}
                operators={this.handleOperators}
              />
            </div>
            <div className="author">
              {' '}
              Designed and Coded By <br />
              <a href="https://github.com/anuparashar0507" target="_blank" rel="noreferrer">
                Anupam Parashar
              </a>
            </div>
          </div>
        );
      }
}

export default Calculator
