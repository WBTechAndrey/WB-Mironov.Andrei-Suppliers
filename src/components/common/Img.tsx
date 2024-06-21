import { FC } from "react";

export const Img: FC<{ src: string; alt: string; className?: string }> = ({
  src,
  alt,
  className,
}) => {
  return <img className={className} src={src} alt={alt} />;
};
