const pedidos = require("../../dados/pedidos.json")

function calcTotais () {
    pedidos.forEach(pedido => {
        pedido.subtotal = pedido.preco * pedido.quantidade
    })
}

const listar = (req, res) => {
    calcTotais();
    res.json(pedidos)
}

const alterar = (req, res) => {
    const id = req.params.id;
    const dados = req.body;

    pedidos.forEach(pedido => {
        if (pedido.id == id) {
            pedido.cliente_id = dados.cliente_id;
            pedido.produto = dados.produto;
            pedido.preco = dados.preco;
            pedido.quantidade = dados.quantidade;
        }
    });
    res.json("Pedido atualizado com sucesso");
};

const excluir = (req, res) => { 
    const id = req.params.id;

    pedidos.forEach((pedido, indice) => {
        if (pedido.id == id) {
            pedidos.splice(indice, 1);
        }
    });
    res.json("Pedido excluído com sucesso");
};

const criar = (req, res) => {
    const dados = req.body;
    if(req.body) {
        const novoId = pedidos.length + 1;

        req.body.id = novoId;

        pedidos.push(req.body);

        res.send("Pedido cadastrado com sucesso");
    }else {
        res.send("Não foi possível cadastrar o pedido");
    }
}


module.exports = {
    criar, listar, alterar, excluir
}