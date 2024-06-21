import { Txt } from "components/common/Txt";
import { useSearchParams } from "react-router-dom";
import style from "./index.module.scss";
import { QueryParams } from "types";
import { DEFAULT_START_PAGE } from "../../../constants";

export const PaginationCounter = () => {
  const [searchParams] = useSearchParams();
  return (
    <Txt
      className={style.page}
      text={`Страница ${searchParams.get(QueryParams.Page) || DEFAULT_START_PAGE}`}
    />
  );
};
