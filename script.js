// tracks turn number
let turnCounter = 1;
const turnOrder = () => turnCounter=turnCounter+1;

// Module
const buttons = (()=>{

    //captures game board
    const game = document.querySelector('#macro-container')

    // captures the input fields for name inputs
    const inputField = document.querySelector('.name-inputs')

    // captures ready button and HTML
    const readyButton = document.querySelector('#ready')

    // captures back button
    const  backButton = document.querySelector('#back')
    // removes game from display and presents ready button + anme input again
    backButton.addEventListener('click', ()=>{
        readyButton.style.display = 'block'
        game.style.display = 'none'
        inputField.style.display = 'flex'
        // set grid to ''
        gameBoard.clearGrid(gameGrid,'')
        // render grid
        gameBoard.renderGrid(gameGrid);
        // reset turn number
        turnCounter = 1;
        // set turn indictor to player 1
        gameBoard.turnIndicator(turnCounter)
        // reset game score
        player1.resetScore()
        player1.displayScore1()
        player2.resetScore()
        player2.displayScore2()

        //reset input fields
        let input1 = document.querySelector('#player1-name')
        let input2 = document.querySelector('#player2-name')
        input1.value = ''
        input2.value = ''
    })

    // captures reset button
    const resetButton = document.querySelector('#reset')
    resetButton.addEventListener('click',()=>{
        // set grid to ''
        gameBoard.clearGrid(gameGrid,'')
        // render grid
        gameBoard.renderGrid(gameGrid);
        // reset turn number
        turnCounter = 1;
        // set turn indictor to player 1
        gameBoard.turnIndicator(turnCounter)
        // reset the game score
        player1.resetScore()
        player1.displayScore1()
        player2.resetScore()
        player2.displayScore2()
    })
    
    readyButton.addEventListener('click', ()=>{

        let player1SetName = document.querySelector('#player1-name').value
        //set default name
        if(player1SetName === ""){
            player1SetName = 'Player1'
        }
        
        let player1Default = document.querySelector('#player1')
        player1Default.innerHTML="<span class = 'player-move'id='player1-move'>*</span>"+player1SetName+": <span id='score-player1'></span>"

        let player2SetName = document.querySelector('#player2-name').value
        // set default name
        if(player2SetName === ""){
            player2SetName = 'Player2'
        }
        
        let player2Default = document.querySelector('#player2')
        player2Default.innerHTML="<span class = 'player-move'id='player2-move'>*</span>"+player2SetName+": <span id='score-player2'></span>"

        // removes button and name inputs from 'display' and renders in the game
        readyButton.style.display = 'none'
        game.style.display= 'block'
        inputField.style.display = 'none'
    })

    return{}
})();


// Factory Function to make players
const playerFactory = (playerNumber) => {

    // initialise score
    let score = 0;

    // function to increase score
    const updateScore = () => score+=1;

    // renders new score to HTML
    const displayScore1 = () =>{
         // captures HTML span for score depending on player number (1 or 2)
        let playerScore1 = document.querySelector('#score-player1')
        playerScore1.innerHTML = score};
    
    const displayScore2 = () =>{ 
        let playerScore2 = document.querySelector('#score-player2')
        playerScore2.innerHTML = score};
    
    const resetScore = () =>{
        score = 0;
    }

    return{updateScore, displayScore1,displayScore2, resetScore};
};

// creates player1 and player2 objects from factory function
let player1 = playerFactory(1);
let player2 = playerFactory(2);


