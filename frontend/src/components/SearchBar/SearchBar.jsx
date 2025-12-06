import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export default function SearchBar({ placeholder, onSearchChange }) {
  function handleClear(event) {
    if (event.target.value === '') {
      onSearchChange('');
    }
  }

  function handleSearchChange(event) {
    if (event.key === 'Enter') {
      const value = event.target.value.trim();
      onSearchChange(value);
    }
  }

  return (
    <div className={`${styles['search-container']} mb-3`}>
      <Search color='#555' size={18} />
      <input
        className={`${styles['form-control']} me-2`}
        type='search'
        placeholder={placeholder}
        aria-label='Search'
        onChange={handleClear}
        onKeyDown={handleSearchChange}
      ></input>
    </div>
  );
}
