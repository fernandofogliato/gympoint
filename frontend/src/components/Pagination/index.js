import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { PaginationWrapper, Button } from './styles';

export default function Pagination({ callback, pageCount }) {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => Math.ceil(pageCount / 10), [pageCount]);

  const numberOfPagesToShow = 5;

  const pages = useMemo(() => {
    const pagesToShow = new Array(totalPages);
    for (let i = 0; i < totalPages; i += 1) {
      pagesToShow[i] = i + 1;
    }
    return pagesToShow;
  }, [totalPages]);

  const pagesAvailable = useMemo(() => {
    if (page < numberOfPagesToShow) {
      return pages.slice(0, numberOfPagesToShow);
    }

    if (page + 2 > totalPages) {
      return pages.slice(totalPages - numberOfPagesToShow, totalPages);
    }

    return pages.slice(page - 3, page + 2);
  }, [page, pages, totalPages]);

  useEffect(() => {
    callback(page);
  }, [callback, page]);

  function handleNext() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  function handlePrevious() {
    if (page !== 1) {
      setPage(page - 1);
    }
  }

  function handleGoToPage(pageToGo) {
    setPage(pageToGo);
  }

  return (
    <PaginationWrapper>
      <Button type="button" title="Página anterior" onClick={handlePrevious}>
        <MdNavigateBefore />
      </Button>

      {pagesAvailable.map(p => (
        <Button
          key={String(p)}
          type="button"
          onClick={() => handleGoToPage(p)}
          active={p === page}
        >
          {p}
        </Button>
      ))}
      <Button type="button" title="Próxima página" onClick={handleNext}>
        <MdNavigateNext />
      </Button>
    </PaginationWrapper>
  );
}

Pagination.propTypes = {
  callback: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
};
