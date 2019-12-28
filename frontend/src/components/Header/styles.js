import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import colors from '~/styles/colors';

export const Container = styled.div`
  background: ${colors.white};
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const LinkWrapper = styled(Link)`
  margin-left: 10px;
  font-weight: bold;
  color: ${colors.midGrey};
  white-space: nowrap;

  ${props =>
    props.active &&
    css`
      color: ${colors.fontDefault};
    `}
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid ${colors.lightGrey};

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: ${colors.darkGrey};
    }

    button {
      border: none;
      background: ${colors.white};
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: ${colors.primary};

      &:hover {
        color: ${colors.darkPrimary};
      }
    }
  }
`;
