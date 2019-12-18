import React from 'react';

import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';

import { Container, Title, StudentTable } from './styles';

export default function Student() {
  return (
    <Container>
      <Title>
        <h2>Gerenciando alunos</h2>
        <div>
          <button type="button" title="Cadastrar novo aluno">
            <MdAdd color="#fff" size={20} />
            NOVO
          </button>
          <input type="text" placeholder="Buscar aluno" />
        </div>
      </Title>
      <StudentTable>
        <thead>
          <th>NOME</th>
          <th>E-MAIL</th>
          <th style={{ textAlign: 'left' }}>IDADE</th>
        </thead>
        <tbody>
          <tr>
            <td>Cha Ji-Hum</td>
            <td>example@rocketseat.com.br</td>
            <td align="center">20</td>
            <td>
              <button type="button" title="Editar aluno">
                <MdModeEdit color="#ee4d64" size={20} />
              </button>
              <button type="button" title="Apagar aluno">
                <MdDelete color="#ee4d64" size={20} />
              </button>
            </td>
          </tr>
          <tr>
            <td>Cha Ji-Hum</td>
            <td>example@rocketseat.com.br</td>
            <td align="center">20</td>
            <td>
              <button type="button" title="Editar">
                <MdModeEdit color="#ee4d64" size={20} />
              </button>
              <button type="button" title="Apagar">
                <MdDelete color="#ee4d64" size={20} />
              </button>
            </td>
          </tr>
        </tbody>
      </StudentTable>
    </Container>
  );
}
