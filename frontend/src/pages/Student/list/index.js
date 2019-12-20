import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  MdAdd,
  MdModeEdit,
  MdDelete,
  MdNavigateBefore,
  MdNavigateNext,
} from 'react-icons/md';

import api from '~/services/api';

import { Container, Title, StudentTable, Pagination } from './styles';

export default function StudentList(props) {
  const [students, setStudents] = useState([]);
  const [filterName, setFilterName] = useState();

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', {
        params: {
          name: filterName,
        },
      });
      setStudents(response.data);
    }
    loadStudents();
  }, [filterName]);

  return (
    <Container>
      <Title>
        <h2>Gerenciando alunos</h2>
        <div>
          <Link to="/student/new">
            <MdAdd color="#fff" size={20} />
            NOVO
          </Link>
          <input
            type="text"
            placeholder="Buscar aluno"
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
          />
        </div>
      </Title>
      <StudentTable>
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th style={{ textAlign: 'left' }}>IDADE</th>
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
      </StudentTable>
      <Pagination>
        <button type="button" title="Página anterior">
          <MdNavigateBefore color="#ee4d64" size={20} />
        </button>
        <button type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button" title="Próxima página">
          <MdNavigateNext color="#ee4d64" size={20} />
        </button>
      </Pagination>
    </Container>
  );
}

StudentList.defaultProps = {
  history: PropTypes.any,
};
