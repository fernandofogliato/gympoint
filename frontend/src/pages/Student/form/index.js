import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form } from '@rocketseat/unform';
import { MdArrowBack, MdSave } from 'react-icons/md';
import api from '~/services/api';

import { SubmitButton, BackButton, Input } from '~/components/Form';
import { Container, Title, Content } from './styles';

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
    console.tron.log(data);
    if (id && id !== 'new') {
      await api.put(`students/${id}`, data);
    } else {
      await api.post(`students`, data);
    }
    toast.success('Informações do aluno salvas com sucesso!');
    props.history.push('/students');
  }

  return (
    <Container>
      <Form initialData={student} onSubmit={handleSubmit}>
        <Title>
          <h2>Cadastro de alunos</h2>
          <div className="actions">
            <BackButton onClick={() => props.history.goBack()}>
              <MdArrowBack size={20} />
              Voltar
            </BackButton>
            <SubmitButton>
              <MdSave size={20} />
              Salvar
            </SubmitButton>
          </div>
        </Title>

        <Content>
          <Input
            label="NOME COMPLETO"
            name="name"
            placeholder="Nome completo"
          />

          <Input
            label="ENDEREÇO DE E-MAIL"
            name="email"
            type="email"
            placeholder="E-mail"
          />

          <div>
            <div>
              <Input
                label="IDADE"
                name="age"
                type="number"
                placeholder="Idade"
              />
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
        </Content>
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
