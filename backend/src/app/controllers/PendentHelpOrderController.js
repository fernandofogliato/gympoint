import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import AnsweredHelpOrderMail from '../jobs/AnsweredHelpOrderMail';
import Queue from '../../lib/Queue';

class PendentHelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const helpOrders = await HelpOrder.findAll({
      where: { answer_at: null },
      order: ['created_at'],
      attributes: ['id', 'question'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
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
      answer_at: new Date(),
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
