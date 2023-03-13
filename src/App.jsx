"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MatrixProvider_1 = require("./context/MatrixProvider");
const GenerateForm_1 = __importDefault(require("./components/GenerateForm"));
const Row_1 = __importDefault(require("./components/Row"));
require("./App.css");
const App = () => {
    const { M, N, matrix, averageArr, addRow, } = (0, MatrixProvider_1.useMatrix)();
    const generateFirstRow = () => {
        let arr = [];
        for (let j = 0; j <= N; j++) {
            if (j === 0) {
                arr.push('Click on row name to delete it');
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
              <thead>
                <tr>
                  {firstRow.map((item, index) => <th key={index}>{item}</th>)}
                  <th>Sum values</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, index) => <Row_1.default key={index} row={row} indexRow={index}/>)}
                <tr>
                  <td>Average values</td>
                  {averageArr.map((item, idx) => <td key={idx}>{item}</td>)}
                  <td></td>
                </tr>
              </tbody>
            </table>
      
            <button className="add-row-btn" onClick={addRow}>Add Row</button>
          </>)}

    </div>);
};
exports.default = App;
