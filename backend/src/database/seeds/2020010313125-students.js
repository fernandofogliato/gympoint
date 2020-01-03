module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Fernando Fogliato',
          email: 'fernandofogliato@gmail.com',
          date_of_birth: new Date('1992-03-11'),
          height: 1.74,
          weight: 85,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Pedro Alvares Cabral',
          email: 'predo@cabral.com',
          date_of_birth: new Date('1980-05-11'),
          height: 1.85,
          weight: 90.5,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
