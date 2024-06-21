import React, { FC, useEffect, useState } from "react";
import { ModalField } from "./ModalField";
import style from "components/Forms/index.module.scss";
import { Txt } from "components/common/Txt";
import { useSelector } from "react-redux";
import { RHF } from "types";
import { selectEditQuantity } from "store/EditShip/selectors";

interface QuantityProps extends Required<RHF> {
  target: string | undefined;
}

export const QuantityComponent: FC<QuantityProps> = ({
  register,
  errors,
  setValue,
  target,
}) => {
  const [defaultValue, setDefaultValue] = useState("");
  const quantity = useSelector(selectEditQuantity);

  useEffect(() => {
    if (target === "edit") {
      setDefaultValue(formatNumber(quantity));
      setValue("quantity", quantity);
    }

    return () => {
      setDefaultValue("");
    };
  }, [quantity, setValue, target]);

  const formatNumber = (value: string) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 10) {
      const formattedValue = formatNumber(rawValue);
      setDefaultValue(formattedValue);
      setValue("quantity", rawValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const invalidChars = ["-", "+", "e", "E", ".", ","];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <ModalField label="Количество" className="dataContainer">
      <input
        type="text"
        className={`${style.date} ${style.quantity}`}
        placeholder={"0"}
        value={defaultValue}
        onKeyDown={handleKeyDown}
        {...register("quantity", {
          required: false,
          maxLength: 13,
          onChange: handleChange,
        })}
      />
      <Txt text={`шт.`}></Txt>
      {errors?.quantity && (
        <p className={style.error}>{errors.quantity.message}</p>
      )}
    </ModalField>
  );
};
