import { useState } from 'react';
import { useMatrix } from '../context/MatrixProvider';
import { Cell } from '../types/types';
type Props = {
    cell: Cell,
    cellIdx: number,
    showPercents: boolean,
    sumPercents: number[],
};

const CellTd: React.FC<Props> = ({ cell, cellIdx, showPercents, sumPercents }) => {
    // const { handleIncrement } = useMatrix();
    
    // find cell with seem value
    // const [ showSeem, setShowSeem ] = useState<boolean>(false);
    const { seemArr, findSeem, handleIncrement } = useMatrix();
    // const handleShowSeemItem = (amount:number) => {
    //     const seemArray = findSeem(amount);
    //     console.log(seemArray);
    //     if(seemArray.includes(cell.id)){
    //         setShowSeem(true);
    //     }
    // }

    return (
        <td
        onClick={() => handleIncrement(cell.id)}
        onMouseEnter={(e) => {
            e.preventDefault();
            findSeem(cell.amount)
        }}
        className={
            (seemArr.includes(cell.id)) ? "seem-cell" : ""
        }
        style={
            showPercents ? 
            {background: `linear-gradient(0deg, rgba(162,162,255,1) 0%, rgba(162,162,255,1) ${sumPercents[cellIdx]}%, rgba(255,255,255,1) ${sumPercents[cellIdx]}%)`} : 
            {background: "transparrent"}
        }
        >
            {cell.amount}
            {showPercents && (<span>-{sumPercents[cellIdx]}%</span>)}
        </td>
    );
}

export default CellTd;