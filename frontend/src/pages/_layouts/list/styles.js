import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background-color: ${colors.backgroundDefault};
`;

export const Container = styled.div`
  max-width: 900px;
  margin: 35px auto;
  color: ${colors.fontDefault};

  table {
    width: 100%;
    background: ${colors.white};
    border-radius: 4px;
    border-collapse: collapse;

    thead th {
      text-align: left;
      padding: 12px;
    }

    tbody td {
      padding: 12px;
      border-bottom: 1px solid ${colors.lightGrey};
    }

    button {
      background: none;
      border: 0;
      padding: 6px;
      transition: background 0.2s;
      color: ${colors.primary};

      &:hover {
        color: ${darken(0.08, colors.primary)};
      }
    }
  }
`;

export const Title = styled.div`
  margin: 10px 0 15px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;

  div {
    display: flex;
  }

  button {
    height: 30px;
  }

  input {
    text-indent: 15px;
    border: 1px solid ${colors.grey};
    border-radius: 4px;
    height: 30px;
    color: ${colors.darkGrey};

    &::placeholder {
      color: ${colors.midGrey};
    }
  }
`;
