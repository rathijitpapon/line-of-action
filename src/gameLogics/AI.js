import LOA from "./LOA";

const INF = 1000000000000;

class AI{
    constructor(boardSize, whiteState, blackState) {
        this.boardSize = boardSize;
        this.whiteState = [...whiteState];
        this.blackState = [...blackState];
        this.game = new LOA(boardSize, [...whiteState], [...blackState]);
    }

    generateAIMove(depth) {
        let bestMove = {};
        let maxEval = -INF;

        let alpha = -INF;
        let beta = INF;

        for (let checker of this.game.whiteState) {
            const moves = this.game.calculateMoves(checker);

            for(let move of moves) {
                const nextGame = new LOA(this.game.boardSize, [...this.game.whiteState], [...this.game.blackState]);
                nextGame.doMove(move.state, move.move, checker);
                let eVal = this.runMiniMax(nextGame, depth - 1, alpha, beta, false);

                maxEval = Math.max(maxEval, eVal);
                if(eVal === maxEval) {
                    bestMove = {...move, selectedChecker: checker};
                }
                alpha = Math.max(alpha, eVal);
                if(beta <= alpha) {
                    break;
                }
            }
            
            if(beta <= alpha) {
                break;
            }
        }

        return bestMove;
    }

    runMiniMax(game, depth, alpha, beta, maximizingPlayer) {
        if(!depth || this.checkEndGame(game, maximizingPlayer)) {
            return this.evaluationFunction(game, maximizingPlayer);
        }

        if(maximizingPlayer) {
            let maxEval = -INF;

            for (let checker of game.whiteState) {
                const moves = game.calculateMoves(checker);

                for(let move of moves) {
                    const nextGame = new LOA(game.boardSize, [...game.whiteState], [...game.blackState]);
                    nextGame.doMove(move.state, move.move, checker);
                    let eVal = this.runMiniMax(nextGame, depth - 1, alpha, beta, false);

                    maxEval = Math.max(maxEval, eVal);
                    alpha = Math.max(alpha, eVal);
                    if(beta <= alpha) {
                        break;
                    }
                }
                if(beta <= alpha) {
                    break;
                }
            }

            return maxEval;
        }
        else {
            let minEval = INF;

            for (let checker of game.blackState) {
                const moves = game.calculateMoves(checker);

                for(let move of moves) {
                    const nextGame = new LOA(game.boardSize, [...game.whiteState], [...game.blackState]);
                    nextGame.doMove(move.state, move.move, checker);
                    let eVal = this.runMiniMax(nextGame, depth - 1, alpha, beta, true);

                    minEval = Math.min(minEval, eVal);
                    beta = Math.min(beta, eVal);
                    if(beta <= alpha) {
                        break;
                    }
                }
                if(beta <= alpha) {
                    break;
                }
            }

            return minEval;
        }
    }

    checkEndGame(game, gameTurn) {
        let endGame = game.findEndGame();
        let isEnd = false;

        if(gameTurn && endGame.black) {
            isEnd = true;
        }
        else if(!gameTurn && endGame.white) {
            isEnd = true;
        }
        else if(gameTurn && endGame.white) {
            isEnd = true;
        }
        else if(!gameTurn && endGame.black) {
            isEnd = true;
        }
        else if(!gameTurn && !endGame.blackMovable) {
            isEnd = true;
        }
        else if(gameTurn && !endGame.whiteMovable) {
            isEnd = true;
        }

        return isEnd;
    }

    evaluationFunction(game, gameTurn) {
        let evaluationValue = 0;

        let endGame = game.findEndGame();
        if(gameTurn && endGame.black) {
            evaluationValue += -10000
        }
        else if(!gameTurn && endGame.white) {
            evaluationValue += 10000
        }
        else if(gameTurn && endGame.white) {
            evaluationValue += 10000
        }
        else if(!gameTurn && endGame.black) {
            evaluationValue += -10000
        }
        else if(!gameTurn && !endGame.blackMovable) {
            evaluationValue += 10000
        }
        else if(gameTurn && !endGame.whiteMovable) {
            evaluationValue += -10000
        }

        let whiteMinRow = game.boardSize;
        let whiteMaxRow = 0;
        let whiteMinCol = game.boardSize;
        let whiteMaxCol = 0;
        let blackMinRow = game.boardSize;
        let blackMaxRow = 0;
        let blackMinCol = game.boardSize;
        let blackMaxCol = 0;

        game.whiteState.forEach((v, i) => {
            const row = Math.floor(v / game.boardSize);
            const col = v % game.boardSize;
            whiteMinRow = Math.min(row, whiteMinRow);
            whiteMaxRow = Math.max(row, whiteMaxRow);
            whiteMinCol = Math.min(col, whiteMinCol);
            whiteMaxCol = Math.max(col, whiteMaxCol);
        });

        game.blackState.forEach((v, i) => {
            const row = Math.floor(v / game.boardSize);
            const col = v % game.boardSize;
            blackMinRow = Math.min(row, blackMinRow);
            blackMaxRow = Math.max(row, blackMaxRow);
            blackMinCol = Math.min(col, blackMinCol);
            blackMaxCol = Math.max(col, blackMaxCol);
        });

        const whiteArea = (whiteMaxRow - whiteMinRow + 1) * (whiteMaxCol - whiteMinCol + 1);
        const blackArea = (blackMaxRow - blackMinRow + 1) * (blackMaxCol - blackMinCol + 1);
        evaluationValue += (whiteArea - blackArea) * 10;

        let whiteQuad = 0;
        let blackQuad = 0;
        
        game.whiteState.forEach((v, i) => {
            const row = Math.floor(v / game.boardSize);
            const col = v % game.boardSize;

            if(game.whiteState.includes((row + 1)*col) && game.whiteState.includes((row + 1)*(col + 1) && game.whiteState.includes(row*(col + 1)))) {
                whiteQuad++;
            }
            else if(game.whiteState.includes((row - 1)*col) && !game.whiteState.includes((row - 1)*(col - 1) && game.whiteState.includes(row*(col - 1)))){
                whiteQuad++;
            }
        });

        game.blackState.forEach((v, i) => {
            const row = Math.floor(v / game.boardSize);
            const col = v % game.boardSize;

            if(game.blackState.includes((row + 1)*col) && game.blackState.includes((row + 1)*(col + 1) && game.blackState.includes(row*(col + 1)))) {
                blackQuad++;
            }
            else if(game.blackState.includes((row - 1)*col) && !game.blackState.includes((row - 1)*(col - 1) && game.blackState.includes(row*(col - 1)))){
                blackQuad++;
            }
        });

        evaluationValue += (whiteQuad - blackQuad) * 20;

       return evaluationValue;
    }
}

export default AI;