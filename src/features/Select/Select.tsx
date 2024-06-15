import { Txt } from "../../components/common/Txt";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import style from "./index.module.scss";
import { DropDown } from "../DropDown/DropDown";
import arrowTop from "../../assets/icons/arrow-top.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";

interface SelectProps {
  text: string;
  styleName: string;
  listItems: ReactNode;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

export const Select: FC<SelectProps> = ({
  text,
  styleName,
  listItems,
  isActive,
  setIsActive,
}) => {
  const toggleMenu = (e: any) => {
    e.preventDefault();
    setIsActive((prev) => !prev);
  };

  return (
    <div className={`${style.select} ${isActive ? style.active : ""}`.trim()}>
      <figure className={style.figure} onClick={toggleMenu}>
        <Txt text={text} />
        <img
          className={style.arrow}
          src={isActive ? arrowTop : arrowDown}
          alt="list arrow"
        />
      </figure>
      <DropDown
        styleName={styleName}
        isActive={isActive}
        listItems={listItems}
      />
    </div>
  );
};
