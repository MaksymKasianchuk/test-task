"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MatrixProvider_1 = require("../context/MatrixProvider");
const CellTd = ({ cell, cellIdx, showPercents, sumPercents }) => {
    const { handleIncrement } = (0, MatrixProvider_1.useMatrix)();
    //find cell with seem value
    // const [ showSeem, setShowSeem ] = useState<boolean>(false);
    // const { findSeem, handleIncrement } = useMatrix();
    // const handleShowSeemItem = (amount:number) => {
    //     const seemArray = findSeem(amount);
    //     console.log(seemArray);
    //     if(seemArray.includes(cell.id)){
    //         setShowSeem(true);
    //     }
    // }
    return (<td onClick={() => handleIncrement(cell.id)} 
    // onMouseEnter={() => handleShowSeemItem(cell.amount)}
    // className={
    //     showSeem ? "seem-cell" : ""
    // }
    style={showPercents ?
            { background: `linear-gradient(0deg, rgba(162,162,255,1) 0%, rgba(162,162,255,1) ${sumPercents[cellIdx]}%, rgba(255,255,255,1) ${sumPercents[cellIdx]}%)` } :
            { background: "transparrent" }}>
            {cell.amount}
            {showPercents && (<span>-{sumPercents[cellIdx]}%</span>)}
        </td>);
};
exports.default = CellTd;
