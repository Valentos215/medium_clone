import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { range } from "../utils";

type ItemProps = { page: number; currentPage: number; url: string };
type PaginationProps = {
  total: number;
  limit: number;
  currentPage: number;
  url: string;
};

const PaginationItem: React.FC<ItemProps> = ({ page, currentPage, url }) => {
  const liClasses = classNames({
    "page-item": true,
    active: page === currentPage,
  });

  return (
    <li className={liClasses}>
      <Link to={`${url}?page=${page}`} className="page-link">
        {page}
      </Link>
    </li>
  );
};

const Pagination: React.FC<PaginationProps> = ({
  total,
  limit,
  url,
  currentPage,
}) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);

  return (
    <ul className="pagination">
      {pages.map((page) => (
        <PaginationItem
          page={page}
          currentPage={currentPage}
          url={url}
          key={page}
        />
      ))}
    </ul>
  );
};

export default Pagination;
