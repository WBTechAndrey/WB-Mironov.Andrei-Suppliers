import React, { FC, useEffect } from "react";
import { shipmentsAPI } from "store/API/shipmentsAPI";
import {
  setAll,
  setCity,
  setQuantity,
  setStatus,
  setType,
  setWarehouse,
} from "store/EditShip/EditShipSlice";
import { useAppDispatch } from "hooks/redux/redux";
import { useSelector } from "react-redux";
import {
  selectEditCities,
  selectEditDeliveryType,
  selectEditQuantity,
  selectEditStatus,
  selectEditWarehouse,
} from "store/EditShip/selectors";
import { ShipmentModal } from "../ShipmentModal";
import { ShipmentForm } from "../ShipmentForm";
import { FetchingInfo } from "components/common/Loaders/FetchingInfo";
import { setActiveId } from "store/OpenDropDownMenu/isOpenSlice";

interface EditShipmentProps {
  onClose: () => void;
  activeId: string;
}

export const EditShipment: FC<EditShipmentProps> = ({ onClose, activeId }) => {
  const { data } = shipmentsAPI.useGetShipmentByIdQuery(activeId, {
    refetchOnMountOrArgChange: true,
  });
  const [updateData, { isSuccess, isLoading }] =
    shipmentsAPI.useUpdateShipmentMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAll(data));
    dispatch(setActiveId(null));

    return () => {
      dispatch(setActiveId(null));
    };
  }, [data, dispatch]);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess, onClose]);

  const cities = useSelector(selectEditCities);
  const deliveryType = useSelector(selectEditDeliveryType);
  const warehouse = useSelector(selectEditWarehouse);
  const status = useSelector(selectEditStatus);
  const quantity = useSelector(selectEditQuantity);

  const actions = {
    setCity,
    setType,
    setQuantity,
    setWarehouse,
    setStatus,
  };

  return (
    <>
      {isLoading ? (
        <FetchingInfo message={"Подгружаемся..."} />
      ) : (
        <ShipmentModal
          number={data ? data.number : ""}
          title="Редактирование"
          formId="edit-shipment-form"
          quantity={quantity}
          footerProps={{
            updateShip: updateData,
            target: "edit",
            isLoading,
            onClose,
          }}
          componentToRender={
            <ShipmentForm
              target="edit"
              warehouse={warehouse}
              status={status}
              cities={cities}
              type={deliveryType}
              actions={actions}
            />
          }
        ></ShipmentModal>
      )}
    </>
  );
};
