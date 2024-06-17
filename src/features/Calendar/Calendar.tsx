import React, { useCallback, useEffect, useRef } from "react";
import Calendar from "color-calendar";
import "./index.scss";
import { useAppDispatch } from "../../hooks/redux/redux";
import { setDate } from "../../store/AddShip/AddShipSlice";
import { formatDate } from "../../helpers/formatDate";
import { useSelector } from "react-redux";
import { selectShippingData } from "../../store/AddShip/selectors";

interface CalendarComponentProps {
  calendarRef: React.RefObject<Calendar>;
}

export const CalendarComponent: React.FC<CalendarComponentProps> = ({
  calendarRef,
}) => {
  const calendarInstanceRef = useRef<Calendar | null>(null);
  const shippingData = useSelector(selectShippingData);
  const dispatch = useAppDispatch();

  const handleDateChange = useCallback(
    (currentDate: Date) => {
      const formattedDate = currentDate.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      dispatch(setDate(formattedDate));
    },
    [dispatch],
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
    if (shippingData.date) {
      const dtd = formatDate(shippingData.date);
      if (dtd) calendarInstanceRef.current?.setDate(dtd);
    }
  }, [shippingData.date]);

  return <div className={`figureClassic`} id="calendar"></div>;
};
