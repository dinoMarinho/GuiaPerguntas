const express = require('express'); // Solicitando o express
const app = express(); // jogando todas as funções para a variavel app e executando o express
const bodyParser = require('body-parser'); // solicita o body parser

// Incluindo a conexão ao banco
const connection = require('./database/database');

// Chama o Model Pergunta
const Pergunta = require('./database/Pergunta');

// Testando a conexão
connection
    .authenticate() // Autentica a conexão 
    .then(() => { // Caso de certo
        console.log('Conexão com banco feita com sucesso!');
    })
    .catch((msgErro) => { // Caso de errado
        console.log(msgErro);
    })

app.set('view engine', 'ejs'); // Definindo a view engine do html para o EJS
app.use(express.static('public')); // Usar arquivos estaticos 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Rotas
app.get('/', (req, res) => { // Criando a primeira rota

    Pergunta.findAll({raw: true, order: [
        ['id', 'DESC']
    ]}).then(perguntas => { // Faz uma pergunta crua na tabela pergunta
        res.render('index', { // Renderiza a página index do ejs
            perguntas: perguntas
        }); 
    });

    
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.post('/salvarpergunta', (req,res) =>{
    var titulo = req.body.titulo; // Pega os dados do front end 
    var descricao = req.body.descricao;


    Pergunta.create({ //insert do BD
        titulo: titulo,
        descricao: descricao,
    }).then(() =>{ // Verifica se a inserção ocorreu com sucesso
        res.redirect('/');
    });
});

app.listen( 8080, () => { // Iniciando servidor express
    console.log("Servidor iniciado!");
});