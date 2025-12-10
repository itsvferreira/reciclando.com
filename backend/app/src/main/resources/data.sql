INSERT INTO addresses (postal_code, city, state, neighborhood) VALUES
  ('06026000', 'São Paulo', 'SP', 'Osasco'),
  ('06018060', 'São Paulo', 'SP', 'Osasco'),
  ('06110080', 'São Paulo', 'SP', 'Osasco'),
  ('01001000', 'São Paulo', 'SP', 'Sé'),
  ('02030000', 'São Paulo', 'SP', 'Santana'),
  ('20010000', 'Rio de Janeiro', 'RJ', 'Centro'),
  ('20020010', 'Rio de Janeiro', 'RJ', 'Centro'),
  ('20511170', 'Rio de Janeiro', 'RJ', 'Tijuca'),
  ('22210030', 'Rio de Janeiro', 'RJ', 'Botafogo'),
  ('22451060', 'Rio de Janeiro', 'RJ', 'Leblon'),
  ('23050320', 'Rio de Janeiro', 'RJ', 'Campo Grande'),
  ('30130000', 'Belo Horizonte', 'MG', 'Centro'),
  ('30310150', 'Belo Horizonte', 'MG', 'Belvedere'),
  ('31275020', 'Belo Horizonte', 'MG', 'Pampulha');

-- Endereço em São Paulo
INSERT INTO addresses (postal_code, city, state, neighborhood) VALUES
  ('04001000', 'São Paulo', 'SP', 'Paraíso');

INSERT INTO users (first_name, last_name, phone, email, account_type, address_id) VALUES
  ('Luiza', 'Sanchez', '11987654321', 'luiza.sanchez@email.com', 'DONOR', 1),
  ('João', 'Silva', '11987654321', 'joao.silva@email.com', 'RECYCLER', 2),
  ('Fernanda', 'Souza', '11987654321', 'fernanda.souza@email.com', 'RECYCLER', 3),
  ('Maria', 'Santos', '11987654321', 'maria.santos@email.com', 'RECYCLER', 4),
  ('Renan', 'Paiva', '11987654321', 'juliana.lima@email.com', 'RECYCLER', 5),
  ('Cláudia', 'Maria', '21987654321', 'claudia.maria@email.com', 'DONOR', 6),
  ('Juliana', 'Lima', '21987654321', 'juliana.lima@email.com', 'RECYCLER', 7),
  ('Carlos', 'Oliveira', '21987654321', 'carlos.oliveira@email.com', 'RECYCLER', 8),
  ('Ana', 'Costa', '21987654321', 'ana.costa@email.com', 'RECYCLER', 9),
  ('Pedro', 'Ferreira', '21987654321', 'pedro.ferreira@email.com', 'RECYCLER', 10),
  ('Yuri', 'Barreto', '21987654321', 'yuri.barreto@email.com', 'DONOR', 11),
  ('Marcos', 'Almeida', '31987654321', 'marcos.almeida@email.com', 'RECYCLER', 12),
  ('Patrícia', 'Menezes', '31987654321', 'patricia.menezes@email.com', 'RECYCLER', 13),
  ('Rafael', 'Gomes',  '31987654321', 'rafael.gomes@email.com', 'RECYCLER', 14),
  ('Bruno', 'Martins', '11999999999', 'bruno.martins@email.com', 'DONOR', 15);

INSERT INTO recyclers (user_id, code) VALUES
  (2,  'A9K3Q'),
  (3,  'Z7T1M'),
  (4,  'Q3W9B'),
  (5,  'M8D2S'),
  (7,  'H4P7X'),
  (8,  'T1F9C'),
  (9,  'B6L2R'),
  (10, 'P5N8V'),
  (12, 'W2J6Y'),
  (13, 'K9E3U'),
  (14, 'R4C1Z');

INSERT INTO donors (user_id) VALUES 
  (1),
  (6),
  (11);

INSERT INTO recyclers (user_id, code) VALUES
  (2,  'A9K3Q'),
  (3,  'Z7T1M'),
  (4,  'Q3W9B'),
  (5,  'M8D2S'),
  (7,  'H4P7X'),
  (8,  'T1F9C'),
  (9,  'B6L2R'),
  (10, 'P5N8V'),
  (12, 'W2J6Y'),
  (13, 'K9E3U'),
  (14, 'R4C1Z');

INSERT INTO donors (user_id) VALUES 
  (1),
  (6),
  (11),
  (15);


