import React, { FC, memo, useCallback, useEffect, useRef } from "react";
import { CalendarComponent } from "../../../features/Calendar/Calendar";
import { useAppDispatch } from "../../../hooks/redux/redux";
import Calendar from "color-calendar";
import {
  resetSelections,
  setAll,
  setCity,
  setQuantity,
  setStatus,
  setType,
  setWarehouse,
} from "../../../store/AddShip/AddShipSlice";
import { setActiveId } from "../../../store/OpenDropDownMenu/isOpenSlice";
import {
  selectCities,
  selectDeliveryDate,
  selectDeliveryType,
  selectNumber,
  selectQuantity,
  selectStatus,
  selectWarehouse,
} from "../../../store/AddShip/selectors";
import { useSelector } from "react-redux";
import { selectActiveId } from "../../../store/OpenDropDownMenu/selectors";
import { testAPI } from "../../../store/API/testApi";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ShipmentForm } from "../ShipmentForm";
import { ShipmentModal } from "../ShipmentModal";

interface NewShipmentProps {
  onClose: (arg: boolean) => void;
}
export type Actions = {
  setType: ActionCreatorWithPayload<number>;
  setCity: ActionCreatorWithPayload<number>;
  setWarehouse: ActionCreatorWithPayload<number>;
  setStatus: ActionCreatorWithPayload<number>;
  setQuantity: ActionCreatorWithPayload<string>;
};

export const NewShipment: FC<NewShipmentProps> = memo(({ onClose }) => {
  const dispatch = useAppDispatch();
  const calendarRef = useRef<Calendar | null>(null);
  const activeId = useSelector(selectActiveId);
  const deliveryDate = useSelector(selectDeliveryDate);
  const number = useSelector(selectNumber);
  const [createPost, { isLoading, isSuccess }] =
    testAPI.usePostShipmentsMutation();

  const cities = useSelector(selectCities);
  const quantity = useSelector(selectQuantity);
  const type = useSelector(selectDeliveryType);
  const warehouse = useSelector(selectWarehouse);
  const status = useSelector(selectStatus);

  const actions: Actions = {
    setType,
    setCity,
    setWarehouse,
    setStatus,
    setQuantity,
  };

  const { data } = testAPI.useGetInfoToAddShipQuery("", {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    dispatch(setAll(data));
  }, [data, dispatch]);

  const setOpened = useCallback(() => {
    if (activeId === "calendar") {
      dispatch(setActiveId(null));
    } else {
      dispatch(setActiveId("calendar"));
    }
  }, [activeId, dispatch]);

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
    <ShipmentModal
      onClose={onClose}
      number={number}
      title="Новая поставка"
      formId="new-shipment-form"
      footerProps={{ createPost, isLoading, isSuccess }}
    >
      <ShipmentForm
        target="new"
        warehouse={warehouse}
        status={status}
        quantity={quantity}
        cities={cities}
        type={type}
        actions={actions}
        deliveryDate={deliveryDate}
        setOpened={setOpened}
        focused={focused}
        activeId={activeId}
        calendarRef={calendarRef}
        CalendarComponent={CalendarComponent}
      />
    </ShipmentModal>
  );
});
