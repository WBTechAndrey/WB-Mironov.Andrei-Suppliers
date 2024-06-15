import { Button } from "../../common/Button";
import style from "./index.module.scss";
import iconPlus from "../../../assets/icons/icon-plus.svg";
import { Txt } from "../../common/Txt";
import { Select } from "../../../features/Select/Select";
import { styleNames } from "../../../features/DropDown/DropDown";
import { Input } from "./Input";
import { useState } from "react";

export const ProductManagementForm = () => {
  const [item, setItem] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const searchType = [
    { text: "По номеру", id: 1 },
    { text: "По городу", id: 2 },
    { text: "По типу поставки", id: 3 },
    { text: "По статусу", id: 4 },
  ];

  const setCurrentItem = (e: any, id: number) => {
    e.preventDefault();
    setItem(id - 1);
    setIsActive(false);
  };

  const listItems = searchType.map((el) => {
    return (
      <li key={el.id} onClick={(e) => setCurrentItem(e, el.id)}>
        {el.text}
      </li>
    );
  });

  return (
    <section className={style.productManagement}>
      <Button
        onClick={(event) => event.preventDefault()}
        className={style.addBtn}
      >
        <img src={iconPlus} alt="icon to add shipment" />
        <Txt className={style.info} text="Добавить поставку" />
      </Button>
      <form className={`${style.form}`}>
        <Select
          text={searchType[item].text}
          styleName={styleNames.basic}
          listItems={listItems}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <Input />
      </form>
    </section>
  );
};
