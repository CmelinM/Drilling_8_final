    'use strict';

    module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [
        {
            firstName: 'Mateo',
            lastName: 'Díaz',
            email: 'mateo.diaz@correo.com',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            firstName: 'Santiago',
            lastName: 'Mejías',
            email: 'santiago.mejias@correo.com',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            firstName: 'Lucas',
            lastName: 'Rojas',
            email: 'lucas.rojas@correo.com',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            firstName: 'Facundo',
            lastName: 'Fernandez',
            email: 'facundo.fernandez@correo.com',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
    };
