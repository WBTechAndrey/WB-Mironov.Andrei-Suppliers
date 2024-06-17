import { FC } from "react";
import style from "./index.module.scss";
import ellipsis from "../../../assets/icons/ellipsis.svg";

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

export const TableRow: FC<{ item: Item }> = ({ item }) => {
  const fields: ItemKey[] = [
    "number",
    "deliveryDate",
    "city",
    "quantity",
    "deliveryType",
  ];

  return (
    <ul className={style.list}>
      {fields.map((field, index) => (
        <li key={index} className={`${style.item} ${style.transform}`}>
          <span>{String(item[field])}</span>
        </li>
      ))}
      <ul className={style.transform}>
        <li className={style.item}>
          <span>{item.warehouse.name}</span>
        </li>
        <li className={style.item}>
          <span>{item.warehouse.address}</span>
        </li>
      </ul>
      <li
        className={`${style.item} ${style.transform} ${item.status === "Задерживается" ? style.orange : style.green}`}
      >
        <span>{item.status}</span>
      </li>
      <li className={`${style.item} ${style.transform}`}>
        <span>
          <img src={ellipsis} alt="ellipsis icon" />
        </span>
      </li>
    </ul>
  );
};
