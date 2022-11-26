const btnMenu = document.querySelector('.cabecalho-menu')
const menu = document.querySelector('.menu-lateral')

btnMenu.addEventListener('click', () => {
    menu.classList.toggle('menu-lateral--ativo')
})