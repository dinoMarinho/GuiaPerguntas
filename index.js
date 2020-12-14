const express = require('express'); // Solicitando o express
const app = express(); // jogando todas as funções para a variavel app e executando o express
const bodyParser = require('body-parser'); // solicita o body parser

// Incluindo a conexão ao banco
const connection = require('./database/database');

// Chama o Model Pergunta
const Pergunta = require('./database/Pergunta');

// Chama o Model Resposta
const Resposta = require('./database/Resposta');

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

app.get('/pergunta/:id', (req,res) => {
    var id = req.params.id;

    Pergunta.findOne({  // Busca apenas um dado na tabela do banco 
        where: {id: id}
    }).then(pergunta => {
        if (pergunta != undefined) {

            Resposta.findAll({
                where: {perguntId: pergunta.id},
                order: [
                    ['id','DESC']
                ]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas,
                });
            });

           
        }else{
            res.redirect('/');
        }
    });
});

app.post('/responder', (req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntId: perguntaId,
    }).then(() =>{ // Verifica se a inserção ocorreu com sucesso
        res.redirect('/pergunta/'+perguntaId);
    });
});

app.listen( 8080, () => { // Iniciando servidor express
    console.log("Servidor iniciado!");
});