import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdArrowBack, MdSave } from 'react-icons/md';
import * as Yup from 'yup';

import api from '~/services/api';

import { SubmitButton, BackButton, Form, Input } from '~/components/Form';
import { Container, Title, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  dateOfBirth: Yup.string().required('A data é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória'),
});

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
    if (id && id !== 'new') {
      await api.put(`students/${id}`, data);
    } else {
      await api.post('students', data);
    }
    toast.success('Informações do aluno salvas com sucesso!');
    props.history.push('/students');
  }

  return (
    <Container>
      <Form schema={schema} initialData={student} onSubmit={handleSubmit}>
        <Title>
          <h2>Cadastro de alunos</h2>
          <aside>
            <BackButton onClick={() => props.history.goBack()}>
              <MdArrowBack size={20} />
              Voltar
            </BackButton>
            <SubmitButton>
              <MdSave size={20} />
              Salvar
            </SubmitButton>
          </aside>
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
                label="DATA NASCTO."
                name="dateOfBirth"
                type="date"
                placeholder="Data de nascto."
              />
            </div>

            <div>
              <Input
                label="PESO (em kg)"
                name="weight"
                type="number"
                placeholder="Peso"
                step="0.01"
                min="0"
                max="200"
              />
            </div>
            <div>
              <Input
                label="ALTURA (em metros)"
                name="height"
                type="number"
                placeholder="Altura"
                step="0.01"
                min="0"
                max="3"
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
