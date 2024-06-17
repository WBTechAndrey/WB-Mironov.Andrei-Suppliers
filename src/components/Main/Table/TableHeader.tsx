import style from "./index.module.scss";

export const TableHeader = () => (
  <aside className={style.header}>
    <ul className={style.list}>
      {[
        "Номер",
        "Дата поставки",
        "Город",
        "Количество",
        "Тип поставки",
        "Склад",
        "Статус",
        "",
      ].map((header, index) => (
        <li key={index} className={style.headItem}>
          <span>{header}</span>
        </li>
      ))}
    </ul>
  </aside>
);
