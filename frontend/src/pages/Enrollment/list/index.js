import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import Button from '~/components/Button';

import api from '~/services/api';

import { Title } from '~/pages/_layouts/list/styles';
import Pagination from '~/components/Pagination';
import { confirmDialog } from '~/components/ConfirmDialog';

export default function EnrollmentList(props) {
  const [pageCount, setPageCount] = useState(0);
  const [enrollments, setEnrollments] = useState([]);

  const loadEnrollments = useCallback(async (page = 1) => {
    const response = await api.get('enrollments', {
      params: {
        page,
      },
    });

    const data = response.data.rows.map(enrollment => ({
      ...enrollment,
      startDateFormatted: format(
        parseISO(enrollment.startDate),
        "d 'de' MMMM yyyy",
        { locale: pt }
      ),
      endDateFormatted: format(
        parseISO(enrollment.endDate),
        "d 'de' MMMM yyyy",
        {
          locale: pt,
        }
      ),
      activeFormatted: enrollment.active ? 'Sim' : 'Não',
    }));
    setEnrollments(data);
    setPageCount(response.data.count);
  }, []);

  function removeWithConfirmation(id) {
    async function handleRemoveEnrollment() {
      try {
        await api.delete(`enrollments/${id}`);
        setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
      } catch (err) {
        toast.error('Não foi possível remover a matrícula.');
      }
    }

    confirmDialog({
      title: 'Excluir Matrícula',
      onConfirm: handleRemoveEnrollment,
      ownerId: 'listEnrollments',
      message: (
        <>
          <p>Tem certeza que deseja excluir a matrícula?</p>
        </>
      ),
    });
  }

  return (
    <div id="listEnrollments">
      <Title>
        <h2>Gerenciando de matrículas</h2>
        <Button
          text="Novo"
          icon={MdAdd}
          onClick={() => props.history.push('/enrollments/new')}
        />
      </Title>
      <table>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th>PLANO</th>
            <th style={{ textAlign: 'center' }}>INÍCIO</th>
            <th style={{ textAlign: 'center' }}>TÉRMINO</th>
            <th style={{ textAlign: 'center' }}>ATIVA</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map(enrollment => (
            <tr key={String(enrollment.id)}>
              <td>{enrollment.student.name}</td>
              <td>{enrollment.plan.title}</td>
              <td align="center">{enrollment.startDateFormatted}</td>
              <td align="center">{enrollment.endDateFormatted}</td>
              <td align="center">{enrollment.activeFormatted}</td>
              <td>
                <button
                  type="button"
                  title="Editar matrícula"
                  onClick={() =>
                    props.history.push(`/enrollments/${enrollment.id}`)
                  }
                >
                  <MdModeEdit size={20} />
                </button>
                <button
                  type="button"
                  title="Excluir matrícula"
                  onClick={() => removeWithConfirmation(enrollment.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
          {enrollments.length === 0 && (
            <tr>
              <td colSpan="4" align="center">
                Não foram encontrados registros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination callback={loadEnrollments} pageCount={pageCount} />
    </div>
  );
}

EnrollmentList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
