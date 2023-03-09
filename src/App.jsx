"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const nanoid_1 = require("nanoid");
const AddRowForm_1 = __importDefault(require("./components/AddRowForm"));
require("./App.css");
const nanoidNum = (0, nanoid_1.customAlphabet)('1234567890', 3);
const App = () => {
    const [M, setM] = (0, react_1.useState)(0);
    const [N, setN] = (0, react_1.useState)(0);
    const [matrix, setMatrix] = (0, react_1.useState)([[]]);
    const [averageArr, setAverageArr] = (0, react_1.useState)([]);
    const [sum, setSum] = (0, react_1.useState)([]);
    //generation newCell
    function newCell(id, maxValue) {
        const amount = Math.floor(Math.random() * maxValue);
        const newCell = {
            id,
            amount
        };
        return newCell;
    }
    //create matrix
    function createMatrix(vM, vN) {
        let matrixL = [[]];
        for (let i = 0; i < vM; i++) {
            matrixL.push(new Array(N));
            for (let j = 0; j < vN; j++) {
                matrixL[i][j] = newCell(Number(nanoidNum()), (vM * vN));
            }
        }
        matrixL.pop();
        return matrixL;
    }
    function countSumArr() {
        let result = [];
        matrix.map((row) => {
            const initialValue = 0;
            return result.push(row.reduce((accumulator, currentValue) => accumulator + currentValue.amount, initialValue));
        });
        return result;
    }
    function countAverege() {
        let result = [];
        let i, j;
        for (i = 0; i < M; i++) {
            console.log(matrix);
            let accumulator = 0;
            for (j = 0; j < N; j++) {
                accumulator += matrix[j][i].amount;
            }
            let item = (accumulator / N).toFixed(1);
            result.push(Number(item));
        }
        return result;
    }
    const generateFirstRow = () => {
        let arr = [];
        for (let j = 0; j <= N; j++) {
            if (j === 0) {
                arr.push('');
            }
            else {
                arr.push(`Cell values N = ${j}`);
            }
        }
        return arr;
    };
    const handleIncrement = (id) => {
        const newMatrix = matrix.map(row => {
            row.map(item => {
                if (item.id === id) {
                    item.amount++;
                }
                return item;
            });
            return row;
        });
        setMatrix(newMatrix);
        const countSum = countSumArr();
        const countAv = countAverege();
        setSum(countSum);
        setAverageArr(countAv);
    };
    const deleteRow = (indexRow) => {
        if (matrix.length < 3)
            return;
        const newMatrix = [...matrix];
        newMatrix.splice(indexRow, 1);
        setMatrix(newMatrix);
        const countSum = countSumArr();
        const countAv = countAverege();
        setSum(countSum);
        setAverageArr(countAv);
    };
    const addRow = () => {
        let newMatrixRow = [];
        for (let j = 0; j < N; j++) {
            newMatrixRow.push(newCell(Number(nanoidNum()), (M * N)));
        }
        // console.log(newMatrix);
        setMatrix(prevMatrix => [...prevMatrix, newMatrixRow]);
        const countSum = countSumArr();
        const countAv = countAverege();
        setSum(countSum);
        setAverageArr(countAv);
    };
    const onSubmit = (mVal, nVal) => {
        setM(mVal);
        setN(nVal);
        const matr = createMatrix(mVal, nVal);
        const countSum = countSumArr();
        const countAv = countAverege();
        setMatrix(matr);
        setSum(countSum);
        setAverageArr(countAv);
    };
    const firstRow = generateFirstRow();
    return (<div className="App">
      <AddRowForm_1.default onSubmitFoo={onSubmit}/>

      {(M !== 0 && N !== 0) && (<>
            <table>
              <tbody>
                <tr>
                  {firstRow.map(item => <td key={(0, nanoid_1.nanoid)()}>{item}</td>)}
                  <td key={(0, nanoid_1.nanoid)()}>Sum values</td>
                </tr>
                {matrix.map((row, index) => {
                return (<tr key={(0, nanoid_1.nanoid)()}>
                        <td key={(0, nanoid_1.nanoid)()} onClick={() => deleteRow(index)}>Cell Value M = {index + 1}</td>
                        {row.map((cell) => {
                        return (<td key={cell.id} onClick={() => handleIncrement(cell.id)}>{cell.amount}</td>);
                    })}
                        <td key={(0, nanoid_1.nanoid)()}>{sum[index]}</td>
                      </tr>);
            })}
                <tr>
                  <td key={(0, nanoid_1.nanoid)()}>Average values</td>
                  {averageArr.map(item => <td key={(0, nanoid_1.nanoid)()}>{item}</td>)}
                  <td key={(0, nanoid_1.nanoid)()}></td>
                </tr>
              </tbody>
            </table>
      
            <button onClick={addRow}>Add Row</button>
          </>)}

    </div>);
};
exports.default = App;
