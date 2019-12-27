import styled from 'styled-components';

import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background-color: ${colors.backgroundDefault};
`;

export const Container = styled.div`
  max-width: 900px;
  margin: 35px auto;
  color: ${colors.fontDefault};

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    span {
      color: ${colors.textError};
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

    input {
      height: 44px;
      width: 100%;
      text-indent: 15px;
      border: 1px solid ${colors.grey};
      border-radius: 4px;
      height: 36px;
      color: ${colors.darkGrey};

      &::placeholder {
        color: ${colors.midGrey};
      }
    }
  }
`;

export const Title = styled.div`
  margin: 10px 0 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;

  aside {
    display: flex;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  padding: 20px;
  border-radius: 4px;

  .grid-columns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > div {
      width: 100%;
      padding-right: 10px;
      display: flex;
      flex-direction: column;
    }
  }
`;
