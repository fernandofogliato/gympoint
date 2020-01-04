import Sequelize, { Model } from 'sequelize';

import { isBefore, isAfter, parseISO } from 'date-fns';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        startDate: Sequelize.DATEONLY,
        endDate: Sequelize.DATEONLY,
        price: Sequelize.NUMBER,
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, ['startDate', 'endDate']),
          get() {
            return (
              isBefore(parseISO(this.get('startDate')), new Date()) &&
              isAfter(parseISO(this.get('endDate')), new Date())
            );
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Enrollment;
