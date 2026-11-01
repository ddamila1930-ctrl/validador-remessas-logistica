# Validador de Lotes de Expedição e Remessas

Aplicação desenvolvida para monitorar e auditar carteiras de pedidos em centros de distribuição, automatizando a validação de remessas e checando inconsistências antes do faturamento.

## Contexto do Problema
Em operações logísticas, pedidos podem ficar retidos na carteira por divergências entre o estoque físico separado e o pedido original, falta de etiquetas de remessa ou ausência de atribuição de transportadora. Este projeto resolve esse ponto de controle de forma visual e automatizada, auxiliando a equipe de faturamento e expedição.

## Funcionalidades
- Leitura e processamento de dados de pedidos.
- Painel com indicadores em tempo real: Total na carteira, Prontos para faturar, Rupturas de separação e Pendências de transportadora.
- Interface web leve para visualização rápida da operação.

## Tecnologias Utilizadas
- JavaScript (Node.js & Express)
- HTML e CSS puro

## Como Executar Localmente
1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. Instale as dependências abrindo o terminal na pasta e executando:
   ```bash
   npm install