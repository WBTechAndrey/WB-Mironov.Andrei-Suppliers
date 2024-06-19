import React, { FC, memo } from "react";
import style from "./index.module.scss";
import { Button } from "../common/Button";
import { Txt } from "../common/Txt";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: string) => void;
}

export const Pagination: FC<PaginationProps> = memo(
  ({ totalPages, currentPage, setCurrentPage }) => {
    const generatePageNumbers = () => {
      const pageNumbers = [];
      const startPages = 1;
      const endPages = 1;
      const surroundingPages = 2;

      pageNumbers.push(1);

      const startPage = Math.max(currentPage - surroundingPages, 2);
      const endPage = Math.min(currentPage + surroundingPages, totalPages - 1);

      if (startPage > startPages) {
        pageNumbers.push("start");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - endPages) {
        pageNumbers.push("end");
      }

      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }

      return pageNumbers;
    };

    const pages = generatePageNumbers();

    return (
      <nav className={style.paginationButtons}>
        {pages.map((page, index) =>
          page === "start" || page === "end" ? (
            <Txt key={page + index} text="..." />
          ) : (
            <Button
              key={page}
              onClick={() => setCurrentPage(String(page))}
              disabled={page === currentPage}
              children={page}
              className={style.btn}
            />
          ),
        )}
      </nav>
    );
  },
);
