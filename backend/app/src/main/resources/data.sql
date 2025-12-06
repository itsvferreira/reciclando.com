INSERT INTO addresses (postal_code, city, state, neighborhood) VALUES
  ('12345-678', 'Sample City', 'SC', 'Central District'),
  ('98765-432', 'Example Town', 'ET', 'Green Neighborhood'),
  ('90000-000', 'Porto Alegre', 'RS', 'Centro');

INSERT INTO users (first_name, last_name, phone, account_type, address_id) VALUES
  ('John', 'Doe', '1234567890', 'DONOR', 1),
  ('Jane', 'Smith', '0987654321', 'RECYCLER', 2),
  ('Carlos', 'Silva', '51999999999', 'RECYCLER', 3);

INSERT INTO donors (user_id) VALUES
  (1);

INSERT INTO recyclers (user_id) VALUES
  (2),
  (3);

INSERT INTO recycler_materials (user_id, material) VALUES
  (2, 'PAPER'),
  (2, 'PLASTIC'),
  (3, 'PAPER');

INSERT INTO ads (title, description, donor_id, address_id, created_at, updated_at) VALUES
  ('Old Newspaper', 'Bundle of old newspapers available for recycling.', 1, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
  ('Plastic Bottles', 'Collection of used plastic bottles.', 1, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
  ('Glass Jars', 'Several glass jars ready for recycling.', 1, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

INSERT INTO ad_categories (ad_id, category) VALUES
  (1, 'PAPER'),
  (1, 'GLASS'),
  (2, 'PLASTIC'),
  (3, 'PAPER');