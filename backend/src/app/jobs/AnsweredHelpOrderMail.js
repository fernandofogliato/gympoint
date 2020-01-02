import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class AnsweredHelpOrderMail {
  get key() {
    return 'AnsweredHelpOrderMail';
  }

  async handle({ data }) {
    const { helpOrder, student } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Chamado de ajuda respondida',
      template: 'answeredHelpOrder',
      context: {
        student: student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answerAt: format(
          parseISO(helpOrder.answerAt),
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
