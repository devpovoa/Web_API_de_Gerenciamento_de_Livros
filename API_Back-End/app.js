const express = require('express');
const setupSwagger = require('./swagger');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use('/api', userRoutes);

setupSwagger(app);

app.listen(PORT, () => {
 console.log(`Servidor rodando em http://localhost:${PORT}`);
 console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});
