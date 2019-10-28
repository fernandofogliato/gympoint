import * as Yup from 'yup';
import { addMonths } from 'date-fns';

import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';

class EnrollmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const enrollments = await Enrollment.findAll({
      order: ['created_date'],
      attributes: ['id', 'start_date', 'end_date', 'price'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.integer().required(),
      plan_id: Yup.integer().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const { duration, total_price } = await Plan.findByPk(plan_id);

    const endDate = addMonths(start_date, duration);

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      endDate,
      price: total_price,
    });
    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.integer().required(),
      plan_id: Yup.integer().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;
    const { duration, total_price } = await Plan.findByPk(plan_id);

    const endDate = addMonths(start_date, duration);

    const enrollment = await Enrollment.update(
      {
        student_id,
        plan_id,
        start_date,
        endDate,
        price: total_price,
      },
      { where: { id } }
    );
    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment does not exists!' });
    }

    return res.status(204);
  }
}

export default new EnrollmentController();
