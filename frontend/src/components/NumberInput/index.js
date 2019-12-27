import React, { useState, useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

export const { format: formatQuantity } = new Intl.NumberFormat('pt-BR', {
  style: 'decimal',
});

export default function NumberInput({ name, label }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [formattedValue, setFormattedValue] = useState(defaultValue);
  const [numberValue, setNumberValue] = useState(defaultValue);

  useEffect(() => {
    setFormattedValue(formatQuantity(defaultValue));
  }, [defaultValue]);

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
    <div>
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
        }}
        ref={ref}
        autoComplete="off"
        allowedDecimalSeparators="[',']"
        allowNegative="false"
        decimalScale="2"
      />
      {error && <span>{error}</span>}
    </div>
  );
}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

NumberInput.defaultProps = {
  label: null,
};
