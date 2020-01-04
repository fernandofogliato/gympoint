import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';

import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import ConfirmEnrollmentMail from '../jobs/ConfirmEnrollmentMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const enrollments = await Enrollment.findAndCountAll({
      order: ['startDate', 'endDate'],
      attributes: ['id', 'startDate', 'endDate', 'price', 'active', 'active'],
      limit,
      offset: (page - 1) * limit,
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

  async show(req, res) {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id, {
      attributes: ['id', 'startDate', 'endDate', 'price', 'active', 'active'],
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
    return res.json(enrollment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      studentId: Yup.number().required(),
      planId: Yup.number().required(),
      startDate: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const startDate = parseISO(req.body.startDate);
    const { studentId, planId } = req.body;

    const { duration, totalPrice } = await Plan.findByPk(planId);
    const endDate = addMonths(startDate, duration);

    let enrollment = await Enrollment.create({
      student_id: studentId,
      plan_id: planId,
      startDate,
      endDate,
      price: totalPrice,
    });

    /**
     * Put a message in the queue to send an email to notify the user about the new enrollment.
     */
    enrollment = await Enrollment.findOne({
      where: enrollment.id,
      attributes: ['id', 'startDate', 'endDate', 'price'],
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
      studentId: Yup.number().required(),
      planId: Yup.number().required(),
      startDate: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment does not exists!' });
    }

    const { planId, studentId } = req.body;
    const startDate = parseISO(req.body.startDate);

    const { duration, totalPrice } = await Plan.findByPk(planId);
    const endDate = addMonths(startDate, duration);

    enrollment = await enrollment.update({
      student_id: studentId,
      plan_id: planId,
      startDate,
      endDate,
      price: totalPrice,
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
