"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixProvider = exports.useMatrix = void 0;
const react_1 = require("react");
// import { customAlphabet } from 'nanoid';
// const nanoidNum = customAlphabet('1234567890', 3);
const MatrixContext = (0, react_1.createContext)(null);
const useMatrix = () => (0, react_1.useContext)(MatrixContext);
exports.useMatrix = useMatrix;
const MatrixProvider = ({ children }) => {
    const [M, setM] = (0, react_1.useState)(0);
    const [N, setN] = (0, react_1.useState)(0);
    const [X, setX] = (0, react_1.useState)(0);
    const [matrix, setMatrix] = (0, react_1.useState)([[]]);
    const [averageArr, setAverageArr] = (0, react_1.useState)([]);
    const [seemArr, setSeemArr] = (0, react_1.useState)([]);
    const newCell = (id, maxValue) => {
        const amount = Math.floor(Math.random() * maxValue);
        const newCell = {
            id,
            amount
        };
        return newCell;
    };
    const createMatrix = (vM, vN, xVal) => {
        let matrixL = [[]];
        for (let i = 0; i < vM; i++) {
            matrixL.push(new Array(N));
            for (let j = 0; j < vN; j++) {
                const id = i.toString() + j.toString();
                matrixL[i][j] = newCell(Number(id), xVal);
            }
        }
        matrixL.pop();
        return matrixL;
    };
    (0, react_1.useEffect)(() => {
        const countAverege = () => {
            let result = [];
            let i, j;
            for (i = 0; i < N; i++) {
                let accumulator = 0;
                for (j = 0; j < M; j++) {
                    accumulator += matrix[j][i].amount;
                }
                let item = (accumulator / N).toFixed(1);
                result.push(Number(item));
            }
            return result;
        };
        const calculatedAverage = countAverege();
        setAverageArr(calculatedAverage);
    }, [M, N, matrix]);
    const handleIncrement = (id) => {
        const newMatrix = matrix.map((row) => {
            row.map(item => {
                if (item.id === id) {
                    item.amount++;
                }
                return item;
            });
            return row;
        });
        setMatrix(newMatrix);
    };
    const addRow = () => {
        let newMatrixRow = [];
        for (let j = 0; j < N; j++) {
            const amount = Math.floor(Math.random() * X);
            const id = (M + 1).toString() + j.toString();
            const newCell = {
                id: Number(id),
                amount
            };
            newMatrixRow.push(newCell);
        }
        setMatrix((prevMatrix) => [...prevMatrix, newMatrixRow]);
        setM((prevM) => prevM + 1);
    };
    const deleteRow = (indexRow) => {
        if (matrix.length < 2)
            return;
        const newMatrix = [...matrix];
        newMatrix.splice(indexRow, 1);
        setMatrix(newMatrix);
        setM((prevM) => prevM - 1);
    };
    const findSeem = (amount) => {
        const seemCells = [];
        const flatMatrix = matrix.flat();
        let left = 0;
        let right = flatMatrix.length - 1;
        while (right - left >= X) {
            if (Math.abs(flatMatrix[left].amount - amount) > Math.abs(flatMatrix[right].amount - amount)) {
                left++;
            }
            else {
                right--;
            }
        }
        while (left <= right) {
            seemCells.push(flatMatrix[left].id);
            left++;
        }
        setSeemArr(seemCells);
        // const seemCells:number[] = [];
        // matrix.map((row:Cell[]) =>{
        //   row.map((item) => {
        //       if(item.amount === amount){
        //         seemCells.push(item.id);
        //       }
        //     return item;
        //   });
        //   return row;
        // });
        // setSeemArr(seemCells);
        // console.log(seemArr.includes(itId))
        // return seemCells;
    };
    return (<MatrixContext.Provider value={{
            M,
            setM,
            N,
            setN,
            X,
            setX,
            matrix,
            setMatrix,
            averageArr,
            setAverageArr,
            createMatrix,
            handleIncrement,
            addRow,
            deleteRow,
            findSeem,
            seemArr,
        }}>
        {children}
        </MatrixContext.Provider>);
};
exports.MatrixProvider = MatrixProvider;
