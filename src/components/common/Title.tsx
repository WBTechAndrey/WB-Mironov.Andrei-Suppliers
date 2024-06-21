import { FC, memo } from "react";

interface TitleProps {
  title: string;
  id?: string;
  type?: keyof JSX.IntrinsicElements;
  className?: string;
}

export const Title: FC<TitleProps> = memo(function Title({
  title,
  id = "page-title",
  type: Tag = "h2",
  ...props
}) {
  return (
    <Tag id={id} {...props}>
      {title}
    </Tag>
  );
});
