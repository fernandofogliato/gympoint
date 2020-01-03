import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  label {
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0 10px 0;
  }

  input {
    text-indent: 15px;
    border: 1px solid ${colors.grey};
    border-radius: 4px;
    height: 44px;
    color: ${colors.darkGrey};
  }

  input:read-only {
    background-color: ${colors.lightGrey};
  }
`;
