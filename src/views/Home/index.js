import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';

import LOA from "../../gameLogics/LOA";
import AI from "../../gameLogics/AI";

import style from "./styles";

const Home = () => {
    const {mainContainer, titleContainer, gameBoardContainer, gameBoxContainer, blackCheckerContainer, whiteCheckerContainer, optionContainer, buttonContainer, playButtonContainer, textContainer, moveContainer} = style();

    const [boardSize, setBoardSize] = useState(6);
    const [optionWidth, setOptionWidth] = useState("240px");
    const [sixOpacity, setSixOpacity] = useState("0.4");
    const [eightOpacity, setEightOpacity] = useState("1");

    const [whiteState, setWhiteState] = useState([6, 12, 18, 24, 11, 17, 23, 29 ]);
    const [blackState, setBlackState] = useState([1, 2, 3, 4, 31, 32, 33, 34 ]);

    const [gridTemplate, setGridTemplate] = useState("40px 40px 40px 40px 40px 40px");

    const [playingMode, setPlayingMode] = useState(false);
    const [playingModeMsg, setPlayingModeMsg] = useState("Play With AI");
    const [modeMsg, setModeMsg] = useState("You are playing with Human");

    const [game, setGame] = useState(new LOA(boardSize, whiteState, blackState));
    const [selectedChecker, setSelectedChecker] = useState(null);
    const [moves, setMoves] = useState([]);
    const [gameTurn, setGameTurn] = useState(false);
    const [turnMsg, setTurnMsg] = useState("Now Black's Turn");
    const [moveIcon, setMoveIcon] = useState({
        up: false,
        down: false,
        left: false,
        right: false,
        mainDiagonalUp: false,
        mainDiagonalDown: false,
        secondDiagonalUp: false,
        secondDiagonalDown: false,
    });

    const onSixClick = () => {
        setGridTemplate("40px 40px 40px 40px 40px 40px");
        setBoardSize(6);
        setOptionWidth("240px");
        setSixOpacity("0.4");
        setEightOpacity("");
        setWhiteState([6, 12, 18, 24, 11, 17, 23, 29 ]);
        setBlackState([1, 2, 3, 4, 31, 32, 33, 34 ]);
        setGame(new LOA(6, [6, 12, 18, 24, 11, 17, 23, 29 ], [1, 2, 3, 4, 31, 32, 33, 34 ]));

        setGameTurn(false);
        setTurnMsg("Now Black's Turn");
        setMoveIcon({
            up: false,
            down: false,
            left: false,
            right: false,
            mainDiagonalUp: false,
            mainDiagonalDown: false,
            secondDiagonalUp: false,
            secondDiagonalDown: false,
        });
    };

    const onEightClick = () => {
        setGridTemplate("40px 40px 40px 40px 40px 40px 40px 40px");
        setBoardSize(8);
        setOptionWidth("320px");
        setSixOpacity("");
        setEightOpacity("0.4");
        setWhiteState([8, 16, 24, 32, 40, 48, 15, 23, 31, 39, 47, 55 ]);
        setBlackState([1, 2, 3, 4, 5, 6, 57, 58, 59, 60, 61, 62 ]);
        setGame(new LOA(8, [8, 16, 24, 32, 40, 48, 15, 23, 31, 39, 47, 55 ], [1, 2, 3, 4, 5, 6, 57, 58, 59, 60, 61, 62 ]));

        setGameTurn(false);
        setTurnMsg("Now Black's Turn");
        setMoveIcon({
            up: false,
            down: false,
            left: false,
            right: false,
            mainDiagonalUp: false,
            mainDiagonalDown: false,
            secondDiagonalUp: false,
            secondDiagonalDown: false,
        });
    };

    const onPlayClick = () => {
        if(boardSize === 6) {
            setWhiteState([6, 12, 18, 24, 11, 17, 23, 29 ]);
            setBlackState([1, 2, 3, 4, 31, 32, 33, 34 ]);
            setGame(new LOA(6, [6, 12, 18, 24, 11, 17, 23, 29 ], [1, 2, 3, 4, 31, 32, 33, 34 ]));
        }
        else if(boardSize === 8) {
            setWhiteState([8, 16, 24, 32, 40, 48, 15, 23, 31, 39, 47, 55 ]);
            setBlackState([1, 2, 3, 4, 5, 6, 57, 58, 59, 60, 61, 62 ]);
            setGame(new LOA(8, [8, 16, 24, 32, 40, 48, 15, 23, 31, 39, 47, 55 ], [1, 2, 3, 4, 5, 6, 57, 58, 59, 60, 61, 62 ]));
        }

        if(playingMode){
            setPlayingMode(false);
            setPlayingModeMsg("Play With AI");
            setModeMsg("You are playing with Human");
        }
        else {
            setPlayingMode(true);
            setPlayingModeMsg("Play With Human");
            setModeMsg("You are playing with AI");
        }
        setGameTurn(false);
        setTurnMsg("Now Black's Turn");
        setMoveIcon({
            up: false,
            down: false,
            left: false,
            right: false,
            mainDiagonalUp: false,
            mainDiagonalDown: false,
            secondDiagonalUp: false,
            secondDiagonalDown: false,
        });
    }

    const onCellClick = (index) => {
        setSelectedChecker(index);

        if(whiteState.includes(index) && playingMode) {
            setMoveIcon({
                up: false,
                down: false,
                left: false,
                right: false,
                mainDiagonalUp: false,
                mainDiagonalDown: false,
                secondDiagonalUp: false,
                secondDiagonalDown: false,
            });
            return;
        }

        if((!gameTurn && blackState.includes(index)) || (gameTurn && whiteState.includes(index))){
            const moves = game.calculateMoves(index);
            let moveStates = {...moveIcon};
            const keys = Object.keys(moveStates);
            keys.forEach((key, index) => {
                moveStates[key] = false;
            });
            moves.map(move => moveStates[move.state] = true)

            setMoves(moves);
            setMoveIcon(moveStates);
        }
        else {
            setMoveIcon({
                up: false,
                down: false,
                left: false,
                right: false,
                mainDiagonalUp: false,
                mainDiagonalDown: false,
                secondDiagonalUp: false,
                secondDiagonalDown: false,
            });
        }
    };

    const onClickMove = (state) => {
        let newStates = {};
        moves.forEach((move, index) => {
            if(move.state === state) {
                newStates = game.doMove(state, move.move, selectedChecker);
            }
        });

        if(gameTurn) {
            setTurnMsg("Now Black's Turn");
        }
        else {
            setTurnMsg("Now White's Turn");
        }

        setGameTurn(!gameTurn);
        setWhiteState(newStates.whiteState);
        setBlackState(newStates.blackState);
        setMoveIcon({
            up: false,
            down: false,
            left: false,
            right: false,
            mainDiagonalUp: false,
            mainDiagonalDown: false,
            secondDiagonalUp: false,
            secondDiagonalDown: false,
        });

        if(newStates.msg1){
            toast.info(newStates.msg1,  {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if(newStates.msg2){
            toast.info(newStates.msg2,  {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(playingMode) {
            setTimeout(() => {
            const aiGame = new AI(boardSize, newStates.whiteState, newStates.blackState);
            let endGame = game.findEndGame();
            let isEnd = false;

            if(endGame.black || endGame.white || !endGame.whiteMovable) {
                isEnd = true;
            }

            if(!isEnd) {
                let move = null;
                if(boardSize === 6){
                    move = aiGame.generateAIMove(4);
                }
                else if(boardSize === 8) {
                    move = aiGame.generateAIMove(4);
                }
                let newAIStates = game.doMove(move.state, move.move, move.selectedChecker);

                setTurnMsg("Now Black's Turn");
                setGameTurn(false);
                setWhiteState(newAIStates.whiteState);
                setBlackState(newAIStates.blackState);

                if(newAIStates.msg1){
                    toast.info(newAIStates.msg1,  {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                if(newAIStates.msg2){
                    toast.info(newAIStates.msg2,  {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        }, 500);
        }
    };

    useEffect(() => {
        let endGame = {};
        endGame = game.findEndGame();
        let isEnd = false;

        function checkEndGame() {
            if(gameTurn && endGame.black) {
                toast.success("Black Won The Game!",  {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                isEnd = true;
            }
            else if(!gameTurn && endGame.white) {
                toast.success("White Won The Game!",  {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                isEnd = true;
            }
            else if(gameTurn && endGame.white) {
                toast.success("White Won The Game!",  {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                isEnd = true;
            }
            else if(!gameTurn && endGame.black) {
                toast.success("Black Won The Game!",  {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                isEnd = true;
            }
            else if(!gameTurn && !endGame.blackMovable) {
                toast.success("White Won The Game!",  {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                isEnd = true;
            }
            else if(gameTurn && !endGame.whiteMovable) {
                toast.success("Black Won The Game!",  {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                isEnd = true;
            }

            if(isEnd) {
                setTimeout(() => {
                    if(boardSize === 6) {
                        setWhiteState([6, 12, 18, 24, 11, 17, 23, 29 ]);
                        setBlackState([1, 2, 3, 4, 31, 32, 33, 34 ]);
                        setGame(new LOA(6, [6, 12, 18, 24, 11, 17, 23, 29 ], [1, 2, 3, 4, 31, 32, 33, 34 ]));
                    }
                    else if(boardSize === 8) {
                        setWhiteState([8, 16, 24, 32, 40, 48, 15, 23, 31, 39, 47, 55 ]);
                        setBlackState([1, 2, 3, 4, 5, 6, 57, 58, 59, 60, 61, 62 ]);
                        setGame(new LOA(8, [8, 16, 24, 32, 40, 48, 15, 23, 31, 39, 47, 55 ], [1, 2, 3, 4, 5, 6, 57, 58, 59, 60, 61, 62 ]));
                    }
    
                    setGameTurn(false);
                    setTurnMsg("Now Black's Turn");
                    setMoveIcon({
                        up: false,
                        down: false,
                        left: false,
                        right: false,
                        mainDiagonalUp: false,
                        mainDiagonalDown: false,
                        secondDiagonalUp: false,
                        secondDiagonalDown: false,
                    });
                }, 3000);
            }
        }

        checkEndGame();
    });

    return ( 
        <div className={mainContainer}>
            <div className={titleContainer}>Line Of Action</div>

            <div className={gameBoardContainer} style={{
                gridTemplateColumns: gridTemplate,
                gridTemplateRows: gridTemplate,
            }}>

                
                {[...Array(boardSize)].map((x, i) => (
                    <React.Fragment key={i}>
                        {[...Array(boardSize)].map((y, j) => (

                            <div className={gameBoxContainer} key={i*boardSize+j} onClick={() => onCellClick(i*boardSize+j)}>

                                {whiteState.includes(i*boardSize+j) ? (
                                    <div className={whiteCheckerContainer}></div>
                                ) : null}
                                {blackState.includes(i*boardSize+j) ? (
                                    <div className={blackCheckerContainer}></div>
                                ) : null}

                            </div>

                        ))}
                    </React.Fragment>
                ))}

                

                <div style={{width: optionWidth}}>
                    <div className={optionContainer} >
                        <div className={buttonContainer} onClick={onSixClick} style={{opacity: sixOpacity}}>6 * 6</div>
                        <div className={buttonContainer} onClick={onEightClick} style={{opacity: eightOpacity}}>8 * 8</div>
                    </div>

                    <div className={optionContainer} >
                        <div className={playButtonContainer} onClick={onPlayClick}>{playingModeMsg}</div>
                    </div>

                    <div className={textContainer}>{modeMsg}</div>

                    <div className={textContainer}>{turnMsg}</div>

                    <div className={moveContainer} >
                        {moveIcon.up ? (<i className="fas fa-arrow-up fa-3x" 
                            onClick={() => onClickMove("up")}
                            style={
                                {
                                    backgroundColor: "#c19999", borderRadius: "10px", 
                                    cursor: "pointer",
                                    padding: "2px", 
                                    "&:hover": {
                                        opacity: "0.5",
                                    },
                                }
                        }></i>) : null}
                        {moveIcon.down ? (<i className="fas fa-arrow-down fa-3x" 
                            onClick={() => onClickMove("down")}
                            style={
                                {
                                    backgroundColor: "#c19999", borderRadius: "10px", 
                                    cursor: "pointer",
                                    padding: "2px", 
                                    "&:hover": {
                                        opacity: "0.5",
                                    },
                                }
                        }></i>) : null}
                        {moveIcon.right ? (<i className="fas fa-arrow-right fa-3x" 
                            onClick={() => onClickMove("right")}
                            style={
                                {
                                    backgroundColor: "#c19999", borderRadius: "10px", 
                                    cursor: "pointer",
                                    padding: "2px", 
                                    "&:hover": {
                                        opacity: "0.5",
                                    },
                                }
                        }></i>) : null}
                        {moveIcon.left ? (<i className="fas fa-arrow-left fa-3x" 
                            onClick={() => onClickMove("left")}
                            style={
                                {
                                    backgroundColor: "#c19999", borderRadius: "10px", 
                                    cursor: "pointer",
                                    padding: "2px", 
                                    "&:hover": {
                                        opacity: "0.5",
                                    },
                                }
                        }></i>) : null}
                    </div>

                    <div className={moveContainer} >
                        {moveIcon.secondDiagonalUp ? (<i className="fas fa-arrow-up fa-3x" 
                            onClick={() => onClickMove("secondDiagonalUp")}
                            style={
                                {
                                    backgroundColor: "#c19999", borderRadius: "10px", 
                                    cursor: "pointer",
                                    padding: "2px",
                                    transform: "rotate(45deg)", 
                                    "&:hover": {
                                        opacity: "0.5",
                                    },
                                }
                        }></i>) : null}
                        {moveIcon.mainDiagonalUp ? (<i className="fas fa-arrow-down fa-3x" 
                            onClick={() => onClickMove("mainDiagonalUp")}
                            style={
                                {
                                    backgroundColor: "#c19999", borderRadius: "10px", 
                                    cursor: "pointer",
                                    padding: "2px", 
                                    transform: "rotate(135deg)", 
                                    "&:hover": {
                                        opacity: "0.5",
                                    },
                                }
                        }></i>) : null}
                        {moveIcon.secondDiagonalDown ? (<i className="fas fa-arrow-right fa-3x" 
                            onClick={() => onClickMove("secondDiagonalDown")}
                            style={
                                {
                                    backgroundColor: "#c19999", borderRadius: "10px", 
                                    cursor: "pointer",
                                    padding: "2px", 
                                    transform: "rotate(135deg)", 
                                    "&:hover": {
                                        opacity: "0.5",
                                    },
                                }
                        }></i>) : null}
                        {moveIcon.mainDiagonalDown ? (<i className="fas fa-arrow-left fa-3x" 
                            onClick={() => onClickMove("mainDiagonalDown")}
                            style={
                                {
                                    backgroundColor: "#c19999", borderRadius: "10px", 
                                    cursor: "pointer",
                                    padding: "2px", 
                                    transform: "rotate(225deg)", 
                                    "&:hover": {
                                        opacity: "0.5",
                                    },
                                }
                        }></i>) : null}
                    </div>
                </div>
                
            </div>
        </div>
     );
}
 
export default Home;