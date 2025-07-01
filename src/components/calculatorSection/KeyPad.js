import {
  faCheck,
  faCircle,
  faDeleteLeft,
  faDivide,
  faMinus,
  faPercent,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const KeyPad = (props) => {
  const isSpanActive = props.isSpanActive;
  const isOperatorActive = props.isOperatorActive;

  const OperatorClasses = isSpanActive ? `org-key disable-btn ` : `org-key`;
  const backspaceClass = isOperatorActive ? `org-key disable-btn` : `org-key`;
  const allClearClass =
    isSpanActive || isOperatorActive ? `org-key disable-btn` : `org-key`;
  const checkClasses = `equal-key checkmark`;
  return (
    <div className="keypad-container">
      <div className="flex-row">
        <input
          title="All clear"
          type="button"
          name="AC"
          value="AC"
          className={allClearClass}
          disabled={isSpanActive || isOperatorActive}
          onClick={(e) => props.onClick(e.target.name)}
        />
        <button
          aria-label="backspace"
          id="icon"
          name="DEL"
          title="Backspace"
          className={backspaceClass}
          disabled={isOperatorActive}
          onClick={() => props.onClick("DEL")}
        >
          <FontAwesomeIcon icon={faDeleteLeft} />
        </button>
        <button
          aria-label="mod"
          id="icon"
          name="%"
          title="Mode"
          className={OperatorClasses}
          disabled={isSpanActive}
          onClick={() => props.onClick("%")}
        >
          <FontAwesomeIcon icon={faPercent} />
        </button>
        <button
          aria-label="divide"
          id="icon"
          name="/"
          className={OperatorClasses}
          disabled={isSpanActive}
          onClick={() => props.onClick("/")}
          title="Divide"
        >
          <FontAwesomeIcon icon={faDivide} />
        </button>
      </div>

      <div className="flex-row">
        <input
          type="button"
          name="7"
          value="7"
          disabled={isOperatorActive}
          onClick={(e) => props.onClick(e.target.name)}
        />
        <input
          type="button"
          name="8"
          value="8"
          disabled={isOperatorActive}
          onClick={(e) => props.onClick(e.target.name)}
        />
        <input
          type="button"
          name="9"
          value="9"
          disabled={isOperatorActive}
          onClick={(e) => props.onClick(e.target.name)}
        />
        <button
          aria-label="multiply"
          id="icon"
          name="*"
          className={OperatorClasses}
          disabled={isSpanActive}
          onClick={() => props.onClick("*")}
          title="Multiply"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <div className="flex-row">
        <input
          type="button"
          name="4"
          value="4"
          disabled={isOperatorActive}
          onClick={(e) => props.onClick(e.target.name)}
        />
        <input
          type="button"
          name="5"
          value="5"
          disabled={isOperatorActive}
          onClick={(e) => props.onClick(e.target.name)}
        />
        <input
          type="button"
          name="6"
          value="6"
          disabled={isOperatorActive}
          onClick={(e) => props.onClick(e.target.name)}
        />
        <button
          aria-label="minus"
          id="icon"
          name="-"
          className={OperatorClasses}
          disabled={isSpanActive}
          onClick={() => props.onClick("-")}
          title="Minus"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>

      <div className="flex-row">
        <input
          type="button"
          name="1"
          value="1"
          disabled={isOperatorActive}
          onClick={(e) => props.onClick(e.target.name)}
        />
        <input
          type="button"
          name="2"
          value="2"
          disabled={isOperatorActive}
          onClick={(e) => props.onClick(e.target.name)}
        />
        <input
          type="button"
          name="3"
          value="3"
          disabled={isOperatorActive}
          onClick={(e) => props.onClick(e.target.name)}
        />
        <button
          aria-label="plus"
          id="icon"
          name="+"
          title="Plus"
          className={OperatorClasses}
          disabled={isSpanActive}
          onClick={(e) => props.onClick(e.currentTarget.name)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <div className="flex-row">
        <input
          type="button"
          name="0"
          value="0"
          disabled={isOperatorActive}
          onClick={(e) => props.onClick(e.target.name)}
        />
        <button
          aria-label="dot"
          name="."
          title="Dot"
          className="dot"
          id="icon"
          disabled={isOperatorActive}
          onClick={(e) => props.onClick(e.currentTarget.name)}
        >
          <FontAwesomeIcon icon={faCircle} />
        </button>
        {isOperatorActive || isSpanActive ? (
          <button aria-label="Ok" type="button" className={checkClasses} title="Ok" onClick={props.offSpanClick}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        ) : (
          <input
            name="="
            onClick={(e) => props.onClick(e.target.name)}
            type="button"
            value="="
            className="equal-key"
            title="Equal"
          />
        )}
      </div>
    </div>
  );
};

export default KeyPad;
