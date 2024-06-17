import style from "./index.module.scss";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

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
      name: "Вёшки",
      address:
        "Липкинское шоссе, 2-й километр, вл1с1, посёлок Вёшки, городской округ Мытищи, Московская область\n",
    },
    status: "В пути",
  },
  {
    id: 3,
    number: "984153",
    deliveryDate: "28.09.2024",
    city: "Псков",
    quantity: "748 шт.",
    deliveryType: "Короб",
    warehouse: {
      name: "Склад",
      address: "ул. Индустриальная, д. 9/1",
    },
    status: "Задерживается",
  },
];

export const Table = () => (
  <section className={style.table}>
    <TableHeader />
    <article className={style.cards}>
      {data.map((item) => (
        <TableRow key={item.id} item={item} />
      ))}
    </article>
  </section>
);
