"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const nanoid_1 = require("nanoid");
const MatrixProvider_1 = require("../context/MatrixProvider");
const Row = ({ row, indexRow }) => {
    const [sum, setSum] = (0, react_1.useState)(0);
    const [sumPercents, setPercents] = (0, react_1.useState)([]);
    const [showPercents, setShowPercents] = (0, react_1.useState)(false);
    const { handleIncrement, deleteRow } = (0, MatrixProvider_1.useMatrix)();
    (0, react_1.useEffect)(() => {
        const countSumArr = () => {
            let initVal = 0;
            const resSum = row.reduce((accumulator, currentValue) => accumulator + currentValue.amount, initVal);
            return resSum;
        };
        const calcSum = countSumArr();
        setSum(calcSum);
    }, [row]);
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
    return (<tr key={(0, nanoid_1.nanoid)()}>
            <td key={(0, nanoid_1.nanoid)()} onClick={() => deleteRow(indexRow)}>
                Cell Value M = {indexRow + 1}
            </td>
            {row.map((cell, cellIdx) => {
            return (<td key={cell.id} onClick={() => handleIncrement(cell.id)} style={showPercents ?
                    { background: `linear-gradient(0deg, rgba(63,63,255,1) 0%, rgba(63,63,255,1) ${sumPercents[cellIdx]}%, rgba(255,255,255,1) ${sumPercents[cellIdx]}%)` } :
                    { background: "#fff" }}>
                            {cell.amount}
                            {showPercents && (<span>-{sumPercents[cellIdx]}%</span>)}
                        </td>);
        })}
            <td key={(0, nanoid_1.nanoid)()} onMouseEnter={() => setShowPercents(true)} onMouseLeave={() => setShowPercents(false)}>{sum}</td>
        </tr>);
};
exports.default = Row;
