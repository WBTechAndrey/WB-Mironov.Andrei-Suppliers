import React, { useCallback, useEffect, useRef } from "react";
import Calendar from "color-calendar";
import "./index.scss";
import { useAppDispatch } from "hooks/redux/redux";
import { setDate } from "store/AddShip/AddShipSlice";
import { formatDate } from "helpers/formatDate";
import { useSelector } from "react-redux";
import { selectDeliveryDate } from "store/AddShip/selectors";
import { Inputs } from "types";
import { UseFormSetValue } from "react-hook-form";

interface CalendarComponentProps {
  calendarRef: React.RefObject<Calendar | null> | undefined;
  setValue?: UseFormSetValue<Inputs>;
}

export const CalendarComponent: React.FC<CalendarComponentProps> = ({
  calendarRef,
  setValue,
}) => {
  const calendarInstanceRef = useRef<Calendar | null>(null);
  const deliveryDate = useSelector(selectDeliveryDate);
  const dispatch = useAppDispatch();

  const handleDateChange = useCallback(
    (currentDate: Date) => {
      const formattedDate = currentDate.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      dispatch(setDate(formattedDate));
      if (setValue) setValue("calendar", formattedDate);
    },
    [dispatch, setValue],
  );

  useEffect(() => {
    const myCalc = new Calendar({
      id: "#calendar",
      startWeekday: 1,
      customWeekdayValues: ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
      selectedDateClicked: handleDateChange,
      dateChanged: handleDateChange,
    });

    calendarInstanceRef.current = myCalc;
    if (calendarRef) {
      (calendarRef as React.MutableRefObject<Calendar>).current = myCalc;
    }

    return () => {};
  }, [calendarRef, handleDateChange]);

  useEffect(() => {
    if (deliveryDate) {
      const date = formatDate(deliveryDate);
      if (date) calendarInstanceRef.current?.setDate(date);
    }
  }, [deliveryDate, dispatch]);

  return <div className={`noClose`} id="calendar"></div>;
};
