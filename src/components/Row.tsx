import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
type CellId = number; // unique value for all table
type CellValue = number; // three digit random number

type Cell = {
  id: CellId,
  amount: CellValue
}
type Props = {
    row: Cell[],
    indexRow: number,
    onClickHandler: (id:number) => void,
    deleteHandler: (index:number) => void,
};
const Row: React.FC<Props> = ({ row, indexRow, onClickHandler, deleteHandler }) => {
    const [ sum, setSum ] = useState<number>(0);
    const [ sumPercents, setPercents ] = useState<number[]>([]);
    const [ showPercents, setShowPercents ] = useState<boolean>(false);

    useEffect(()=> {
        const countSumArr = () => {
            let initVal:number = 0;
            const resSum = row.reduce(
                (accumulator, currentValue) => accumulator + currentValue.amount,
                initVal
            );
            return resSum;
        }
        const calcSum = countSumArr();
        setSum(calcSum);
    }, [row]);
    
    useEffect(()=> {
        const countPercents = () => {
            let arr:number[] = [];
            row.map((cell:Cell) => {
                let percent = Number(((100*cell.amount)/sum).toFixed(1));
                if( isNaN(percent) ) percent = 0;
                return arr.push(percent);
            })
            return arr;
        }
        const percentsArr = countPercents();
        setPercents(percentsArr);
    }, [sum, row]);

    return(
        <tr key={nanoid()}>
            <td key={nanoid()}  onClick={() => deleteHandler(indexRow)}>
                Cell Value M = {indexRow + 1}
            </td>
            {
                row.map((cell:Cell, cellIdx) => {
                    return (
                        <td
                        key={cell.id} 
                        onClick={() => onClickHandler(cell.id)}
                        style={
                            showPercents ? 
                            {background: `linear-gradient(0deg, rgba(63,63,255,1) 0%, rgba(63,63,255,1) ${sumPercents[cellIdx]}%, rgba(255,255,255,1) ${sumPercents[cellIdx]}%)`} : 
                            {background: "#fff"}
                        }
                        >
                            {cell.amount}
                            {showPercents && (<span>-{sumPercents[cellIdx]}%</span>)}
                        </td>
                    )}
                )
            }
            <td key={nanoid()}  
                onMouseEnter={() => setShowPercents(true)}
                onMouseLeave={() => setShowPercents(false)}
            >{sum}</td>
        </tr>
    );
}

export default Row;