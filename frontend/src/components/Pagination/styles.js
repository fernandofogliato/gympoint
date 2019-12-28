import styled, { css } from 'styled-components';

import colors from '~/styles/colors';

export const PaginationWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  border-radius: 0 0 4px 4px;
  padding: 15px;
`;

export const Button = styled.button`
  background: none;
  border: 1px solid ${colors.lightGrey};
  width: 22px;
  height: 22px;

  ${props =>
    props.active &&
    css`
      background-color: ${colors.primary};
      color: ${colors.white};
    `}
`;
