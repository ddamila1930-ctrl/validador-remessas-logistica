const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const porta = 3000;

app.use(express.static('public'));
app.use('/dados', express.static(path.join(__dirname, 'dados')));

app.get('/api/auditoria', (req, res) => {
    const caminhoArquivo = path.join(__dirname, 'dados/pedidos_exemplo.json');
    const conteudoBruto = fs.readFileSync(caminhoArquivo, 'utf8');
    const listaPedidos = JSON.parse(conteudoBruto);

    let liberadosParaFaturamento = [];
    let pedidosComRupturaSeparacao = [];
    let pedidosSemEtiquetaRemessa = [];
    let pedidosSemTransportadora = [];

    for (let pedido of listaPedidos) {
        if (pedido.quantidadeSeparada < pedido.quantidadePedido) {
            pedidosComRupturaSeparacao.push(pedido);
        }

        if (!pedido.possuiEtiquetaRemessa) {
            pedidosSemEtiquetaRemessa.push(pedido);
        }

        if (!pedido.transportadoraAtribuida || pedido.transportadoraAtribuida.trim() === '') {
            pedidosSemTransportadora.push(pedido);
        }

        const estaPronto = 
            pedido.quantidadeSeparada === pedido.quantidadePedido &&
            pedido.possuiEtiquetaRemessa &&
            pedido.transportadoraAtribuida;

        if (estaPronto) {
            liberadosParaFaturamento.push(pedido);
        }
    }

    res.json({
        totalAnalitico: listaPedidos.length,
        liberados: liberadosParaFaturamento,
        ruptura: pedidosComRupturaSeparacao,
        semEtiqueta: pedidosSemEtiquetaRemessa,
        semTransportadora: pedidosSemTransportadora
    });
});

app.listen(porta, () => {
    console.log(`Servidor rodando localmente na porta ${porta}`);
});