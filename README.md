yarn init = Cria um package.json com as informações da aplicação

yarn add express = instala a dependência do express (um microframeword para trabalhar com node, conseguimos criar um servidor para rodar um servidor entre outros);

Instalamos a biblioteca de tipo com yarn add @types/express

Adicionamos a dependência do typescript para o node entender a sintaxe em arquivos ts como import yarn add typescript

Após adicionar, iniciamos o typescript com yarn tsc --init

Adicionando o yarn ts-node-dev para ter um conversor em tempo de execução para converter o código em TypeScript

Vimos também os métodos de requisição HTTP citados no docs do drive e como executá-los não somente no browser  (pois o browser por padrão trabalha com get()) através do Imnsonia.

**********
// 1º param - rota
// 2º param - (request, response)

//http://localhost:3333/users
app.get('/users', (request, response) => {
    return response.json({massage: 'Hello World - NLW04'});
})

app.post('/', (request, response) => {
    //Recebemos os dados para salvar
    return response.json({massage: 'Os dados foram salvos'});
})

app.listen(3333, () => console.log('Server is running!'));
***********

Instalando o TypeORM
Instalando o BD (SQLite), pois ele armazena os dados em memória, não serve para produção, mas é util para as aulas e estudos
Criamos um ORM config para informar ao TypeORM quais os dados e informações que utilizaremos e um index.ts para criar uma conexão

migration = é um método de histórico de tudo que se faz com o banco de dados, incluir tabelas, colunas, deletar etc.

Criando uma migration, criamos no package.json mais um script para sqlite informando o cli. Depois dentro do ormconfig informamos que, dentro do cli utilizaremos as migrations no caminho especificado

criamos uma tabela migration para as pesquisar com yarn typeorm migration:creat -n table_name
criamos a tabela na migration e depois com yarn typeorm migration:run incluimos ela no bd
Após isso adicionamos um model para criação no banco de dados, depois um repositorie para retirar do controller algumas coisas desnecessárias e por ultimo incluimos no controller as informações do model e repository


****

cross-env para variável de ambiente

nodemailer para envio de emails fake

then() (async await dentro da declaração), caso der erro usamos catch() -> sendMailServices.ts
