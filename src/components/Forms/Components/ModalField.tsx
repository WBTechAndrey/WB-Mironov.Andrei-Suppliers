import React, { FC, memo } from "react";
import style from "components/Forms/index.module.scss";
import { Txt } from "components/common/Txt";

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
