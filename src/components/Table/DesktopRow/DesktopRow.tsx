import { FC, useCallback, useState } from "react";
import style from "../index.module.scss";
import ellipsis from "../../../assets/icons/ellipsis.svg";
import { Txt } from "components/common/Txt";
import { DropDown, styleNames } from "features/DropDown";
import { createPortal } from "react-dom";
import { EditShipment } from "components/Forms/EditShipment";
import { DotLoader } from "components/common/Loaders/DotLoader";
import { shipmentsAPI } from "store/API/shipmentsAPI";
import { setActiveId } from "store/OpenDropDownMenu/isOpenSlice";
import { useAppDispatch } from "hooks/redux/redux";
import { useSelector } from "react-redux";
import { selectActiveId } from "store/OpenDropDownMenu/selectors";
import { DesktopRowData } from "../../../constants";

interface Warehouse {
  name: string;
  address: string;
}

interface Item {
  id: number;
  number: string;
  deliveryDate: string;
  city: string;
  quantity: string;
  deliveryType: string;
  warehouse: Warehouse;
  status: string;
}

type ItemKey = keyof Item;

interface DesktopRowProps {
  item: Item;
}

export const DesktopRow: FC<DesktopRowProps> = ({ item }) => {
  const fields: ItemKey[] = [
    "number",
    "deliveryDate",
    "city",
    "quantity",
    "deliveryType",
  ];

  const [showModal, setShowModal] = useState(false);
  const [activeIdLocal, setActiveIdLocal] = useState("");

  const [deleteData, { isLoading }] =
    shipmentsAPI.useDeleteShipmentByIdMutation();

  const toggleShowModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  const deleteDataFunc = () => {
    deleteData(activeIdLocal);
  };

  const activeId = useSelector(selectActiveId);
  const isActive = activeId === activeIdLocal;
  const dispatch = useAppDispatch();
  const handleFigureClick = (id: string) => {
    setActiveIdLocal(id);
    if (isActive) {
      dispatch(setActiveId(null));
    } else {
      dispatch(setActiveId(id));
    }
  };

  return (
    <>
      <ul className={style.list}>
        {fields.map((field, index) => (
          <li
            key={index}
            className={`${style.item} ${style.transform} ${field === "quantity" ? style.tooltip : ""}`}
          >
            {field === "quantity" ? (
              <>
                <Txt text={`${String(item[field])} шт.`} />
                <Txt
                  className={style.tooltiptext}
                  text={`${item.quantity} шт.`}
                />
              </>
            ) : (
              <Txt
                text={
                  field === "number"
                    ? String(item[field]).slice(-6)
                    : String(item[field])
                }
              />
            )}
          </li>
        ))}
        <ul className={style.transform}>
          <li className={style.item}>
            <Txt text={item.warehouse.name} />
          </li>
          <li className={`${style.item} ${style.tooltip}`}>
            <Txt text={item.warehouse.address} />
            <Txt className={style.tooltiptext} text={item.warehouse.address} />
          </li>
        </ul>
        <li
          className={`${style.item} ${style.transform} ${item.status === "Задерживается" ? style.orange : style.green}`}
        >
          <Txt text={item.status} />
        </li>
        <li className={`${style.item} ${style.transform}`}>
          <span
            id={String(item.id)}
            onClick={() => handleFigureClick(String(item.id))}
          >
            {isLoading ? (
              <DotLoader />
            ) : (
              <img src={ellipsis} alt="ellipsis icon" />
            )}
            <DropDown
              data={DesktopRowData}
              isActive={isActive}
              onClick={toggleShowModal}
              deleteShip={deleteDataFunc}
              classNames={[styleNames.twoRowsOnTable]}
            />
          </span>
        </li>
      </ul>
      {showModal &&
        createPortal(
          <EditShipment onClose={toggleShowModal} activeId={activeIdLocal} />,
          document.body,
        )}
    </>
  );
};
