"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixProvider = exports.useMatrix = void 0;
const react_1 = require("react");
const nanoid_1 = require("nanoid");
const nanoidNum = (0, nanoid_1.customAlphabet)('1234567890', 3);
const MatrixContext = (0, react_1.createContext)(null);
const useMatrix = () => (0, react_1.useContext)(MatrixContext);
exports.useMatrix = useMatrix;
const MatrixProvider = ({ children }) => {
    const [M, setM] = (0, react_1.useState)(0);
    const [N, setN] = (0, react_1.useState)(0);
    const [matrix, setMatrix] = (0, react_1.useState)([[]]);
    const [averageArr, setAverageArr] = (0, react_1.useState)([]);
    // const [ seemArr, setSeemArr ] = useState<number[]>([]);
    const newCell = (id, maxValue) => {
        const amount = Math.floor(Math.random() * maxValue);
        const newCell = {
            id,
            amount
        };
        return newCell;
    };
    const createMatrix = (vM, vN) => {
        let matrixL = [[]];
        for (let i = 0; i < vM; i++) {
            matrixL.push(new Array(N));
            for (let j = 0; j < vN; j++) {
                matrixL[i][j] = newCell(Number(nanoidNum()), (vM * vN));
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
            const amount = Math.floor(Math.random() * (M * N));
            const newCell = {
                id: Number(nanoidNum()),
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
        matrix.map((row) => {
            row.map((item) => {
                if (item.amount === amount) {
                    seemCells.push(item.id);
                }
                return item;
            });
            return row;
        });
        // setSeemArr(seemCells);
        return seemCells;
    };
    return (<MatrixContext.Provider value={{
            M,
            setM,
            N,
            setN,
            matrix,
            setMatrix,
            averageArr,
            setAverageArr,
            createMatrix,
            handleIncrement,
            addRow,
            deleteRow,
            findSeem,
        }}>
        {children}
        </MatrixContext.Provider>);
};
exports.MatrixProvider = MatrixProvider;
