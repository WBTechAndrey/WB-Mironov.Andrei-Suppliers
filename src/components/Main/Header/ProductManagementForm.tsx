import { Button } from "../../common/Button";
import style from "./index.module.scss";
import iconPlus from "../../../assets/icons/icon-plus.svg";
import { Txt } from "../../common/Txt";
import { Input } from "./Input";
import { Select } from "../../../features/Select/Select";
import { styleNames } from "../../../features/DropDown/DropDown";
import { setTableSearch } from "../../../store/TableSearch/TableSearchSlice";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NewShipment } from "../../Forms/NewShipment/NewShipment";
import { useSelector } from "react-redux";
import { selectSearch } from "../../../store/TableSearch/selectors";
import { selectActiveId } from "../../../store/OpenDropDownMenu/selectors";
import { setActiveId } from "../../../store/OpenDropDownMenu/isOpenSlice";
import { useAppDispatch } from "../../../hooks/redux/redux";

export const ProductManagementForm = () => {
  const data = useSelector(selectSearch);
  const [showModal, setShowModal] = useState(false);
  const activeId = useSelector(selectActiveId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(`.figureClassic`)) {
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

  return (
    <section className={style.productManagement}>
      <Button
        onClick={() => setShowModal((prev) => !prev)}
        className={style.addBtn}
      >
        <img src={iconPlus} alt="icon to add shipment" />
        <Txt className={style.info} text="Добавить поставку" />
      </Button>
      <form className={`${style.form}`}>
        <Select
          classNames={[styleNames.fourRows]}
          data={data}
          action={setTableSearch}
        />
        <Input />
      </form>
      {showModal &&
        createPortal(
          <NewShipment onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </section>
  );
};
