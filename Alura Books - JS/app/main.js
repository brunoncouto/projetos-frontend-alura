// realiza a requição na api

let livros = []
const endPointAPi = 'https://guilhermeonrails.github.io/casadocodigo/livros.json'
getBuscarLivrosDaAPI ()
//realiza a requisição assincrona à API
async function getBuscarLivrosDaAPI() {
    const resp = await fetch (endPointAPi)
    livros = await resp.json()
    //console.table(livros) //mostra o conteúdo em formato de tabela
    livros = aplicarDesconto(livros)
    exibeLivros(livros)
}
//cria os elementos na página com  as infos dos produtos
const inserirLivros = document.getElementById('livros')
const livrosDisponiveisValorTotal = document.getElementById('valor_total_livros_disponiveis')
function exibeLivros(listaLivros){
    livrosDisponiveisValorTotal.innerHTML = ''
    inserirLivros.innerHTML = ''
    listaLivros.forEach (livro => {
        let livroDisponibilidade = livro.quantidade > 0 ? 'livro__imagens' : 'livro__imagens indisponivel' //{livro.quantidade é maior quesat 0? se sim cria a class livro__imagens : se não cria a class livros__imagens indisponivel}
        inserirLivros.innerHTML += `
        <div class="livro">
        <img class="${livroDisponibilidade}" src="${livro.imagem}" alt="${livro.alt}" />
        <h2 class="livro__titulo">${livro.titulo}</h2>
        <p class="livro__descricao">${livro.autor}</p>
        <p class="livro__preco" id="preco">R$ ${livro.preco.toFixed(2)}</p>
        <div class="tags">
          <span class="tag">${livro.categoria}</span>
        </div>
      </div>
        `
    })
}
//mapeia os elementos da página e aplica um desconto
function aplicarDesconto(livros){
    const desconto = 0.3
    livrosComDesconto = livros.map(livro => {
        return {... livro, preco: livro.preco - (livro.preco * desconto)} //os três pontos realiza a cópia de um array
    })
    return livrosComDesconto
}
// criação de botões de filtro
const botoes = document.querySelectorAll('.btn')
botoes.forEach(btn => btn.addEventListener('click', filtrarLivros))
function filtrarLivros() {
    const elementoBtn = document.getElementById(this.id) // seleciona o id od elmento clicado
    const categoria = elementoBtn.value
    let livrosFiltrados = categoria == 'disponivel' ? livrosDisponiveis() : 
    livrosPorCategoria(categoria) //cria uma variável que irá armazenar os livros buscados ou disponíveis
    exibeLivros(livrosFiltrados)
    if (categoria == 'disponivel') {
        const valorTotal = calcularValorTotalDisponiveis(livrosFiltrados)
        exibeValorLivrosDisponiveis(valorTotal)
    }
}
// filtra os livros por categoria
function livrosPorCategoria(categoria) {
    return livros.filter(livro => livro.categoria == categoria)
} 
// filtra os livros pela quantidade e disponibilidade
function livrosDisponiveis() {
    return livros.filter(livro => livro.quantidade > 0)
}
// ordenando preços com .sort() = recebe dois valores como parametros p/ comparar
let btnOrdemPreco = document.getElementById('btnOrdenarPorPreco')
btnOrdemPreco.addEventListener('click', ordenarPreco)
function ordenarPreco(){
    let livrosOrdenados = livros.sort((a, b) => a.preco - b.preco) // compara um livro com outro e ordena do menor p/ maior preço
    exibeLivros(livrosOrdenados)
}
//exibe a soma dos valores dos livros disponíveis 
function exibeValorLivrosDisponiveis (valorTotal) {
    livrosDisponiveisValorTotal.innerHTML = `
        <div class="livros__disponiveis">
            <p>Todos os livros disponíveis por R$ <span id="valor">${valorTotal}</span></p>
        </div>
    `
}
//reduce acc se chama acumulador 
function calcularValorTotalDisponiveis(livros){
    return livros.reduce((acc, livro) => acc + livro.preco, 0).toFixed(2)
}