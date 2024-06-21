import arrowLeft from "assets/icons/mobile/arrow-left.svg";
import arrowRight from "assets/icons/mobile/arrow-right.svg";
import style from "./index.module.scss";
import { useSearchParams } from "react-router-dom";
import { FC } from "react";

interface PaginationMobileProps {
  totalPages: number;
  currentPage: number;
}

export const PaginationMobile: FC<PaginationMobileProps> = ({
  totalPages,
  currentPage,
}) => {
  const [_unused, setSearchParams] = useSearchParams();

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setSearchParams({ page: String(newPage) });
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setSearchParams({ page: String(newPage) });
    }
  };

  return (
    <nav className={style.pagination}>
      <div className={style.containerBack}>
        <button
          className={`${style.arrowButton} ${currentPage === 1 ? style.disabled : ""}`}
          onClick={handlePreviousClick}
          disabled={currentPage === 1}
        >
          <img className={style.back} src={arrowLeft} alt="nav back" />
        </button>
      </div>
      <div className={style.containerForward}>
        <button
          className={`${style.arrowButton} ${currentPage === totalPages ? style.disabled : ""}`}
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          <img className={style.forward} src={arrowRight} alt="nav forward" />
        </button>
      </div>
    </nav>
  );
};
