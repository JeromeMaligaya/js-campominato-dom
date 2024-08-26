//Check link
console.log('JS OK')

// funzione creazione cella con dom-API
function createCell(content, level){
    const cell = document.createElement('div');
    cell.classList.add('cell', level)
    cell.append(content);

    return cell;
};

// funzione che genera un numero random da min a max

function getRandomNumber(min = 1, max = 100, numberQuantity){
    // genero 16 numeri casuali diversi
    let result = [];
    while (result.length < numberQuantity) {

        randomNumber = Math.floor(Math.random() * (max - min)) + min;

        if (!result.includes(randomNumber)) result.push(randomNumber);
    }

    // dalla funzione mi uscirà l'array generato
    return result;
}

// 1.recupero l'elemento dal Dom (grid, button)
const grid = document.getElementById('grid');
const button = document.querySelector('header button');
const selectLevel = document.querySelector('select');
const form = document.querySelector('form');
const scoreIndex = document.getElementById('score');



// 3.lavorazione dati
// evento al bottone
form.addEventListener('submit', function(e){  
    e.preventDefault();

    // svuoto la griglia e cambio il testo al bottone
    grid.innerHTML = '';
    button.innerText = 'Ricomincia';

    //recupero il valore della selectLevel
    const level = selectLevel.value;

    // recupero dati
    let rows;
    let cols;
    let score = 0;
    const totBombs = 16;

    //  ogni livello gli assegno il numero di row e col
    switch(level){
        case 'easy':
            rows = 10;
            cols = 10;
        break
        case 'medium':
            rows = 9;
            cols = 9;
        break
        case 'hard':
            rows = 7;
            cols = 7;
        break
    }

    // calcolo il numero di celle
    let totCells = rows * cols;

    // invoco la fun getRandomNumber per avere 16 numeri diversi (bombe)
    const bombs = getRandomNumber(1, totCells, totBombs)
    console.log('bombs', bombs)

    // ciclo for
    for (let i = 1; i <= totCells; i++){
        // creo a monte funz createCell
        // invoco la funz createCell
        // numerare le celle [i]
        const cell = createCell(i, level);
        
        //evento alla cella x cambio colore e console log n' cella
        cell.addEventListener('click', function(){
            // aggiungo/rimuovo la classe clicked
            cell.classList.toggle('clicked');
            // stampo in console il numero della cella cliccata
            console.log(`Hai cliccato la cella n'${cell.innerText}`);
            // incremento il punteggio su score
            
            scoreIndex.innerHTML = `<strong>${++score}</strong>`;
            console.log('score', score)
        })
        
        // 4.generazione output
        // stampo in pagina
        grid.appendChild(cell);
    }
    
    
   
    
})