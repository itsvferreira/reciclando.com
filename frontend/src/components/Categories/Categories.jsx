import styles from './Categories.module.css';

const MATERIALS = [
  { label: 'Plástico', value: 'PLASTIC' },
  { label: 'Papel', value: 'PAPER' },
  { label: 'Metal', value: 'METAL' },
  { label: 'Vidro', value: 'GLASS' },
  { label: 'Eletrônicos', value: 'ELECTRONICS' },
  { label: 'Baterias', value: 'BATTERIES' },
];

export default function Categories({
  categories,
  onCategoriesChange,
  showAll = true,
}) {
  const isAllSelected = categories.length === 0;

  function handleSelectAll() {
    onCategoriesChange([]);
  }

  function handleCategoryChange(value) {
    onCategoriesChange((prev) => {
      if (prev.includes(value)) {
        return prev.filter((category) => category !== value);
      }
      return [...prev, value];
    });
  }

  return (
    <div className='d-flex flex-wrap gap-2 mb-4 align-items-center'>
      {showAll && (
        <span className={styles['category-item']}>
          <input
            type='checkbox'
            id='optDefault'
            checked={isAllSelected}
            onChange={handleSelectAll}
          />
          <label htmlFor='optDefault'>Todos</label>
        </span>
      )}
      {MATERIALS.map(({ label, value }, idx) => (
        <span className={styles['category-item']} key={idx}>
          <input
            type='checkbox'
            name='categoriesList'
            id={value}
            value={value}
            checked={categories.includes(value)}
            onChange={() => handleCategoryChange(value)}
          />
          <label htmlFor={value}>{label}</label>
        </span>
      ))}
    </div>
  );
}
