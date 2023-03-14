import { useMatrix } from '../context/MatrixProvider';
import { Cell } from '../types/types';
type Props = {
    cell: Cell,
    cellIdx: number,
    showPercents: boolean,
    sumPercents: number[],
};

const CellTd: React.FC<Props> = ({ cell, cellIdx, showPercents, sumPercents }) => {
    const { seemArr, findSeem, handleIncrement } = useMatrix();

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