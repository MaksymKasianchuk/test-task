import { useMatrix } from './context/MatrixProvider';
import { customAlphabet, nanoid } from 'nanoid';
import Form from './components/GenerateForm';
import Row from './components/Row';
import { Cell } from './types/types';
import './App.css';

const App: React.FC = () => {
  const {  
    M, 
    setM, 
    N, 
    setN, 
    matrix, 
    setMatrix, 
    averageArr, 
    createMatrix, 
    handleIncrement, 
    addRow, 
    deleteRow 
  } = useMatrix();

  const onSubmit = (mVal:number, nVal:number) => {
    setM(mVal);
    setN(nVal);
    const matr = createMatrix(mVal, nVal);
    setMatrix(matr);
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
                  matrix.map( (row:Cell[], index:number) => 
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
                    averageArr.map( (item:number) => 
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
