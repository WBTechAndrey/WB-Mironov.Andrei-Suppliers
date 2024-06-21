import { useEffect } from "react";
import { setActiveId } from "store/OpenDropDownMenu/isOpenSlice";

const useClickOutside = (activeId: string | null, dispatch: Function) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".noClose")) {
        dispatch(setActiveId(null));
      }
    };

    if (activeId) {
      document.addEventListener("mouseup", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [activeId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setActiveId(null));
    };
  }, [dispatch]);
};

export default useClickOutside;
