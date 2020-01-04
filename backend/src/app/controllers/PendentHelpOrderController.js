import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import AnsweredHelpOrderMail from '../jobs/AnsweredHelpOrderMail';
import Queue from '../../lib/Queue';

class PendentHelpOrderController {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const helpOrders = await HelpOrder.findAndCountAll({
      where: { answerAt: null },
      order: ['created_at'],
      attributes: ['id', 'question'],
      limit,
      offset: (page - 1) * limit,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(helpOrders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string()
        .max(1000)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const help_order_id = req.params.id;

    let helpOrder = await HelpOrder.findByPk(help_order_id);

    if (!helpOrder) {
      return res.status(404).json({ error: 'Help order not found!' });
    }

    helpOrder = await helpOrder.update({
      answer: req.body.answer,
      answerAt: new Date(),
    });

    /**
     * Put a message in the queue to send an email to notify the user about the reply on order.
     */
    const student = await Student.findByPk(helpOrder.student_id);
    await Queue.add(AnsweredHelpOrderMail.key, {
      helpOrder,
      student,
    });

    return res.json(helpOrder);
  }
}

export default new PendentHelpOrderController();
