import { FC, memo, MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  text?: string;
}

export const Button: FC<ButtonProps> = memo(
  ({ onClick, disabled = false, className, children, text }) => {
    return (
      <button onClick={onClick} disabled={disabled} className={className}>
        {children}
        {text}
      </button>
    );
  },
);
