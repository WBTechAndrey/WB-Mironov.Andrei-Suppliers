import style from "./index.module.scss";
import { Button } from "components/common/Button";
import React, { FC, memo } from "react";
import { UseFormGetValues } from "react-hook-form";
import { FooterPropsData, FormPropsData, Inputs } from "types";
import { FetchingInfo } from "components/common/Loaders/FetchingInfo";

type FooterProps = Partial<FormPropsData> &
  FooterPropsData & {
    getValues: UseFormGetValues<Inputs>;
  };

export const ModalFoot: FC<FooterProps> = memo(
  ({
    onClose,
    target,
    isLoading,
    isErrorInit,
    isLoadingInit,
    isFetchingInit,
  }) => {
    const loadingData =
      isErrorInit || isFetchingInit || isLoadingInit || isLoading;

    return (
      <footer className={style.footer}>
        {loadingData ? (
          <FetchingInfo message={`Отправляем данные`} />
        ) : (
          <>
            <Button
              className={`${style.sendBtn} ${loadingData ? style.disabled : ""}`.trim()}
              onClick={() => {}}
              text={target === "edit" ? `Сохранить` : "Создать"}
            ></Button>
            <Button
              className={style.rollbackBtn}
              onClick={() => {
                onClose(true);
              }}
              text={`Отменить`}
            ></Button>
          </>
        )}
      </footer>
    );
  },
);
