import { Txt } from "../Txt";
import { FC } from "react";
import style from "./indes.module.scss";

interface FetchingInfoProps {
  message: string;
}

export const FetchingInfo: FC<FetchingInfoProps> = ({ message }) => {
  return (
    <>
      <div className={style.error}>
        <Txt text={message} />
      </div>
    </>
  );
};
