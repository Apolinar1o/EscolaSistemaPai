app.get('/', (req, res) => {
    res.render('index', { titulo: 'Bem-vindo à Escola' });
  });