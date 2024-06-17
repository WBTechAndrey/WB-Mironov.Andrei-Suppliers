import React, { FC, memo } from "react";
import style from "../../Forms/NewShipment/index.module.scss";
import { Txt } from "../Txt";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className: string;
}

export const FormFieldComponent: FC<FormFieldProps> = ({
  label,
  children,
  className,
}) => (
  <div className={style[className]}>
    <Txt className={style.info} text={label} />
    {children}
  </div>
);

export const FormField = memo(FormFieldComponent);
