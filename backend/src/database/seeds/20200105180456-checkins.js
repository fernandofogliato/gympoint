const { subDays } = require('date-fns');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'checkins',
      [
        {
          student_id: 1,
          created_at: subDays(new Date(), 3),
          updated_at: subDays(new Date(), 3),
        },
        {
          student_id: 1,
          created_at: subDays(new Date(), 2),
          updated_at: subDays(new Date(), 2),
        },
        {
          student_id: 1,
          created_at: subDays(new Date(), 1),
          updated_at: subDays(new Date(), 1),
        },
        {
          student_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
