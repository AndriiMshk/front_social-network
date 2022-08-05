import React from 'react';
import style from './users.module.css';

export type PaginationPropsType = {
  totalUsersCount: number
  pageSize: number
  onPageChangeHandler: (page: number) => void
  currentPage: number
}

export const Pagination: React.FC<PaginationPropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChangeHandler }) => {

  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = [];
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i >= 1 && i <= pagesCount) {
      pages.push(i);
    }
  }

  return (
    <div>
      {currentPage > 3
        ? <span
          onClick={() => onPageChangeHandler(1)}
        >{1}...</span>
        : null}
      {pages.map((el, index) =>
        <span
          key={index}
          onClick={() => onPageChangeHandler(el)}
          className={currentPage === el
            ? style.selectedPage
            : ''}>{` ${el} `}
          </span>,
      )}
      {currentPage < pagesCount - 2
        ? <span
          onClick={() => onPageChangeHandler(pagesCount)}
        >...{pagesCount}</span>
        : null}
    </div>
  );
};