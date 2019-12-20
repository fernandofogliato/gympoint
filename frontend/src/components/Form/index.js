import styled, { keyframes, css } from 'styled-components';
import { darken } from 'polished';
import { Input as InputUnform } from '@rocketseat/unform';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Input = styled(InputUnform)`
  text-indent: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 36px;
  color: #666;

  &::placeholder {
    color: #999;
  }

  ${props =>
    props.error &&
    css`
      border: 1px solid red;
    `}

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin-bottom: 10px;
    font-weight: bold;
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background-color: #ee4d64;
  color: #fff;
  border: 0;
  border-radius: 4px;
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 10px;
  transition: background 0.2s;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}

  &:hover {
    background: ${darken(0.08, '#ee4d64')};
  }
`;

export const BackButton = styled.button.attrs({
  type: 'button',
})`
  background-color: #ccc;
  color: #fff;
  border: 0;
  border-radius: 4px;
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.08, '#ccc')};
  }
`;
