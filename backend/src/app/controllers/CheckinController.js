import { subDays, startOfDay, endOfDay } from 'date-fns';

import { Op } from 'sequelize';

import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const { id } = req.params;

    const checkins = await Checkin.findAndCountAll({
      where: {
        student_id: {
          [Op.eq]: id,
        },
      },
      order: [['created_at', 'DESC']],
      attributes: ['id', ['created_at', 'createdAt']],
      limit,
      offset: (page - 1) * limit,
    });

    return res.json(checkins);
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
        .json({ error: 'Limite de 5 check-ins em uma semana foi alcançado!' });
    }

    const checkin = await Checkin.create({
      student_id,
    });
    return res.json(checkin);
  }
}

export default new CheckinController();
