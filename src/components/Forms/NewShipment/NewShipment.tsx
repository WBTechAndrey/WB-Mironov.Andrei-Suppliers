import style from "./index.module.scss";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { CalendarComponent } from "../../../features/Calendar/Calendar";
import calendarIcon from "../../../assets/icons/calendar.svg";
import { styleNames } from "../../../features/DropDown/DropDown";
import { useAppDispatch } from "../../../hooks/redux/redux";
import Calendar from "color-calendar";
import {
  resetSelections,
  setCitySelected,
  setQuantity,
  setStatus,
  setType,
  setWarehouse,
} from "../../../store/AddShip/AddShipSlice";
import { FormField } from "../../common/Modals/FormField";
import { SelectField } from "../../common/Modals/SelectField";
import { Txt } from "../../common/Txt";
import { setActiveId } from "../../../store/OpenDropDownMenu/isOpenSlice";
import {
  selectCities,
  selectQuantity,
  selectShippingData,
  selectStatus,
  selectType,
  selectWarehouse,
} from "../../../store/AddShip/selectors";
import { useSelector } from "react-redux";
import { selectActiveId } from "../../../store/OpenDropDownMenu/selectors";
import { Footer } from "../../common/Modals/Footer";
import { Header } from "../../common/Modals/Header";

interface NewShipmentProps {
  onClose: () => void;
}

export const NewShipment: FC<NewShipmentProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const calendarRef = useRef<Calendar | null>(null);
  const activeId = useSelector(selectActiveId);
  const shippingData = useSelector(selectShippingData);
  const cities = useSelector(selectCities);
  const quantity = useSelector(selectQuantity);
  const type = useSelector(selectType);
  const warehouse = useSelector(selectWarehouse);
  const status = useSelector(selectStatus);

  const setOpened = useCallback(() => {
    if (activeId === "calendar") {
      dispatch(setActiveId(null));
    } else {
      dispatch(setActiveId("calendar"));
    }
  }, [activeId, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(`.figureClassic`)) {
        dispatch(setActiveId(null));
      }
    };

    if (activeId) {
      document.addEventListener("mouseup", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [activeId, dispatch, onClose]);

  useEffect(() => {
    return () => {
      dispatch(setActiveId(null));
      dispatch(resetSelections());
    };
  }, [dispatch]);

  const focused = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.blur();
  }, []);

  return (
    <div className={style.modalOverlay}>
      <dialog
        className={style.modal}
        open
        aria-labelledby="modal-title"
        aria-describedby="modal-form"
      >
        <Header onClose={onClose} />
        <form className={style.form} id="modal-form">
          <FormField label="Дата поставки" className="dataContainer">
            <input
              type="text"
              placeholder={shippingData.date || "__.__.____"}
              className={`${style.date} ${style.noFocus} figureClassic`}
              onClick={setOpened}
              onFocus={focused}
            />
            <img src={calendarIcon} alt="calendar icon" />
            {activeId === "calendar" && (
              <CalendarComponent calendarRef={calendarRef} />
            )}
          </FormField>
          <SelectField
            label="Город"
            data={cities}
            action={setCitySelected}
            classNames={["modal", styleNames.fiveRows]}
          />
          <FormField label="Количество" className="dataContainer">
            <input
              type="number"
              className={`${style.date} ${style.quantity}`}
              value={quantity}
              onChange={(e) => dispatch(setQuantity(Number(e.target.value)))}
            />
            <Txt text={`шт.`}></Txt>
          </FormField>
          <SelectField
            label="Тип поставки"
            data={type}
            action={setType}
            classNames={["modal", styleNames.twoRows]}
          />
          <SelectField
            label="Склад"
            data={warehouse}
            action={setWarehouse}
            classNames={["modal", styleNames.threeRows]}
          />
          <SelectField
            label="Статус"
            data={status}
            action={setStatus}
            classNames={["modal", styleNames.twoRows]}
          />
        </form>
        <Footer onClose={onClose} />
      </dialog>
    </div>
  );
};
