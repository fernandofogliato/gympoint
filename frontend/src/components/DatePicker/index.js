import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import { Container } from './styles';

export default function DatePicker({ name, label, readOnly, onChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      setSelected(new Date(defaultValue));
    }
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleChange(date) {
    setSelected(date);
    if (onChange) {
      onChange(date);
    }
  }

  return (
    <Container>
      <label htmlFor={fieldName}>{label}</label>
      <ReactDatePicker
        name={fieldName}
        id={fieldName}
        selected={selected}
        onChange={handleChange}
        ref={ref}
        autoComplete="off"
        dateFormat="P"
        locale={pt}
        customInput={
          <MaskedInput
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        }
        readOnly={readOnly}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

DatePicker.defaultProps = {
  label: null,
  readOnly: false,
  onChange: null,
};
