import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSearch } from "../../../store/TableSearch/selectors";
import { useAppDispatch } from "../../../hooks/redux/redux";
import { selectActiveId } from "../../../store/OpenDropDownMenu/selectors";
import { setActiveId } from "../../../store/OpenDropDownMenu/isOpenSlice";
import { setTableSearch } from "../../../store/TableSearch/TableSearchSlice";
import { Input } from "../../common/Input";
import { styleNames } from "../../../features/DropDown/DropDown";
import { createPortal } from "react-dom";
import { NewShipment } from "../../Forms/NewShipment/NewShipment";
import { Select } from "../../../features/Select/Select";
import { Txt } from "../../common/Txt";
import { Button } from "../../common/Button";
import style from "./index.module.scss";
import iconPlus from "../../../assets/icons/icon-plus.svg";
import { useDebounce } from "../../../hooks/useDebounce";
import { HeaderProps } from "../Header";
import { useSearchParams } from "react-router-dom";

export const ProductManagementForm: FC<HeaderProps> = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const data = useSelector(selectSearch);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const activeId = useSelector(selectActiveId);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleCloseModal = useCallback(
    (isSuccess: boolean) => {
      if (isSuccess) {
        closeModal();
      }
    },
    [closeModal],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(`.noClose`)) {
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

  const [value, setValue] = useState("");
  const searchValue = useDebounce(value);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  let currentSearchItem = "";
  if (data && data.find((el) => el.selected)) {
    currentSearchItem = data.find((el) => el.selected)!.text;
  } else {
    currentSearchItem = "";
  }

  useEffect(() => {
    setValue("");
  }, [currentSearchItem]);

  useEffect(() => {
    const params: Record<string, string> = {
      ...Object.fromEntries(searchParams),
    };

    const keys: Record<string, string> = {
      "По номеру": "number",
      "По типу поставки": "deliveryType",
      "По статусу": "status",
      "По городу": "city",
    };

    const currentKey = keys[currentSearchItem as keyof typeof keys];

    if (searchValue) {
      params[currentKey] = searchValue;
    } else {
      delete params[currentKey];
    }

    Object.values(keys).forEach((key) => {
      if (key !== currentKey) {
        delete params[key];
      }
    });

    setSearchParams(params);
  }, [currentSearchItem, searchParams, searchValue, setSearchParams]);

  return (
    <section className={style.productManagement}>
      <Button onClick={openModal} className={style.addBtn}>
        <img src={iconPlus} alt="icon to add shipment" />
        <Txt className={style.info} text="Добавить поставку" />
      </Button>
      <form className={`${style.form}`}>
        <Select
          classNames={[styleNames.fourRows]}
          data={data}
          action={setTableSearch}
        />
        <Input onChange={onChange} value={value} />
      </form>
      {showModal &&
        createPortal(<NewShipment onClose={handleCloseModal} />, document.body)}
    </section>
  );
});
