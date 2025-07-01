import React, { useEffect, useState } from "react";

const Result = ({ display = [], result, onSpanClick }) => {
  const displayText = display;
  const classes = `expression active-result`;

  const [preExpression, setPreExpression] = useState([]);

  useEffect(() => {
    const preExp = JSON.parse(localStorage.getItem("history")) || [];
    setPreExpression(preExp);
  }, [displayText]);

  const scrollToBottom = () => {
    const resultContainer = document.querySelector(".result-container"); // ✅ Fixed selector
    if (resultContainer) {
      resultContainer.scrollTop = resultContainer.scrollHeight;
    }
  };

  const scroll = (prevExps) => {
    const prevResult = document.querySelector(".prev-result");
    if (prevExps && prevExps.length > 0) {
      if (prevResult && !prevResult.classList.contains("prev-result-padd")) {
        prevResult.classList.add("prev-result-padd");
      }
    } else if (
      prevResult &&
      prevResult.classList.contains("prev-result-padd")
    ) {
      prevResult.classList.remove("prev-result-padd");
    }

    scrollToBottom(); // ✅ Ensuring scroll always happens
  };

  // Runs when `preExpression` updates
  useEffect(() => {
    scroll(preExpression);
  }, [preExpression]); // ✅ Now scrolls whenever history updates

  return (
    
    <div className="result-container">
      <div className="prev-result">
        {preExpression.length > 0 ? (
          preExpression.map((obj, index) => (
            <div key={index}>
              <p>{obj.exp}</p>
              <p>= {obj.value}</p>
            </div>
          ))
        ) : (
          <p>No history yet</p>
        )}
      </div>
      <div className="exp-with-result">
        <div className={classes}>
          {displayText.length > 0 ? (
            displayText.map((ele, index) => (
              <span
                key={index}
                id={index}
                onClick={onSpanClick}
                className="exp-span"
              >
                {ele}
              </span>
            ))
          ) : (
            <span>No Expression</span>
          )}
        </div>
        <span className="result">
          {displayText.join("") === "0" && result === "0" ? "" : `= ${result}`}
        </span>
      </div>
    </div>
  );
};

export default Result;
