import React, { useState, useEffect } from "react";
import Display from "./components/Display";
import Buttons from "./components/Buttons";
import "./App.css";

function App() {
  const [displayState, setDisplayState] = useState({
    previous: "",
    current: "",
  });

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      const { key } = e;
      if (key >= "0" && key <= "9") {
        const syntheticEvent: React.MouseEvent<HTMLButtonElement> = {
          currentTarget: {
            textContent: key,
          },
          target: e.target as HTMLButtonElement,
        } as any;
        handleClick(syntheticEvent);
      } else if (key === "+" || key === "-") {
        const syntheticEvent: React.MouseEvent<HTMLButtonElement> = {
          currentTarget: {
            textContent: key,
          },
          target: e.target as HTMLButtonElement,
        } as any;
        handleOperator(syntheticEvent);
      } else if (key === "*") {
        const syntheticEvent: React.MouseEvent<HTMLButtonElement> = {
          currentTarget: {
            textContent: "x",
          },
          target: e.target as HTMLButtonElement,
        } as any;
        handleOperator(syntheticEvent);
      } else if (key === "/") {
        const syntheticEvent: React.MouseEvent<HTMLButtonElement> = {
          currentTarget: {
            textContent: "÷",
          },
          target: e.target as HTMLButtonElement,
        } as any;
        handleOperator(syntheticEvent);
      } else if (key === ".") {
        handleDecimal();
      } else if (key === "Enter" || key === "Return") {
        calculate();
      } else if (key === "Backspace" || key === "Delete") {
        deleteLast();
      } else if (key === "Escape") {
        clearDisplay();
      }
    };
    window.addEventListener("keydown", handle);
    return () => {
      window.removeEventListener("keydown", handle);
    };
  }, [displayState]);

  const handleClick = (e: React.MouseEvent) => {
    if (displayState.current === "0") {
      setDisplayState({
        previous: displayState.previous,
        current: "",
      });
    }
    if (displayState.previous.endsWith("= ")) {
      setDisplayState({
        previous: "",
        current: e.currentTarget.textContent ?? "",
      });
    } else {
      const buttonText = e.currentTarget.textContent; // Get text content directly from the button
      // console.log(buttonText);
      setDisplayState((prevState) => ({
        previous: prevState.previous,
        current: prevState.current + buttonText,
      }));
    }
  };

  const clearDisplay = () => {
    setDisplayState({
      previous: "",
      current: "0",
    });
  };

  const deleteLast = () => {
    setDisplayState({
      previous: displayState.previous,
      current: displayState.current.slice(0, -1),
    });
  };

  const calculate = () => {
    if (!displayState.previous.endsWith("= ")) {
      if (
        !displayState.previous.endsWith("+") ||
        !displayState.previous.endsWith("-") ||
        !displayState.previous.endsWith("x") ||
        !displayState.previous.endsWith("÷")
      ) {
        if (displayState.current !== "") {
          const expression = displayState.previous + displayState.current;
          setDisplayState({
            previous:
              displayState.previous + " " + displayState.current + " = ",
            current: eval(
              expression.replace(/x/g, "*").replace(/÷/g, "/")
            ).toString(),
          });
        }
      } else {
        setDisplayState({
          previous: displayState.previous + displayState.current,
          current: "",
        });
      }
    }
  };

  const handleOperator = (e: React.MouseEvent) => {
    // If the previous operand ends with an operator, replace it with the new operator
    if (displayState.previous.endsWith("= ")) {
      setDisplayState({
        previous: displayState.current + " " + e.currentTarget.textContent,
        current: "",
      });
    } else {
      if (
        displayState.previous.endsWith("+") ||
        displayState.previous.endsWith("-") ||
        displayState.previous.endsWith("x") ||
        displayState.previous.endsWith("÷")
      ) {
        if (displayState.current === "") {
          setDisplayState({
            previous: "0" + e.currentTarget.textContent,
            current: "",
          });
        } else {
          setDisplayState({
            previous:
              displayState.previous +
              displayState.current +
              " " +
              e.currentTarget.textContent,
            current: "",
          });
        }
      } else {
        if (displayState.current === "") {
          setDisplayState({
            previous: displayState.previous + " " + e.currentTarget.textContent,
            current: "",
          });
        } else {
          setDisplayState({
            previous:
              displayState.previous +
              displayState.current +
              " " +
              e.currentTarget.textContent,
            current: "",
          });
        }
      }
    }
  };

  const handleDecimal = () => {
    if (!displayState.current.includes(".")) {
      setDisplayState({
        previous: displayState.previous,
        current: displayState.current + ".",
      });
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
      <Buttons onClick={handleDecimal}>.</Buttons>
      <Buttons onClick={handleClick}>0</Buttons>
      <Buttons span="span-two" onClick={calculate}>
        =
      </Buttons>
    </div>
  );
}

export default App;
