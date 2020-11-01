
const getMoveIndex = (curIndex, game) => {
    console.log("Index: ", curIndex);
    console.log("Board Size:", game.boardSize);
    console.log(game.checkerTable);
    console.log(game.checkerTablePosition[curIndex]);
    console.log(game.calculateMoves(curIndex));
}

export default getMoveIndex;