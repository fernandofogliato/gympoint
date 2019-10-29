import { subDays, startOfDay, endOfDay } from 'date-fns';

import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const students = await Checkin.findAll({
      order: ['created_at'],
      attributes: ['id', 'created_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(students);
  }

  async store(req, res) {
    const student_id = req.params.id;

    /**
     * The user can only do five check-ins during a period of seven days in a row
     */
    const endDate = new Date();
    const startDate = subDays(endDate, 7);

    const lastCheckins = await Checkin.findAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfDay(startDate), endOfDay(endDate)],
        },
      },
    });

    if (lastCheckins.length >= 5) {
      return res
        .status(400)
        .json({ error: 'Limit of five check-ins in a week was reached!' });
    }

    const checkin = await Checkin.create({
      student_id,
    });
    return res.json(checkin);
  }
}

export default new CheckinController();
