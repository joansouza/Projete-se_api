CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "Region" (
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL UNIQUE,
  "createdAt" timestamp DEFAULT NOW(),
  "updatedAt" timestamp DEFAULT NOW(),
  "deletedAt" timestamp
);

INSERT INTO "Region" ("name") VALUES ('Norte');
INSERT INTO "Region" ("name") VALUES ('Nordeste');
INSERT INTO "Region" ("name") VALUES ('Sudeste');
INSERT INTO "Region" ("name") VALUES ('Sul');
INSERT INTO "Region" ("name") VALUES ('Centro-Oeste');
