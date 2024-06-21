import React, { FC } from "react";
import style from "components/Nav/index.module.scss";
import { NavButton } from "types";
import { NavLink } from "react-router-dom";

export const NavButtons: FC<{
  className?: string;
  buttonsData: NavButton[];
  handleButtonClick: (text: string) => void;
}> = ({ className, buttonsData, handleButtonClick }) => {
  return (
    <nav className={`${style.nav} ${className ? className : false}`}>
      {buttonsData.map((button, index) => (
        <NavLink
          key={index}
          onClick={() => handleButtonClick(button.text)}
          to={`/${button.text}`}
          className={({ isActive, isPending }) =>
            `${style.btn} ${isPending ? "pending" : isActive ? style.active : ""}`
          }
        >
          {button.text}
        </NavLink>
      ))}
    </nav>
  );
};
