import { FC, useCallback, useState } from "react";
import { Item } from "types";
import style from "./index.module.scss";
import edit from "assets/icons/mobile/edit.svg";
import { Txt } from "components/common/Txt";
import { createPortal } from "react-dom";
import { EditShipment } from "components/Forms/EditShipment";
import { useModal } from "hooks/useModal";

export const MobileRows: FC<{ item: Item }> = ({ item }) => {
  const { isModalShow, openModal, closeModal } = useModal();

  const [activeId, setActiveId] = useState("");
  const toggleShowModal = useCallback(() => {
    if (isModalShow) {
      closeModal();
    } else {
      openModal();
    }
  }, [closeModal, isModalShow, openModal]);
  const handleFigureClick = (id: string) => {
    setActiveId(id);
    toggleShowModal();
  };
  return (
    <>
      <section className={style.row}>
        <div className={style.number}>
          <Txt className={style.info} text={`Номер`}></Txt>
          <Txt className={style.value} text={item.number}></Txt>
        </div>
        <div
          className={`${item.status === "Задерживается" ? style.orange : style.green} ${style.status}`}
        >
          <Txt text={item.status}></Txt>
        </div>
        <div className={style.deliveryDate}>
          <Txt className={style.info} text={`Дата поставки`}></Txt>
          <Txt className={style.value} text={item.deliveryDate}></Txt>
        </div>
        <div className={style.editIcon}>
          <img
            onClick={() => handleFigureClick(String(item.id))}
            src={edit}
            alt="edit icon"
          />
        </div>
      </section>
      {isModalShow &&
        createPortal(
          <EditShipment onClose={toggleShowModal} activeId={activeId} />,
          document.body,
        )}
    </>
  );
};
