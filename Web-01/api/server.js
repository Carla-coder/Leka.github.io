const express = require('express');
const cors = require('cors');
const app = express();
const usuarioRoutes = require('./src/routes');

app.use(cors());

app.use(express.json());

app.use('/api', usuarioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});