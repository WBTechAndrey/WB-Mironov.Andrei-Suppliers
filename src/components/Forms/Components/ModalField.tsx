import React, { FC, memo } from "react";
import style from "../NewShipment/index.module.scss";
import { Txt } from "../../common/Txt";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className: string;
}

export const ModalField: FC<FormFieldProps> = memo(
  ({ label, children, className }) => (
    <div className={style[className]}>
      <Txt className={style.info} text={label} />
      {children}
    </div>
  ),
);
