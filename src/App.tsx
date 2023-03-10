import { useState, useEffect } from 'react';
import { customAlphabet, nanoid } from 'nanoid';
import Form from './components/GenerateForm';
import Row from './components/Row';
import './App.css';

type CellId = number; // unique value for all table
type CellValue = number; // three digit random number

type Cell = {
  id: CellId,
  amount: CellValue
}
const nanoidNum = customAlphabet('1234567890', 3);

const App: React.FC = () => {
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

  const onSubmit = (mVal:number, nVal:number) => {
    setM(mVal);
    setN(nVal);
    const matr = createMatrix(mVal, nVal);
    setMatrix(matr);
  }

  const handleIncrement = (id:number) => {
    const newMatrix = matrix.map(row =>{
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
    setMatrix(prevMatrix => [...prevMatrix, newMatrixRow]);
    setM( prevM => prevM + 1);
  }

  const deleteRow = (indexRow:number) => {
    if(matrix.length < 2) return;
    const newMatrix = [...matrix];
    newMatrix.splice(indexRow, 1);
    setMatrix(newMatrix);
    setM( prevM => prevM - 1);
  }
  
  const generateFirstRow = () => {
    let arr:string[] = [];
    for (let j = 0; j <= N; j++) {
      if (j===0) {
        arr.push('Click on row name for delete it');
        
      } else{
        arr.push(`Cell values N = ${j}`);
      }
    }
    return arr;
  }

  const firstRow = generateFirstRow();

  return (
    <div className="App">
      <Form onSubmitFoo={onSubmit} />

      {
        (M !== 0 && N !== 0) && (
          <>
            <table>
              <tbody>
                <tr>
                  {
                    firstRow.map( item => 
                      <td key={nanoid()}>{item}</td>
                    )
                  }
                  <td key={nanoid()}>Sum values</td>
                </tr>
                {
                  matrix.map( (row:Cell[], index) => 
                    <Row 
                      key={nanoid()} 
                      row={row} 
                      indexRow={index} 
                      onClickHandler={handleIncrement} 
                      deleteHandler={deleteRow} 
                    />
                  )
                }
                <tr>
                  <td key={nanoid()}>Average values</td>
                  {
                    averageArr.map( item => 
                      <td key={nanoid()}>{item}</td>
                    )
                  }
                  <td key={nanoid()}></td>
                </tr>
              </tbody>
            </table>
      
            <button onClick={addRow}>Add Row</button>
          </>
        )
      }

    </div>
  );
}

export default App;
