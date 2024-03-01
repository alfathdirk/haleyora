import {
  faChevronCircleRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const queryPage = parseInt(
      new URLSearchParams(window.location.search).get("page") || "1",
      10
    );
    if (!isNaN(queryPage) && queryPage >= 1 && queryPage <= totalPages) {
      setCurrentPage(queryPage);
    }
  }, [totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("page", page.toString());
    window.history.pushState({}, "", newUrl.toString());
  };

  const renderPages = () => {
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    const pages = [];

    if (startPage > 1) {
      pages.push(
        <div
          key="prev"
          className={`cursor-pointer mx-1 p-2 justify-center rounded-lg items-center flex w-10 h-10 text-black`}
          onClick={() => handlePageChange(startPage - 1)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <div
          key={i}
          className={`cursor-pointer mx-1 p-2 justify-center rounded-lg items-center flex w-10 h-10${
            currentPage === i
              ? "text-black border-[#E4E4E4] border-2 bg-white font-bold"
              : "text-black"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </div>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <div
          key="next"
          className={`cursor-pointer mx-1 p-2 justify-center rounded-lg items-center flex w-10 h-10 text-black`}
          onClick={() => handlePageChange(endPage + 1)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      );
    }

    return pages;
  };

  return <div className="flex justify-center  py-4 pb-10">{renderPages()}</div>;
};

export default Pagination;
