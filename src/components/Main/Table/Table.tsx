import style from "./index.module.scss";
import ellipsis from "../../../assets/icons/ellipsis.svg";

const data = [
  {
    id: 1,
    number: "154814",
    deliveryDate: "28.09.2024",
    city: "Москва",
    quantity: "262 шт.",
    deliveryType: "Короб",
    warehouse: {
      name: "Черная Грязь",
      address: "д. Черная Грязь, ул. Промышленная, с.2",
    },
    status: "В пути",
  },
  {
    id: 2,
    number: "26589",
    deliveryDate: "28.09.2024",
    city: "Москва",
    quantity: "232 шт.",
    deliveryType: "Монопаллета",
    warehouse: {
      name: "Черная Грязь",
      address: "д. Черная Грязь, ул. Промышленная, с.2",
    },
    status: "Задерживается",
  },
  {
    id: 3,
    number: "984153",
    deliveryDate: "28.09.2024",
    city: "Нижний новгород",
    quantity: "2362 шт.",
    deliveryType: "Короб",
    warehouse: {
      name: "Черная Грязь",
      address: "д. Черная Грязь, ул. Промышленная, с.2",
    },
    status: "В пути",
  },
];

export const Table = () => {
  return (
    <section className={style.table}>
      <aside className={style.header}>
        <ul className={style.list}>
          <li className={style.headItem}>
            <span>Номер </span>
          </li>
          <li className={style.headItem}>
            <span>Дата поставки</span>
          </li>
          <li className={style.headItem}>
            <span>Город </span>
          </li>
          <li className={style.headItem}>
            <span>Количество </span>
          </li>
          <li className={style.headItem}>
            <span>Тип поставки</span>
          </li>
          <li className={style.headItem}>
            <span>Склад </span>
          </li>
          <li className={style.headItem}>
            <span>Статус </span>
          </li>
          <li className={style.headItem}>
            <span></span>
          </li>
        </ul>
      </aside>
      <article className={style.cards}>
        {data.map((item) => (
          <ul key={item.id} className={style.list}>
            <li className={`${style.item} ${style.transform}`}>
              <span>{item.number}</span>
            </li>
            <li className={`${style.item} ${style.transform}`}>
              <span>{item.deliveryDate}</span>
            </li>
            <li className={`${style.item} ${style.transform}`}>
              <span>{item.city}</span>
            </li>
            <li className={`${style.item} ${style.transform}`}>
              <span>{item.quantity}</span>
            </li>
            <li className={`${style.item} ${style.transform}`}>
              <span>{item.deliveryType}</span>
            </li>
            <ul className={style.transform}>
              <li className={style.item}>
                <span>{item.warehouse.name}</span>
              </li>
              <li className={style.item}>
                <span>{item.warehouse.address} </span>
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
        ))}
      </article>
    </section>
  );
};
