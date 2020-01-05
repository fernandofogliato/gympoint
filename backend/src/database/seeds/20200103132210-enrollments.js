const { addMonths } = require('date-fns');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'enrollments',
      [
        {
          student_id: 1,
          plan_id: 1,
          price: 129,
          start_date: new Date(),
          end_date: addMonths(new Date(), 1),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