// Module
const gameBoard = (()=>{
    // pseudo grid for js to work with, and to set HTML from
    gameGrid = {1:"",2:"",3:"",
                4:"",5:"",6:"",
                7:"",8:"",9:"",};

    // Checks to see if grid space is availabe to play
    const checkGrid = (girdPosition) =>{
        if (gameGrid[girdPosition]===""){
            return true;
        }
        else{
            return false;
        }
    }
    
    // Adds an X or O to grid based on positon selected and player turn
    const markGrid = (girdPosition,turn) =>{
        if (turn%2 !== 0){
            gameGrid[girdPosition] = 'X'
        }
        else{
            gameGrid[girdPosition] = 'O'
        }
    }

    // renders an X or O into HTML based on values in gameGrid
    const renderTile = (tileId, turn) =>{
        let renderTile = document.getElementById(tileId)
        renderTile.innerHTML = gameGrid[parseInt(tileId[5])]
        if (turn%2 === 0){
            renderTile.setAttribute('class','game-tile o-value')
        }
        else{
            renderTile.setAttribute('class','game-tile x-value')
        }
    }

    // checks to see if victory conditions have been met by a player
    const gameWinner = () =>{
        if((gameGrid[1]+gameGrid[2]+gameGrid[3] === 'XXX') || 
            (gameGrid[1]+gameGrid[2]+gameGrid[3] === 'OOO')){
            return true
        }
        else if((gameGrid[4]+gameGrid[5]+gameGrid[6] === 'XXX') || 
                (gameGrid[4]+gameGrid[5]+gameGrid[6] === 'OOO')){
            return true
        }
        else if((gameGrid[7]+gameGrid[8]+gameGrid[9] === 'XXX') || 
                (gameGrid[7]+gameGrid[8]+gameGrid[9] === 'OOO')){
            return true
        }
        else if((gameGrid[1]+gameGrid[4]+gameGrid[7] === 'XXX') ||
                (gameGrid[1]+gameGrid[4]+gameGrid[7] === 'OOO')){
        return true
        }   
        else if((gameGrid[2]+gameGrid[5]+gameGrid[8] === 'XXX') ||
                (gameGrid[2]+gameGrid[5]+gameGrid[8] === 'OOO')){
        return true
        }        
        else if((gameGrid[3]+gameGrid[6]+gameGrid[9] === 'XXX') ||
                (gameGrid[3]+gameGrid[6]+gameGrid[9] === 'OOO')){
        return true
        }
        else if((gameGrid[1]+gameGrid[5]+gameGrid[9] === 'XXX') ||
                (gameGrid[1]+gameGrid[5]+gameGrid[9] === 'OOO')){
        return true
        }  
        else if((gameGrid[3]+gameGrid[5]+gameGrid[7] === 'XXX') ||
                (gameGrid[3]+gameGrid[5]+gameGrid[7] === 'OOO')){
        return true
        }
        else{
            return false
        }
    }

    // alerts players as to who the winner is
    const alertWinner = (turn) =>{
        if(turn%2 === 0){
            alert("Player 2 wins!")
        }
        else{
            alert("Player 1 wins!")
        }
    }

    const checkDraw = () =>{
        if (Object.values(gameGrid).indexOf("") < 0){
            alert('Its a draw!')
            return true;
        }
        else{
            return false;
        }
    }

    // resets all gameGrid values to ""
    const clearGrid = (grid,value) =>{ 
        let gridKeys = Object.keys(grid)
        // 'key' used to reference gameGrid keys in order to set value to ""
        for(key in gridKeys){
            let gridReference = parseInt(key)+1;
            gameGrid[gridReference] = value;
        }

    }

    // renders entire grid (used once a player has won a game)
    const renderGrid = (grid) =>{
        tiles.forEach((tile)=>{
            resetTile = document.querySelector('#'+tile.id)
            resetTile.innerHTML = gameGrid[parseInt(tile.id[5])]
        })
    }

    // indicates which player should take the next turn
    const turnIndicator = turn => {
        let player1Indicator = document.querySelector('#player1-move')
        let player2Indicator = document.querySelector('#player2-move')
        if(turn%2===0){
            player1Indicator.style.color = 'rgb(190, 190, 190)'
            player2Indicator.style.color = 'red'
        }
        else{
            player1Indicator.style.color = 'red'
            player2Indicator.style.color = 'rgb(190, 190, 190)'
        }
    }
    
    return{
        checkGrid, turnOrder, gameWinner, alertWinner, checkDraw, markGrid, renderTile, clearGrid, renderGrid, turnIndicator
    }
})();

// begin with player 1
gameBoard.turnIndicator(turnCounter)

// Adds click event to each tile
const tiles = document.querySelectorAll('.game-tile')
tiles.forEach((tile)=>{
    tile.addEventListener('click',(e)=>{

        // Check to see if move is valid
        if(gameBoard.checkGrid(event.target.id[5])){
            // mark the game grid with appropriate entry
            gameBoard.markGrid(parseInt(event.target.id[5]),turnCounter);

            // render new X or O into grid
            gameBoard.renderTile(event.target.id, turnCounter)

            // check to see if there is a winner
            if(gameBoard.gameWinner()){
                
                // alert who has won 
                gameBoard.alertWinner(turnCounter);

                // update and render score of winner
                if(turnCounter%2 !== 0){
                    player1.updateScore()
                    player1.displayScore1()
                }
                else{
                    player2.updateScore()
                    player2.displayScore2()
                }

                // clear and re-render grid
                gameBoard.clearGrid(gameGrid,"");
                gameBoard.renderGrid(gameGrid);
                
            }

            // check to see if game is a draw
            if(gameBoard.checkDraw()){

                // clear and re-render grid
                console.log('draw')
                gameBoard.clearGrid(gameGrid,"");
                gameBoard.renderGrid(gameGrid);
            }

            // increase turn order
            gameBoard.turnOrder()

            // changes player turn indicator
            gameBoard.turnIndicator(turnCounter);
        }
        else{
            alert('That space is taken!')
        }  
    })
})
