class LOA{
    constructor(boardSize, whiteState, blackState) {
        this.boardSize = boardSize;
        this.whiteState = whiteState;
        this.blackState = blackState;
        this.checkerTable = {};
        this.checkerTablePosition = [];
        this.calculateTable();
    }

    calculateMoves(index) {
        let moves = [];
        const rowMove = this.checkerTable.row[this.checkerTablePosition[index].row];
        const colMove = this.checkerTable.col[this.checkerTablePosition[index].col];
        const mainDMove = this.checkerTable.mainD[this.checkerTablePosition[index].mainD];
        const secondDMove = this.checkerTable.secondD[this.checkerTablePosition[index].secondD];

        let opposition = [];
        let current = [];

        if(this.whiteState.includes(index)) {
            opposition = this.blackState;
            current = this.whiteState;
        }
        else if(this.blackState.includes(index)) {
            opposition = this.whiteState;
            current = this.blackState;
        }
        else {
            return moves;
        }
            
        for (let i = index + 1; i <= index + rowMove; i++) {
            if(i < 0 || i >= this.boardSize * this.boardSize){
                break;
            }
            if(this.checkerTablePosition[i].row !== this.checkerTablePosition[index].row) {
                break;
            }

            if(opposition.includes(i) && i !== index + rowMove ){
                break;
            }
            else if(i === index + rowMove && !current.includes(i)){
                moves.push({
                    state: "right",
                    move: rowMove,
                });
            }
        }

        for (let i = index - 1; i >= index - rowMove; i--) {
            if(i < 0 || i >= this.boardSize * this.boardSize){
                break;
            }
            if(this.checkerTablePosition[i].row !== this.checkerTablePosition[index].row) {
                break;
            }

            if(opposition.includes(i) && i !== index + rowMove ){
                break;
            }
            else if(i === index - rowMove && !current.includes(i)){
                moves.push({
                    state: "left",
                    move: rowMove,
                });
            }
        }

        for (let i = index + this.boardSize; i <= index + colMove * this.boardSize; i += this.boardSize) {
            if(i < 0 || i >= this.boardSize * this.boardSize){
                break;
            }
            if(this.checkerTablePosition[i].col !== this.checkerTablePosition[index].col) {
                break;
            }

            if(opposition.includes(i) && i !== index + colMove * this.boardSize ){
                break;
            }
            else if(i === index + colMove * this.boardSize && !current.includes(i)){
                moves.push({
                    state: "down",
                    move: colMove,
                });
            }
        }

        for (let i = index - this.boardSize; i >= index - colMove * this.boardSize; i -= this.boardSize) {
            if(i < 0 || i >= this.boardSize * this.boardSize){
                break;
            }
            if(this.checkerTablePosition[i].col !== this.checkerTablePosition[index].col) {
                break;
            }

            if(opposition.includes(i) && i !== index - colMove * this.boardSize ){
                break;
            }
            else if(i === index - colMove * this.boardSize && !current.includes(i)){
                moves.push({
                    state: "up",
                    move: colMove,
                });
            }
        }

        for (let i = index + this.boardSize + 1; i <= index + mainDMove * (this.boardSize + 1); i += this.boardSize + 1) {
            if(i < 0 || i >= this.boardSize * this.boardSize){
                break;
            }
            if(this.checkerTablePosition[i].mainD !== this.checkerTablePosition[index].mainD) {
                break;
            }

            if(opposition.includes(i) && i !== index + mainDMove * (this.boardSize + 1) ){
                break;
            }
            else if(i === index + mainDMove * (this.boardSize + 1) && !current.includes(i)){
                moves.push({
                    state: "mainDiagonalDown",
                    move: mainDMove,
                });
            }
        }

        for (let i = index - this.boardSize - 1; i >= index - mainDMove * (this.boardSize + 1); i -= this.boardSize + 1) {
            if(i < 0 || i >= this.boardSize * this.boardSize){
                break;
            }
            if(this.checkerTablePosition[i].mainD !== this.checkerTablePosition[index].mainD) {
                break;
            }

            if(opposition.includes(i) && i !== index - mainDMove * (this.boardSize + 1) ){
                break;
            }
            else if(i === index - mainDMove * (this.boardSize + 1) && !current.includes(i)){
                moves.push({
                    state: "mainDiagonalUp",
                    move: mainDMove,
                });
            }
        }

        for (let i = index + this.boardSize - 1; i <= index + secondDMove * (this.boardSize - 1); i += this.boardSize - 1) {
            if(i < 0 || i >= this.boardSize * this.boardSize){
                break;
            }
            if(this.checkerTablePosition[i].secondD !== this.checkerTablePosition[index].secondD) {
                break;
            }

            if(opposition.includes(i) && i !== index + secondDMove * (this.boardSize - 1) ){
                break;
            }
            else if(i === index + secondDMove * (this.boardSize - 1) && !current.includes(i)){
                moves.push({
                    state: "secondDiagonalDown",
                    move: secondDMove,
                });
            }
        }

        for (let i = index - this.boardSize + 1; i >= index - secondDMove * (this.boardSize - 1); i -= this.boardSize - 1) {
            if(i < 0 || i >= this.boardSize * this.boardSize){
                break;
            }
            if(this.checkerTablePosition[i].secondD !== this.checkerTablePosition[index].secondD) {
                break;
            }

            if(opposition.includes(i) && i !== index - secondDMove * (this.boardSize - 1) ){
                break;
            }
            else if(i === index - secondDMove * (this.boardSize - 1) && !current.includes(i)){
                moves.push({
                    state: "secondDiagonalUp",
                    move: secondDMove,
                });
            }
        }

        return moves;
    }

