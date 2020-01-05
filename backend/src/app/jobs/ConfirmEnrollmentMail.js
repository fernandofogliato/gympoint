import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { formatPrice } from '../util/format';

import Mail from '../../lib/Mail';

class AnsweredHelpOrderMail {
  get key() {
    return 'ConfirmEnrollmentMail';
  }

  async handle({ data }) {
    const { enrollment } = data;

    await Mail.sendMail({
      to: `${enrollment.student.name} <${enrollment.student.email}>`,
      subject: 'Resumo plano matriculado',
      template: 'confirmEnrollment',
      context: {
        student: enrollment.student.name,
        plan: enrollment.plan.title,
        totalPrice: formatPrice(enrollment.price),
        endDate: format(
          parseISO(enrollment.endDate),
          "'dia' dd 'de' MMMM', às' H:mm'h",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new AnsweredHelpOrderMail();
