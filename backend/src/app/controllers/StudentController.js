import * as Yup from 'yup';

import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { page = 1, limit = 10, name } = req.query;

    const where = {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    };

    const students = await Student.findAll({
      where: name ? where : null,
      order: ['created_at'],
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
      limit,
      offset: (page - 1) * limit,
    });

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExits = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExits) {
      return res.status(400).json({ error: 'This email already in use.' });
    }

    const student = await Student.create(req.body);
    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const student = await Student.findByPk(id);

    const { email } = req.body;
    if (email !== student.email) {
      const studentExits = await Student.findOne({ where: { email } });

      if (studentExits) {
        return res.status(400).json({ error: 'This email already in use.' });
      }
    }

    const { name, age, weight, height } = await Student.update(req.body, {
      where: { id },
    });

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentController();
