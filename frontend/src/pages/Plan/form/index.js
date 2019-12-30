import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdArrowBack, MdSave } from 'react-icons/md';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';

import colors from '~/styles/colors';
import Button from '~/components/Button';
import NumberInput from '~/components/NumberInput';
import { Title, Content } from '~/pages/_layouts/form/styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number().required('A duração é obrigatória'),
  price: Yup.number().required('O preço mensal é obrigatório'),
});

export default function PlanForm(props) {
  const [plan, setPlan] = useState();
  const { match } = props;
  const { id } = match.params;

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get(`plans/${id}`);
      const data = {
        ...response.data,
        totalPrice: response.data.price * response.data.duration,
      };
      console.tron.log(data);
      setPlan(data);
    }

    if (id && id !== 'new') {
      loadPlan();
    }
  }, [id]);

  async function handleSubmit(data) {
    try {
      if (id && id !== 'new') {
        await api.put(`plans/${id}`, data);
      } else {
        await api.post('plans', data);
      }
      toast.success('Informações do plano salvas com sucesso!');
      props.history.push('/plans');
    } catch (err) {
      toast.error('Não foi possível salvar as informações do plano.');
    }
  }

  return (
    <Form schema={schema} initialData={plan} onSubmit={handleSubmit}>
      <Title>
        <h2>Cadastro de planos</h2>
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
        <Input
          label="TÍTULO DO PLANO"
          name="title"
          placeholder="Título do Plano"
        />

        <div className="grid-columns">
          <NumberInput label="DURAÇÃO (em meses)" name="duration" />

          <NumberInput label="PREÇO MENSAL" name="price" isCurrency />

          <NumberInput
            label="PREÇO TOTAL"
            name="totalPrice"
            type="number"
            isCurrency
          />
        </div>
      </Content>
    </Form>
  );
}

PlanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.objectOf(History).isRequired,
};
