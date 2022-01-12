import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL = "https://api.exchangerate.host/latest";
function App() {
  // we want to use useState to state which currency will be converted
  // we dont have any initial state so we put empty array
  const [currencyOptions, currencySelector] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  // we use useEffect hook to fetch data and return to empty array so it render once
  // we can not use async/await so use .then which will return a promise and then

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
       // we pick the first currency in the data.rates array
      .then((data) => {
        const initialCurrency = Object.keys(data.rates)[111];
        currencySelector([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(initialCurrency);
        setExchangeRate(data.rates[initialCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
      <h3>Crypto Converter</h3>
      {/* pass currency state as prop*/}
      
      <CurrencyRow
     
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">
      
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAuXRgPg6lcFiZtFOTSb8iiIInNuWiew0Yhw&usqp=CAU" width={20} height={20}></img></div>

      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
      </div>
      </header>
    </div>
  );
}

export default App;