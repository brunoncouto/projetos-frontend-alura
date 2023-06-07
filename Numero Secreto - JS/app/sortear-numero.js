const menorValor = 0
const maiorValor = 1000

const secretNumber = gerarNumeroAleatorio ()

function gerarNumeroAleatorio() {
    return parseInt(Math.random() * maiorValor + 1) //gera um número aleatório de 0 a X . O parseint é para tornar o num inteiro
}

console.log(secretNumber)

const elementoMenorValor = document.getElementById('menor-valor') // procura um elemento com a ID declarada
elementoMenorValor.innerHTML = menorValor // altera o campo do HTML com o valor declarado menor

const elementoMaiorValor = document.getElementById('maior-valor')
elementoMaiorValor.innerHTML = maiorValor