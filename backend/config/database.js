import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('cms', 'admin', 'pwd',{
    host: 'localhost',
    dialect:'mariadb',
});

export default sequelize;