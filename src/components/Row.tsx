import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { useMatrix } from '../context/MatrixProvider';
import { Cell } from '../types/types';

type Props = {
    row: Cell[],
    indexRow: number,
};
const Row: React.FC<Props> = ({ row, indexRow }) => {
    const [ sum, setSum ] = useState<number>(0);
    const [ sumPercents, setPercents ] = useState<number[]>([]);
    const [ showPercents, setShowPercents ] = useState<boolean>(false);
    const [ showDelete, setShowDelete ] = useState<boolean>(false);
    const { handleIncrement, deleteRow } = useMatrix();

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
        <tr key={nanoid()}
        style={
            showDelete ? 
            {background: "red"} : 
            {background: "#fff"}
        }
        >
            <td 
                key={nanoid()} 
                onMouseEnter={() => setShowDelete(true)}
                onMouseLeave={() => setShowDelete(false)} 
                onClick={() => deleteRow(indexRow)}
            >
                { showDelete ? "Delete this row" : `Cell Value M = ${indexRow + 1}`}
            </td>
            {
                row.map((cell:Cell, cellIdx) => {
                    return (
                        <td
                        key={cell.id} 
                        onClick={() => handleIncrement(cell.id)}
                        style={
                            showPercents ? 
                            {background: `linear-gradient(0deg, rgba(162,162,255,1) 0%, rgba(162,162,255,1) ${sumPercents[cellIdx]}%, rgba(255,255,255,1) ${sumPercents[cellIdx]}%)`} : 
                            {background: "transparrent"}
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