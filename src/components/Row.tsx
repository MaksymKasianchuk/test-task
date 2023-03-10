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
    onClickHandler: (id:number) => void,
};
const Row: React.FC<Props> = ({ row, onClickHandler }) => {
    const [ sum, setSum ] = useState<number>(0);

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
    
    return(
        <tr key={nanoid()}>
            <td key={nanoid()}></td>
            {/* <td key={nanoid()} >Cell Value M = {index + 1}</td> */}
            {
                row.map((cell:Cell) => {
                    return (
                        <td 
                        key={cell.id} 
                        onClick={() => onClickHandler(cell.id)}
                        >{cell.amount}</td>
                    )}
                )
            }
            <td key={nanoid()}>{sum}</td>
        </tr>
    );
}

export default Row;