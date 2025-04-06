'use strict';
const {
  Model,
  Sequelize,
  DataTypes
} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const store = require('./store');
const AppError = require('../../utils/appError');

const user = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'FullName cannot be null',
      },
      notEmpty: {
        msg: 'FullName cannot be empty',
      },
    },
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'PhoneNumber cannot be null',
      },
      notEmpty: {
        msg: 'PhoneNumber cannot be empty',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Email already exists',
    },
    validate: {
      notNull: {
        msg: 'Email cannot be null',
      },
      notEmpty: {
        msg: 'Email cannot be empty',
      },
      isEmail: {
        msg: 'Invalid email id',
      },
    },
  },
  day_of_birth: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'DayOfBirth cannot be null',
      },
      notEmpty: {
        msg: 'DayOfBirth cannot be empty',
      },
    },
  },
  avatar_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM('0', '1', '2'),
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('0', '1'),
    allowNull: true,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'password cannot be null',
      },
      notEmpty: {
        msg: 'password cannot be empty',
      },
    },
  },
  confirm_password: {
    type: DataTypes.VIRTUAL,
    set(value) {
      if (this.password_hash.length < 7) {
        throw new AppError(
          'Password length must be greater than 7',
          400
        );
      }
      if (value === this.password_hash) {
        const hashPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password_hash', hashPassword);
      } else {
        throw new AppError(
          'Password and confirm password must be the same',
          400
        );
      }
    },
  },
  address: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('0', '1', '2'),
    defaultValue: '0',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE
  }
},
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'user',
  });

user.hasMany(store, {
  foreignKey: 'owner_id'
});
store.belongsTo(user, {
  foreignKey: 'owner_id'
});

module.exports = user;