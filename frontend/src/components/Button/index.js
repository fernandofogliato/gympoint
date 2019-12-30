import React from 'react';
import PropTypes from 'prop-types';

import colors from '~/styles/colors';

import { ButtonWrapper } from './styles';

export default function Button({ type, color, icon, text, loading, ...rest }) {
  return (
    <ButtonWrapper
      type={type}
      color={color}
      loading={loading || undefined}
      {...rest}
    >
      {icon && icon()}
      {text}
    </ButtonWrapper>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  loading: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: 'button',
  color: colors.primary,
  loading: false,
  icon: null,
};
