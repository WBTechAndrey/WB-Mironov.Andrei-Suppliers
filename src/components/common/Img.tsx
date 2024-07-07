import { FC } from "react";

export const Img: FC<{
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}> = ({ src, alt, className, onClick }) => {
  return <img className={className} src={src} alt={alt} onClick={onClick} />;
};
