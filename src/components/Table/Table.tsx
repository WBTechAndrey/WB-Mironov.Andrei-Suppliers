import style from "./index.module.scss";
import { TableHeader } from "./TableHeader";
import { memo, useEffect, useState } from "react";
import { FetchingInfo } from "../common/Loaders/FetchingInfo";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "components/Pagination";
import { Shipment, shipmentsAPI } from "store/API/shipmentsAPI";
import { DesktopRow } from "./DesktopRow/DesktopRow";
import { MobileRows } from "./MobileRows/MobileRows";
import { PaginationMobile } from "components/Pagination/PaginationMobile";
import {
  BASIC_WIDTH,
  DEFAULT_PAGES_COUNT,
  DEFAULT_START_PAGE,
  MOBILE_WIDTH,
  PAGE_LIMIT,
} from "../../constants";
import { useResponsiveViewport } from "hooks/useResponsiveViewport";
import { QueryParams } from "enums";

export const Table = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit] = useState(PAGE_LIMIT);
  const [page, setPage] = useState(
    searchParams.get(QueryParams.Page) || DEFAULT_START_PAGE,
  );
  const { viewport } = useResponsiveViewport(BASIC_WIDTH);

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
          <PaginationMobile
            totalPages={data.totalPages || DEFAULT_PAGES_COUNT}
            currentPage={data.currentPage || +DEFAULT_START_PAGE}
          />
          {data.data.map((item: Shipment) => (
            <MobileRows key={item.id} item={item} />
          ))}
        </>
      ) : (
        <>
          <Pagination
            totalPages={data.totalPages || DEFAULT_PAGES_COUNT}
            currentPage={data.currentPage || +DEFAULT_START_PAGE}
            setCurrentPage={handlePageChange}
          />
          <section>
            <TableHeader />
            <article className={style.cards}>
              {data.data.map((item: Shipment) => (
                <DesktopRow key={item.id} item={item} />
              ))}
            </article>
          </section>
        </>
      )}
    </>
  );
});
