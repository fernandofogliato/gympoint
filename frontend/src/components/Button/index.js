import React from 'react';
import PropTypes from 'prop-types';
import { MdLoop } from 'react-icons/md';

import colors from '~/styles/colors';

import { ButtonWrapper } from './styles';

export default function Button({
  type,
  color,
  icon,
  text,
  loading,
  textLoading,
  ...rest
}) {
  return (
    <ButtonWrapper
      type={type}
      color={color}
      loading={loading ? 1 : 0}
      {...rest}
    >
      {loading ? <MdLoop /> : icon && icon()}
      {loading ? textLoading : text}
    </ButtonWrapper>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  loading: PropTypes.bool,
  textLoading: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: 'button',
  color: colors.primary,
  loading: false,
  textLoading: null,
  icon: null,
};
