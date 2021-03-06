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
  const [loading, setLoading] = useState(false);
  const { match } = props;
  const { id } = match.params;

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get(`plans/${id}`);
      const data = {
        ...response.data,
        totalPrice: response.data.price * response.data.duration,
      };
      setPlan(data);
    }

    if (id !== 'new') {
      try {
        setLoading(true);
        loadPlan();
      } catch (err) {
        toast.error('Não foi possível carregar as informações dos planos');
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  async function handleSubmit(data) {
    try {
      setLoading(true);
      if (id !== 'new') {
        await api.put(`plans/${id}`, data);
      } else {
        await api.post('plans', data);
      }
      toast.success('Informações do plano salvas com sucesso!');
      setLoading(false);
      props.history.push('/plans');
    } catch (err) {
      setLoading(false);
      toast.error('Não foi possível salvar as informações do plano.');
    }
  }

  function handleDurationChange(newDuration) {
    setPlan({
      ...plan,
      duration: newDuration,
      totalPrice: plan ? plan.price * newDuration : 0,
    });
  }

  function handlePriceChange(newPrice) {
    setPlan({
      ...plan,
      price: newPrice,
      totalPrice: plan ? newPrice * plan.duration : 0,
    });
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
        <Input
          label="TÍTULO DO PLANO"
          name="title"
          placeholder="Título do Plano"
        />

        <div className="grid-columns">
          <NumberInput
            label="DURAÇÃO (em meses)"
            name="duration"
            onChange={handleDurationChange}
          />

          <NumberInput
            label="PREÇO MENSAL"
            name="price"
            isCurrency
            onChange={handlePriceChange}
          />

          <NumberInput
            label="PREÇO TOTAL"
            name="totalPrice"
            type="number"
            isCurrency
            readOnly
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
  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};
