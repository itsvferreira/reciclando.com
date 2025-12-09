export default function MateriaisAceitos() {
  const items = [
    { label: "Plástico" },
    { label: "Papel" },
    { label: "Metal" },
    { label: "Vidro" },
    { label: "Eletrônicos" },
    { label: "Pilhas" },
  ];

  return (
    <div className="materiais-container">
      <h2>Materiais Aceitos</h2>
      <p>Veja o que pode ser reciclado</p>
      
      <div className="cards-grid">
        {items.map((item, index) => (
          <div className="material-card" key={index}>
            <div className="card-icon">
              {/* Ícone aqui */}
            </div>
            <div className="card-label">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}