import style from "./index.module.scss";
import { ProductManagementForm } from "components/Header/ProductManagementForm";
import React, { FC, memo } from "react";
import { Title } from "../common/Title";
import { AddButton } from "components/Header/ProductManagementForm/components/AddButton";
import { createPortal } from "react-dom";
import { NewShipment } from "components/Forms/NewShipment";
import { useModal } from "hooks/useModal";
import { PaginationCounter } from "components/Pagination/PaginationCounter";
import { BASIC_WIDTH, MOBILE_WIDTH } from "../../constants";
import { useResponsiveViewport } from "hooks/useResponsiveViewport";

export const Header: FC<{ title: string }> = memo(({ title }) => {
  const { viewport } = useResponsiveViewport(BASIC_WIDTH);

  const { isModalShow, openModal, closeModal } = useModal();

  return (
    <header className={style.header}>
      <Title title={title} type="h1" className={style.title} />
      {title === "Поставки" ? (
        <>
          {viewport <= MOBILE_WIDTH ? (
            <>
              <PaginationCounter />
              <AddButton openModal={openModal} />
            </>
          ) : (
            <ProductManagementForm openModal={openModal} />
          )}
        </>
      ) : null}

      {isModalShow &&
        createPortal(<NewShipment onClose={closeModal} />, document.body)}
    </header>
  );
});
