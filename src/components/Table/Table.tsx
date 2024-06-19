import style from "./index.module.scss";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { Shipment, testAPI } from "../../store/API/testApi";
import { memo, useEffect, useState } from "react";
import { FetchingInfo } from "../common/Loaders/FetchingInfo";
import { SetURLSearchParams } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination";

interface TableProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export const Table = memo(({ searchParams, setSearchParams }: TableProps) => {
  const [limit] = useState("9");
  const [page, setPage] = useState(searchParams.get("page") || "1");

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      setPage(pageParam);
    }
  }, [searchParams]);

  const { data, isFetching, isLoading, error } = testAPI.useGetShipmentsQuery({
    page,
    limit,
    number: searchParams.get("number"),
    city: searchParams.get("city"),
    deliveryType: searchParams.get("deliveryType"),
    status: searchParams.get("status"),
  });

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

  if (isLoading || isFetching) return <FetchingInfo message={`Loading...`} />;
  if (error)
    return <FetchingInfo message={`Упс... не удалось загрузить поставки`} />;

  return (
    <>
      <Pagination
        totalPages={data?.totalPages || 0}
        currentPage={data?.currentPage || 1}
        setCurrentPage={handlePageChange}
      />
      <main className={style.table}>
        <TableHeader />
        <article className={style.cards}>
          {data
            ? data.data.map((item: Shipment) => (
                <TableRow key={item.id} item={item} />
              ))
            : ""}
        </article>
      </main>
    </>
  );
});
