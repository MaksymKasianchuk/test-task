"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MatrixProvider_1 = require("./context/MatrixProvider");
const nanoid_1 = require("nanoid");
const GenerateForm_1 = __importDefault(require("./components/GenerateForm"));
const Row_1 = __importDefault(require("./components/Row"));
require("./App.css");
const App = () => {
    const { M, N, matrix, averageArr, handleIncrement, addRow, deleteRow } = (0, MatrixProvider_1.useMatrix)();
    const generateFirstRow = () => {
        let arr = [];
        for (let j = 0; j <= N; j++) {
            if (j === 0) {
                arr.push('Click on row name for delete it');
            }
            else {
                arr.push(`Cell values N = ${j}`);
            }
        }
        return arr;
    };
    const firstRow = generateFirstRow();
    return (<div className="App">
      <GenerateForm_1.default />
      {(M !== 0 && N !== 0) && (<>
            <table>
              <tbody>
                <tr>
                  {firstRow.map(item => <td key={(0, nanoid_1.nanoid)()}>{item}</td>)}
                  <td key={(0, nanoid_1.nanoid)()}>Sum values</td>
                </tr>
                {matrix.map((row, index) => <Row_1.default key={(0, nanoid_1.nanoid)()} row={row} indexRow={index}/>)}
                <tr>
                  <td key={(0, nanoid_1.nanoid)()}>Average values</td>
                  {averageArr.map((item) => <td key={(0, nanoid_1.nanoid)()}>{item}</td>)}
                  <td key={(0, nanoid_1.nanoid)()}></td>
                </tr>
              </tbody>
            </table>
      
            <button onClick={addRow}>Add Row</button>
          </>)}

    </div>);
};
exports.default = App;
