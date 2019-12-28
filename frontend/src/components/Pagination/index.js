import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { PaginationWrapper, Button } from './styles';

export default function Pagination({ callback }) {
  const [page, setPage] = useState(1);

  const pages = useMemo(() => {
    if (page <= 5) {
      return [1, 2, 3, 4, 5];
    }
    return [page - 2, page - 1, page, page + 1, page + 2];
  }, [page]);

  useEffect(() => {
    callback(page);
  }, [callback, page]);

  function handleNext() {
    setPage(page + 1);
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

      {pages.map(p => (
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
  callback: PropTypes.objectOf(PropTypes.func).isRequired,
};
