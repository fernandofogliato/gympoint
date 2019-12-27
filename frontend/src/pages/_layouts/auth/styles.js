import styled from 'styled-components';

import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background-color: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background-color: ${colors.white};
  border-radius: 4px;
  padding: 20px;

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

    button {
      margin-top: 15px;
      height: 44px;
      width: 100%;
    }
  }
`;
