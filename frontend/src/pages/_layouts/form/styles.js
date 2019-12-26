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

  label {
    margin-top: 15px;
  }

  input {
    height: 44px;
    width: 100%;
  }

  > div {
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
