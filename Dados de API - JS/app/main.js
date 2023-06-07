//por padrão o JS é um sistema síncrono
//a leitura segue três etapas "event loop" "task queue" "call stack"
//no call stack é realizada a chamada de comandos a serem executados
//task queue é uma fila de comandos aguardando a serem chamados para serem executados 
//event loop é um controlador do que será chamado no call stack e o que será armazenado na task queue
//as tarefas postas em task queue, usualmente são assincronas - rodam em segundo plano
//callback são funções que são ativadas por algum fator pré-determinado, podendo ser um tempo específico, 
    //a partir de uma ação do usuário, depois da conclusão de alguma coisa.

//API
//Promises pode ter dois retornos: 'resolvido' ou 'rejeitadas' e qualquer que seja o retorno, sempre será uma objeto RESPONSE. 
//Uma promise será resolvida quando seu resultado é obtido. Rejeitada será quando o oposto ocorrer
//o fetch é um método que realiza requisição de uma API, retornando uma PROMISE
//o metodo JSON converte os dados para um padrão javascript

// 1º método de se trabalhar com API
//var consultaCEP = fetch('https://viacep.com.br/ws/01001000/json/')
  //.then(resposta => resposta.json()) //converte os dados obtidos na requisição pelo fetch
    //.then(r => {
      //if (r.erro){
         //throw Error('CEP não existe') //metodo throw serve para "personalizar erros"
        //} else console.log(r) //imprime os dados convertidos
    //})
    //.catch(erro => console.log(erro)) //pega o erro na requisição e imprime ao usuário. Só há catch para requisições recusadas
    //.finally(mensagem => console.log('Concluído')) //o finally executa a linha descrita independente do retorno obtido na promise

//console.log(consultaCEP)

// Método Async Await
async function buscaEndereco(cep) { //declaração do método async e criação de function
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`); // o await só pode ser declarada dentro de um escopo async
        var cepConvertido = await consultaCEP.json(); // conversão do resultado p/ json
        if (cepConvertido.erro){
            throw Error ('CEP inexistente'); //tratamento de erro
        }
        var cidade = document.getElementById('cidade');
        var estado = document.getElementById('estado');
        var logradouro = document.getElementById('endereco');
        cidade.value = cepConvertido.localidade;
        logradouro.value = cepConvertido.logradouro;
        estado.value = cepConvertido.uf;
        console.log(cepConvertido);
        return cepConvertido;
    } catch(erro){
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>` // insere o motivo do erro na pagina 
        console.log(erro);
    }
}
var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value)) //focusout é clicar pra fora 




//let ceps =  [];
//let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
//Promise.all(conjuntoCeps).then(respostas => console.log(respostas)) //método para requisitar vários ceps ao mesmo tempo
    