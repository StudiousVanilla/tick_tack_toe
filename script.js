// Factory function
const playerFactory = (name, score) =>{
    const makeMove = (tile) =>{
        console.log(tile+' x');
    }
    return {name, score, makeMove}
}

const oisín = playerFactory('oisin',13)
console.log(oisín.name);
console.log(oisín.makeMove(1));


// Module
const gameBoard = (()=>{
    const markTile = (x,y) => x+y;
    return{
        markTile
    };
})();

console.log(gameBoard.markTile(1,2));

