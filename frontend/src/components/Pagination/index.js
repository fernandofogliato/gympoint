import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { PaginationWrapper } from './styles';

export default function Pagination({ callback }) {
  const [page, setPage] = useState(1);

  function handleNext() {
    setPage(page + 1);
    callback(page);
  }

  function handlePrevious() {
    setPage(page - 1);
    callback(page);
  }

  return (
    <PaginationWrapper>
      <button type="button" title="Página anterior" onClick={handlePrevious}>
        <MdNavigateBefore />
      </button>
      <button type="button">1</button>
      <button type="button">2</button>
      <button type="button">3</button>
      <button type="button" title="Próxima página" onClick={handleNext}>
        <MdNavigateNext />
      </button>
    </PaginationWrapper>
  );
}

Pagination.propTypes = {
  callback: PropTypes.ofType(PropTypes.func).isRequired,
};
