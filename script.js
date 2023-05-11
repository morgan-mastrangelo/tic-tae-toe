// Variables 
// Winning Conditions
const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let gameMoves = ["", "", "", "", "", "", "", "", ""];
let userChoice = '';
let current = userChoice;
let isUser = true;

// Hide the game and end part when document is loaded.
$(document).ready(() => {
    $('.game').hide();
    $('.end').hide();
})

// EventListener to click when x-btn is clicked. Sets the userChoice to X.
$('#x-btn').on('click', function(){
    userChoice = 'X';
    current = userChoice;
    $('.intro').hide();
    $('.game').show()
})

// EventListener to click when o-btn is clicked. Sets the userChoice to O.
$('#o-btn').on('click', function(){
    userChoice = 'O';
    current = userChoice;
    $('.intro').hide();
    $('.game').show();
})

// Add tile buttons to the html.
Array.from({length: 9}, (el,i) => {
    const tile = `<button class="tile" value = ${i}></div>`;
    $('.game').append(tile);
})

// EventListener for tile buttons.
$('.tile').on('click', function(){
    if($(this).text() === 'X' || $(this).text() === 'O'){
        return;
    }
    if(isUser){
        current = userChoice;
    }else{
        current = userChoice === 'X' ? 'O' : 'X';
    }
    gameMoves[$(this).val()] = current;
    $(this).text(current);
    $(this).addClass(current);
    isUser = !isUser;
    result();
})

// This functions decides the result of the game.
const result = () => {
    let won = false;
    let result = "";
    for(let i = 0; i < 8; i++){
        let w = winCombo[i];
        const a = gameMoves[w[0]];
        const b = gameMoves[w[1]];
        const c = gameMoves[w[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if(a === b && b === c){
            if(a === 'X'){
                result = 'Player X won';
            }else{
                result = 'Player O won';
            }
            won = true;
            break;
        }
    }

    if(won){
        showResult(result);
        return;
    }

    if(!gameMoves.includes('')){
        showResult('TIE');
    }
}

// This functions shows the result to the user.
const showResult = (s) => {
    $('.game').hide();
    $('#result').text(s);
    $('.end').show();
}

// EventListener for reset button.
$('#reset').on('click', () => {
    reset();
    $('.game').show();
    $('.end').hide();
})

// This function resets the game.
const reset = () => {
    gameMoves = ["", "", "", "", "", "", "", "", ""];
    current = userChoice;
    isUser = true;
    Array.from({length: 9}, (el,i) => {
        $('.tile').text('');
        $('.tile').removeClass("X O");
    });
}

// // EventListener for home button.
$('#home').on('click', () => {
    reset();
    $('.game').hide();
    $('.end').hide();
    $('.intro').show();
})
