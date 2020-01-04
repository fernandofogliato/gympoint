import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import Button from '~/components/Button';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

import { Title } from '~/pages/_layouts/list/styles';
import Pagination from '~/components/Pagination';
import { confirmDialog } from '~/components/ConfirmDialog';

export default function PlanList(props) {
  const [pageCount, setPageCount] = useState(0);
  const [plans, setPlans] = useState([]);

  const loadPlans = useCallback(async (page = 1) => {
    const response = await api.get('plans', {
      params: {
        page,
      },
    });

    const data = response.data.rows.map(plan => ({
      ...plan,
      durationFormatted:
        plan.duration === 1 ? `${plan.duration} mês` : `${plan.duration} meses`,
      priceFormatted: formatPrice(plan.price),
    }));

    setPlans(data);
    setPageCount(response.data.count);
  }, []);

  function removeWithConfirmation(id) {
    async function handleRemovePlan() {
      try {
        await api.delete(`plans/${id}`);
        loadPlans(plans.filter(plan => plan.id !== id));
      } catch (err) {
        toast.error('Não foi possível remover o plano.');
      }
    }

    confirmDialog({
      title: 'Excluir Plano',
      onConfirm: handleRemovePlan,
      ownerId: 'listPlans',
      message: (
        <>
          <p>Tem certeza que deseja excluir o plano?</p>
        </>
      ),
    });
  }

  return (
    <div id="listPlans">
      <Title>
        <h2>Gerenciando de planos</h2>
        <Button
          text="Novo"
          icon={MdAdd}
          onClick={() => props.history.push('/plans/new')}
        />
      </Title>
      <table>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th style={{ textAlign: 'center' }}>DURAÇÃO</th>
            <th style={{ textAlign: 'right' }}>VALOR p/ MÊS</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={String(plan.id)}>
              <td>{plan.title}</td>
              <td align="center">{plan.durationFormatted}</td>
              <td align="right">{plan.priceFormatted}</td>
              <td align="right">
                <button
                  type="button"
                  title="Editar plano"
                  onClick={() => props.history.push(`/plans/${plan.id}`)}
                >
                  <MdModeEdit size={20} />
                </button>
                <button
                  type="button"
                  title="Excluir plano"
                  onClick={() => removeWithConfirmation(plan.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
          {plans.length === 0 && (
            <tr>
              <td colSpan="3" align="center">
                Não foram encontrados registros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination callback={loadPlans} pageCount={pageCount} />
    </div>
  );
}

PlanList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
