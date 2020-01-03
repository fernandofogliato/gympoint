import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdArrowBack, MdSave } from 'react-icons/md';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';

import colors from '~/styles/colors';
import DatePicker from '~/components/DatePicker';
import Button from '~/components/Button';
import NumberInput from '~/components/NumberInput';
import { Title, Content } from '~/pages/_layouts/form/styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  dateOfBirth: Yup.string().required('A data de nascimento é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória'),
});

export default function StudentForm(props) {
  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(false);
  const { match } = props;
  const { id } = match.params;

  useEffect(() => {
    async function loadStudent() {
      try {
        setLoading(true);
        const response = await api.get(`students/${id}`);
        setStudent(response.data);
      } catch (err) {
        toast.error('Não foi possível carregar as informações do aluno');
      } finally {
        setLoading(false);
      }
    }

    if (id !== 'new') {
      loadStudent();
    }
  }, [id]);

  async function handleSubmit(data) {
    try {
      setLoading(true);
      if (id !== 'new') {
        await api.put(`students/${id}`, data);
      } else {
        await api.post('students', data);
      }
      toast.success('Informações do aluno salvas com sucesso!');
      setLoading(false);
      props.history.push('/students');
    } catch (err) {
      toast.error('Não foi possível salvar as informações do aluno.');
      setLoading(false);
    }
  }

  return (
    <Form schema={schema} initialData={student} onSubmit={handleSubmit}>
      <Title>
        <h2>Cadastro de alunos</h2>
        <aside>
          <Button
            text="Voltar"
            icon={MdArrowBack}
            color={colors.grey}
            onClick={() => props.history.goBack()}
          />
          <Button
            text="Salvar"
            icon={MdSave}
            type="submit"
            loading={loading}
            textLoading="Salvando..."
          />
        </aside>
      </Title>

      <Content>
        <Input label="NOME COMPLETO" name="name" placeholder="Nome completo" />

        <Input
          label="ENDEREÇO DE E-MAIL"
          name="email"
          type="email"
          placeholder="E-mail"
        />

        <div className="grid-columns">
          <DatePicker label="DATA NASCTO." name="dateOfBirth" />

          <NumberInput label="PESO (em kg)" name="weight" />

          <NumberInput label="ALTURA (em metros)" name="height" type="number" />
        </div>
      </Content>
    </Form>
  );
}

StudentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};
