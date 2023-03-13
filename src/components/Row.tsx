import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { useMatrix } from '../context/MatrixProvider';
import { Cell } from '../types/types';
import CellTd from "./CellTd";

type Props = {
    row: Cell[],
    indexRow: number,
};
const Row: React.FC<Props> = ({ row, indexRow }) => {
    const [ sum, setSum ] = useState<number>(0);
    const [ sumPercents, setPercents ] = useState<number[]>([]);
    const [ showPercents, setShowPercents ] = useState<boolean>(false);
    const [ showDelete, setShowDelete ] = useState<boolean>(false);
    const { matrix, deleteRow } = useMatrix();

    useEffect(()=> {
        // console.log('w');
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
    }, [row, matrix]);
    
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
        <tr 
            style={
            showDelete ? 
            {backgroundColor: "#ff9797"} : 
            {color: "#000"}
            }
        >
            <td 
                onMouseEnter={() => setShowDelete(true)}
                onMouseLeave={() => setShowDelete(false)} 
                onClick={() => deleteRow(indexRow)}
            >
                { showDelete ? "Delete this row" : `Cell Value M = ${indexRow + 1}`}
            </td>
            {
                row.map((cell:Cell, cellIdx) => {
                    const cellid = showPercents.toString() + cell.id;
                    return (
                        <CellTd 
                            key={cellid} 
                            cell={cell} 
                            cellIdx={cellIdx} 
                            showPercents={showPercents} 
                            sumPercents={sumPercents}
                        />
                    )}
                )
            }
            <td 
                onMouseEnter={() => setShowPercents(true)}
                onMouseLeave={() => setShowPercents(false)}
            >{sum}</td>
        </tr>
    );
}

export default Row;