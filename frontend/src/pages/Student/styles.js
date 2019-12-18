import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 35px auto;
  color: #444;
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
  }

  input {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ddd;
    color: #666;
  }
`;

export const StudentTable = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 4px;

  thead th {
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  img {
    height: 100px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;
  }
`;
