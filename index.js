require('dotenv').config({ quiet: true });

const express = require('express');
const path = require('path');
const banco = require('./dados/banco');
const produtosRepo = require('./dados/produtosRepositorio');
const usuariosRepo = require('./dados/usuariosRepositorio');
const authRoutes = require('./routes/authRoutes');
const produtosRoutes = require('./routes/produtosRoutes');

if (!process.env.JWT_SECRET) {
  console.log('Defina JWT_SECRET no arquivo .env antes de iniciar o servidor.');
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/produtos', produtosRoutes);

banco.abrir()
  .then(() => {
    produtosRepo.iniciar();
    usuariosRepo.iniciar();
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
  })
  .catch(erro => console.log('Erro ao abrir o banco de dados:', erro));