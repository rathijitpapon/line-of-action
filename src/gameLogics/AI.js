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
        if(!depth || this.checkEndGame(game)) {
            return this.evaluationFunction(game);
        }

        if(maximizingPlayer) {
            let maxEval = -INF;

            for (let checker of game.whiteState) {
                const moves = game.calculateMoves(checker);

                for(let move of moves) {
                    const nextGame = new LOA(this.game.boardSize, [...this.game.whiteState], [...this.game.blackState]);
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
                    const nextGame = new LOA(this.game.boardSize, [...this.game.whiteState], [...this.game.blackState]);
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

    checkEndGame(game) {
        let endGame = game.findEndGame();
        let isEnd = false;

        if(endGame.white || endGame.black || !endGame.whiteMovable) {
            isEnd = true;
        }

        return isEnd;
    }

    evaluationFunction(game) {
       return 0;
    }
}

export default AI;