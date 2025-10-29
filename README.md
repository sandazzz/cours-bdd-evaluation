# Evaluation cours BDD

## Membres du groupe

Lenny Jean-Baptiste

Sandarisoa Rakotovelo

---

### 1. Présentation du Projet

L’application e-commerce permet aux utilisateurs de consulter des produits, de gérer leur panier et de passer des commandes en ligne.
Elle combine PostgreSQL pour les données structurées (utilisateurs, commandes) et MongoDB pour les données flexibles (produits, avis, contenu).
L’objectif est d’offrir une plateforme performante et évolutive capable de gérer efficacement les transactions et un catalogue produit varié.

### 2. Architecture PostgreSQL (Méthode Merise)

**MCD (Modèle Conceptuel de Données)**

```
// Insérer capture d'écran du MCD
```

**MLD (Modèle Logique de Données)**

```
// Insérer capture d'écran du MLD
```

**MPD (Modèle Physique de Données)**

```sql
-- Insérer script SQL de création des tables
```

### 3. Architecture MongoDB


**products :**
```
    {
        "_id": "prd_001",
        "name": "Sneakers X200",
        "brand": "Nike",
        "price": 99.9,
        "category_id": "cat_shoes",
        "description": "Chaussures légères de sport",
        "images": ["img1.jpg", "img2.jpg"],
        "attributes": {
            "color": "red",
            "size": ["40", "41", "42"]
        },
        "created_at": ISODate("2025-10-29")
    }
```
**catagories :**
```
    {
        "_id": "cat_shoes",
        "name": "Chaussures",
    }
```
**carts :**
```
    {
        "_id": "cart_12",
        "user_id": 12,
        "items": [
            { "product_id": "prd_001", "quantity": 2 },
            { "product_id": "prd_002", "quantity": 1 }
        ],
        "updated_at": ISODate("2025-10-29T15:00:00Z")
    }
```
**reviews :**
```
    {
        "_id": "rev_01",
        "user_id": 12,
        "product_id": "prd_001",
        "rating": 5,
        "comment": "Super confortables !",
        "created_at": ISODate("2025-10-29")
    }
```

### 4. Justification des Choix Techniques

- **Répartition des données** : Quelles données en PostgreSQL ? Quelles données en MongoDB ? Pourquoi ?
- **Modélisation MongoDB** : Documents imbriqués ou références ? Justification
- **Relations inter-bases** : Comment les deux bases communiquent-elles ?

### 5. Exemples de Requêtes Complexes

**PostgreSQL**

```sql
-- Exemple de requête avec jointure et agrégat
```

**MongoDB**

```javascript
// Exemple de pipeline d'agrégation
```

### 6. Stratégie de Sauvegarde

Pour cette partie, vous devez effectuer des recherches afin d'argumenter vos réponses.

- **PostgreSQL** : Méthode proposée (pg_dump, sauvegarde continue, etc.)
- **MongoDB** : Méthode proposée (mongodump, replica set, etc.)
- **Fréquence** : Complète, incrémentale, différentielle
- **Restauration** : Procédure en cas de perte de données
