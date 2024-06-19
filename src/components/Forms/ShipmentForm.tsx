import React, { FC, memo } from "react";
import { Actions, DropDownState, Inputs, RHF } from "../../types";
import { styleNames } from "../../features/DropDown/DropDown";
import { ModalSelect } from "./Components/ModalSelect";
import Calendar from "color-calendar";
import { DeliveryTypeComponent } from "./Components/DeliveryTypeComponent";
import { QuantityComponent } from "./Components/QuantityComponent";
import { ModalField } from "./Components/ModalField";
import style from "./NewShipment/index.module.scss";
import calendarIcon from "../../assets/icons/calendar.svg";
import { UseFormSetValue } from "react-hook-form";

interface ShipmentFormProps extends RHF {
  target?: string;
  warehouse: DropDownState[];
  cities: DropDownState[];
  type: DropDownState[];
  status: DropDownState[];
  deliveryDate?: string;
  setOpened?: () => void;
  focused?: (e: React.FocusEvent<HTMLInputElement>) => void;
  activeId?: string | null;
  calendarRef?: React.RefObject<Calendar | null> | undefined;
  CalendarComponent?: FC<{
    calendarRef: React.RefObject<Calendar | null> | undefined;
    setValue?: UseFormSetValue<Inputs>;
  }>;
  actions: Actions;
}

export const ShipmentForm: FC<ShipmentFormProps> = memo(
  ({
    target,
    cities,
    type,
    warehouse,
    status,
    actions,
    deliveryDate,
    setOpened,
    activeId,
    calendarRef,
    CalendarComponent,
    register,
    errors,
    setValue,
  }) => {
    const formSettings = register && errors && setValue;

    return (
      <>
        {setOpened && register ? (
          <ModalField label="Дата поставки" className="dataContainer">
            <input
              type="text"
              placeholder={deliveryDate || "__.__.____"}
              className={`${style.date} ${style.noFocus} noClose`}
              onClick={setOpened}
              readOnly
              {...register("calendar", {
                required: false,
              })}
            />
            <img src={calendarIcon} alt="calendar icon" onClick={setOpened} />
            {activeId === "calendar" && CalendarComponent && setValue && (
              <CalendarComponent
                calendarRef={calendarRef}
                setValue={setValue}
              />
            )}
            {errors?.calendar && (
              <p className={style.error}>{errors.calendar.message}</p>
            )}
          </ModalField>
        ) : (
          ""
        )}
        <ModalSelect
          label="Город"
          data={cities}
          action={actions.setCity}
          classNames={["modal", styleNames.fiveRows]}
        />
        {target === "edit" ? (
          <DeliveryTypeComponent type={type} setType={actions.setType} />
        ) : formSettings ? (
          <QuantityComponent
            register={register}
            errors={errors}
            setValue={setValue}
          />
        ) : null}
        {target === "edit" && formSettings ? (
          <QuantityComponent
            register={register}
            errors={errors}
            setValue={setValue}
          />
        ) : (
          <DeliveryTypeComponent type={type} setType={actions.setType} />
        )}
        <ModalSelect
          label="Склад"
          data={warehouse}
          action={actions.setWarehouse}
          classNames={["modal", styleNames.threeRows]}
        />
        <ModalSelect
          label="Статус"
          data={status}
          action={actions.setStatus}
          classNames={["modal", styleNames.twoRows]}
        />
      </>
    );
  },
);
