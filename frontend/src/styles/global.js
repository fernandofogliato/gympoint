import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  h2 {
    height: 36px;
  }

  input {
    text-indent: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 36px;
    color: #666;

    &::placeholder {
      color: #999;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }

  label {
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
