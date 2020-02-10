// @flow
import Sequelize from 'sequelize';
import {sequelize} from './dbConnection';

const {Model} = Sequelize;

export class ServerData extends Model {}
ServerData.init({
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  division: {
    type: Sequelize.STRING,
    allowNull: false
  },
  project_owner: {
      type: Sequelize.STRING,
      allowNull: false,
  },
  budget: {
      type: Sequelize.NUMBER,
      allowNull: false,
  },
  status: {
    type: Sequelize.NUMBER,
    allowNull: false,
  }
}, {
  timestamps: true,
  sequelize,
  modelName: 'serverdata'
});