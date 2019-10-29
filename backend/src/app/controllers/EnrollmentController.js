import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';

import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import ConfirmEnrollmentMail from '../jobs/ConfirmEnrollmentMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const enrollments = await Enrollment.findAll({
      order: ['start_date', 'end_date'],
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
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const start_date = parseISO(req.body.start_date);

    const { student_id, plan_id } = req.body;

    const { duration, total_price } = await Plan.findByPk(plan_id);
    const end_date = addMonths(start_date, duration);

    let enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price: total_price,
    });

    /**
     * Put a message in the queue to send an email to notify the user about the new enrollment.
     */
    enrollment = await Enrollment.findOne({
      where: enrollment.id,
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    await Queue.add(ConfirmEnrollmentMail.key, { enrollment });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment does not exists!' });
    }

    const { plan_id } = req.body;
    const start_date = parseISO(req.body.start_date);

    const { duration, total_price } = await Plan.findByPk(plan_id);
    const end_date = addMonths(start_date, duration);

    enrollment = await enrollment.update({
      plan_id,
      start_date,
      end_date,
      price: total_price,
    });
    return res.json(enrollment);
  }

  async delete(req, res) {
    await Enrollment.destroy({
      where: { id: req.params.id },
    });
    return res.status(204).json();
  }
}

export default new EnrollmentController();
