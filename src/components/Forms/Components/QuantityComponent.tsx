import React, { FC, useEffect, useState } from "react";
import { ModalField } from "./ModalField";
import style from "../NewShipment/index.module.scss";
import { Txt } from "../../common/Txt";
import { useSelector } from "react-redux";
import { RHF } from "../../../types";
import { selectEditQuantity } from "../../../store/EditShip/selectors";

interface QuantityProps extends Required<RHF> {}

export const QuantityComponent: FC<QuantityProps> = ({
  register,
  errors,
  setValue,
}) => {
  const [defaultValue, setDefaultValue] = useState("");
  const quantity = useSelector(selectEditQuantity);
  useEffect(() => {
    setDefaultValue(quantity);
    setValue("quantity", quantity);

    return () => {
      setDefaultValue("");
    };
  }, [quantity, setValue]);

  return (
    <ModalField label="Количество" className="dataContainer">
      <input
        type="number"
        className={`${style.date} ${style.quantity}`}
        placeholder={"0"}
        defaultValue={defaultValue}
        {...register("quantity", {
          required: false,
          maxLength: 12,
          onChange: (e) => {
            setValue("quantity", e.target.value);
          },
        })}
      />
      <Txt text={`шт.`}></Txt>
      {errors?.quantity && (
        <p className={style.error}>{errors.quantity.message}</p>
      )}
    </ModalField>
  );
};
