import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { differenceInYears, parseISO } from 'date-fns';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import Button from '~/components/Button';

import api from '~/services/api';

import { Title } from '~/pages/_layouts/list/styles';
import Pagination from '~/components/Pagination';
import { confirmDialog } from '~/components/ConfirmDialog';

export default function StudentList(props) {
  const [pageCount, setPageCount] = useState(0);
  const [students, setStudents] = useState([]);
  const [filterName, setFilterName] = useState();

  const loadStudents = useCallback(
    async (page = 1) => {
      const response = await api.get('students', {
        params: {
          name: filterName,
          page,
        },
      });

      const data = response.data.rows.map(student => ({
        ...student,
        age: differenceInYears(new Date(), parseISO(student.dateOfBirth)),
      }));
      setStudents(data);
      setPageCount(response.data.count);
    },
    [filterName]
  );

  useEffect(() => {
    loadStudents();
  }, [filterName, loadStudents]);

  function removeWithConfirmation(id) {
    async function handleRemoveStudent() {
      try {
        await api.delete(`students/${id}`);
        setStudents(students.filter(student => student.id !== id));
      } catch (err) {
        toast.error('Não foi possível remover o aluno.');
      }
    }

    confirmDialog({
      title: 'Excluir Aluno',
      onConfirm: handleRemoveStudent,
      ownerId: 'listStudents',
      message: (
        <>
          <p>Tem certeza que deseja excluir o aluno?</p>
        </>
      ),
    });
  }

  return (
    <div id="listStudents">
      <Title>
        <h2>Gerenciando de alunos</h2>
        <div>
          <Button
            text="Novo"
            icon={MdAdd}
            onClick={() => props.history.push('/students/new')}
          />

          <input
            type="text"
            placeholder="Buscar aluno"
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
          />
        </div>
      </Title>
      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th style={{ textAlign: 'center' }}>IDADE</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={String(student.id)}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td align="center">{student.age}</td>
              <td align="right">
                <button
                  type="button"
                  title="Editar aluno"
                  onClick={() => props.history.push(`/students/${student.id}`)}
                >
                  <MdModeEdit size={20} />
                </button>
                <button
                  type="button"
                  title="Excluir aluno"
                  onClick={() => removeWithConfirmation(student.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="4" align="center">
                Não foram encontrados registros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination callback={loadStudents} pageCount={pageCount} />
    </div>
  );
}

StudentList.propTypes = {
  history: PropTypes.objectOf(History).isRequired,
};
