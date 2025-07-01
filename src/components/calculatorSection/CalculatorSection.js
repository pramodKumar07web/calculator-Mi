import React, { useState } from "react";
import KeyPad from "./KeyPad";
import Result from "./Result";
import { evaluate } from "mathjs";

const CalculatorSection = () => {
  const [display, setDisplay] = useState(["0"]);
  const [result, setResult] = useState("0");
  const [isEqualClicked, setIsEqualClicked] = useState(false);
  const [isOperatorActive, setIsOperatorActive] = useState(false);
  const [isSpanActive, setIsSpanActive] = useState(false);

  const handleEqual = () => {
    const check = result === "0" && display.join(" ") === "0";
    if (!check && !isEqualClicked) {
      setIsEqualClicked(true);
      storeLastOperation();
      active_result();
    }
  };

  const storeLastOperation = () => {
    const prevExp = { exp: display, value: result };
    if (localStorage.getItem("history")) {
      const expression = JSON.parse(localStorage.getItem("history"));
      expression.push(prevExp);
      window.localStorage.setItem("history", JSON.stringify(expression));
    } else {
      window.localStorage.setItem("history", JSON.stringify([prevExp]));
    }
  };

  const active_exp = () => {
    const displayText = document.querySelector(".expression");
    const result_element = document.querySelector(".active-result");
    if (displayText !== result_element) {
      displayText.classList.add("active-result");
      result_element.classList.remove("active-result");
    }
  };

  const active_result = () => {
    const displayText = document.querySelector(".active-result");
    const result_element = document.querySelector(".result");
    if (displayText !== result_element) {
      displayText.classList.remove("active-result");
      result_element.classList.add("active-result");
    }
  };

  const handleClear = () => {
    if (display.join("") !== "0") {
      reset();
    } else {
      deleteHistory();
    }
  };

  const reset = () => {
    setDisplay(["0"]);
    setIsEqualClicked(false);
    setResult("0");
    active_exp();
  };

  const deleteHistory = () => {
    if (localStorage.getItem("history")) {
      let history = JSON.parse(localStorage.getItem("history"));
      if (history.length > 0) {
        const { exp, value } = history[history.length - 1];
        setDisplay(exp);
        setResult(value);
        history.pop();
        window.localStorage.setItem("history", JSON.stringify(history));
      }
    }
  };

  const handleBackSpace = () => {
    if (isSpanActive) {
      handleSpanBackSpace();
    } else {
      backSpace();
    }
  };

  const handleSpanBackSpace = () => {
    const activeSpan = document.querySelector(".active-exp-span");
    let displayText = [...display];
    let current = displayText[activeSpan.id];
    if (current.length > 1) {
      displayText[activeSpan.id] = current.slice(0, -1);
      setDisplay(displayText);
      calculate(displayText);
    } else {
      displayText[activeSpan.id] = "0";
      setDisplay(displayText);
      calculate(displayText);
    }
  };

  const backSpace = () => {
    if (isEqualClicked) {
      setIsEqualClicked(false);
      active_exp();
    }
    const exp = [...display];
    if (exp.length >= 1) {
      const last = exp[exp.length - 1];
      if (last.length > 1) {
        const newArr = [...exp];
        newArr.pop();
        newArr.push(last.slice(0, -1));
        setDisplay(newArr);
        calculate(newArr);
      } else if (exp.length === 1 && last.length === 1) {
        setDisplay(["0"]);
        setResult("0");
      } else {
        setDisplay(exp.slice(0, -1));
        calculate(exp.slice(0, -1));
      }
    }
  };

  const handleOperator = (val, checkSigns) => {
    if (isOperatorActive || isSpanActive) {
      handleSpanChanges(val);
    } else {
      let textArray = [...display];
      const last_val = textArray[textArray.length - 1];
      if (checkSigns.test(last_val)) {
        replaceSign(val, textArray);
      } else {
        if (isEqualClicked) {
          handleEqualActive(val);
        } else {
          textArray.push(val);
          setDisplay(textArray);
        }
      }
    }
  };

  const handleSpanChanges = (val) => {
    const activeSpan = document.querySelector(".active-exp-span");
    let displayText = [...display];
    const checkSigns = /(\+|-|\*|\/|%)/i;
    if (checkSigns.test(val) || displayText[activeSpan.id] === "0") {
      displayText[activeSpan.id] = val;
      setDisplay(displayText);
      calculate(displayText);
    } else if (displayText[activeSpan.id].length < 15) {
      displayText[activeSpan.id] += val;
      setDisplay(displayText);
      calculate(displayText);
    }
  };

  const handleEqualActive = (val) => {
    if (result === "Can't divide by 0") {
      let newArr = ["0", val];
      setDisplay(newArr);
      setResult("0");
      setIsEqualClicked(false);
      active_exp();
    } else {
      let newArr = [result.toString()]; // Ensure result is a string
      newArr.push(val);
      setDisplay(newArr);
      setIsEqualClicked(false);
      active_exp();
    }
  };

  const replaceSign = (val, textArray) => {
    textArray.pop();
    textArray.push(val);
    setDisplay(textArray);
    if (isEqualClicked) {
      setIsEqualClicked(false);
      active_exp();
    }
  };

  const handleButtonClick = (val) => {
    const checkSigns = /(\+|-|\*|\/|%)/i;
    if (val === "=") {
      handleEqual();
    } else if (val === "AC") {
      handleClear();
    } else if (val === "DEL") {
      handleBackSpace();
    } else if (checkSigns.test(val)) {
      handleOperator(val, checkSigns);
    } else {
      if (isEqualClicked) {
        if (val === ".") {
          let dot = ["0."];
          setDisplay(dot);
          calculate(dot);
        } else {
          setDisplay([val]);
          calculate([val]);
        }
        setIsEqualClicked(false);
        active_exp();
      } else {
        if (isOperatorActive || isSpanActive) {
          handleSpanChanges(val);
        } else {
          handleDigits(val);
        }
      }
    }
  };

  const handleDigits = (val) => {
    let displayText = [...display]; // Copy state
    let current = displayText[displayText.length - 1] || "";

    const isNumber = /^\d+(\.\d*)?$/; // Matches numbers and decimals

    if (val === ".") {
      // ✅ Handling Decimal Point (".")
      if (current.includes(".")) return; // Prevent multiple dots in a number

      if (!isNumber.test(current)) {
        // If dot is entered after an operator or at the start
        displayText.push("0.");
      } else {
        displayText[displayText.length - 1] = current + "."; // Append dot
      }
    } else if (isNumber.test(val)) {
      // ✅ Handling Numbers
      if (displayText.length === 1 && displayText[0] === "0") {
        displayText = [val]; // Replace "0" with first number
      } else if (isNumber.test(current)) {
        displayText[displayText.length - 1] += val; // Append to current number
      } else {
        displayText.push(val); // Start a new number after an operator
      }
    }

    setDisplay(displayText);
    calculate(displayText);
  };

  const calculate = (updatedDisplay) => {
    try {
      let expString = updatedDisplay.join(""); // Join array into a string
  
      // ❌ Prevent evaluation if expression ends with an operator
      if (/[+\-*/]$/.test(expString)) {
        expString = expString.slice(0, -1); // Remove the last operator
      }
  
      let computedResult = evaluate(expString); // Evaluate the expression
  
      // Handle division by zero or invalid operations
      if (!isFinite(computedResult) || isNaN(computedResult)) {
        computedResult = "Can't divide by 0";
      } else {
        // Convert large results to scientific notation
        computedResult =
          computedResult.toString().length > 15
            ? parseFloat(computedResult).toExponential(4)
            : computedResult;
      }
  
      setResult(computedResult);
    } catch (error) {
      console.error("Calculation error:", error.message);
      setResult("Error");
    }
  };
  

  const onSpanClick = (event) => {
    if (isEqualClicked) {
      active_exp();
      setIsEqualClicked(false);
    }
    const activeSpan = document.querySelector(".active-exp-span");
    activeSpan && activeSpan.classList.remove("active-exp-span");
    event.target.classList.add("active-exp-span");
    if (isNaN(event.target.innerText)) {
      setIsOperatorActive(true);
      setIsSpanActive(false);
    } else {
      setIsSpanActive(true);
      setIsOperatorActive(false);
    }
  };

  const offSpanClick = () => {
    setIsSpanActive(false);
    setIsOperatorActive(false);
    const activeSpan = document.querySelector(".active-exp-span");
    activeSpan && activeSpan.classList.remove("active-exp-span");
  };

  return (
    <div className="calculator-container">
      <Result display={display} result={result} onSpanClick={onSpanClick} />
      <KeyPad
        onClick={handleButtonClick}
        isOperatorActive={isOperatorActive}
        isSpanActive={isSpanActive}
        offSpanClick={offSpanClick}
      />
    </div>
  );
};

export default CalculatorSection;
