import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 35px auto;
  color: #444;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    background: #ffff;
    padding: 20px;

    input {
      height: 44px;
      margin-bottom: 10px;
    }

    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      div {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

export const Title = styled.div`
  margin: 10px 0 25px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;

  div {
    display: flex;
  }

  button {
    background-color: #ee4d64;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 5px;
    display: flex;
    align-items: center;
    margin-right: 10px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.08, '#ee4d64')};
    }
  }
`;
