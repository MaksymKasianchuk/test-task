"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const MatrixProvider_1 = require("../context/MatrixProvider");
const CellTd_1 = __importDefault(require("./CellTd"));
const Row = ({ row, indexRow }) => {
    const [sum, setSum] = (0, react_1.useState)(0);
    const [sumPercents, setPercents] = (0, react_1.useState)([]);
    const [showPercents, setShowPercents] = (0, react_1.useState)(false);
    const [showDelete, setShowDelete] = (0, react_1.useState)(false);
    const { matrix, deleteRow } = (0, MatrixProvider_1.useMatrix)();
    (0, react_1.useEffect)(() => {
        // console.log('w');
        const countSumArr = () => {
            let initVal = 0;
            const resSum = row.reduce((accumulator, currentValue) => accumulator + currentValue.amount, initVal);
            return resSum;
        };
        const calcSum = countSumArr();
        setSum(calcSum);
    }, [row, matrix]);
    (0, react_1.useEffect)(() => {
        const countPercents = () => {
            let arr = [];
            row.map((cell) => {
                let percent = Number(((100 * cell.amount) / sum).toFixed(1));
                if (isNaN(percent))
                    percent = 0;
                return arr.push(percent);
            });
            return arr;
        };
        const percentsArr = countPercents();
        setPercents(percentsArr);
    }, [sum, row]);
    return (<tr style={showDelete ?
            { backgroundColor: "#ff9797" } :
            { color: "#000" }}>
            <td onMouseEnter={() => setShowDelete(true)} onMouseLeave={() => setShowDelete(false)} onClick={() => deleteRow(indexRow)}>
                {showDelete ? "Delete this row" : `Cell Value M = ${indexRow + 1}`}
            </td>
            {row.map((cell, cellIdx) => {
            const cellid = showPercents.toString() + cell.id;
            return (<CellTd_1.default key={cellid} cell={cell} cellIdx={cellIdx} showPercents={showPercents} sumPercents={sumPercents}/>);
        })}
            <td onMouseEnter={() => setShowPercents(true)} onMouseLeave={() => setShowPercents(false)}>{sum}</td>
        </tr>);
};
exports.default = Row;
