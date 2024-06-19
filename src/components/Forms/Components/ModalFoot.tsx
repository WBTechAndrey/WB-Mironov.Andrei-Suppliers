import style from "./index.module.scss";
import { Button } from "../../common/Button";
import React, { FC, memo, useCallback, useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux/redux";
import { UseFormGetValues } from "react-hook-form";
import { FooterPropsData, FormPropsData, Inputs } from "../../../types";

type FooterProps = Partial<FormPropsData> &
  FooterPropsData & {
    isSubmitSuccessful: boolean;
    getValues: UseFormGetValues<Inputs>;
  };

export const ModalFoot: FC<FooterProps> = memo(
  ({
    onClose,
    target,
    isLoading,
    updateShip,
    isSuccess,
    isErrorInit,
    isLoadingInit,
    isFetchingInit,
    getValues,
  }) => {
    const updateData = useAppSelector((state) => state.editShip);

    const loadingData =
      isErrorInit || isFetchingInit || isLoadingInit || isLoading;

    const sendData = useCallback(async () => {
      const quantity = getValues("quantity");
      if (quantity) {
        if (updateShip) {
          const newData = {
            ...updateData,
            quantity: quantity,
          };
          const id = updateData.id;
          updateShip({ id: id, data: newData });
        }
      }
    }, [getValues, updateShip, updateData]);

    useEffect(() => {
      if (isSuccess) {
        onClose(true);
      }
    }, [isSuccess, onClose]);

    if (loadingData) {
      return <></>;
    }

    return (
      <footer className={style.footer}>
        <Button
          className={`${style.sendBtn} ${loadingData ? style.disabled : ""}`.trim()}
          onClick={sendData}
          text={target === "edit" ? `Сохранить` : "Создать"}
        ></Button>
        <Button
          className={style.rollbackBtn}
          onClick={(e) => {
            e.preventDefault();
            onClose(true);
          }}
          text={`Отменить`}
        ></Button>
      </footer>
    );
  },
);
