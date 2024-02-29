interface buttonProps {
  children?: string;
  onClick: (e: React.MouseEvent) => void;
  span?: string;
}

const Buttons = ({ children, onClick, span }: buttonProps) => {
  return (
    <button className={"btn " + span} onClick={onClick}>
      {children}
    </button>
  );
};

export default Buttons;
