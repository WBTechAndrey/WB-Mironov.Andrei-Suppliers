import style from "./index.module.scss";
import { Button } from "../Button";
import React, { FC, memo, useCallback, useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux/redux";
import { AddShipState, EditShipState } from "../../../types";

interface FooterProps {
  onClose: (arg: boolean) => void;
  createPost?: (data: AddShipState) => void;
  updateShip?: (data: {
    id: string;
    data: Omit<EditShipState, "deliveryDate">;
  }) => void;
  target?: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess: boolean;
}

export const ModalFoot: FC<FooterProps> = memo(
  ({ onClose, createPost, target, isLoading, updateShip, isSuccess }) => {
    const addData = useAppSelector((state) => state.addShip);
    const updateData = useAppSelector((state) => state.editShip);

    const sendData = useCallback(async () => {
      if (createPost) createPost(addData);
      if (updateShip) {
        const id = updateData.id;
        updateShip({ id: id, data: updateData });
      }
    }, [createPost, updateShip, addData, updateData]);

    useEffect(() => {
      if (isSuccess) {
        onClose(true);
      }
    }, [isSuccess, onClose]);

    if (isLoading) {
      return <></>;
    }

    return (
      <footer className={style.footer}>
        <Button
          className={`${style.sendBtn} ${isLoading ? style.disabled : ""}`.trim()}
          onClick={sendData}
          text={target === "edit" ? `Сохранить` : "Создать"}
        ></Button>
        <Button
          className={style.rollbackBtn}
          onClick={() => onClose(true)}
          text={`Отменить`}
        ></Button>
      </footer>
    );
  },
);
