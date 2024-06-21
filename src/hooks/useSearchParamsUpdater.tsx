import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";
import { QueryParams, SearchValues } from "enums";

const useSearchParamsUpdater = (
  searchParams: URLSearchParams,
  searchValue: string | null,
  currentSearchItemRef: MutableRefObject<string | null>,
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>,
) => {
  useEffect(() => {
    const params = Object.fromEntries(searchParams);

    const keys = {
      [SearchValues.Number]: QueryParams.Number,
      [SearchValues.DeliveryType]: QueryParams.DeliveryType,
      [SearchValues.Status]: QueryParams.Status,
      [SearchValues.City]: QueryParams.City,
    };

    const currentKey = keys[currentSearchItemRef.current as keyof typeof keys];

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

      setSearchParams(new URLSearchParams(params));
    }
  }, [searchParams, searchValue, setSearchParams, currentSearchItemRef]);
};

export default useSearchParamsUpdater;
