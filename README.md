# Evaluation cours BDD

## Membres du groupe

Lenny Jean-Baptiste

Sandarisoa Rakotovelo

---

### 1. Présentation du Projet

Décrivez votre application en 3-5 phrases : problématique, objectif et fonctionnalités principales.

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

```json
// Exemple de structure de vos documents
```

### 4. Justification des Choix Techniques

-   **Répartition des données** : Quelles données en PostgreSQL ? Quelles données en MongoDB ? Pourquoi ?
-   **Modélisation MongoDB** : Documents imbriqués ou références ? Justification
-   **Relations inter-bases** : Comment les deux bases communiquent-elles ?

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

-   **PostgreSQL** : Méthode proposée (pg_dump, sauvegarde continue, etc.)
-   **MongoDB** : Méthode proposée (mongodump, replica set, etc.)
-   **Fréquence** : Complète, incrémentale, différentielle
-   **Restauration** : Procédure en cas de perte de données