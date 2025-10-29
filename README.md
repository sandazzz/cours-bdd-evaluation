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
- La base PostgreSQL est utilisée pour toutes les données structurées et transactionnelles, nécessitant des relations fortes et la cohérence ACID :

Utilisateurs, adresses, commandes et articles de commande.
Ces informations sont fortement liées et font souvent l’objet de jointures et de contraintes d’intégrité (clés étrangères, vérifications, etc.).
PostgreSQL est donc idéal pour assurer la fiabilité, la cohérence et la facilité d’écriture de requêtes complexes (jointures, agrégations, sous-requêtes).

La base MongoDB, quant à elle, stocke les données flexibles, riches en métadonnées ou à structure variable, notamment :

Produits, catégories, avis clients et paniers.
Ces données changent fréquemment de forme (ex. produits avec attributs différents selon la catégorie), et bénéficient d’une modélisation NoSQL souple pour s’adapter à ces variations futures.

- **Modélisation MongoDB** : Documents imbriqués ou références ? Justification
Les paniers (carts) contiennent une liste d’objets imbriqués (items) avec product_id et quantity.
Cela permet de charger le panier complet d’un utilisateur en une seule requête.

Les produits (products) et catégories (categories) sont reliés par référence (category_id), ce qui évite la duplication de données.

Les avis (reviews) référencent à la fois un user_id (PostgreSQL) et un product_id (MongoDB), les reviews ne sont pas des données importantes donc elles peuvent être stocker ailleurs.

- **Relations inter-bases** : Comment les deux bases communiquent-elles ?
-Le champ user_id présent dans MongoDB (dans reviews et carts) correspond à id_user dans PostgreSQL.
Le champ product_id utilisé dans PostgreSQL (order_item) et MongoDB (products) sert de lien logique entre les commandes et les produits.
Elles communiquent via l'api qui les synchronise. Par exemple quand un user passe une commande, l'api récupère l'id de l'utilisateur pour créer le panier dans mongodb.


### 5. Exemples de Requêtes Complexes

**PostgreSQL**
chiffre_d’affaires par utilisateur : 
```sql
SELECT 
    id_user,
    SUM(total_amount) AS total_spent
FROM 
    ecommerce."order"
GROUP BY 
    id_user
ORDER BY 
    total_spent DESC;
quantité totale vendue par produit :
SELECT 
    product_id,
    SUM(quantity) AS total_vendu
FROM 
    ecommerce.order_item
GROUP BY 
    product_id
ORDER BY 
    total_vendu DESC;

```

**MongoDB**

```javascript
// Exemple de pipeline d'agrégation
classement note moyenne par produit
db.reviews.aggregate([
  {
    $group: {
      _id: "$product_id",
      avgRating: { $avg: "$rating" },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { avgRating: -1 }
  }
]);

```

### 6. Stratégie de Sauvegarde

Pour cette partie, vous devez effectuer des recherches afin d'argumenter vos réponses.

- **PostgreSQL** : Méthode proposée (pg_dump, sauvegarde continue, etc.)
- **MongoDB** : Méthode proposée (mongodump, replica set, etc.)
- **Fréquence** : Complète, incrémentale, différentielle
- **Restauration** : Procédure en cas de perte de données

Pour notre projet, nous avons choisi une stratégie de sauvegarde mixte adaptée à l’utilisation de PostgreSQL et MongoDB.
Pour PostgreSQL, nous mettrons en place une sauvegarde complète hebdomadaire de la base à l’aide de l’outil pg_dump. Les fichiers de sauvegarde seront donc stockés sur un volume externe ou un service cloud pour éviter les risques liés au serveur principal.
Pour MongoDB, nous utiliserons mongodump pour effectuer une sauvegarde complète quotidienne des collections principales, tout en utilisant un replica set pour garantir la haute disponibilité et permettre la récupération à partir d’un nœud secondaire sans impacter la production.
Cette stratégie permet d'avoir des sauvegardes régulières, qui assurent une reprise rapide de service en cas d’incident.