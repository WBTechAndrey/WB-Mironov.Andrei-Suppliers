import style from "./index.module.scss";

const data = [
  {
    id: 1,
    number: "154814",
    deliveryDate: "28.09.2024",
    city: "Нижний новгород",
    quantity: "262 шт.",
    deliveryType: "Короб",
    warehouse: {
      name: "Черная Грязь",
      address: "д. Черная Грязь, ул. Промышленная, с.2",
    },
    status: "Задерживается",
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
    city: "Москва",
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
          <li className={style.headItem}>Номер</li>
          <li className={style.headItem}>Дата поставки</li>
          <li className={style.headItem}>Город</li>
          <li className={style.headItem}>Количество</li>
          <li className={style.headItem}>Тип поставки</li>
          <li className={style.headItem}>Склад</li>
          <li className={style.headItem}>Статус</li>
          <li className={style.headItem}></li>
        </ul>
      </aside>
      <article className={style.cards}>
        {data.map((item) => (
          <ul key={item.id} className={style.list}>
            <li className={style.item}>{item.number}</li>
            <li className={style.item}>{item.deliveryDate}</li>
            <li className={style.item}>{item.city}</li>
            <li className={style.item}>{item.quantity}</li>
            <li className={style.item}>{item.deliveryType}</li>
            <ul>
              <li className={style.item}>{item.warehouse.name}</li>
              <li className={style.item}>{item.warehouse.address}</li>
            </ul>
            <li
              className={`${style.item}  ${item.status === "Задерживается" ? style.orange : style.green}`}
            >
              <span>{item.status}</span>
            </li>
            <li className={style.item}>⋮</li>
          </ul>
        ))}
      </article>
    </section>
  );
};
