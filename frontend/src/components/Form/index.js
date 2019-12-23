import styled, { keyframes, css } from 'styled-components';
import { darken } from 'polished';
import { Form as FormUnform, Input as InputUnform } from '@rocketseat/unform';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Form = styled(FormUnform)`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 5px 0 10px 0;
    font-weight: bold;
  }

  label {
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0 10px 0;
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
  margin-right: 10px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

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
  margin-right: 10px;
  font-weight: bold;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${darken(0.08, '#ccc')};
  }
`;