    doMove(state, move, index) {
        let newPosition = index;
        let msg1 = "";
        let msg2 = "";

        if(state === "left"){
            msg1 = `Checker moves ${move} cells left`;
            newPosition = index - move;
        }
        else if(state === "right"){
            msg1 = `Checker moves ${move} cells right`;
            newPosition = index + move;
        }
        else if(state === "up") {
            msg1 = `Checker moves ${move} cells up`;
            newPosition = index - move * this.boardSize;
        }
        else if(state === "down") {
            msg1 = `Checker moves ${move} cells down`;
            newPosition = index + move * this.boardSize;
        }
        else if(state === "mainDiagonalUp") {
            msg1 = `Checker moves ${move} cells up to the main diagonal`;
            newPosition = index - move * (this.boardSize + 1);
        }
        else if(state === "mainDiagonalDown") {
            msg1 = `Checker moves ${move} cells down to the main diagonal`;
            newPosition = index + move * (this.boardSize + 1);
        }
        else if(state === "secondDiagonalUp") {
            msg1 = `Checker moves ${move} cells up to the second diagonal`;
            newPosition = index - move * (this.boardSize - 1);
        }
        else if(state === "secondDiagonalDown") {
            msg1 = `Checker moves ${move} cells down to the second diagonal`;
            newPosition = index + move * (this.boardSize - 1);
        }
        else {
            return {
                whiteState: this.whiteState,
                blackState: this.blackState,
                msg1: msg1,
                msg2: msg2,
            }
        }

        let opposition = [];
        let current = [];

        if(this.whiteState.includes(index)) {
            opposition = this.blackState;
            current = this.whiteState;
            msg1 = "White " + msg1;
        }
        else if(this.blackState.includes(index)) {
            opposition = this.whiteState;
            current = this.blackState;
            msg1 = "Black " + msg1;
        }
        else {
            return {
                whiteState: this.whiteState,
                blackState: this.blackState,
                msg1: "",
                msg2: "",
            }
        }

        let pos = current.indexOf(index);
        if (pos > -1) {
            this.checkerTable.row[this.checkerTablePosition[index].row]--;
            this.checkerTable.col[this.checkerTablePosition[index].col]--;
            this.checkerTable.mainD[this.checkerTablePosition[index].mainD]--;
            this.checkerTable.secondD[this.checkerTablePosition[index].secondD]--;

            current.splice(pos, 1);
        }
        pos = opposition.indexOf(newPosition);
        if (pos > -1) {
            this.checkerTable.row[this.checkerTablePosition[newPosition].row]--;
            this.checkerTable.col[this.checkerTablePosition[newPosition].col]--;
            this.checkerTable.mainD[this.checkerTablePosition[newPosition].mainD]--;
            this.checkerTable.secondD[this.checkerTablePosition[newPosition].secondD]--;

            msg2 = "Opposition Checker is captured!";
            opposition.splice(pos, 1);
        }

        this.checkerTable.row[this.checkerTablePosition[newPosition].row]++;
        this.checkerTable.col[this.checkerTablePosition[newPosition].col]++;
        this.checkerTable.mainD[this.checkerTablePosition[newPosition].mainD]++;
        this.checkerTable.secondD[this.checkerTablePosition[newPosition].secondD]++;

        current.push(newPosition);

        if(this.whiteState.includes(index)) {
            this.whiteState = current;
            this.blackState = opposition;
        }
        else if(this.blackState.includes(index)) {
            this.whiteState = opposition;
            this.blackState = current;
        }

        return {
            whiteState: this.whiteState,
            blackState: this.blackState,
            msg1: msg1,
            msg2: msg2,
        }
    }

