const express = require('express'); // Solicitando o express
const app = express(); // jogando todas as funções para a variavel app e executando o express

app.set('view engine', 'ejs'); // Definindo a view engine do html para o EJS
app.use(express.static('public')); // Usar arquivos estaticos 

app.get('/', (req, res) => { // Criando a primeira rota
   
    res.render('index'); // Renderiza a página index do ejs
});

app.listen( 8080, () => { // Iniciando servidor express
    console.log("Servidor iniciado!");
});