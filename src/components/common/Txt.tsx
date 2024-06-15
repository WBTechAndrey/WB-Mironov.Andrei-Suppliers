import { CSSProperties, FC } from "react";

interface TextProps {
  className?: string;
  style?: CSSProperties;
  text?: string | null;
}

export const Txt: FC<TextProps> = ({ className, style, text = "" }) => {
  return (
    <span className={className} style={style}>
      {text}
    </span>
  );
};
