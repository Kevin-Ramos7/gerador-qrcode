const express = require('express');
const QRCode = require('qrcode');

const app = express();

// Middleware para permitir o parsing do corpo da requisição
app.use(express.json());

// Rota para gerar o QR Code
app.post("/gerar", async (req, res) => {
    const { texto } = req.body;

// Verifica se o campo texto foi enviado
    if (!texto) {
        return res.status(400).json({ erro: "O campo 'texto' é obrigatório" });
    }

    try {
    //Gera o QR Code a partir do texto recebido e converte para base64
        const qrCode = await QRCode.toDataURL(texto);
        res.json({ qrCode });// Retorna o QR Code gerado
    } catch (erro) {
        // Em caso de erro, retorna uma resposta com status 500
        res.status(500).json({ erro: "Erro ao gerar o QR code." });
    }
});

// Aqui você adiciona o código para rodar o servidor na porta desejada
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});


