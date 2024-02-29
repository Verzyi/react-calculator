interface DisplayProps {
  previous: string;
  current: string;
}

const Display = ({ previous, current = "0" }: DisplayProps) => {
  return (
    <div className="outPut">
      <div className="previousOperand">{previous}</div>
      <div className="currentOperand">{current}</div>
    </div>
  );
};

export default Display;
