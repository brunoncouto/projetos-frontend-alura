const elementoChute = document.querySelector('#chute')

window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition; 
// assim que a janela for iniciada o reconhecimento de voz já estará ativo pelo método window.

const recognition = new SpeechRecognition();
recognition.lang = 'pt-Br' //configura para reconhecer apenas o português do Brasil
recognition.start() // comando para iniciar a gravação de voz

recognition.addEventListener('result', onSpeak) //armazena tudo o que for falado em 'result' e passa para a function onSpeak

function onSpeak(evento){
    chute = evento.results[0][0].transcript
    exibeChuteNaTela(chute)
    verificaChute(chute)
}

function exibeChuteNaTela(chute) { //cria os elementos inseridos entre as crases através do .innerHTML
    elementoChute.innerHTML = `
    <div> Você disse </div>
    <span class="box">${chute} </span>
    ` 
}

recognition.addEventListener('end', () => recognition.start()) //ao finalizar o reconhecimento de voz, reinicia o evento

function verificaChute(chute){
    const numero = +chute

     if (chuteInvalido(numero)) {
            if (chute.toUpperCase() == "GAME OVER") {
    
                document.body.innerHTML =
                    `
                    <h2>Game Over!!!</h2>
                    <h3>Pressione o botão para jogar novamente</h3>
                    <button id="jogar-novamente" class="btn-jogar" >Jogar novamente</button>
                    `
                    document.body.style.backgroundColor = "black";
            }
        } else{
        elementoChute.innerHTML += '<div>Chute inválido</div>'
        return
        } //se falar algo diferente de um número aparece a mensagem de erro 

    if (chuteErrado(numero)){
        elementoChute.innerHTML += `
        <div>Valor inválido. O número precisa estar entre ${menorValor} e ${maiorValor}</div>
        `
        return
    } //mensagem dizendo que o número está fora do intervalo estabelecido
    


    
    if (numero === secretNumber){
        document.body.innerHTML = `
            <h2>Você acertou!!!</h2>
            <h3>O número secreto é ${secretNumber}</h3>

            <button id="replay" class="btn-jogar">Jogar novamente</button>
        `
    } else if (numero > secretNumber) {
        elementoChute.innerHTML += `
            <div>O número secreto é menor <i class="fa-solid fa-down-long"></i></div>
        `
    }else{
        elementoChute.innerHTML += `
        <div>O número secreto é maior <i class="fa-solid fa-up-long"></i></div>
        `
    }
}

function chuteInvalido(numero){
    return Number.isNaN(numero)
}

function chuteErrado(numero) {
    return numero > maiorValor || numero < menorValor
}

document.body.addEventListener('click', evento => {
    if(evento.target.id == 'replay') {
        window.location.reload() //recarrega a página!
    }
})