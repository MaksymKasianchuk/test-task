"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const nanoid_1 = require("nanoid");
const Row = ({ row, onClickHandler }) => {
    const [sum, setSum] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const countSumArr = () => {
            let initVal = 0;
            const resSum = row.reduce((accumulator, currentValue) => accumulator + currentValue.amount, initVal);
            return resSum;
        };
        const calcSum = countSumArr();
        setSum(calcSum);
    }, [row]);
    return (<tr key={(0, nanoid_1.nanoid)()}>
            <td key={(0, nanoid_1.nanoid)()}></td>
            {/* <td key={nanoid()} >Cell Value M = {index + 1}</td> */}
            {row.map((cell) => {
            return (<td key={cell.id} onClick={() => onClickHandler(cell.id)}>{cell.amount}</td>);
        })}
            <td key={(0, nanoid_1.nanoid)()}>{sum}</td>
        </tr>);
};
exports.default = Row;
