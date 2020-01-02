import styled from 'styled-components';

import colors from '~/styles/colors';

export const Filter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.grey};
  border-radius: 4px;
  height: 30px;
  padding-left: 5px;

  > svg {
    height: 20px;
    width: 20px;
    color: ${colors.midGrey};
  }

  > input {
    margin-left: 5px;
    text-indent: 5px;
    border: none;
    color: ${colors.darkGrey};
    height: 100%;

    &::placeholder {
      color: ${colors.midGrey};
    }
  }
`;
