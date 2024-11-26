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

// Defina explicitamente o tipo de `valorArmazenado`
let valorArmazenado: string | null = null;

// Endpoint para armazenar o valor enviado pelo ESP32
app.post('/armazenar', (req, res) => {
    const { valor } = req.body;

    if (typeof valor === 'string') {
        valorArmazenado = valor;
        console.log(`${valorArmazenado}`);
        res.status(200).send('Mensagem enviada com sucesso');
    } else {
        res.status(400).send('Formato de mensagem inválido');
    }
});

// Endpoint para obter o valor armazenado
app.get('/receber', (req, res) => {
    if (valorArmazenado !== null) {
        res.status(200).send(valorArmazenado.toString());
    } else {
        res.status(404).send('Nenhum mensagem armazenada');
    }
});

// Inicializa o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
