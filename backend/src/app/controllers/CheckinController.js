import { subDays, startOfDay, endOfDay } from 'date-fns';

import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const students = await Student.findAll({
      order: ['created_date'],
      attributes: ['id'],
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
    const { student_id } = req.params;

    /**
     * The user can only do five check-ins during a period of seven days in a row
     */
    const startDate = new Date();
    const endDate = subDays(startDate, 7);

    const lastCheckins = await Checkin.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
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
