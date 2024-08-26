//Check link
console.log('JS OK')

// funzione creazione cella con dom-API
function createCell(content, level){
    const cell = document.createElement('div');
    cell.classList.add('cell', level)
    cell.append(content);

    return cell;
};
console.log

// 1.recupero l'elemento dal Dom (grid, button)
const grid = document.getElementById('grid');
const button = document.querySelector('header button');
const selectLevel = document.querySelector('select');
const form = document.querySelector('form');



// 3.lavorazione dati
// evento al bottone
form.addEventListener('submit', function(e){  
    e.preventDefault();

    // svuoto la griglia e cambio il testo al bottone
    grid.innerHTML = '';
    button.innerText = 'Ricomincia';

    //recupero il valore della selectLevel
    const level = selectLevel.value;

    //per ogni livello gli assegno il numero di row e col
    let rows;
    let cols;
    
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
        })
        
        // 4.generazione output
        // stampo in pagina
        grid.appendChild(cell);
        console.log(cell);
    }
    
    
   
    
})