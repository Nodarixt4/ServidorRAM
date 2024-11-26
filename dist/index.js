import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite todas as origens
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Permite métodos específicos
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Permite cabeçalhos específicos
    next();
});
let mensagens = []; // Array de objetos do tipo Mensagem
// Endpoint para armazenar mensagens enviadas pelo cliente
app.post('/armazenar', (req, res) => {
    const { user, message } = req.body;
    if (typeof user === 'string' && typeof message === 'string') {
        mensagens.push({ user, message });
        console.log('Mensagem armazenada:', { user, message });
        res.status(200).send({ success: true, message: 'Mensagem armazenada' });
    }
    else {
        console.error('Mensagem inválida:', req.body);
        res.status(400).send({ error: 'Formato de mensagem inválido' });
    }
});
// Endpoint para obter todas as mensagens armazenadas
app.get('/receber', (req, res) => {
    if (mensagens.length > 0) {
        res.status(200).json(mensagens); // Retorna todas as mensagens como JSON
    }
    else {
        res.status(404).send('Nenhuma mensagem armazenada');
    }
});
// Inicializa o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
