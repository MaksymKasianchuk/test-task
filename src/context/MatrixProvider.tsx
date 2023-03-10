import { createContext, useContext, useState, useEffect } from "react";
import { Cell, CellId, CellValue } from "../types/types";
import { customAlphabet } from 'nanoid';

const nanoidNum = customAlphabet('1234567890', 3);
const MatrixContext = createContext<any>(null);

export const useMatrix = () => useContext(MatrixContext);

type Props = {
    children: React.ReactNode
};
export const MatrixProvider: React.FC<Props> = ({ children }) => {
    const [ M, setM ] = useState(0);
    const [ N, setN ] = useState(0);
    const [ matrix, setMatrix ] = useState<Cell[][]>([[]]);
    const [ averageArr, setAverageArr ] = useState<number[]>([]);

    const newCell = (id:CellId, maxValue:number) => {
        const amount:CellValue = Math.floor(Math.random() * maxValue);
        const newCell:Cell = {
          id,
          amount
        }
        return newCell;
    }

    const createMatrix = (vM:number, vN:number) => {
        let matrixL:Cell[][] = [[]];
        for (let i = 0; i < vM; i++) {
          matrixL.push(new Array(N));
          for (let j = 0; j < vN; j++) {
            matrixL[i][j] = newCell(Number(nanoidNum()), (vM*vN));
          }
        }
        matrixL.pop();
        return matrixL;
    }
  
    useEffect(()=> {
      const countAverege = () => {
        let result = [];
        let i, j;
        for (i = 0; i < N; i++) {
          let accumulator = 0;
          for (j = 0; j < M; j++) {
            accumulator += matrix[j][i].amount;
          }
          let item = (accumulator / N).toFixed(1);
          result.push(Number(item));
        }
        return result;
      }
      const calculatedAverage = countAverege();
      setAverageArr(calculatedAverage);
    }, [M, N, matrix]);
  
    const handleIncrement = (id:number) => {
      const newMatrix = matrix.map((row:Cell[]) =>{
        row.map(item => { 
          if(item.id === id){
            item.amount++;
          }
          return item;
        });
        return row;
      });
      setMatrix(newMatrix);
    }
    const addRow = () => {
      let newMatrixRow:Cell[] = [];
      for (let j = 0; j < N; j++) {
        const amount:CellValue = Math.floor(Math.random() * (M*N));
        const newCell:Cell = {
          id: Number(nanoidNum()),
          amount
        }
        newMatrixRow.push(newCell);
      }
      setMatrix((prevMatrix:Cell[][]) => [...prevMatrix, newMatrixRow]);
      setM( (prevM:number) => prevM + 1);
    }

    const deleteRow = (indexRow:number) => {
      if(matrix.length < 2) return;
      const newMatrix = [...matrix];
      newMatrix.splice(indexRow, 1);
      setMatrix(newMatrix);
      setM( (prevM:number) => prevM - 1);
    }

    return (
        <MatrixContext.Provider value={{  M, setM, N, setN, matrix, setMatrix, averageArr, setAverageArr, createMatrix, handleIncrement, addRow, deleteRow}}>
        {children}
        </MatrixContext.Provider>
    );
};