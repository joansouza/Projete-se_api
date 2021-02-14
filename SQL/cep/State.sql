CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "State" (
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "ibgeCode" CHAR(2) NOT NULL UNIQUE,
  "name" VARCHAR(50) NOT NULL UNIQUE,
  "uf" CHAR(2) NOT NULL UNIQUE,
  "regionId" uuid NOT NULL REFERENCES "Region"("id"),
  "countryId" uuid NOT NULL REFERENCES "Country"("id"),
  "createdAt" timestamp DEFAULT NOW(),
  "updatedAt" timestamp DEFAULT NOW(),
  "deletedAt" timestamp
);

INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('12', 'Acre', 'AC', (SELECT "id" from "Region" WHERE "name" = 'Norte' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('27', 'Alagoas', 'AL', (SELECT "id" from "Region" WHERE "name" = 'Nordeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('16', 'Amapá', 'AP', (SELECT "id" from "Region" WHERE "name" = 'Norte' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('13', 'Amazonas', 'AM', (SELECT "id" from "Region" WHERE "name" = 'Norte' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('29', 'Bahia', 'BA', (SELECT "id" from "Region" WHERE "name" = 'Nordeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('23', 'Ceará', 'CE', (SELECT "id" from "Region" WHERE "name" = 'Nordeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('53', 'Distrito Federal', 'DF', (SELECT "id" from "Region" WHERE "name" = 'Centro-Oeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('32', 'Espírito Santo', 'ES', (SELECT "id" from "Region" WHERE "name" = 'Sudeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('52', 'Goiás', 'GO', (SELECT "id" from "Region" WHERE "name" = 'Centro-Oeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('21', 'Maranhão', 'MA', (SELECT "id" from "Region" WHERE "name" = 'Nordeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('51', 'Mato Grosso', 'MT', (SELECT "id" from "Region" WHERE "name" = 'Centro-Oeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('50', 'Mato Grosso do Sul', 'MS', (SELECT "id" from "Region" WHERE "name" = 'Centro-Oeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('31', 'Minas Gerais', 'MG', (SELECT "id" from "Region" WHERE "name" = 'Sudeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('15', 'Pará', 'PA', (SELECT "id" from "Region" WHERE "name" = 'Norte' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('25', 'Paraíba', 'PB', (SELECT "id" from "Region" WHERE "name" = 'Nordeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('41', 'Paraná', 'PR', (SELECT "id" from "Region" WHERE "name" = 'Sul' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('26', 'Pernambuco', 'PE', (SELECT "id" from "Region" WHERE "name" = 'Nordeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('22', 'Piauí', 'PI', (SELECT "id" from "Region" WHERE "name" = 'Nordeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('33', 'Rio de Janeiro', 'RJ', (SELECT "id" from "Region" WHERE "name" = 'Sudeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('24', 'Rio Grande do Norte', 'RN', (SELECT "id" from "Region" WHERE "name" = 'Nordeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('43', 'Rio Grande do Sul', 'RS', (SELECT "id" from "Region" WHERE "name" = 'Sul' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('11', 'Rondônia', 'RO', (SELECT "id" from "Region" WHERE "name" = 'Norte' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('14', 'Roraima', 'RR', (SELECT "id" from "Region" WHERE "name" = 'Norte' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('42', 'Santa Catarina', 'SC', (SELECT "id" from "Region" WHERE "name" = 'Sul' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('35', 'São Paulo', 'SP', (SELECT "id" from "Region" WHERE "name" = 'Sudeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('28', 'Sergipe', 'SE', (SELECT "id" from "Region" WHERE "name" = 'Nordeste' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
INSERT INTO "State" ("ibgeCode", "name", "uf", "regionId", "countryId") VALUES ('17', 'Tocantins', 'TO', (SELECT "id" from "Region" WHERE "name" = 'Norte' ), (SELECT "id" from "Country" WHERE "name" = 'Brazil' ));
