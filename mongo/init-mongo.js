// Connexion avec les credentials admin
db = db.getSiblingDB('ecommerce');

db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "category_id", "price", "created_at"],
      properties: {
        name: { bsonType: "string" },
        category_id: { bsonType: "string" },
        price: { bsonType: "number" },
        created_at: { bsonType: "date" }
      }
    }
  }
});

db.createCollection("carts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "items", "updated_at"],
      properties: {
        user_id: { bsonType: "int" },
        items: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["product_id", "quantity"]
          }
        },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

db.createCollection("reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "product_id", "rating", "created_at"],
      properties: {
        user_id: { bsonType: "int" },
        product_id: { bsonType: "string" },
        rating: { bsonType: "int", minimum: 1, maximum: 5 },
        created_at: { bsonType: "date" }
      }
    }
  }
});

// ========================================
// COLLECTION: categories
// ========================================
db.categories.insertMany([
  { _id: "cat_shoes", name: "Chaussures" },
  { _id: "cat_clothes", name: "Vêtements" },
  { _id: "cat_accessories", name: "Accessoires" }
]);

// ========================================
// COLLECTION: products
// ========================================
db.products.insertMany([
  {
    _id: "prd_001",
    name: "Sneakers X200",
    brand: "Nike",
    category_id: "cat_shoes",
    price: 99.9,
    description: "Chaussures légères et confortables pour le sport et la marche.",
    images: ["sneakers_x200_1.jpg", "sneakers_x200_2.jpg"],
    attributes: {
      color: "rouge",
      sizes: ["40", "41", "42", "43"]
    },
    created_at: new Date()
  },
  {
    _id: "prd_002",
    name: "T-shirt Coton Bio",
    brand: "EcoWear",
    category_id: "cat_clothes",
    price: 29.9,
    description: "T-shirt 100% coton biologique, doux et respirant.",
    images: ["tshirt_coton_bio_1.jpg"],
    attributes: {
      color: "blanc",
      sizes: ["S", "M", "L", "XL"]
    },
    created_at: new Date()
  },
  {
    _id: "prd_003",
    name: "Casquette Classic",
    brand: "UrbanCap",
    category_id: "cat_accessories",
    price: 19.5,
    description: "Casquette ajustable avec logo brodé.",
    images: ["casquette_classic_1.jpg"],
    attributes: {
      color: "noir",
      adjustable: true
    },
    created_at: new Date()
  }
]);

// ========================================
// COLLECTION: reviews
// ========================================
db.reviews.insertMany([
  {
    _id: "rev_001",
    user_id: 1,
    product_id: "prd_001",
    rating: 5,
    comment: "Super confortables, parfaites pour courir !",
    created_at: new Date()
  },
  {
    _id: "rev_002",
    user_id: 2,
    product_id: "prd_002",
    rating: 4,
    comment: "Très agréable à porter, mais taille un peu petit.",
    created_at: new Date()
  },
  {
    _id: "rev_003",
    user_id: 3,
    product_id: "prd_003",
    rating: 5,
    comment: "Bonne qualité et livraison rapide.",
    created_at: new Date()
  }
]);

// ========================================
// COLLECTION: carts
// ========================================
db.carts.insertMany([
  {
    _id: "cart_1",
    user_id: 1,
    items: [
      { product_id: "prd_001", quantity: 1 },
      { product_id: "prd_002", quantity: 2 }
    ],
    updated_at: new Date()
  },
  {
    _id: "cart_2",
    user_id: 2,
    items: [
      { product_id: "prd_003", quantity: 1 }
    ],
    updated_at: new Date()
  }
]);