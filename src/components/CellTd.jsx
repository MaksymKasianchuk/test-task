"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MatrixProvider_1 = require("../context/MatrixProvider");
const CellTd = ({ cell, cellIdx, showPercents, sumPercents }) => {
    const { seemArr, findSeem, handleIncrement } = (0, MatrixProvider_1.useMatrix)();
    return (<td onClick={() => handleIncrement(cell.id)} onMouseEnter={(e) => {
            e.preventDefault();
            findSeem(cell.amount);
        }} className={(seemArr.includes(cell.id)) ? "seem-cell" : ""} style={showPercents ?
            { background: `linear-gradient(0deg, rgba(162,162,255,1) 0%, rgba(162,162,255,1) ${sumPercents[cellIdx]}%, rgba(255,255,255,1) ${sumPercents[cellIdx]}%)` } :
            { background: "transparrent" }}>
            {cell.amount}
            {showPercents && (<span>-{sumPercents[cellIdx]}%</span>)}
        </td>);
};
exports.default = CellTd;
