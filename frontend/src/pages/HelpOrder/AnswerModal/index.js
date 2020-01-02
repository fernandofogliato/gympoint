import React from 'react';
import { toast } from 'react-toastify';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { MdClose } from 'react-icons/md';

import api from '~/services/api';
import colors from '~/styles/colors';
import Button from '~/components/Button';

import { Backdrop, Container, Title, Content } from './styles';

function removeElementAnswerModal() {
  const div = document.getElementById('answer-modal');
  if (div) {
    div.parentNode.removeChild(div);
  }
}

export function showAnswerModal({ ownerId, helpOrder, onAnswer }) {
  let div = document.getElementById('answer-modal');

  const owner = ownerId ? document.getElementById(ownerId) : document.body;

  if (!div) {
    div = document.createElement('div');
    div.id = 'answer-modal';
    owner.appendChild(div);
  }

  render(<AnswerModal helpOrder={helpOrder} onAnswer={onAnswer} />, div);
}

export default function AnswerModal(props) {
  const { helpOrder, onAnswer } = props;

  function close() {
    removeElementAnswerModal();
  }

  async function handleSubmit({ answer }) {
    try {
      await api.put(`help-orders/${helpOrder.id}`, { answer });
      toast.success('Pedido de auxílio respondido com sucesso.');
      close();
      onAnswer(helpOrder.id);
    } catch (err) {
      toast.error('Não foi possível responder o pedido de auxílio.');
    }
  }

  return (
    <Backdrop>
      <Container>
        <Content>
          <Title>
            <h4>PERGUNTA DO ALUNO</h4>
            <button type="button" onClick={close}>
              <MdClose size={20} color={colors.midGrey} />
            </button>
          </Title>
          <p>{helpOrder.question}</p>
          <Form onSubmit={handleSubmit}>
            <Input
              label="SUA RESPOSTA"
              name="answer"
              multiline="true"
              rows="4"
              cols="50"
            />
            <Button type="submit" text="Responder aluno" />
          </Form>
        </Content>
      </Container>
    </Backdrop>
  );
}

AnswerModal.propTypes = {
  helpOrder: PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
};
