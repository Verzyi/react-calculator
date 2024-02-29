import React, { useState } from "react";
import Display from "./components/Display";
import Buttons from "./components/Buttons";
import "./App.css";

function App() {
  const [displayState, setDisplayState] = useState({
    previous: "",
    current: "",
  });

  const handleClick = (e: React.MouseEvent) => {
    const buttonText = e.currentTarget.textContent; // Get text content directly from the button
    console.log(buttonText);
    setDisplayState((prevState) => ({
      previous: prevState.previous,
      current: prevState.current + buttonText,
    }));
  };

  const clearDisplay = () => {
    setDisplayState({
      previous: "",
      current: "",
    });
  };

  const deleteLast = () => {
    setDisplayState({
      previous: displayState.previous,
      current: "",
    });
  };

  const calculate = () => {
    setDisplayState({
      previous: displayState.current,
      current: "",
    });
  };

  const handleOperator = (e: React.MouseEvent) => {
    if (displayState.previous !== "") {
      setDisplayState({
        previous: "",
        current: displayState.previous + e.currentTarget.textContent,
      });
    } else {
      handleClick(e);
    }
  };

  return (
    <div className="calculatorGrid">
      <Display
        previous={displayState.previous}
        current={displayState.current}
      />
      <Buttons span="span-two" onClick={clearDisplay}>
        AC
      </Buttons>
      <Buttons onClick={deleteLast}>Del</Buttons>
      <Buttons onClick={handleOperator}>÷</Buttons>
      <Buttons onClick={handleClick}>1</Buttons>
      <Buttons onClick={handleClick}>2</Buttons>
      <Buttons onClick={handleClick}>3</Buttons>
      <Buttons onClick={handleOperator}>x</Buttons>
      <Buttons onClick={handleClick}>4</Buttons>
      <Buttons onClick={handleClick}>5</Buttons>
      <Buttons onClick={handleClick}>6</Buttons>
      <Buttons onClick={handleOperator}>+</Buttons>
      <Buttons onClick={handleClick}>7</Buttons>
      <Buttons onClick={handleClick}>8</Buttons>
      <Buttons onClick={handleClick}>9</Buttons>
      <Buttons onClick={handleOperator}>-</Buttons>
      <Buttons onClick={handleClick}>.</Buttons>
      <Buttons onClick={handleClick}>0</Buttons>
      <Buttons span="span-two" onClick={calculate}>
        =
      </Buttons>
    </div>
  );
}

export default App;
