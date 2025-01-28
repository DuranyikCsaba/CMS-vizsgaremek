import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Hirdetesek = sequelize.define('Hirdetesek', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  felhasznalo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Felhasznalok', // Kapcsolat a Felhasznalok táblával
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  letrehozas: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Alapértelmezett érték: az aktuális idő
  },
  megtekintes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Kezdetben 0 megtekintés
  },
  torles: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Alapértelmezés: nincs törölve
  },
  adatok: {
    type: DataTypes.JSON,
    allowNull: true, // Opcionális, tetszőleges JSON objektum menthető ide
  },
  modell: {
    type: DataTypes.STRING,
    allowNull: false, // Pl. "Astra", "Corolla"
  },
  marka: {
    type: DataTypes.STRING,
    allowNull: false, // Pl. "Opel", "Toyota"
  },
  ajtok_szama: {
    type: DataTypes.INTEGER,
    allowNull: false, // Ajtók száma (pl. 2, 4, 5)
  },
  hengerurtartalom: {
    type: DataTypes.FLOAT, // A motor hengerűrtartalma literben (pl. 1.4, 2.0)
    allowNull: false,
  },
  uzemanyag: {
    type: DataTypes.STRING,
    allowNull: false, // Pl. "benzin", "dízel", "elektromos"
  },
  evjarat: {
    type: DataTypes.INTEGER,
    allowNull: false, // Gyártási év (pl. 2010)
  },
}, {
  tableName: 'Hirdetesek',
  timestamps: true, // createdAt, updatedAt automatikus kezeléséhez
});

export default Hirdetesek;
