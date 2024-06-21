import { Txt } from "../../components/common/Txt";
import React, {
  Dispatch,
  FC,
  memo,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import style from "./index.module.scss";
import arrowTop from "../../assets/icons/arrow-top.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";
import closeIcon from "../../assets/icons/close-icon.svg";
import { DropDown } from "../DropDown/DropDown";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { combinedClassNames } from "../../helpers/combinedClassNames";
import { useAppDispatch } from "../../hooks/redux/redux";
import { setActiveId } from "../../store/OpenDropDownMenu/isOpenSlice";
import { selectActiveId } from "../../store/OpenDropDownMenu/selectors";
import { useSelector } from "react-redux";
import { DropDownState } from "../../types";
import { useViewport } from "../../hooks/useViewport";
import { createPortal } from "react-dom";
import { BASIC_WIDTH, MOBILE_WIDTH } from "../../constants";
import { DropdownOverlay } from "../DropDown/DropdownOverlay";

interface SelectProps {
  text?: string;
  listItems?: ReactNode;
  setIsActive?: Dispatch<SetStateAction<boolean>>;
  data: DropDownState[];
  action?: ActionCreatorWithPayload<number>;
  classNames: Array<string>;
  label?: string;
}

export const Select: FC<SelectProps> = memo(
  ({ data, action, classNames, label }) => {
    const activeText = data.find((item) => item.selected);
    const textToShow = activeText ? activeText.text : "";
    const activeId = useSelector(selectActiveId);
    const dispatch = useAppDispatch();
    const isActive = activeId === textToShow;
    const [isModalShow, setIsModalShow] = useState(false);
    const openModal = () => {
      setIsModalShow(true);
    };
    const closeModal = () => {
      setIsModalShow(false);
    };
    const handleFigureClick = () => {
      if (isModalShow) {
        closeModal();
      } else {
        openModal();
      }
      if (isActive) {
        dispatch(setActiveId(null));
      } else {
        dispatch(setActiveId(textToShow));
      }
    };

    const [viewport, setViewport] = useState(BASIC_WIDTH);
    const { width } = useViewport();
    useEffect(() => {
      setViewport(width);
    }, [viewport, width]);

    const allClassNames = combinedClassNames(classNames, style);

    const closePortal = (e: React.MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (target.id === `portal`) {
        closeModal();
        dispatch(setActiveId(null));
      }
    };

    return (
      <div
        className={`${style.select} ${allClassNames} ${isActive ? style.active : ""}`.trim()}
      >
        <figure
          className={`${style.figure} noClose`}
          onClick={handleFigureClick}
        >
          <Txt text={textToShow} />
          <img
            className={style.arrow}
            src={isActive ? arrowTop : arrowDown}
            alt="list arrow"
          />
        </figure>

        {width <= MOBILE_WIDTH ? (
          ""
        ) : (
          <DropDown
            classNames={classNames}
            data={data}
            isActive={isActive}
            onClick={() => setActiveId(null)}
            action={action}
          />
        )}
        {isModalShow &&
          width <= MOBILE_WIDTH &&
          createPortal(
            <DropdownOverlay id={`portal`} onClick={closePortal}>
              <DropDown
                classNames={classNames}
                data={data}
                isActive={isActive}
                onClick={() => dispatch(setActiveId(null))}
                closeModal={closeModal}
                action={action}
                children={
                  <div className={style.info}>
                    <Txt text={label} />
                    <img src={closeIcon} alt="close icon" />
                  </div>
                }
              />
            </DropdownOverlay>,
            document.body,
          )}
      </div>
    );
  },
);
