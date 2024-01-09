const grid = document.querySelector('.grid')
const spanJogador = document.querySelector('.jogador')
const cronometro = document.querySelector('.cronometro')

const personagens = [
    'audrey', 'lorax', 'norma', 'onceler', 'peixes', 'prefeito', 'ted', 'trufula', 'ursinho', 'wiggins',
]

const criarElemento = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

let primeiraCarta = ''
let segundaCarta = ''

const fimDeJogo = () => {
    const cartasAcertadas = document.querySelectorAll('.carta_acertada')

    if (cartasAcertadas.length === 20) {
        clearInterval(this.loop)
        alert(`Parabéns, ${spanJogador.innerHTML}! Seu tempo foi de ${cronometro.innerHTML} segundos!`)
    }
}

const checarCartas = () => {
    const primeiraTentativa = primeiraCarta.getAttribute('data-personagem')
    const segundaTentativa = segundaCarta.getAttribute('data-personagem')

    if (primeiraTentativa === segundaTentativa) {

        primeiraCarta.firstChild.classList.add('carta_acertada')
        segundaCarta.firstChild.classList.add('carta_acertada')

        primeiraCarta = '';
        segundaCarta = '';

        fimDeJogo()
    }
    else {
        setTimeout(() => {
            primeiraCarta.classList.remove('revelar_carta')
            segundaCarta.classList.remove('revelar_carta')

            primeiraCarta = '';
            segundaCarta = '';

        }, 500)
    }
}

const revelarCarta = ({target}) => {

    if (target.parentNode.className.includes('revelar_carta')) {
        return
    }

    if (primeiraCarta === '') {
        target.parentNode.classList.add('revelar_carta')
        primeiraCarta = target.parentNode
    }
    else if (segundaCarta === '') {
        target.parentNode.classList.add('revelar_carta')
        segundaCarta = target.parentNode
    }

    checarCartas()
}

const criarCarta = (personagem) => {
    const carta = criarElemento('div', 'carta')
    const frente = criarElemento('div', 'face frente')
    const verso = criarElemento('div', 'face verso')

    frente.style.backgroundImage = `url('../img/${personagem}.png')`
    
    carta.appendChild(frente)
    carta.appendChild(verso)
    carta.addEventListener('click', revelarCarta)
    carta.setAttribute('data-personagem', personagem)

    return carta
}

const carregarJogo = () => {

    const duplicarPersonagens = [...personagens, ...personagens]

    const embaralharCartas = duplicarPersonagens.sort(() => Math.random() - 0.5)

    embaralharCartas.forEach((personagem) => {
        const carta = criarCarta(personagem)
        grid.appendChild(carta)
    })
}

const inciarCronometro = () => {
    this.loop = setInterval(() => {
        const tempo = Number(cronometro.innerHTML)
        cronometro.innerHTML = tempo + 1
    }, 1000)
}

window.onload = () => {
    const nomeJogador = localStorage.getItem('player')
    spanJogador.innerHTML = nomeJogador

    inciarCronometro()
    carregarJogo()
}