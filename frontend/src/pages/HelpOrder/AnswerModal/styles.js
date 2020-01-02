import styled, { keyframes } from 'styled-components';

import colors from '~/styles/colors';

const animatetop = keyframes`
  0% {
    margin-top: 0%;
    opacity: 0;
  }
  100% {
    margin-top: 15%;
    opacity: 1;
  }
`;

export const Backdrop = styled.div`
  display: 'block';
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${colors.backDrop};
`;

export const Container = styled.div`
  background-color: ${colors.white};
  margin: 15% auto;
  border: 1px solid ${colors.midGrey};
  border-radius: 4px;
  max-width: 500px;
  min-height: 200px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: ${animatetop} 0.4s;
`;

export const Title = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  button {
    border: 0;
    background-color: ${colors.white};
  }
`;

export const Content = styled.div`
  padding: 20px;

  h4 {
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;

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

    button {
      margin-top: 15px;
      width: 100%;
    }

    textarea {
      padding: 10px;
      border: 1px solid ${colors.grey};
      border-radius: 4px;
      color: ${colors.darkGrey};
    }
  }
`;
