import Sequelize, { Model } from 'sequelize';

import { isBefore, isAfter } from 'date-fns';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE,
        price: Sequelize.NUMBER,
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, ['startDate', 'endDate']),
          get() {
            return (
              isBefore(this.get('startDate'), new Date()) &&
              isAfter(this.get('endDate'), new Date())
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
