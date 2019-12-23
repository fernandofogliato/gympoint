import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background-color: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;

  input {
    height: 44px;
  }

  button {
    margin-top: 15px;
    height: 44px;
    width: 100%;
  }
`;
