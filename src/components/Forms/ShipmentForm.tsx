import React, { FC, memo, useRef, useState } from "react";
import style from "./NewShipment/index.module.scss";
import { Txt } from "../common/Txt";
import { DropDownState } from "../../types";
import { Actions } from "./NewShipment/NewShipment";
import { styleNames } from "../../features/DropDown/DropDown";
import { ModalField } from "../common/Modals/ModalField";
import { ModalSelect } from "../common/Modals/ModalSelect";
import calendarIcon from "../../assets/icons/calendar.svg";
import Calendar from "color-calendar";
import { useAppDispatch } from "../../hooks/redux/redux";
import { DeliveryTypeComponent } from "./DeliveryTypeComponent";

interface ShipmentFormProps {
  target?: string;
  cities: DropDownState[];
  quantity: string;
  type: DropDownState[];
  warehouse: DropDownState[];
  status: DropDownState[];
  actions: Actions;
  deliveryDate?: string;
  setOpened?: () => void;
  focused?: (e: React.FocusEvent<HTMLInputElement>) => void;
  activeId?: string | null;
  calendarRef?: React.RefObject<Calendar | null> | undefined;
  CalendarComponent?: FC<{
    calendarRef: React.RefObject<Calendar | null> | undefined;
  }>;
}

export const ShipmentForm: FC<ShipmentFormProps> = memo(
  ({
    target,
    cities,
    quantity,
    type,
    warehouse,
    status,
    actions,
    deliveryDate,
    setOpened,
    focused,
    activeId,
    calendarRef,
    CalendarComponent,
  }) => {
    const QuantityComponent = () => {
      const [localQuantity, setLocalQuantity] = useState(quantity);
      const inputRef = useRef<HTMLInputElement>(null);
      const dispatch = useAppDispatch();

      const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        if (newValue.length > 1 && newValue.startsWith("0")) {
          newValue = newValue.slice(1);
        }
        const cursorPosition = e.target.selectionStart;
        setLocalQuantity(newValue);
        if (inputRef.current) {
          inputRef.current.selectionStart = cursorPosition;
          inputRef.current.selectionEnd = cursorPosition;
        }
      };

      const handleQuantityBlur = () => {
        dispatch(actions.setQuantity(localQuantity));
      };

      return (
        <ModalField label="Количество" className="dataContainer">
          <input
            ref={inputRef}
            type="text"
            className={`${style.date} ${style.quantity}`}
            value={localQuantity}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
          />
          <Txt text={`шт.`}></Txt>
        </ModalField>
      );
    };

    return (
      <>
        {setOpened && focused && (
          <ModalField label="Дата поставки" className="dataContainer">
            <input
              type="text"
              placeholder={deliveryDate || "__.__.____"}
              className={`${style.date} ${style.noFocus} noClose`}
              onClick={setOpened}
              onFocus={focused}
            />
            <img src={calendarIcon} alt="calendar icon" />
            {activeId === "calendar" && CalendarComponent && (
              <CalendarComponent calendarRef={calendarRef} />
            )}
          </ModalField>
        )}
        <ModalSelect
          label="Город"
          data={cities}
          action={actions.setCity}
          classNames={["modal", styleNames.fiveRows]}
        />
        {target === "edit" ? (
          <DeliveryTypeComponent type={type} setType={actions.setType} />
        ) : (
          <QuantityComponent />
        )}
        {target === "edit" ? (
          <QuantityComponent />
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
