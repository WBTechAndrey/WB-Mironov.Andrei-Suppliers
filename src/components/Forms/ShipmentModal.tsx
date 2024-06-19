import style from "./NewShipment/index.module.scss";
import React, { FC, memo } from "react";
import { ModalHead } from "./Components/ModalHead";
import { ModalFoot } from "./Components/ModalFoot";
import { FooterPropsData, FormPropsData, Inputs } from "../../types";
import { FetchingInfo } from "../common/Info/FetchingInfo";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../hooks/redux/redux";
import { useSelector } from "react-redux";
import { selectDeliveryDate } from "../../store/AddShip/selectors";

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
    quantity: quantityReduxState,
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
      formState: { isSubmitSuccessful, errors },
    } = useForm<Inputs>();

    const isPastDate = (date: string) => {
      const [day, month, year] = date.split(".").map(Number);
      const selectedDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate < today;
    };

    const deliveryDate = useSelector(selectDeliveryDate);

    const addData = useAppSelector((state) => state.addShip);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
      if (title === "Новая поставка") {
        if (!deliveryDate) {
          setError("calendar", {
            type: "manual",
            message: "Дата поставки обязательна",
          });
          if (setOpened) setOpened();
          return;
        }

        if (isPastDate(deliveryDate)) {
          setError("calendar", {
            type: "manual",
            message: "Дата не может быть в прошлом",
          });
          if (setOpened) setOpened();
          return;
        }
        clearErrors("calendar");
      }
      const currentQuantity = getValues("quantity");
      if (currentQuantity.length === 0) {
        setError("quantity", {
          type: "manual",
          message: "Количество поставок обязательно",
        });
      }

      const quantity = getValues("quantity");
      const calendar = getValues("calendar");
      if (quantity && calendar) {
        if (footerProps.createPost) {
          const newData = {
            ...addData,
            deliveryDate: calendar,
            quantity: quantity,
          };
          footerProps.createPost(newData);
        }
      }
    };

    const methods = useForm();

    return (
      <>
        <div className={style.modalOverlay}>
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
                  className={style.form}
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
                    isSubmitSuccessful={isSubmitSuccessful}
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
