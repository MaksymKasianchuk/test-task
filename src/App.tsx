import { useState } from 'react';
import { customAlphabet, nanoid } from 'nanoid';
import Form from './components/AddRowForm';
import './App.css';

type CellId = number; // unique value for all table
type CellValue = number; // three digit random number

type Cell = {
  id: CellId,
  amount: CellValue
}
const nanoidNum = customAlphabet('1234567890', 3)

const App: React.FC = () => {
  const [ M, setM ] = useState(0);
  const [ N, setN ] = useState(0);
  const [ matrix, setMatrix ] = useState<Cell[][]>([[]]);
  const [ averageArr, setAverageArr ] = useState<number[]>([]);
  const [ sum, setSum ] = useState<number[]>([]);
  
  //generation newCell
  function newCell(id:CellId, maxValue:number){
    const amount:CellValue = Math.floor(Math.random() * maxValue);
    const newCell:Cell = {
      id,
      amount
    }
    return newCell;
  }

  //create matrix
  function createMatrix(vM:number, vN:number){
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
  
  function countSumArr() {
    let result:number[] = [];
    matrix.map((row:Cell[]) => {
      const initialValue = 0;
      return result.push(row.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        initialValue
      ));
    });
    return result;
  }

  function countAverege() {
    let result = [];
    let i, j;
  
    for (i = 0; i < M; i++) {
      console.log(matrix);
      let accumulator = 0;
      for (j = 0; j < N; j++) {
        accumulator += matrix[j][i].amount;
      }
      let item = (accumulator / N).toFixed(1);
      result.push(Number(item));
    }
  
    return result;
  }

  const generateFirstRow = () => {
    let arr:string[] = [];
    for (let j = 0; j <= N; j++) {
      if (j===0) {
        arr.push('');
        
      } else{
        arr.push(`Cell values N = ${j}`);
      }
    }
    return arr;
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
    const countSum = countSumArr();
    const countAv = countAverege();
    setSum(countSum);
    setAverageArr(countAv);
  }

  const deleteRow = (indexRow:number) => {
    if(matrix.length < 3) return;
    const newMatrix = [...matrix];
    newMatrix.splice(indexRow, 1);
    setMatrix(newMatrix);
    const countSum = countSumArr();
    const countAv = countAverege();
    setSum(countSum);
    setAverageArr(countAv);
  }

  const addRow = () => {
    let newMatrixRow:Cell[] = [];
    for (let j = 0; j < N; j++) {
      newMatrixRow.push(newCell(Number(nanoidNum()), (M*N)));
    }
    // console.log(newMatrix);
    setMatrix(prevMatrix => [...prevMatrix, newMatrixRow]);
    const countSum = countSumArr();
    const countAv = countAverege();
    setSum(countSum);
    setAverageArr(countAv);
  }

  const onSubmit = (mVal:number, nVal:number) => {
    setM(mVal);
    setN(nVal);
    const matr = createMatrix(mVal, nVal);
    const countSum = countSumArr();
    const countAv = countAverege();
    setMatrix(matr);
    setSum(countSum);
    setAverageArr(countAv);
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
                  matrix.map( (row:Cell[], index:number) => {
                    return (
                      <tr key={nanoid()}>
                        <td key={nanoid()} onClick={()=>deleteRow(index)}>Cell Value M = {index + 1}</td>
                        {
                          row.map((cell:Cell) => {
                            return (
                              <td 
                              key={cell.id} 
                              onClick={() => handleIncrement(cell.id)}
                              >{cell.amount}</td>
                            )}
                          
                          )
                        }
                        <td key={nanoid()}>{sum[index]}</td>
                      </tr>
                    )
                  })
      
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
