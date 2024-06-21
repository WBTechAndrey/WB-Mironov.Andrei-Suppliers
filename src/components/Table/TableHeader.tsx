import style from "./index.module.scss";
import { tableHeaderColumns } from "../../constants";

export const TableHeader = () => (
  <aside className={style.header}>
    <ul className={style.list}>
      {tableHeaderColumns.map((header, index) => (
        <li key={index} className={style.headItem}>
          <span>{header}</span>
        </li>
      ))}
    </ul>
  </aside>
);
