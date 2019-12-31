import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdArrowBack, MdSave } from 'react-icons/md';
import * as Yup from 'yup';
import { Form } from '@rocketseat/unform';

import api from '~/services/api';

import colors from '~/styles/colors';
import DatePicker from '~/components/DatePicker';
import Button from '~/components/Button';
import NumberInput from '~/components/NumberInput';
import SelectInput from '~/components/SelectInput';
import { Title, Content } from '~/pages/_layouts/form/styles';

const schema = Yup.object().shape({
  student: Yup.object().required('Aluno é obrigatório'),
  plan: Yup.object().required('Plano é obrigatório'),
  startDate: Yup.string().required('A data de início é obrigatória'),
});

export default function EnrollmentForm(props) {
  const [enrollment, setEnrollment] = useState();
  const { match } = props;
  const { id } = match.params;

  useEffect(() => {
    async function loadEnrollment() {
      const response = await api.get(`enrollments/${id}`);
      setEnrollment(response.data);
    }

    if (id && id !== 'new') {
      loadEnrollment();
    }
  }, [id]);

  async function handleSubmit(data) {
    console.tron.log('data', data);
    // try {
    //   if (id && id !== 'new') {
    //     await api.put(`enrollments/${id}`, data);
    //   } else {
    //     await api.post('enrollments', data);
    //   }
    //   toast.success('Informações da matrícula salvas com sucesso!');
    //   props.history.push('/enrollments');
    // } catch (err) {
    toast.error('Não foi possível salvar as informações da matrícula.');
    // }
  }

  async function loadStudents(name) {
    if (!name) {
      return [];
    }

    console.tron.log('loadStudents', name);
    const response = await api.get('students', {
      params: {
        name,
      },
    });
    console.tron.log('response', response.data.rows);
    return response.data.rows;
  }

  return (
    <Form initialData={enrollment} onSubmit={handleSubmit}>
      <Title>
        <h2>Cadastro de matrícula</h2>
        <aside>
          <Button
            text="Voltar"
            icon={MdArrowBack}
            color={colors.grey}
            onClick={() => props.history.goBack()}
          />
          <Button text="Salvar" icon={MdSave} type="submit" />
        </aside>
      </Title>

      <Content>
        <SelectInput
          label="ALUNO"
          name="student"
          onLoadOptions={loadStudents}
          placeholder="Selecione o aluno"
        />

        <div className="grid-columns">
          {/* <SelectInput
            label="PLANO"
            name="plano"
            placeholder="Selecione o plano"
          /> */}

          <DatePicker label="DATA DE INÍCIO" name="startDate" />

          <DatePicker label="DATA DE TÉRMINO" name="endDate" />

          <NumberInput label="VALOR FINAL" name="totalPrice" />
        </div>
      </Content>
    </Form>
  );
}

EnrollmentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.objectOf(History).isRequired,
};
