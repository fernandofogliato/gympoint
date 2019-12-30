import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { render } from 'react-dom';

import colors from '~/styles/colors';
import Button from '~/components/Button';

import { Backdrop, Container, Header, Body, Footer } from './styles';

function removeElementConfirmDialog() {
  const divDialog = document.getElementById('confirm-dialog');
  if (divDialog) {
    divDialog.parentNode.removeChild(divDialog);
  }
}

function createElementConfirmDialog(properties) {
  let divDialog = document.getElementById('confirm-dialog');

  const { ownerId } = properties;
  const owner = ownerId ? document.getElementById(ownerId) : document.body;

  if (ownerId) delete properties.ownerId;

  if (!divDialog) {
    divDialog = document.createElement('div');
    divDialog.id = 'confirm-dialog';
    owner.appendChild(divDialog);
  }

  render(<ConfirmDialog {...properties} />, divDialog);
}

export function confirmDialog(properties) {
  createElementConfirmDialog(properties);
}

export default function ConfirmDialog(props) {
  const { title, onCancel, onConfirm, onClose, message } = props;

  function close() {
    if (onClose) {
      onClose();
    }
    removeElementConfirmDialog();
  }

  useEffect(() => {
    createElementConfirmDialog(props);
  }, []); // eslint-disable-line

  function handleCancelDialog() {
    if (onCancel) {
      onCancel();
    }
    close();
  }

  function handleConfirmDialog() {
    if (onConfirm) {
      onConfirm();
    }
    close();
  }

  return (
    <Backdrop>
      <Container>
        <Header>
          <h2>{title}</h2>
        </Header>
        <Body>{message}</Body>
        <Footer>
          <Button
            text="Cancelar"
            color={colors.grey}
            onClick={() => handleCancelDialog()}
          />
          <Button text="Confirmar" onClick={() => handleConfirmDialog()} />
        </Footer>
      </Container>
    </Backdrop>
  );
}

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

ConfirmDialog.defaultProps = {
  title: '',
  onCancel: null,
  onConfirm: null,
  onClose: null,
  message: null,
};
