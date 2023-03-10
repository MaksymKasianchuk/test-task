"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const nanoid_1 = require("nanoid");
const GenerateForm_1 = __importDefault(require("./components/GenerateForm"));
const Row_1 = __importDefault(require("./components/Row"));
require("./App.css");
const nanoidNum = (0, nanoid_1.customAlphabet)('1234567890', 3);
const App = () => {
    const [M, setM] = (0, react_1.useState)(0);
    const [N, setN] = (0, react_1.useState)(0);
    const [matrix, setMatrix] = (0, react_1.useState)([[]]);
    const [averageArr, setAverageArr] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
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
        const matr = createMatrix(M, N);
        setMatrix(matr);
    }, [M, N]);
    (0, react_1.useEffect)(() => {
        const countAverege = () => {
            let result = [];
            let i, j;
            for (i = 0; i < M; i++) {
                let accumulator = 0;
                for (j = 0; j < N; j++) {
                    if (!matrix[j]) {
                        accumulator += 0;
                    }
                    else {
                        accumulator += matrix[j][i].amount;
                    }
                }
                let item = (accumulator / N).toFixed(1);
                result.push(Number(item));
            }
            return result;
        };
        const calculatedAverage = countAverege();
        console.log(calculatedAverage);
        setAverageArr(calculatedAverage);
    }, [M, N, matrix]);
    const onSubmit = (mVal, nVal) => {
        setM(mVal);
        setN(nVal);
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
    };
    const addRow = () => {
        // let newMatrixRow:Cell[] = [];
        // for (let j = 0; j < N; j++) {
        //   const amount:CellValue = Math.floor(Math.random() * (M*N));
        //   const newCell:Cell = {
        //     id: Number(nanoidNum()),
        //     amount
        //   }
        //   newMatrixRow.push(newCell);
        // }
        // // console.log(newMatrix);
        // setMatrix(prevMatrix => [...prevMatrix, newMatrixRow]);
        // setM( prevM => prevM+1);
    };
    return (<div className="App">
      <GenerateForm_1.default onSubmitFoo={onSubmit}/>

      {(M !== 0 && N !== 0) && (<>
            <table>
              <tbody>
                {matrix.map((row) => <Row_1.default key={(0, nanoid_1.nanoid)()} row={row} onClickHandler={handleIncrement}/>)}
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
