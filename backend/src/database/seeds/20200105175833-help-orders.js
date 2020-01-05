module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'help_orders',
      [
        {
          student_id: 1,
          question:
            'Olá pessoal da academia, gostaria de saber se quando acordar devo ingerir batata doce e frango logo de primeira, preparar as marmitas e lotar a geladeira? Dou um pico de insulina e jogo o hipercalórico?',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
