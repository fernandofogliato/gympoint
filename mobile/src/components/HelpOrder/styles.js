import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
`;

export const Title = styled.View`
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Info = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: space-between;
`;

export const Status = styled.Text`
  margin-left: 5px;
  font-weight: bold;
  font-size: 14px;
  color: ${props => (props.answered ? '#42CB59' : '#999')};
`;

export const Time = styled.Text`
  color: #999;
  font-size: 13px;
  margin-top: 4px;
`;

export const Question = styled.Text`
  margin-top: 15px;
  color: #444;
`;
