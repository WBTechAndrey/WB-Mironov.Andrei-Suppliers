import style from "./NewShipment/index.module.scss";
import React, { FC, memo } from "react";
import { ModalHead } from "../common/Modals/ModalHead";
import { ModalFoot } from "../common/Modals/ModalFoot";
import { AddShipState, EditShipState } from "../../types";

interface FooterPropsData {
  createPost?: (data: AddShipState) => void;
  updateShip?: (data: {
    id: string;
    data: Omit<EditShipState, "deliveryDate">;
  }) => void;
  target?: string;
  isSuccess: boolean;
  isLoading?: boolean;
  onClose?: (arg: boolean) => void;
}

interface ShipmentModalProps {
  onClose: (arg: boolean) => void;
  number: string;
  title: string;
  formId: string;
  children: React.ReactNode;
  footerProps: FooterPropsData;
}

export const ShipmentModal: FC<ShipmentModalProps> = memo(
  ({ onClose, number, title, formId, children, footerProps }) => (
    <div className={style.modalOverlay}>
      <dialog
        className={`${style.modal} ${footerProps.target === "edit" ? style.editModal : ""}`.trim()}
        open
        aria-labelledby="modal-title"
        aria-describedby={formId}
      >
        <ModalHead onClose={onClose} number={number} title={title} />
        <form className={style.form} id={formId}>
          {children}
        </form>
        <ModalFoot onClose={onClose} {...footerProps} />
      </dialog>
    </div>
  ),
);
