const { Sequelize, DataTypes } = require("sequelize");
const pg = require("pg");

require("dotenv").config();

// Establece el objeto SSL con la opción 'rejectUnauthorized' adecuada
pg.defaults.ssl = {
  rejectUnauthorized: true,
};
//borrar ***
const sequelize = new Sequelize(process.env.DATABASE_SEQUELIZE, {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
});

const propietarios = sequelize.define(
  "Propietarios",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Apellido: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    Email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    Telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeValidate: function (propietarios, options) {
        if (typeof propietarios.Nombre === "string" && typeof propietarios.Apellido === "string") {
          propietarios.Nombre = propietarios.Nombre.toUpperCase().trim();
          propietarios.Apellido = propietarios.Apellido.toUpperCase().trim();
        }
      },
    },
    sequelize,
    timestamps: false,
  }
);

const animales = sequelize.define(
  "Animales",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Peso: {
      type: DataTypes.DECIMAL(4, 1),
      allowNull: true,
    },
    Especie: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    Esterilizado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    FechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    Foto: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
    Sexo: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    Propietarios_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeValidate: function (animales, options) {
        if (typeof animales.Nombre === "string") {
          animales.Nombre = animales.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
    sequelize,
  }
);

const controles = sequelize.define(
  "Controles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    FechaExamen: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    Examen: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    Tratamiento: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    FechaTratamiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    Foto: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    MotivoConsulta: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    Anamnesis: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    Resenia: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    Animales_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  },

  {
    sequelize,
    timestamps: false,
  }
);

propietarios.hasMany(animales);
animales.belongsTo(propietarios);
animales.hasMany(controles);
controles.belongsTo(animales);

module.exports = {
  sequelize,
  propietarios,
  animales,
  controles,
};
