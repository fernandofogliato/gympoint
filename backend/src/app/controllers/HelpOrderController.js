import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const student_id = req.params.id;

    const helpOrders = await HelpOrder.findAll({
      where: { student_id },
      order: ['created_at'],
      attributes: ['id', 'question', 'answer', 'answerAt'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student_id = req.params.id;
    const { question } = req.body;

    const helpOrder = await HelpOrder.create({
      student_id,
      question,
    });
    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
