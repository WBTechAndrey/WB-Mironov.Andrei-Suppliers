import style from "./index.module.scss";
import { TableHeader } from "./TableHeader";
import { memo, useEffect, useState } from "react";
import { FetchingInfo } from "../common/Loaders/FetchingInfo";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination";
import { Shipment, shipmentsAPI } from "../../store/API/shipmentsAPI";
import { DesktopRow } from "./DesktopRow/DesktopRow";
import { MobileRows } from "./MobileRows/MobileRows";
import { useViewport } from "../../hooks/useViewport";
import { PaginationMobile } from "../Pagination/PaginationMobile/PaginationMobile";
import { QueryParams } from "../../types";
import {
  BASIC_WIDTH,
  DEFAULT_PAGES_COUNT,
  DEFAULT_START_PAGE,
  MOBILE_WIDTH,
  PAGE_LIMIT,
} from "../../constants";

export const Table = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit] = useState(PAGE_LIMIT);
  const [page, setPage] = useState(
    searchParams.get(QueryParams.Page) || DEFAULT_START_PAGE,
  );
  const [viewport, setViewport] = useState(BASIC_WIDTH);
  const { width } = useViewport();
  useEffect(() => {
    setViewport(width);
  }, [viewport, width]);
  const { data, isFetching, isLoading, error } =
    shipmentsAPI.useGetShipmentsQuery({
      page,
      limit,
      number: searchParams.get(QueryParams.Number),
      city: searchParams.get(QueryParams.City),
      deliveryType: searchParams.get(QueryParams.DeliveryType),
      status: searchParams.get(QueryParams.Status),
    });

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      setPage(pageParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (data && data.totalPages && +data.totalPages < +page) {
      setPage(String(data.totalPages));
    }
  }, [data, page, setSearchParams]);

  const handlePageChange = (page: string) => {
    setPage(page);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: String(page),
    });
  };

  if (isLoading || isFetching) {
    return <FetchingInfo message={`Loading...`} />;
  }
  if (error) {
    return <FetchingInfo message={`Упс... не удалось загрузить поставки`} />;
  }

  if (!data) {
    return <FetchingInfo message={`Нет данных(`} />;
  }

  return (
    <>
      {viewport <= MOBILE_WIDTH ? (
        <>
          <main className={style.mobileTable}>
            {data.data.map((item: Shipment) => (
              <MobileRows key={item.id} item={item} />
            ))}
            <PaginationMobile
              totalPages={data.totalPages || DEFAULT_PAGES_COUNT}
              currentPage={data.currentPage || +DEFAULT_START_PAGE}
            />
          </main>
        </>
      ) : (
        <>
          <Pagination
            totalPages={data.totalPages || DEFAULT_PAGES_COUNT}
            currentPage={data.currentPage || +DEFAULT_START_PAGE}
            setCurrentPage={handlePageChange}
          />
          <main className={style.table}>
            <TableHeader />
            <article className={style.cards}>
              {data.data.map((item: Shipment) => (
                <DesktopRow key={item.id} item={item} />
              ))}
            </article>
          </main>
        </>
      )}
    </>
  );
});
