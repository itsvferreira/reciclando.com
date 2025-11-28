INSERT INTO addresses (id, postal_code, city, state, neighborhood) VALUES
  (1, '12345-678', 'Sample City', 'SC', 'Central District'),
  (2, '98765-432', 'Example Town', 'ET', 'Green Neighborhood');

INSERT INTO users (first_name, last_name, phone, account_type, address_id) VALUES
  ('John', 'Doe', '1234567890', 'DONOR', 1),
  ('Jane', 'Smith', '0987654321', 'RECYCLER', 2);

INSERT INTO donors (user_id) VALUES
  (1);

INSERT INTO recyclers (user_id, accepted_materials) VALUES
  (2, ARRAY[0, 1]);

INSERT INTO ads (title, description, donor_id, material_category, address_id, created_at, updated_at) VALUES
  ('Old Newspaper', 'Bundle of old newspapers available for recycling.', 1, 'PAPER', 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
  ('Plastic Bottles', 'Collection of used plastic bottles.', 1, 'PLASTIC', 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
  ('Glass Jars', 'Several glass jars ready for recycling.', 1, 'GLASS', 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
