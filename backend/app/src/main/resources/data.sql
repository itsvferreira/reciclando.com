INSERT INTO addresses (postal_code, city, state, neighborhood) VALUES
  ('12345-678', 'Sample City', 'SC', 'Central District'),
  ('98765-432', 'Example Town', 'ET', 'Green Neighborhood'),
  ('90000-000', 'Porto Alegre', 'RS', 'Centro'),
  ('90000-000', 'São Paulo', 'SP', 'Centro'),
  ('01310-100', 'São Paulo', 'SP', 'Bela Vista');

INSERT INTO users (first_name, last_name, phone, email, account_type, address_id) VALUES
  ('John', 'Doe', '1234567890', 'john@example.com', 'DONOR', 1),
  ('Jane', 'Smith', '0987654321', 'jane@example.com', 'RECYCLER', 2),
  ('Carlos', 'Silva', '11999999999', 'carlos@example.com', 'RECYCLER', 3),
  ('Luiza', 'Almeida', '11987654321', 'luiza@exemplo.com', 'DONOR', 4);

INSERT INTO donors (user_id) VALUES
  (1),
  (4);

INSERT INTO recyclers (user_id, code) VALUES
  (2, '1234'),
  (3, '5678');

INSERT INTO recycler_materials (user_id, material) VALUES
  (2, 'PAPER'),
  (2, 'PLASTIC'),
  (3, 'PAPER');

INSERT INTO ads (title, description, donor_id, address_id, status, created_at, updated_at, conclusion_code) VALUES
  ('Old Newspaper', 'Bundle of old newspapers available for recycling.', 1, 1, 'active', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL),
  ('Plastic Bottles', 'Collection of used plastic bottles.', 1, 1, 'active', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL),
  ('Glass Jars', 'Several glass jars ready for recycling.', 1, 1, 'active', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL),
  ('Livros velhos', 'Livros velhos.', 4, 4, 'active', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL),
  ('Garrafas de vinho', 'Garrafas de vinho vazias, limpas e prontas para reciclagem.', 4, 4, 'concluded', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3),
  ('Pilhas usadas', 'Pilhas alcalinas usadas.', 4, 4, 'active', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL),
  ('Latas de alumínio', 'Latas de refrigerante e cerveja para reciclagem.', 4, 4, 'concluded', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3),
  ('Caixas de papelão', 'Várias caixas de papelão de mudança.', 1, 1, 'concluded', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3),
  ('Revistas antigas', 'Pilha de revistas de decoracão e moda.', 1, 1, 'concluded', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3),
  ('Garrafas PET', 'Garrafas plásticas de refrigerante.', 4, 4, 'concluded', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3),
  ('Papel de escritório', 'Papel usado de impressões e documentos.', 1, 1, 'concluded', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 3);

INSERT INTO ad_categories (ad_id, category) VALUES
  (1, 'PAPER'),
  (1, 'GLASS'),
  (2, 'PLASTIC'),
  (3, 'PAPER'),
  (4, 'PAPER'),
  (5, 'GLASS'),
  (6, 'ELECTRONICS'),
  (7, 'METAL'),
  (8, 'PAPER'),
  (9, 'PAPER'),
  (10, 'PLASTIC'),
  (11, 'PAPER');