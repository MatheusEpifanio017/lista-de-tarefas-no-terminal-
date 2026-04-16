//FAZER UM MENU INTERATIVO
//LISTAR TAREFA 
// ADICIONAR TAREFA
// CONCLUIR TAREFA
//REMOVER TAREFA 
//SAIR


//SERVE PARA RODAR NO TERMINAL
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let tarefas = [];

//MENU
function apresentarLista() {
    console.log("====================");
    console.log(" SEJA BEM VINDO A SUA: ");
    console.log(" LISTA DE TAREFAS! ");
}

function menu() {
    console.log("\n====================");
    console.log("1. ACESSAR LISTA");
    console.log("2. ADICIONAR TAREFA");
    console.log("3. CONCLUIR TAREFA");
    console.log("4. REMOVER TAREFA");
    console.log("0. SAIR");
    console.log("====================");

    interagir();
}

//SWITCH CASE PARA INTERAGIR COM O CLIENTE
function interagir() {
    rl.question("Escolha uma opção: ", function (resposta) {        
        switch (parseInt(resposta)) {
            case 1:
                consultarLista();
                break;
            case 2:
                adicionarTarefa();
                break;
            case 3:
                concluirTarefa(); 
                break;
            case 4:
                removerTarefa();
                break;
            case 0:
                console.log("\nATÉ MAIS TARDE!");
                rl.close();
                break;
            default:
                console.log("\nSUA LISTA ESTÁ VAZIA!");
                menu();
                break;
        }
    });
}

//VERIFICAR SE A LISTA ESTÁ VAZIA
function consultarLista() {
    if (tarefas.length === 0) {
        console.log("\nA SUA LISTA ESTÁ VAZIA!");
    } else {
        console.table(tarefas);
    }
    menu();
}

//VERIFICAR SE A TAREFA JA EXISTE, E ADICIONAR TAREFAS
function adicionarTarefa() {
    rl.question("Qual o nome da tarefa? ", function (nomeDigitado) {
        const tarefaJaExiste = tarefas.some(t => t.nome.toLowerCase().trim() === nomeDigitado.toLowerCase().trim());

        if (tarefaJaExiste) {
            console.log(`\nERRO: A tarefa "${nomeDigitado}" já existe na sua lista!`);
            menu();
        } else if (nomeDigitado.trim() === "") {
            console.log("\nERRO: O nome da tarefa não pode estar vazio!");
            menu();
        } else {
            tarefas.push({ 
                nome: nomeDigitado, 
                status: "PENDENTE" 
            });
            console.log(`\nTarefa "${nomeDigitado}" adicionada com sucesso!`);
            menu();
        }
    });
}

// CONCLUIR TAREFAS
function concluirTarefa() {
    if (tarefas.length === 0) {
        console.log("\nVOCÊ NÃO TEM TAREFAS PARA CONCLUIR!");
        return menu();
    }

    rl.question("Qual o nome da tarefa que você concluiu? ", function (nomeTarefa) {
        const index = tarefas.findIndex(t => t.nome.toLowerCase() === nomeTarefa.toLowerCase());
        

        if (index !== -1) {
            tarefas[index].status = "CONCLUÍDA ";
            console.log(`\n A "${nomeTarefa}" FOI MARCADA COMO CONCLUÍDA.`);
        } else {
            console.log("\nERRO: Tarefa não encontrada.");
        }
        menu();
    });
}

// REMOVER TAREFA SELECIONADA
function removerTarefa() {
    if (tarefas.length === 0) {
        console.log("\nSUA LISTA JÁ ESTÁ VAZIA!");
        return menu();
    }

    rl.question("Qual o nome da tarefa que você deseja remover? ", function (nomeTarefa) {
        const index = tarefas.findIndex(t => t.nome.toLowerCase() === nomeTarefa.toLowerCase());

        if (index !== -1) {
            tarefas.splice(index, 1);
            console.log(`\nA tarefa "${nomeTarefa}" foi removida com sucesso.`);
        } else {
            console.log("\nERRO: Essa tarefa não existe.");
        }
        menu();
    });
}

// FINAL DO CODIGO
function principal() {
    console.clear();
    apresentarLista();
    menu();
}

principal();

principal();
