import React, { FC, memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectSearch } from "store/TableSearch/selectors";
import { useAppDispatch } from "hooks/redux/redux";
import { selectActiveId } from "store/OpenDropDownMenu/selectors";
import {
  setAllItems,
  setTableSearch,
} from "store/TableSearch/TableSearchSlice";
import { Input } from "components/common/Input";
import { styleNames } from "features/DropDown";
import { Select } from "features/Select";
import { Txt } from "components/common/Txt";
import style from "./index.module.scss";
import { useDebounce } from "hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { shipmentsAPI } from "store/API/shipmentsAPI";
import { FetchingInfo } from "components/common/Loaders/FetchingInfo";
import { AddButton } from "components/Header/ProductManagementForm/components/AddButton";
import { QueryParams, SearchValues } from "enums";
import useClickOutside from "hooks/useClickOutside";
import useSearchParamsUpdater from "hooks/useSearchParamsUpdater";

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

    useClickOutside(activeId, dispatch);

    const [isData, setIsData] = useState(false);

    useEffect(() => {
      switch (activeId) {
        case SearchValues.Number: {
          dispatch(setTableSearch(1));
          setIsData(true);
          break;
        }
        case SearchValues.City: {
          dispatch(setTableSearch(2));
          setIsData(true);
          break;
        }
        case SearchValues.DeliveryType: {
          dispatch(setTableSearch(3));
          setIsData(true);
          break;
        }
        case SearchValues.Status: {
          dispatch(setTableSearch(4));
          setIsData(true);
          break;
        }
        default: {
          break;
        }
      }
    }, [activeId, dispatch]);

    useEffect(() => {
      if (serverData && !isData) dispatch(setAllItems(serverData));
    }, [dispatch, isData, serverData]);

    useEffect(() => {
      if (data && !isLoading) {
        const selectedItem = data.find((el) => el.selected);
        currentSearchItemRef.current = selectedItem ? selectedItem.text : "";
      }
    }, [data, dispatch, isLoading]);

    useSearchParamsUpdater(
      searchParams,
      searchValue,
      currentSearchItemRef,
      setSearchParams,
    );

    const onChange = (value: string) => {
      setValue(value);
    };

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (e: React.MouseEvent) => {
      const target = e.target as HTMLFormElement;
      if (target.id === "hover-form") {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
      <>
        {isLoading ? (
          <FetchingInfo message={`Загружаемся...`} />
        ) : (
          <section className={style.productManagement}>
            <AddButton openModal={openModal}>
              <Txt className={style.info} text="Добавить поставку" />
            </AddButton>
            <form
              id={`hover-form`}
              className={`${style.form} ${isHovered ? style.active : ""}`.trim()}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
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
