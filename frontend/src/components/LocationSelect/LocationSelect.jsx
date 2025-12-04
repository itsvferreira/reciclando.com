import Select, { components } from 'react-select';
import { MapPin, ChevronDown } from 'lucide-react';
import styles from './LocationSelect.module.css';

// Material de referência: https://react-select.com/components
const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingLeft: 8,
    paddingRight: 8,
    minHeight: 44,
    border: '1px solid #0000001a',
    boxShadow: 'none',
    '&:active': {
      appearance: 'none',
    },
    '&:hover': {
      border: '1px solid #949191c8',
    },
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: 8,
    color: state.isFocused ? '#166534' : '#1c1917',
    background: state.isFocused ? '#dcfce7' : '#fff',
    '&:hover': {
      background: '#dcfce7',
      color: '#166534',
    },
    marginBottom: 3,
  }),
  menu: (base) => ({
    ...base,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 8,
  }),
};

const Control = (props) => {
  return (
    <components.Control {...props}>
      <MapPin size={18} style={{ marginLeft: 4, opacity: 0.8 }} />
      {props.children}
    </components.Control>
  );
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown size={18} opacity={0.5} />
    </components.DropdownIndicator>
  );
};

export default function LocationSelect({ onCityChange }) {
  const options = [
    { label: 'São Paulo', value: 'Sample City' },
    { label: 'Belo Horizonte', value: 'Other Sample City' },
  ]; // Dados de teste

  function handleStateChange(state) {
    onCityChange(state.value);
  }

  return (
    <Select
      options={options}
      defaultValue={options[0]}
      styles={customStyles}
      components={{ Control, DropdownIndicator }}
      isSearchable={false}
      className={`${styles['custom-select']} mb-4`}
      onChange={handleStateChange}
    />
  );
}
