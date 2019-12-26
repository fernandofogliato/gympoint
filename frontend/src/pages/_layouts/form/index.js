import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container } from './styles';

import Header from '~/components/Header';

export default function FormLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Container>{children}</Container>
    </Wrapper>
  );
}

FormLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
