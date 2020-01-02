import React, { useRef, useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { useField } from '@rocketseat/unform';

import { Container } from './styles';

export default function SelectInput({ name, label, onLoadOptions, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    console.tron.log('defaultValue', defaultValue);
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  const debouncedLoadOptions = debounce(onLoadOptions, 500);

  function handleChange(selectedValue) {
    console.tron.log('handleChange', selectedValue);
    setValue(selectedValue);
  }

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <AsyncSelect
        value={value}
        cacheOptions
        name={fieldName}
        loadOptions={inputValue => debouncedLoadOptions(inputValue)}
        noOptionsMessage={() => 'Nenhum registro localizado'}
        loadingMessage={() => 'Carregando...'}
        ref={ref}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        onChange={handleChange}
        {...rest}
        defaultValue={value}
      />

      {error && <span>{error}</span>}
    </Container>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onLoadOptions: PropTypes.func.isRequired,
};

SelectInput.defaultProps = {
  label: null,
};
