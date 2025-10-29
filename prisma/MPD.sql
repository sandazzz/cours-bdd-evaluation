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
  product_id     INT NOT NULL,
  quantity       INT NOT NULL CHECK (quantity > 0),
  unit_price     NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
  id_order       INT NOT NULL,
  CONSTRAINT fk_order_item_order
    FOREIGN KEY (id_order)
    REFERENCES ecommerce.order(id_order)
    ON DELETE CASCADE
);

CREATE INDEX idx_order_item_order ON order_item(id_order);
