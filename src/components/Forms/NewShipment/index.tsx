import React, { FC, memo, useCallback, useEffect, useRef } from "react";
import { CalendarComponent } from "features/Calendar";
import { useAppDispatch } from "hooks/redux/redux";
import Calendar from "color-calendar";
import {
  resetSelections,
  setAll,
  setCity,
  setQuantity,
  setStatus,
  setType,
  setWarehouse,
} from "store/AddShip/AddShipSlice";
import { setActiveModalsId } from "store/OpenDropDownMenu/isOpenSlice";
import {
  selectCities,
  selectDeliveryDate,
  selectDeliveryType,
  selectNumber,
  selectQuantity,
  selectStatus,
  selectWarehouse,
} from "store/AddShip/selectors";
import { useSelector } from "react-redux";
import { selectActiveModalsId } from "store/OpenDropDownMenu/selectors";
import { shipmentsAPI } from "store/API/shipmentsAPI";
import { ShipmentForm } from "../ShipmentForm";
import { ShipmentModal } from "../ShipmentModal";
import { Actions } from "types";

interface NewShipmentProps {
  onClose: () => void;
}

export const NewShipment: FC<NewShipmentProps> = memo(({ onClose }) => {
  const dispatch = useAppDispatch();
  const calendarRef = useRef<Calendar | null>(null);
  const activeId = useSelector(selectActiveModalsId);
  const deliveryDate = useSelector(selectDeliveryDate);
  const number = useSelector(selectNumber);
  const [createPost, { isLoading, isSuccess }] =
    shipmentsAPI.usePostShipmentsMutation();
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

  const {
    data,
    isFetching: isFetchingInit,
    isLoading: isLoadingInit,
    isError: isErrorInit,
    error: errorInit,
  } = shipmentsAPI.useGetInfoToAddShipQuery("", {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    dispatch(setAll(data));

    return () => {
      dispatch(setActiveModalsId(null));
    };
  }, [data, dispatch]);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess, onClose]);

  const setOpened = useCallback(() => {
    if (activeId === "calendar") {
      dispatch(setActiveModalsId(null));
    } else {
      dispatch(setActiveModalsId("calendar"));
    }
  }, [activeId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setActiveModalsId(null));
      dispatch(resetSelections());
    };
  }, [dispatch]);

  return (
    <ShipmentModal
      number={number}
      title="Новая поставка"
      formId="new-shipment-form"
      footerProps={{ createPost, isLoading, onClose }}
      setOpened={setOpened}
      quantity={quantity}
      formProps={{
        isFetchingInit,
        isLoadingInit,
        isErrorInit,
        errorInit,
      }}
      componentToRender={
        <ShipmentForm
          target="new"
          warehouse={warehouse}
          status={status}
          cities={cities}
          type={type}
          actions={actions}
          deliveryDate={deliveryDate}
          setOpened={setOpened}
          activeId={activeId}
          calendarRef={calendarRef}
          CalendarComponent={CalendarComponent}
        />
      }
    ></ShipmentModal>
  );
});
