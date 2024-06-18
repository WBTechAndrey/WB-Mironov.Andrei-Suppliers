import React, { FC, useEffect } from "react";
import { testAPI } from "../../../store/API/testApi";
import {
  setAll,
  setCity,
  setQuantity,
  setStatus,
  setType,
  setWarehouse,
} from "../../../store/EditShip/EditShipSlice";
import { useAppDispatch } from "../../../hooks/redux/redux";
import { useSelector } from "react-redux";
import {
  selectEditCities,
  selectEditDeliveryType,
  selectEditQuantity,
  selectEditStatus,
  selectEditWarehouse,
} from "../../../store/EditShip/selectors";
import { ShipmentModal } from "../ShipmentModal";
import { ShipmentForm } from "../ShipmentForm";

interface EditShipmentProps {
  onClose: () => void;
  activeId: string;
}

interface EditShipmentProps {
  onClose: () => void;
  activeId: string;
}

export const EditShipment: FC<EditShipmentProps> = ({ onClose, activeId }) => {
  const { data } = testAPI.useGetShipmentByIdQuery(activeId, {
    refetchOnMountOrArgChange: true,
  });
  const [updateData, { isSuccess }] = testAPI.useUpdateShipmentMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAll(data));
  }, [data, dispatch]);

  const cities = useSelector(selectEditCities);
  const quantity = useSelector(selectEditQuantity);
  const deliveryType = useSelector(selectEditDeliveryType);
  const warehouse = useSelector(selectEditWarehouse);
  const status = useSelector(selectEditStatus);

  const actions = {
    setCity,
    setType,
    setQuantity,
    setWarehouse,
    setStatus,
  };

  return (
    <ShipmentModal
      onClose={onClose}
      number={data ? data.number : ""}
      title="Редактирование"
      formId="edit-shipment-form"
      footerProps={{ updateShip: updateData, target: "edit", isSuccess }}
    >
      {data && (
        <ShipmentForm
          target="edit"
          warehouse={warehouse}
          status={status}
          quantity={quantity}
          cities={cities}
          type={deliveryType}
          actions={actions}
        />
      )}
    </ShipmentModal>
  );
};
