import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Title, Info, Status, Time, Question } from './styles';

export default function HelpOrder({ data }) {
  const dateFormatted = useMemo(() => {
    return formatRelative(
      parseISO(data.answerAt ? data.answerAt : data.createdAt),
      new Date(),
      {
        locale: pt,
        addSuffix: true,
      }
    );
  }, [data.answerAt, data.createdAt]);

  const status = useMemo(
    () => (data.answerAt ? 'Respondido' : 'Sem resposta'),
    [data.answerAt]
  );

  const answered = useMemo(() => data.answerAt, [data.answerAt]);

  return (
    <Container>
      <Title>
        <Info>
          {answered ? (
            <Icon name="check-circle" size={20} color="#42CB59" />
          ) : (
            <Icon name="hourglass-empty" size={20} color="#999" />
          )}
          <Status answered={answered}>{status}</Status>
        </Info>
        <Time>{dateFormatted}</Time>
      </Title>
      <Question>{data.question}</Question>
    </Container>
  );
}

HelpOrder.propTypes = {
  data: PropTypes.shape({
    createdAt: PropTypes.string,
    answerAt: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};
