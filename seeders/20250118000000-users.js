'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [
        {
            firstName: 'Mateo',
            lastName: 'Díaz',
            email: 'mateo.diaz@correo.com',
            password: bcrypt.hashSync('mateo123456', 8),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            firstName: 'Santiago',
            lastName: 'Mejías',
            email: 'santiago.mejias@correo.com',
            password: bcrypt.hashSync('santiago123456', 8),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            firstName: 'Lucas',
            lastName: 'Rojas',
            email: 'lucas.rojas@correo.com',
            password: bcrypt.hashSync('lucas123456', 8),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            firstName: 'Facundo',
            lastName: 'Fernandez',
            email: 'facundo.fernandez@correo.com',
            password: bcrypt.hashSync('facundo123456', 8),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
};
