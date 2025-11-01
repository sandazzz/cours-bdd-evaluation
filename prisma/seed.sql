-- Nettoyage initial
DROP SCHEMA IF EXISTS ecommerce CASCADE;
CREATE SCHEMA ecommerce;
SET search_path TO ecommerce;

-- ============================================================================
-- EXTENSIONS NÉCESSAIRES
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- Pour les recherches textuelles
    
-- ============================================================================
-- TYPES PERSONNALISÉS
-- ============================================================================

CREATE TABLE ecommerce.user (
  id_user       INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email         VARCHAR(150) NOT NULL UNIQUE,
  firstname     VARCHAR(50) NOT NULL,
  lastname      VARCHAR(100) NOT NULL,
  password      VARCHAR(150) NOT NULL,
  role          VARCHAR(50) NOT NULL,
  created_at    DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE address (
  id_address  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  type        VARCHAR(50) NOT NULL,
  street      TEXT NOT NULL,
  city        VARCHAR(100) NOT NULL,
  zip         VARCHAR(20) NOT NULL,
  country     VARCHAR(100) NOT NULL,
  id_user     INT NOT NULL,
  CONSTRAINT fk_address_user
    FOREIGN KEY (id_user)
    REFERENCES ecommerce.user(id_user)
    ON DELETE CASCADE
);

CREATE TABLE ecommerce.order (
  id_order        INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_date      DATE NOT NULL DEFAULT CURRENT_DATE,
  status          VARCHAR(50) NOT NULL,
  total_amount    NUMERIC(10,2) NOT NULL DEFAULT 0,
  payment_method  VARCHAR(50),
  id_user         INT NOT NULL,
  CONSTRAINT fk_order_user
    FOREIGN KEY (id_user)
    REFERENCES ecommerce.user(id_user)
    ON DELETE CASCADE
);

CREATE INDEX idx_order_user ON ecommerce.order(id_user);

CREATE TABLE order_item (
  id_order_item  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id     VARCHAR(20) NOT NULL,
  quantity       INT NOT NULL CHECK (quantity > 0),
  unit_price     NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
  id_order       INT NOT NULL,
  CONSTRAINT fk_order_item_order
    FOREIGN KEY (id_order)
    REFERENCES ecommerce.order(id_order)
    ON DELETE CASCADE
);

CREATE INDEX idx_order_item_order ON order_item(id_order);

INSERT INTO ecommerce.user
  (email, firstname, lastname, password, role, created_at)
VALUES
  ('alice@example.com', 'Alice', 'Martin', 'password', 'user', CURRENT_DATE),
  ('bob@example.com',   'Bob',   'Durand', 'password', 'user', CURRENT_DATE),
  ('carol@example.com', 'Carol', 'Petit',  'password', 'user', CURRENT_DATE);

INSERT INTO ecommerce.address
  (type, street, city, zip, country, id_user)
VALUES
  ('billing',  '12 Rue de Rivoli',     'Paris',      '75001', 'France', 1),
  ('shipping', '5 Avenue des Lilas',   'Lyon',       '69001', 'France', 1),
  ('billing',  '8 Boulevard Victor',   'Marseille',  '13001', 'France', 2),
  ('billing',  '3 Place de la République','Lille',   '59000', 'France', 3);

INSERT INTO ecommerce.order
  (order_date, status, total_amount, payment_method, id_user)
VALUES
  (CURRENT_DATE, 'pending', 159.70, 'card', 1),
  (CURRENT_DATE, 'pending',  19.50, 'card', 2);


INSERT INTO ecommerce.order_item
  (product_id, quantity, unit_price, id_order)
VALUES
  ('prd_001', 1,  99.90, 1),
  ('prd_002', 2,  29.90, 1),  
  ('prd_003', 1,  19.50, 2); 