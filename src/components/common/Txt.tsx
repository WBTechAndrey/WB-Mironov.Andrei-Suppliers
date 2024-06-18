import { CSSProperties, FC, memo } from "react";

interface TextProps {
  className?: string;
  style?: CSSProperties;
  text?: string | null;
}

export const Txt: FC<TextProps> = memo(({ className, style, text = "" }) => {
  return (
    <span className={className} style={style}>
      {text}
    </span>
  );
});
