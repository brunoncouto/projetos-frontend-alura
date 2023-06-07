const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
//armazena os dados do local storage em um array e converte a string para array
const itens = JSON.parse(localStorage.getItem("itens")) || [] 

itens.forEach( (elemento) => {
    criaElemento(elemento)
}) // percorre o array de itens chamando a função de criar elementos, trazendo para páginas itens que estiverem no local storage, 
//sem perdê-los ao atualizar a página

form.addEventListener("submit", (evento) => {
    evento.preventDefault() //interrompe o comportamento padrão do elemento
        // evento.target[0].value // obtem os dados de um elemento e seus valores
        // evento.target.elements['nome'].value // o mesmo, mas selecionando o nome da lista elements
    
    const nome = evento.target.elements['nome'] 
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value) // procura se o item inserido já existe no objeto da página

    const itemAtual = {
        "nome" : nome.value,
        "quantidade": quantidade.value
    } // criou-se um objeto com os parâmetros nome e quantidade
    
    if (existe) {
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] =  itemAtual //substitui a posição referenciada no local storage
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length -1]).id + 1 : 0;
        criaElemento(itemAtual)
        itens.push(itemAtual) // inseriu o objeto criou dentro do array itens
    }
       
    nome.value = ""
    quantidade.value = ""
    
    localStorage.setItem("itens", JSON.stringify(itens)) //transofrma um objeto em texto [stringfy]
})

function criaElemento(item) {
    const novoItem = document.createElement("li") //cria novos elementos no HTML
    novoItem.classList.add("item")

    const numItem = document.createElement("strong")
    numItem.innerHTML = item.quantidade //cria um novo objeto JS
    numItem.dataset.id = item.id
    novoItem.appendChild(numItem)

    novoItem.innerHTML += item.nome
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem) //manipula objetos criados por JS   

}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta (id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function()  {
        deletaElemento(this.parentNode, id) //seleciona o elemento pai do HTML, no caso o "li"
    })

    return elementoBotao
}
function deletaElemento(tag, id) {
    tag.remove() //remove o elemento selecionado [no caso o elemento pai da function botaoDeleta, um "li"]
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1) //dentro do array, procura o elemento clicado e remove
    localStorage.setItem("itens", JSON.stringify(itens))
}