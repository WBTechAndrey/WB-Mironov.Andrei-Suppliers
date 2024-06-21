import style from "./index.module.scss";
import { ProductManagementForm } from "./ProductManagementForm/ProductManagementForm";
import React, { memo, useEffect, useState } from "react";
import { Title } from "../common/Title";
import { useViewport } from "../../hooks/useViewport";
import { AddButton } from "./ProductManagementForm/AddButton";
import { createPortal } from "react-dom";
import { NewShipment } from "../Forms/NewShipment/NewShipment";
import { useModal } from "../../hooks/useModal";
import { PaginationCounter } from "../Pagination/PaginationCounter/PaginationCounter";
import { BASIC_WIDTH, MOBILE_WIDTH } from "../../constants";

export const Header = memo(() => {
  const [viewport, setViewport] = useState(BASIC_WIDTH);
  const { width } = useViewport();
  useEffect(() => {
    setViewport(width);
  }, [viewport, width]);

  const { isModalShow, openModal, closeModal } = useModal();

  return (
    <header className={style.header}>
      <Title title="Поставки" type="h1" className={style.title} />
      {width <= MOBILE_WIDTH ? (
        <>
          <PaginationCounter />
          <AddButton openModal={openModal} />
        </>
      ) : (
        <ProductManagementForm openModal={openModal} />
      )}
      {isModalShow &&
        createPortal(<NewShipment onClose={closeModal} />, document.body)}
    </header>
  );
});
