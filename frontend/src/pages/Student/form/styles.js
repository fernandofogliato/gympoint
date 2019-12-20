import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 35px auto;
  color: #444;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  background: #ffff;
  padding: 20px;
  border-radius: 4px;

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
`;

export const Title = styled.div`
  margin: 10px 0 25px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;

  .actions {
    display: flex;
    flex-direction: row;
  }
`;
