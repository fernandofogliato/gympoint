import React, { useEffect, useState } from 'react';
import {
  MdAdd,
  MdModeEdit,
  MdDelete,
  MdNavigateBefore,
  MdNavigateNext,
} from 'react-icons/md';

import api from '~/services/api';

import { Container, Title, StudentTable, Pagination } from './styles';

export default function Student() {
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
          <button type="button" title="Cadastrar novo aluno">
            <MdAdd color="#fff" size={20} />
            NOVO
          </button>
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
                <button type="button" title="Editar aluno">
                  <MdModeEdit color="#ee4d64" size={20} />
                </button>
                <button type="button" title="Apagar aluno">
                  <MdDelete color="#ee4d64" size={20} />
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
