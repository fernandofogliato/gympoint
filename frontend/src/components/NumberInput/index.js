import React, { useState, useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import { formatQuantity, formatPrice } from '~/util/format';

import { Container } from './styles';

export default function NumberInput({
  name,
  label,
  isCurrency,
  readOnly,
  onChange,
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [formattedValue, setFormattedValue] = useState(defaultValue);
  const [numberValue, setNumberValue] = useState(defaultValue);

  useEffect(() => {
    if (isCurrency) {
      setFormattedValue(formatPrice(defaultValue));
    } else {
      setFormattedValue(formatQuantity(defaultValue));
    }
  }, [defaultValue, isCurrency]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.numbervalue',
      clearValue: weightRef => {
        weightRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <Container>
      <label htmlFor={fieldName}>{label}</label>
      <NumberFormat
        name={fieldName}
        id={fieldName}
        thousandSeparator="."
        decimalSeparator=","
        value={formattedValue}
        numbervalue={numberValue}
        onValueChange={values => {
          setFormattedValue(values.formattedValue);
          setNumberValue(values.value);
          if (onChange) {
            onChange(values.value);
          }
        }}
        ref={ref}
        autoComplete="off"
        allowedDecimalSeparators="[',']"
        allowNegative="false"
        decimalScale="2"
        prefix={isCurrency ? 'R$ ' : undefined}
        readOnly={readOnly}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isCurrency: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

NumberInput.defaultProps = {
  label: null,
  isCurrency: false,
  readOnly: false,
  onChange: null,
};
