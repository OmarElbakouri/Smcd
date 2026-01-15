-- Script pour corriger les colonnes de type bytea vers varchar/text
-- Exécuter ce script dans PostgreSQL pour corriger le problème de type

-- Vérifier les colonnes de type bytea dans la table speakers
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'speakers';

-- Corriger la colonne specialite si elle est en bytea
ALTER TABLE speakers 
    ALTER COLUMN specialite TYPE VARCHAR(200) USING specialite::text;

-- Corriger d'autres colonnes potentiellement affectées
ALTER TABLE speakers 
    ALTER COLUMN institution TYPE VARCHAR(300) USING institution::text;

ALTER TABLE speakers 
    ALTER COLUMN pays TYPE VARCHAR(100) USING pays::text;

ALTER TABLE speakers 
    ALTER COLUMN ville TYPE VARCHAR(100) USING ville::text;

-- Si d'autres tables ont le même problème, ajouter les corrections ici
