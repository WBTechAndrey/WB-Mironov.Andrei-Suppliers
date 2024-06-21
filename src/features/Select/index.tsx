import { Txt } from "components/common/Txt";
import React, {
  Dispatch,
  FC,
  memo,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import style from "./index.module.scss";
import arrowTop from "assets/icons/arrow-top.svg";
import arrowDown from "assets/icons/arrow-down.svg";
import closeIcon from "assets/icons/close-icon.svg";
import { DropDown } from "features/DropDown";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { combinedClassNames } from "helpers/combinedClassNames";
import { useAppDispatch } from "hooks/redux/redux";
import { setActiveId } from "store/OpenDropDownMenu/isOpenSlice";
import { selectActiveId } from "store/OpenDropDownMenu/selectors";
import { useSelector } from "react-redux";
import { DropDownState } from "types";
import { createPortal } from "react-dom";
import { BASIC_WIDTH, MOBILE_WIDTH } from "../../constants/index";
import { Overlay } from "components/common/Overlay";
import { useResponsiveViewport } from "hooks/useResponsiveViewport";

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

    const { viewport } = useResponsiveViewport(BASIC_WIDTH);

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

        {viewport <= MOBILE_WIDTH ? (
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
          viewport <= MOBILE_WIDTH &&
          createPortal(
            <Overlay id={`portal`} onClick={closePortal}>
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
            </Overlay>,
            document.body,
          )}
      </div>
    );
  },
);
