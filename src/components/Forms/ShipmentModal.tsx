import style from "components/Forms/index.module.scss";
import React, { FC, memo } from "react";
import { ModalHead } from "./Components/ModalHead";
import { ModalFoot } from "./Components/ModalFoot";
import { FooterPropsData, FormPropsData, Inputs } from "types";
import { FetchingInfo } from "../common/Loaders/FetchingInfo";
import { FormProvider, useForm } from "react-hook-form";
import { useAppSelector } from "hooks/redux/redux";
import { useSelector } from "react-redux";
import { selectDeliveryDate } from "store/AddShip/selectors";
import { withSubmitProps } from "helpers/ValidateForm";

interface ShipmentModalProps {
  number: string;
  title: string;
  formId: string;
  componentToRender: React.ReactNode;
  footerProps: FooterPropsData;
  formProps?: FormPropsData;
  setOpened?: () => void;
  quantity: string;
}

export const ShipmentModal: FC<ShipmentModalProps> = memo(
  ({
    number,
    title,
    formId,
    componentToRender: SuperComponent,
    footerProps,
    formProps,
    setOpened,
  }) => {
    const {
      register,
      handleSubmit,
      watch,
      getValues,
      setValue,
      setError,
      clearErrors,
      control,
      formState: { errors },
    } = useForm<Inputs>();

    const deliveryDate = useSelector(selectDeliveryDate);
    const updateData = useAppSelector((state) => state.editShip);
    const addData = useAppSelector((state) => state.addShip);

    const methods = useForm();

    const onSubmit = withSubmitProps({
      title,
      deliveryDate,
      setError,
      setOpened,
      clearErrors,
      getValues,
      footerProps,
      addData,
      updateData,
    });

    return (
      <>
        <div
          id={`close`}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            const target = e.target as HTMLElement;
            if (target.id === "close") {
              footerProps.onClose(true);
            }
          }}
          className={style.modalOverlay}
        >
          <dialog
            className={`${style.modal} ${footerProps.target === "edit" ? style.editModal : ""}`.trim()}
            open
            aria-labelledby="modal-title"
            aria-describedby={formId}
          >
            <ModalHead
              onClose={footerProps.onClose}
              number={number}
              title={title}
            />
            {formProps?.isLoadingInit || formProps?.isFetchingInit ? (
              <>
                <FetchingInfo message={`Загружаем данные...`} />
              </>
            ) : formProps?.isErrorInit ? (
              <>
                <FetchingInfo
                  message={`Кажется произошла какая то ошибка...`}
                />
              </>
            ) : (
              <FormProvider {...methods}>
                <form
                  className={`${style.form} ${footerProps.target === "edit" ? style.editForm : ""}`.trim()}
                  id={formId}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {React.cloneElement(SuperComponent as React.ReactElement, {
                    register,
                    watch,
                    control,
                    errors,
                    setValue,
                  })}
                  <ModalFoot
                    getValues={getValues}
                    {...footerProps}
                    {...formProps}
                  />
                </form>
              </FormProvider>
            )}
          </dialog>
        </div>
      </>
    );
  },
);
