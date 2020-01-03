import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdArrowBack, MdSave } from 'react-icons/md';
import * as Yup from 'yup';
import { Form } from '@rocketseat/unform';
import { addMonths } from 'date-fns';

import api from '~/services/api';

import colors from '~/styles/colors';
import DatePicker from '~/components/DatePicker';
import Button from '~/components/Button';
import NumberInput from '~/components/NumberInput';
import SelectInput from '~/components/SelectInput';
import { Title, Content } from '~/pages/_layouts/form/styles';

const schema = Yup.object().shape({
  student: Yup.object({
    id: Yup.number(),
  })
    .nullable()
    .required('Aluno é obrigatório'),
  plan: Yup.object()
    .shape({
      id: Yup.number(),
    })
    .nullable()
    .required('Plano é obrigatório'),
  startDate: Yup.date().required('A data de início é obrigatória'),
});

export default function EnrollmentForm(props) {
  const [enrollment, setEnrollment] = useState();
  const [loading, setLoading] = useState(false);
  const { match } = props;
  const { id } = match.params;

  useEffect(() => {
    async function loadEnrollment() {
      const response = await api.get(`enrollments/${id}`);
      setEnrollment(response.data);
    }

    if (id !== 'new') {
      try {
        setLoading(true);
        loadEnrollment();
      } catch (err) {
        toast.error('Não foi possível carregar a matrícula.');
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  async function handleSubmit({ student, plan, startDate }) {
    try {
      setLoading(true);
      const data = {
        id,
        studentId: student.id,
        planId: plan.id,
        startDate: startDate.toISOString(),
      };

      if (id !== 'new') {
        await api.put(`enrollments/${id}`, data);
      } else {
        await api.post('enrollments', data);
      }
      toast.success('Informações da matrícula salvas com sucesso!');
      setLoading(false);
      props.history.push('/enrollments');
    } catch (err) {
      setLoading(false);
      toast.error('Não foi possível salvar as informações da matrícula.');
    }
  }

  async function loadStudents(name) {
    if (!name || name.length < 3) {
      return [];
    }

    const response = await api.get('students', {
      params: {
        name,
      },
    });
    return response.data.rows;
  }

  async function loadPlans(title) {
    if (!title || title.length < 3) {
      return [];
    }

    const response = await api.get('plans', {
      params: {
        title,
      },
    });
    return response.data.rows;
  }

  function handleStartDateChange(newStartDate) {
    setEnrollment({
      ...enrollment,
      startDate: newStartDate,
      endDate:
        enrollment && enrollment.plan
          ? addMonths(newStartDate, enrollment.plan.duration)
          : undefined,
    });
  }

  function handlePlanChange(newPlan) {
    setEnrollment({
      ...enrollment,
      plan: newPlan,
      price: newPlan ? newPlan.totalPrice : undefined,
      endDate:
        enrollment && enrollment.startDate && newPlan
          ? addMonths(enrollment.startDate, newPlan.duration)
          : undefined,
    });
  }

  return (
    <Form schema={schema} initialData={enrollment} onSubmit={handleSubmit}>
      <Title>
        <h2>Cadastro de matrícula</h2>
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
        <SelectInput
          label="ALUNO"
          name="student"
          onLoadOptions={loadStudents}
          placeholder="Digite ao menos 3 caracteres p/ pesquisar"
        />

        <div className="grid-columns">
          <SelectInput
            label="PLANO"
            name="plan"
            onLoadOptions={loadPlans}
            placeholder="Selecione o plano"
            onChange={handlePlanChange}
          />

          <DatePicker
            label="DATA DE INÍCIO"
            name="startDate"
            onChange={handleStartDateChange}
          />

          <DatePicker label="DATA DE TÉRMINO" name="endDate" readOnly />

          <NumberInput label="VALOR FINAL" name="price" readOnly isCurrency />
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
  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};
