const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Administrador',
          email: 'admin@gympoint.com',
          password_hash: bcrypt.hashSync('123456', 8),
          admin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'User',
          email: 'user@gympoint.com',
          password_hash: bcrypt.hashSync('123456', 8),
          admin: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
