import { useState } from 'react';
import './App.css';
import { numbers } from './assets/numbers.js';

function App() {
  const [formulaScreen, setFormulaScreen] = useState('');
  const [outputScreen, setOutputScreen] = useState('0');

  const getNumber = (e) => {
    const value = e.target.innerText;
    setFormulaScreen((prev) => (prev === '0' ? value : prev + value));
  };

  const clear = () => {
    setFormulaScreen('');
    setOutputScreen('0');
  };

  const calculate = () => {
    try {
      const sanitizedFormula = sanitizeFormula(formulaScreen);
      const result = eval(sanitizedFormula);
      setOutputScreen(result.toString());
      setFormulaScreen(result.toString());
    } catch (error) {
      setOutputScreen('Error');
    }
  };

  const handleDecimal = () => {
    setFormulaScreen((prev) => {
      const lastNumber = prev.split(/[\+\-\*\/]/).pop();
      if (!lastNumber.includes('.')) {
        return prev + '.';
      }
      return prev;
    });
  };

  const handleOperation = (e) => {
    const value = e.target.innerText;
    setFormulaScreen((prev) => {
      if (prev === '' && value === '-') {
        // Se la formula è vuota e il valore è un segno meno, inizia con un numero negativo
        return value;
      }

      if (/[+\-*/]$/.test(prev)) {
        // Se c'è già un operatore alla fine della formula
        if (value === '-') {
          // Permetti il segno meno dopo un altro operatore per indicare un numero negativo
          return prev + value;
        } else {
          // Sostituisci la serie di operatori con il nuovo operatore
          return prev.replace(/[+\-*/]+$/, value);
        }
      }

      return prev + value;
    });
  };

  const sanitizeFormula = (formula) => {
    // Assicurati che il segno meno sia considerato un numero negativo se preceduto da un altro operatore
    return formula.replace(/([+\-*/])-+/g, (match, operator) => operator + '-');
  };

  return (
    <div className="calculator-container ">
      <h1 style={{ color: 'black', textAlign: 'center' }}>Calculator</h1>
      <div id="display" className="formulaScreen">
        {formulaScreen || '0'}
      </div>
      <div id="display" className="outputScreen">
        {outputScreen}
      </div>

      <div className="number-grid">
        {numbers.map((elem) => {
          return (
            <div
              key={elem.numberID}
              id={elem.numberID}
              onClick={elem.number === '.' ? handleDecimal : getNumber} // Usa handleDecimal per il punto decimale
              className="number-item"
            >
              {elem.number}
            </div>
          );
        })}
      </div>
      <div id="equals" onClick={calculate}>
        =
      </div>
      <div className="operations">
        <span id="add" onClick={handleOperation}>
          +
        </span>
        <span id="subtract" onClick={handleOperation}>
          -
        </span>
        <span id="multiply" onClick={handleOperation}>
          *
        </span>
        <span id="divide" onClick={handleOperation}>
          /
        </span>
      </div>
      <div id="clear" onClick={clear}>
        clear
      </div>
    </div>
  );
}

export default App;
