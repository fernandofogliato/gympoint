import React from 'react';

import { Container } from './styles';

export default function Student() {
  return (
    <Container>
      <h2>Gerenciamento alunos</h2>
      <table>
        <thead>
          <th>NOME</th>
          <th>E-MAIL</th>
          <th>IDADE</th>
        </thead>
        <tbody>
          <tr>
            <td>Cha Ji-Hum</td>
            <td>example@rocketseat.com.br</td>
            <td>20</td>
            <td>
              <button type="button">editar</button>
              <button type="button">apagar</button>
            </td>
          </tr>
          <tr>
            <td>Cha Ji-Hum</td>
            <td>example@rocketseat.com.br</td>
            <td>20</td>
            <td>
              <button type="button">editar</button>
              <button type="button">apagar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
