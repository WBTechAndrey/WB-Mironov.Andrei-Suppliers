import { FC, MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  disabled = false,
  className = "btn",
  children,
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};
