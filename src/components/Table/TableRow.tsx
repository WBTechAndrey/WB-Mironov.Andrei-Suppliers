import { FC, memo, useCallback, useState } from "react";
import style from "./index.module.scss";
import ellipsis from "../../assets/icons/ellipsis.svg";
import { Txt } from "../common/Txt";
import { DropDown, styleNames } from "../../features/DropDown/DropDown";
import { createPortal } from "react-dom";
import { EditShipment } from "../Forms/EditShipment/EditShipment";
import { testAPI } from "../../store/API/testApi";

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

const TableRowComponent: FC<{ item: Item }> = ({ item }) => {
  const fields: ItemKey[] = [
    "number",
    "deliveryDate",
    "city",
    "quantity",
    "deliveryType",
  ];

  const spanId = item.id;

  const data = [
    {
      text: "Редактировать",
      id: 1,
      selected: false,
    },
    {
      text: "Отменить поставку",
      id: 2,
      selected: false,
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [isActive, sesIsActive] = useState(false);
  const [activeId, setActiveId] = useState("");

  const [deleteData] = testAPI.useDeleteShipmentByIdMutation();

  const toggleShowModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  const deleteDataFunc = () => {
    deleteData(activeId);
  };

  const handleFigureClick = (id: string) => {
    sesIsActive((prev) => !prev);
    setActiveId(id);
  };

  return (
    <>
      <ul className={style.list}>
        {fields.map((field, index) => (
          <li key={index} className={`${style.item} ${style.transform}`}>
            <Txt
              text={
                field === "quantity"
                  ? `${String(item[field])} шт.`
                  : field === "number"
                    ? String(item[field]).slice(-6)
                    : String(item[field])
              }
            />
          </li>
        ))}
        <ul className={style.transform}>
          <li className={style.item}>
            <Txt text={item.warehouse.name} />
          </li>
          <li className={style.item}>
            <Txt text={item.warehouse.address} />
          </li>
        </ul>
        <li
          className={`${style.item} ${style.transform} ${item.status === "Задерживается" ? style.orange : style.green}`}
        >
          <Txt text={item.status} />
        </li>
        <li className={`${style.item} ${style.transform}`}>
          <span
            id={String(spanId)}
            onClick={() => handleFigureClick(String(spanId))}
          >
            <img src={ellipsis} alt="ellipsis icon" />
            <DropDown
              data={data}
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
          <EditShipment onClose={toggleShowModal} activeId={activeId} />,
          document.body,
        )}
    </>
  );
};

export const TableRow = memo(TableRowComponent);
