import style from "./index.module.scss";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { testAPI } from "../../store/API/testApi";
import { memo, useState } from "react";
import { FetchingInfo } from "../common/Info/FetchingInfo";

const TableComponent = () => {
  const [page] = useState(1);
  const [limit] = useState(10);

  const { data, isFetching, isLoading, error } = testAPI.useGetShipmentsQuery({
    page,
    limit,
  });

  if (isLoading || isFetching) return <FetchingInfo message={`Loading...`} />;
  if (error) return <FetchingInfo message={`Error loading shipments`} />;

  return (
    <>
      <section className={style.table}>
        <TableHeader />
        <article className={style.cards}>
          {data
            ? data.data.map((item) => (
                <TableRow key={item.number} item={item} />
              ))
            : ""}
        </article>
      </section>
      <p>
        Page {page} of {data?.totalPages}
      </p>
    </>
  );
};

export const Table = memo(TableComponent);
