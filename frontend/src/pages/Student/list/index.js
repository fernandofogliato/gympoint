import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { differenceInYears, parseISO } from 'date-fns';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';

import Button from '~/components/Button';

import api from '~/services/api';

import Title from '~/pages/_layouts/list/styles';
import Pagination from '~/components/Pagination';

export default function StudentList(props) {
  const [students, setStudents] = useState([]);
  const [filterName, setFilterName] = useState();

  useEffect(() => {
    loadStudents();
  }, [filterName, loadStudents]);

  async function loadStudents(page = 1) {
    const response = await api.get('students', {
      params: {
        name: filterName,
        page,
      },
    });

    const data = response.data.map(student => ({
      ...student,
      age: differenceInYears(new Date(), parseISO(student.dateOfBirth)),
    }));
    setStudents(data);
  }

  return (
    <>
      <Title>
        <h2>Gerenciando alunos</h2>
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
              <td>
                <button
                  type="button"
                  title="Editar aluno"
                  onClick={() => props.history.push(`/students/${student.id}`)}
                >
                  <MdModeEdit size={20} />
                </button>
                <button type="button" title="Apagar aluno">
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination callback={loadStudents} />
    </>
  );
}

StudentList.defaultProps = {
  history: PropTypes.any,
};
