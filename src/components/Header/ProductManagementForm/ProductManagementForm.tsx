import React, { FC, memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectSearch } from "../../../store/TableSearch/selectors";
import { useAppDispatch } from "../../../hooks/redux/redux";
import { selectActiveId } from "../../../store/OpenDropDownMenu/selectors";
import { setActiveId } from "../../../store/OpenDropDownMenu/isOpenSlice";
import {
  setAllItems,
  setTableSearch,
} from "../../../store/TableSearch/TableSearchSlice";
import { Input } from "../../common/Input";
import { styleNames } from "../../../features/DropDown/DropDown";
import { Select } from "../../../features/Select/Select";
import { Txt } from "../../common/Txt";
import style from "./index.module.scss";
import { useDebounce } from "../../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { shipmentsAPI } from "../../../store/API/shipmentsAPI";
import { FetchingInfo } from "../../common/Loaders/FetchingInfo";
import { AddButton } from "./AddButton";
import { QueryParams } from "../../../types";

interface ProductManagementFormProps {
  openModal: () => void;
}

export const ProductManagementForm: FC<ProductManagementFormProps> = memo(
  ({ openModal }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const data = useSelector(selectSearch);
    const number = searchParams.get(QueryParams.Number);
    const city = searchParams.get(QueryParams.City);
    const deliveryType = searchParams.get(QueryParams.DeliveryType);
    const status = searchParams.get(QueryParams.Status);
    const getQueryParams = () => {
      if (number) return number;
      if (status) return status;
      if (city) return city;
      if (deliveryType) return deliveryType;
      return "";
    };
    const activeId = useSelector(selectActiveId);
    const currentSearchItemRef = useRef("");
    const dispatch = useAppDispatch();
    const [value, setValue] = useState(getQueryParams);
    const searchValue = useDebounce(value);

    const { data: serverData, isLoading } =
      shipmentsAPI.useGetSearchInfoParamsQuery({
        number,
        city,
        deliveryType,
        status,
      });

    useEffect(() => {
      if (serverData) dispatch(setAllItems(serverData));
    }, [dispatch, serverData]);

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

    useEffect(() => {
      if (data && !isLoading) {
        const selectedItem = data.find((el) => el.selected);
        currentSearchItemRef.current = selectedItem ? selectedItem.text : "";
      }
    }, [data, dispatch, isLoading]);

    const onChange = (value: string) => {
      setValue(value);
    };

    useEffect(() => {
      const params = Object.fromEntries(searchParams);

      const keys = {
        "По номеру": QueryParams.Number,
        "По типу поставки": QueryParams.DeliveryType,
        "По статусу": QueryParams.Status,
        "По городу": QueryParams.City,
      };

      const currentKey =
        keys[currentSearchItemRef.current as keyof typeof keys];

      if (currentKey) {
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
      }
    }, [searchParams, searchValue, setSearchParams]);

    return (
      <>
        {isLoading ? (
          <FetchingInfo message={`Загружаемся...`} />
        ) : (
          <section className={style.productManagement}>
            <AddButton openModal={openModal}>
              <Txt className={style.info} text="Добавить поставку" />
            </AddButton>
            <form className={`${style.form}`}>
              <Select
                classNames={[styleNames.fourRows]}
                data={data || []}
                action={setTableSearch}
              />
              <Input onChange={onChange} value={value} />
            </form>
          </section>
        )}
      </>
    );
  },
);
