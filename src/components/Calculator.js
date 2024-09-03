import { useEffect, useState } from "react";
import Button from "./Button";
import ReloadSVG from "@/assets/reload";
import MoonSVG from "@/assets/moon";
import SunSVG from "@/assets/sun";

export default function Calculator() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [previousValue, setPreviousValue] = useState(null);

  const btnBgColour = isDarkMode ? "bg-[#262b32]" : "bg-gray-200";
  const digitColour = isDarkMode ? "text-white" : "text-black";

  const getOperatorColor = (operator) => {
    switch (operator) {
      case "×":
      case "÷":
      case "-":
      case "+":
        return "text-red-600";

      default:
        return "text-green-600";
    }
  };
  const buttons = [
    {
      label: "AC",
      className: `${btnBgColour}` + ` ${getOperatorColor("AC")}` + " shadow-md",
      value: "AC",
    },
    {
      label: "±",
      className: `${btnBgColour}` + ` ${getOperatorColor("±")}` + " shadow-md",
      value: "±",
    },
    {
      label: "%",
      className: `${btnBgColour}` + ` ${getOperatorColor("%")}` + " shadow-md",
      value: "%",
    },
    {
      label: "÷",
      className: `${btnBgColour}` + ` ${getOperatorColor("÷")}` + " shadow-md",
      value: "÷",
    },
    {
      label: "7",
      className: `${btnBgColour}` + ` ${digitColour}` + " shadow-md",
      value: "7",
    },
    {
      label: "8",
      className: `${btnBgColour}` + ` ${digitColour}` + " shadow-md",
      value: "8",
    },
    {
      label: "9",
      className: `${btnBgColour}` + ` ${digitColour}` + " shadow-md",
      value: "9",
    },
    {
      label: "×",
      className: `${btnBgColour}` + ` ${getOperatorColor("×")}` + " shadow-md",
      value: "×",
    },
    {
      label: "4",
      className: `${btnBgColour}` + ` ${digitColour}` + " shadow-md",
      value: "4",
    },
    {
      label: "5",
      className: `${btnBgColour}` + ` ${digitColour}` + " shadow-md",
      value: "5",
    },
    {
      label: "6",
      className: `${btnBgColour}` + ` ${digitColour}` + " shadow-md",
      value: "6",
    },
    {
      label: "-",
      className: `${btnBgColour}` + ` ${getOperatorColor("-")}` + " shadow-md",
      value: "-",
    },
    {
      label: "1",
      className: `${btnBgColour}` + ` ${digitColour}` + " shadow-md",
      value: "1",
    },
    {
      label: "2",
      className: `${btnBgColour}` + ` ${digitColour}` + " shadow-md",
      value: "2",
    },
    {
      label: "3",
      className: `${btnBgColour}` + ` ${digitColour}` + " shadow-md",
      value: "3",
    },
    {
      label: "+",
      className: `${btnBgColour}` + ` ${getOperatorColor("+")}` + " shadow-md",
      value: "+",
    },
    {
      label: <ReloadSVG />,
      className: `${btnBgColour}` + ` ${digitColour}` + " shadow-md",
      value: "reload",
    },
    {
      label: "0",
      className: `${btnBgColour}` + ` ${digitColour}` + " shadow-md",
      value: "0",
    },
    {
      label: ".",
      className: `${btnBgColour}` + ` ${digitColour}` + " shadow-md",
      value: ".",
    },
    {
      label: "=",
      className: `${btnBgColour}` + ` ${getOperatorColor("=")}` + " shadow-md",
      value: "=",
    },
  ];

  useEffect(() => {
    reload();
  }, []);

  const reload = () => {
    setDisplayValue("0");
    setOperator(null);
    setWaitingForOperand(false);
    setPreviousValue(null);
  };

  const handleButtonClick = (value) => {
    switch (value) {
      case "AC":
        reload();
        break;

      case "±":
        setDisplayValue((prevValue) =>
          prevValue.charAt(0) === "-" ? prevValue.slice(1) : "-" + prevValue
        );
        break;

      case "%":
        setDisplayValue(String(parseFloat(displayValue) / 100));
        setWaitingForOperand(true);
        break;

      case ".":
        if (waitingForOperand) {
          setDisplayValue("0.");
          setWaitingForOperand(false);
        } else if (!displayValue.includes(".")) {
          setDisplayValue(displayValue + ".");
        }
        break;

      case "+":
      case "-":
      case "×":
      case "÷":
        handleOperator(value);
        break;

      case "=":
        if (operator && previousValue !== null) {
          const result = calculate(previousValue, displayValue, operator);
          setDisplayValue(String(result));
          setPreviousValue(null);
          setOperator(null);
          setWaitingForOperand(true);
        }
        break;

      case "reload":
        reload();
        break;

      default:
        if (waitingForOperand) {
          setDisplayValue(value);
          setWaitingForOperand(false);
        } else {
          setDisplayValue(displayValue === "0" ? value : displayValue + value);
        }
        break;
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      const result = calculate(currentValue, inputValue, operator);
      setPreviousValue(result);
      setDisplayValue(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (prev, next, operation) => {
    const prevValue = parseFloat(prev);
    const nextValue = parseFloat(next);

    if (operation === "+") return prevValue + nextValue;
    if (operation === "-") return prevValue - nextValue;
    if (operation === "×") return prevValue * nextValue;
    if (operation === "÷") return prevValue / nextValue;

    return nextValue;
  };

  return (
    <div className={`h-screen flex items-center justify-center bg-[#e6e6e8]`}>
      <div
        className={`w-80 rounded-3xl pt-5 ${
          isDarkMode ? "bg-[#23252c] text-white" : "bg-white text-black"
        }`}
      >
        <div className={`flex justify-center items-center mb-5 `}>
          <div
            className={`flex items-center mb-5 p-2 rounded-xl gap-4 ${
              isDarkMode ? "bg-[#292d36]" : "bg-[#f9f9f9]"
            }`}
          >
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`text-xl`}
            >
              <SunSVG color={isDarkMode ? "#5d5e67" : "black"} />
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`text-xl`}
            >
              <MoonSVG color={isDarkMode ? "white" : "#dfdedf"} />
            </button>
          </div>
        </div>

        <div className={`text-right text-md font-semibold mb-1 mr-4`}>
          {previousValue && previousValue}&nbsp;
          <span className={`${getOperatorColor(operator)}`}>{operator}</span>
          &nbsp;
          {previousValue && displayValue}
        </div>
        <div className={`text-right text-4xl font-semibold mb-5 mr-4`}>
          {displayValue}
        </div>
        <div
          className={`grid p-5 grid-cols-4 gap-3 rounded-3xl pt-7 pb-7 ${
            isDarkMode ? "bg-[#292d36]" : "bg-[#f9f9f9]"
          }`}
        >
          {buttons.map((button) => (
            <Button
              key={button.label}
              label={button.label}
              onClick={() => handleButtonClick(button.value)}
              className={button.className}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
