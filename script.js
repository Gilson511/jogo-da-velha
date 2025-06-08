// initial date

let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''

};


let player = ''; //quem é a vez de jogar 'jogador'.  
let warning = ''; // msg de quem ganhou ou empate. 
let playing = false; // se o jogo esta rolando; 

reset();

//eventos

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
})

//functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        alternarPlayer();
    }
}

function reset() {
    warning = '';

    let randon = Math.floor(Math.random() * 2); //  gera numero aleatorio. 
    player = (randon === 0) ? 'x' : 'o';

    for (let i in square) {
        square[i] = '';
    }

    playing = true;


    document.querySelectorAll('[data-item]').forEach(item =>{
        item.style.backgroundColor = '';
    })
    renderSquare();
    renderInfo();

}


function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];


    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function alternarPlayer() {
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if (checkwinnerFor('x')) {
        warning = 'o "x" venceu';
        playing = false
    } else if (checkwinnerFor('o')) {
        warning = 'o "o" venceu';
        playing = false;
    } else if (isFull()) {
        warning = 'Deu empate';
        playing = false;
    }
}

function checkwinnerFor(player) {
    let possibilits = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for (let w in possibilits) {  //verifica possibilidades de vitoria.
        let parray = possibilits[w].split(','); // a1,a2,a3

        let haswon = parray.every(Option => square[Option] === player);
        if (haswon) {

            //aplicando cor nos quadrados vermelhos.

            parray.forEach(item => {
                document.querySelector(`[data-item="${item}"]`).style.backgroundColor = 'green'; // valor de atributo tem que esta entre aspas.

            })

            return true;


        }
    }

    return false;
}

function isFull() {
    for (let i in square) {
        if (square[i] === '') {
            return false;
        }
    }

    return true;
}
