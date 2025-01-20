    'use strict';

    module.exports = {
    async up(queryInterface, Sequelize) {
        // Asociaciones entre usuarios y bootcamps
        const users = await queryInterface.sequelize.query(
        'SELECT id, email FROM users WHERE email IN (:emails)',
        {
            replacements: { emails: ['mateo.diaz@correo.com', 'santiago.mejias@correo.com', 'lucas.rojas@correo.com'] },
            type: Sequelize.QueryTypes.SELECT,
        }
        );

        const bootcamps = await queryInterface.sequelize.query(
        'SELECT id, title FROM bootcamps WHERE title IN (:titles)',
        {
            replacements: { titles: ['React', 'Desarrollo Web Full Stack', 'Big Data, Inteligencia Artificial & Machine Learning'] },
            type: Sequelize.QueryTypes.SELECT,
        }
        );

        // Crear asociaciones en la tabla user_bootcamp, agregando los valores para createdAt y updatedAt
        const associations = [
        { user_id: users.find(user => user.email === 'mateo.diaz@correo.com').id, bootcamp_id: bootcamps.find(bootcamp => bootcamp.title === 'Desarrollo Web Full Stack').id, createdAt: new Date(), updatedAt: new Date() },
        { user_id: users.find(user => user.email === 'mateo.diaz@correo.com').id, bootcamp_id: bootcamps.find(bootcamp => bootcamp.title === 'Big Data, Inteligencia Artificial & Machine Learning').id, createdAt: new Date(), updatedAt: new Date() },
        { user_id: users.find(user => user.email === 'santiago.mejias@correo.com').id, bootcamp_id: bootcamps.find(bootcamp => bootcamp.title === 'Big Data, Inteligencia Artificial & Machine Learning').id, createdAt: new Date(), updatedAt: new Date() },
        { user_id: users.find(user => user.email === 'lucas.rojas@correo.com').id, bootcamp_id: bootcamps.find(bootcamp => bootcamp.title === 'Big Data, Inteligencia Artificial & Machine Learning').id, createdAt: new Date(), updatedAt: new Date() }
        ];

        await queryInterface.bulkInsert('user_bootcamp', associations);
    },

    async down(queryInterface, Sequelize) {
        // Eliminar asociaciones
        await queryInterface.bulkDelete('user_bootcamp', null, {});
    }
    };
