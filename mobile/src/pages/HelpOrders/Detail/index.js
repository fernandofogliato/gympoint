import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { Container, Title, Text, Time, Content } from './styles';

export default function DetailHelpOrder({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  const dateFormatted = useMemo(() => {
    return formatRelative(
      parseISO(helpOrder.answerAt ? helpOrder.answerAt : helpOrder.createdAt),
      new Date(),
      {
        locale: pt,
        addSuffix: true,
      }
    );
  }, [helpOrder.answerAt, helpOrder.createdAt]);

  const answered = useMemo(() => !!helpOrder.answerAt, [helpOrder.answerAt]);

  return (
    <Background>
      <Header />
      <Container>
        <Title>
          <Text>PERGUNTA</Text>
          <Time>{dateFormatted}</Time>
        </Title>
        <Content>{helpOrder.question}</Content>
        <Title>
          <Text>RESPOSTA</Text>
        </Title>
        <Content>
          {answered ? helpOrder.answer : 'Não foi respondido ainda.'}
        </Content>
      </Container>
    </Background>
  );
}

DetailHelpOrder.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ListHelpOrders');
      }}
    >
      <Icon name="chevron-left" size={20} color="#ee4e62" />
    </TouchableOpacity>
  ),
});
