import React, { useState, useCallback } from 'react';
import { MdQuestionAnswer } from 'react-icons/md';

import api from '~/services/api';

import { Title } from '~/pages/_layouts/list/styles';
import Pagination from '~/components/Pagination';
import { showAnswerModal } from './AnswerModal/index';

export default function HelpOrderList() {
  const [pageCount, setPageCount] = useState(0);
  const [helpOrders, setHelpOrders] = useState([]);

  const loadPendentHelpOrders = useCallback(async (page = 1) => {
    const response = await api.get('help-orders/pendents', {
      params: {
        page,
      },
    });
    setHelpOrders(response.data.rows);
    setPageCount(response.data.count);
  }, []);

  function handleAnswerOrder(id) {
    setHelpOrders(helpOrders.filter(helpOrder => helpOrder.id !== id));
  }

  function answer(helpOrder) {
    showAnswerModal({
      onAnswer: handleAnswerOrder,
      ownerId: 'listHelpOrders',
      helpOrder,
    });
  }

  return (
    <div id="listHelpOrders">
      <Title>
        <h2>Pedidos de auxílio</h2>
      </Title>
      <table>
        <thead>
          <tr>
            <th>ALUNO</th>
          </tr>
        </thead>
        <tbody>
          {helpOrders.map(order => (
            <tr key={String(order.id)}>
              <td>{order.student.name}</td>
              <td align="right">
                <button
                  type="button"
                  title="Responder"
                  onClick={() => answer(order)}
                >
                  <MdQuestionAnswer size={20} />
                </button>
              </td>
            </tr>
          ))}
          {helpOrders.length === 0 && (
            <tr>
              <td align="center">
                Não foram encontrados pedidos de auxílio em aberto.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination callback={loadPendentHelpOrders} pageCount={pageCount} />
    </div>
  );
}
