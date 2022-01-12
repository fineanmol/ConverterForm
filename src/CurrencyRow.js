import React from "react";

export default function CurrencyRow(props) {
    // destructure props 
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;
  return (
    <div >
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
        min="0.001"
		step="0.001"
      />
       <div className="dropdown-box">
      <select value={selectedCurrency} onChange={onChangeCurrency}>
         
        {currencyOptions.map((option) => (
          <option key={{option}+{option}} value={option}>
            {option}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
}