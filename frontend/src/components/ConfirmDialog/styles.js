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
  max-width: 300px;
  min-height: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: ${animatetop} 0.4s;
`;

export const Header = styled.div`
  border-bottom: 1px solid ${colors.primary};
  color: ${colors.fontDefault};

  h2 {
    padding: 5px 14px;
  }
`;

export const Body = styled.div`
  padding: 15px;
`;

export const Footer = styled.div`
  text-align: right;
  padding: 4px;
  display: flex;
  justify-content: flex-end;
`;
