import sequelize from "../config/database.js";
import { Sequelize, DataTypes } from "sequelize";

const Komment = sequelize.define(
    'komment',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        posztId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        felhasznaloId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        felhasznaloNeve:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        kommentTartalom: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        createdAt: 'letrehozas',
        updatedAt: 'modositas',
        tableName: 'komment'
    },
  );
  

  console.log(Komment === sequelize.models.Komment);


export default Komment;