    findEndGame() {
        let endGame = {
            white: true,
            black: true,
            whiteMovable: false,
            blackMovable: false,
        };

        let visited = [];
        const dfs =  (cur, stateArray) => {
            const index = visited.indexOf(cur);
            if(index > -1) {
                return;
            }

            visited.push(cur);
            const row = Math.floor(cur / this.boardSize);
            const col = cur % this.boardSize;

            const rowAdd = [-1, 0, 1];
            const colAdd = [-1, 0, 1];
            for (let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if(row + rowAdd[i] >= 0 && row + rowAdd[i] < this.boardSize && col + colAdd[j] >= 0 && col + colAdd[j] < this.boardSize) {
                        const newPos = (row + rowAdd[i]) * this.boardSize + col + colAdd[j];
                        if(stateArray.includes(newPos) && newPos !== cur){
                            dfs(newPos, stateArray);
                        }
                    }
                }
            }
        }
        
        dfs(this.whiteState[0], this.whiteState);
        this.whiteState.forEach(function(v, index) {
            if(!visited.includes(v)) {
                endGame.white = false;
            }
        });

        visited = [];
        dfs(this.blackState[0], this.blackState);
        this.blackState.forEach(function(v, index) {
            if(!visited.includes(v)) {
                endGame.black = false;
            }
        });

        this.whiteState.forEach((v, index) => {
            const moves = this.calculateMoves(v);
            if(moves.length) {
                endGame.whiteMovable = true;
            }
        });

        this.blackState.forEach((v, index) => {
            const moves = this.calculateMoves(v);
            if(moves.length) {
                endGame.blackMovable = true;
            }
        });

        return endGame;
    }

    calculateTable() {
        const checkerTablePosition  = Array(this.boardSize * this.boardSize).fill({});
        const rowTable = Array(this.boardSize).fill(0);
        const colTable = Array(this.boardSize).fill(0);
        const mainDiagonalTable = Array(this.boardSize * 2 - 1).fill(0);
        const secondDiagonalTable = Array(this.boardSize * 2 - 1).fill(0);

        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                if(this.whiteState.includes(i*this.boardSize+j) || this.blackState.includes(i*this.boardSize+j)){
                    rowTable[i]++;
                    colTable[j]++;
                }

                checkerTablePosition[i*this.boardSize+j] = {
                    ...checkerTablePosition[i*this.boardSize+j],
                    row: i,
                };
                checkerTablePosition[i*this.boardSize+j] = {
                    ...checkerTablePosition[i*this.boardSize+j],
                    col: j,
                };
            }
        }

        let diagN = 0;
        for(let i = 1; i < this.boardSize; i++) {
            for(let j = i; j < this.boardSize*this.boardSize; j += this.boardSize + 1) {
                if(this.whiteState.includes(j) || this.blackState.includes(j)){
                    mainDiagonalTable[diagN]++;
                }

                checkerTablePosition[j] = {
                    ...checkerTablePosition[j],
                    mainD: diagN,
                };

                if((j + 1) % this.boardSize === 0){
                    break;
                }
            }
            diagN++;
        }

        for(let i = this.boardSize * this.boardSize - 1; i >= this.boardSize * (this.boardSize - 1); i--) {
            for(let j = i; j >= 0; j -= this.boardSize + 1) {
                if(this.whiteState.includes(j) || this.blackState.includes(j)){
                    mainDiagonalTable[diagN]++;
                }

                checkerTablePosition[j] = {
                    ...checkerTablePosition[j],
                    mainD: diagN,
                };

                if(j % this.boardSize === 0){
                    break;
                }
            }
            diagN++;
        }


        diagN = 0;
        for(let i = 0; i < this.boardSize; i++) {
            for(let j = i; j < this.boardSize*this.boardSize; j += this.boardSize - 1) {
                if((j + 1) % this.boardSize === 0){
                    break;
                }
                if(this.whiteState.includes(j) || this.blackState.includes(j)){
                    secondDiagonalTable[diagN]++;
                }

                checkerTablePosition[j] = {
                    ...checkerTablePosition[j],
                    secondD: diagN,
                };
            }
            diagN++;
        }

        for(let i = this.boardSize * this.boardSize - 1; i > this.boardSize * (this.boardSize - 1) - 1; i--) {
            for(let j = i; j >= 0; j -= this.boardSize - 1) {
                if(j % this.boardSize === 0){
                    break;
                }
                if(this.whiteState.includes(j) || this.blackState.includes(j)){
                    secondDiagonalTable[diagN]++;
                }
                
                checkerTablePosition[j] = {
                    ...checkerTablePosition[j],
                    secondD: diagN,
                };
            }
            diagN++;
        }

        this.checkerTable.row = rowTable;
        this.checkerTable.col = colTable;
        this.checkerTable.mainD = mainDiagonalTable;
        this.checkerTable.secondD = secondDiagonalTable;
        this.checkerTablePosition = checkerTablePosition;
    }
}

export default LOA;