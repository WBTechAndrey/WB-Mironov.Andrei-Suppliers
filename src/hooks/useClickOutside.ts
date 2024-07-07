import { useEffect } from "react";
import { setActiveId } from "store/OpenDropDownMenu/isOpenSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "hooks/redux/redux";

const useClickOutside = (
  activeId: string | null,
  action: ActionCreatorWithPayload<string | null>,
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".noClose")) {
        dispatch(action(null));
      }
    };

    if (activeId) {
      document.addEventListener("mouseup", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [action, activeId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setActiveId(null));
    };
  }, [dispatch]);
};

export default useClickOutside;
