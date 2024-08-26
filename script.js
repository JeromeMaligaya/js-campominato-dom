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
const result = document.getElementById('result');



// 3.lavorazione dati
// evento al bottone
form.addEventListener('submit', function(e){  
    e.preventDefault();

    // svuoto la griglia, cambio il testo al bottone e svuoto result
    grid.innerHTML = '';
    button.innerText = 'Ricomincia';
    result.innerText = '';

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

    // invoco la funz getRandomNumber per avere in un array 16 numeri diversi (bombe)
    const bombs = getRandomNumber(1, totCells, totBombs)
    console.log('bombs', bombs)

    // ciclo for
    for (let i = 1; i <= totCells; i++){
        // creo a monte funz createCell
        // invoco la funz createCell
        // numerare le celle [i]
        const cell = createCell(i, level);
        
        
        //evento alla cella
        cell.addEventListener('click', function(){
           
            // se la cella cliccata ha la classe clicked esco
            if (cell.classList.contains('clicked')) return;

            // raccolgo la cella cliccata
            const cellClicked = parseInt(this.innerText);
            
            // raccolta dati
            let message = '';
            const maxScore = totCells - totBombs;
            
            if (bombs.includes(cellClicked)){
                // stampo in console il numero della cella cliccata
                message = `
                <h2 class="text-danger text-center">Hai PERSO!!! Hai calpestato una bomba nella cella n'${cell.innerText}, 
                <br>il tuo score è: ${score}.
                <br>
                <br>Premi il tasto 'Ricomincia' per rigiocare.</h2>
                `;
                // svuoto il contenuto della cella
                cell.innerText = '';
                // aggiungo la classe bomb alla cella cliccata
                cell.classList.add('bomb'); 
                
                // coloro e blocco tutte le celle con le classi clicked o bomb
                const cells = document.querySelectorAll('.cell');
                console.log(cells)
                for(let i = 0; i < cells.length; i++){
                    if (bombs.includes(i)){
                        cells[i].innerText = '';
                        cells[i].classList.add('bomb')
                    } else {
                        cells[i].classList.add('clicked')
                    }
                }            
                             
                // stampo in pagina message
                result.innerHTML = message;
            } else {
                // aggiungo la classe clicked
                cell.classList.add('clicked');

                // stampo in console il numero della cella cliccata
                console.log(`Hai cliccato la cella n'${cell.innerText}`);
                
                // incremento il punteggio su score
                scoreIndex.innerHTML = `<strong>${++score}</strong>`;
                console.log('your score: ', score)
            }

            if (score === maxScore){
                message = `<h2 class="text-success text-center">HAI VINTOOOO!! Hai evitato tutte le bombe, il tuo score è: ${score}.</h2>`;
                // stampo in pagina message
                result.innerHTML = message;
            }
        })
        
        // 4.generazione output
        // stampo in pagina
        grid.appendChild(cell);
    }
    
    
   
    
})