import { Txt } from "../../components/common/Txt";
import React, { Dispatch, FC, memo, ReactNode, SetStateAction } from "react";
import style from "./index.module.scss";
import arrowTop from "../../assets/icons/arrow-top.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";
import { DropDown } from "../DropDown/DropDown";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { combinedClassNames } from "../../helpers/combinedClassNames";
import { useAppDispatch } from "../../hooks/redux/redux";
import { setActiveId } from "../../store/OpenDropDownMenu/isOpenSlice";
import { selectActiveId } from "../../store/OpenDropDownMenu/selectors";
import { useSelector } from "react-redux";
import { DropDownState } from "../../types";

interface SelectProps {
  text?: string;
  listItems?: ReactNode;
  setIsActive?: Dispatch<SetStateAction<boolean>>;
  data: DropDownState[];
  action?: ActionCreatorWithPayload<number>;
  classNames: Array<string>;
}

export const Select: FC<SelectProps> = memo(({ data, action, classNames }) => {
  const activeText = data.find((city) => city.selected);
  const textToShow = activeText ? activeText.text : "";
  const activeId = useSelector(selectActiveId);
  const dispatch = useAppDispatch();
  const isActive = activeId === textToShow;
  const handleFigureClick = () => {
    if (isActive) {
      dispatch(setActiveId(null));
    } else {
      dispatch(setActiveId(textToShow));
    }
  };

  const allClassNames = combinedClassNames(classNames, style);

  return (
    <div
      className={`${style.select} ${allClassNames} ${isActive ? style.active : ""}`.trim()}
    >
      <figure className={`${style.figure} noClose`} onClick={handleFigureClick}>
        <Txt text={textToShow} />
        <img
          className={style.arrow}
          src={isActive ? arrowTop : arrowDown}
          alt="list arrow"
        />
      </figure>
      <DropDown
        classNames={classNames}
        data={data}
        isActive={isActive}
        onClick={() => setActiveId(null)}
        action={action}
      />
    </div>
  );
});
