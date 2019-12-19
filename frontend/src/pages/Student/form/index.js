import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';

import { Container, Title } from './styles';

export default function StudentForm(props) {
  const [student, setStudent] = useState();
  const { match } = props;
  const { id } = match.params;

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`students/${id}`);
      setStudent(response.data);
    }

    if (id && id !== 'new') {
      loadStudent();
    }
  }, [id]);

  async function handleSubmit(data) {
    if (id) {
      await api.put(`students/${id}`, data);
    } else {
      await api.put(`students`, data);
    }
    toast.success('Informações do aluno salvas com sucesso!');
  }

  return (
    <Container>
      <Title>
        <h2>CADASTRO DE ALUNO</h2>
        <div>
          <button type="button" onClick={() => props.history.goBack()}>
            Voltar
          </button>
          <button type="submit">Salvar</button>
        </div>
      </Title>
      <Form initialData={student} onSubmit={handleSubmit}>
        <Input label="NOME COMPLETO" name="name" placeholder="Nome completo" />

        <Input
          label="ENDEREÇO DE E-MAIL"
          name="email"
          type="email"
          placeholder="E-mail"
        />

        <div>
          <div>
            <Input label="IDADE" name="age" type="number" placeholder="Idade" />
          </div>

          <div>
            <Input
              label="PESO (em kg)"
              name="weight"
              type="number"
              placeholder="Peso"
            />
          </div>

          <div>
            <Input
              label="ALTURA (em metros)"
              name="height"
              type="number"
              placeholder="Altura"
            />
          </div>
        </div>
      </Form>
    </Container>
  );
}

StudentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
