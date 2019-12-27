import styled, { keyframes, css } from 'styled-components';

import { darken } from 'polished';

import colors from '~/styles/colors';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const ButtonWrapper = styled.button.attrs(props => ({
  disabled: props.loading,
}))`
  background-color: ${props => props.color};
  color: ${colors.white};
  border: 0;
  border-radius: 4px;
  padding: 5px;
  margin-right: 10px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  > svg {
    height: 20px;
    width: 20px;
    margin-right: 5px;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}

  &:hover {
    background: ${props => darken(0.08, props.color)};
  }
`;