INSERT INTO recycler_materials (user_id, material) VALUES
  (2, 'PLASTIC'),
  (2, 'METAL'),
  (3, 'PAPER'),
  (3, 'GLASS'),
  (3, 'PLASTIC'),
  (4, 'PLASTIC'),
  (4, 'GLASS'),
  (4, 'ELECTRONICS'),
  (5, 'METAL'),
  (5, 'BATTERIES'),
  (5, 'PLASTIC'),
  (5, 'GLASS'),
  (7, 'PAPER'),
  (7, 'ELECTRONICS'),
  (7, 'GLASS'),
  (8, 'PLASTIC'),
  (8, 'METAL'),
  (8, 'BATTERIES'),
  (9, 'PAPER'),
  (9, 'PLASTIC'),
  (9, 'GLASS'),
  (9, 'METAL'),
  (10, 'ELECTRONICS'),
  (10, 'METAL'),
  (12, 'PAPER'),
  (12, 'PLASTIC'),
  (12, 'BATTERIES'),
  (13, 'PAPER'),
  (13, 'GLASS'),
  (13, 'BATTERIES'),
  (14, 'PLASTIC'),
  (14, 'ELECTRONICS'),
  (14, 'METAL'),
  (14, 'GLASS');

INSERT INTO ads (title, description, donor_id, address_id, status, created_at, updated_at, conclusion_code, images_path) VALUES
  ('Jornais e revistas avulsas', 'Pacote de jornais e revistas em bom estado para reciclagem — aprox. 10kg.', 1, 1, 'active', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, ARRAY['http://localhost:8081/api/v1/files/a8d16fl_revistas.jpeg', 'http://localhost:8081/api/v1/files/de1p600_jornais.webp']),
  ('Caixas pequenas de papelão', 'Várias caixas de papelão (tamanho pequeno) desmontadas, perfeitas para reciclagem.', 1, 1, 'concluded', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'A9K3Q', ARRAY['http://localhost:8081/api/v1/files/e5r96fs_caixa-de-papelao.jpg']),
  ('Tampas e lacres plásticos', 'Tampas plásticas soltas de garrafa, sacos fechados para separar.', 1, 1, 'concluded', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'A9K3Q', ARRAY['http://localhost:8081/api/v1/files/ed5s6df_tampinhas.webp']),
  ('Eletrônicos domésticos pequenos', 'Pequenos aparelhos funcionando parcialmente (rádio, liquidificador). Podem ser reaproveitados ou consertados.', 6, 6, 'concluded', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'Q3W9B', ARRAY['http://localhost:8081/api/v1/files/134fe20_liquidificador.jpeg', 'http://localhost:8081/api/v1/files/c23456d_radio.jpg']),
  ('Pilhas e baterias usadas', 'Pacote com pilhas alcalinas e algumas baterias recarregáveis usadas — armazenadas com segurança.', 6, 6, 'concluded', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'B6L2R', ARRAY['http://localhost:8081/api/v1/files/as8ds65_pilhas-e-baterias.jpg']),
  ('Garrafas PET grandes', 'Garrafas PET (2L) lavadas e secas — lote para reciclagem.', 11, 12, 'active', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, ARRAY['http://localhost:8081/api/v1/files/e43367e_garrafas-pet.jpg']),
  ('Latas amassadas', 'Latas de alumínio limpas e amassadas, prontas para coleta.', 11, 12, 'active', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, ARRAY['http://localhost:8081/api/v1/files/54r30t0_latas.webp']),
  ('Sucata eletrônica leve', 'Cabos, adaptadores e pequenos componentes eletrônicos — ideal para reciclagem de eletrônicos.', 11, 12, 'active', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, ARRAY['http://localhost:8081/api/v1/files/2148r5t_componentes-eletronicos.jpg']),
  ('Garrafas de vinho', 'Lote de garrafas de vinho limpas para reciclagem.', 15, 15, 'concluded', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'A9K3Q', ARRAY['http://localhost:8081/api/v1/files/71xgns2pEHL.jpg']);

INSERT INTO ad_categories (ad_id, category) VALUES
  (1, 'PAPER'),
  (2, 'PAPER'),
  (3, 'PLASTIC'),
  (4, 'ELECTRONICS'),
  (5, 'BATTERIES'),
  (6, 'PLASTIC'),
  (7, 'METAL'),
  (8, 'ELECTRONICS'),
  (9, 'GLASS');
