import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const plans = await Plan.findAndCountAll({
      attributes: ['id', 'title', 'duration', 'price'],
      limit,
      offset: (page - 1) * limit,
    });

    return res.json(plans);
  }

  async show(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      price: Yup.number()
        .min(0)
        .required(),
      duration: Yup.number()
        .min(1)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.create(req.body);
    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      price: Yup.number()
        .min(0)
        .required(),
      duration: Yup.number()
        .min(1)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan does not exists!' });
    }

    plan = await plan.update(req.body);
    return res.json(plan);
  }

  async delete(req, res) {
    await Plan.destroy({
      where: { id: req.params.id },
    });
    return res.status(204);
  }
}

export default new PlanController();
