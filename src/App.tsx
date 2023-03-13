import { useMatrix } from './context/MatrixProvider';
import { nanoid } from 'nanoid';
import Form from './components/GenerateForm';
import Row from './components/Row';
import { Cell } from './types/types';
import './App.css';

const App: React.FC = () => {
  const {  
    M, 
    N, 
    matrix, 
    averageArr, 
    addRow,
  } = useMatrix();
  
  const generateFirstRow = () => {
    let arr:string[] = [];
    for (let j = 0; j <= N; j++) {
      if (j===0) {
        arr.push('Click on row name to delete it');
        
      } else{
        arr.push(`Cell values N = ${j}`);
      }
    }
    return arr;
  }

  const firstRow = generateFirstRow();

  return (
    <div className="App">
      <Form />
      {
        (M !== 0 && N !== 0) && (
          <>
            <table>
              <thead>
                <tr>
                  {
                    firstRow.map( (item, index) => 
                      <th 
                      key={index}
                      >{item}</th>
                    )
                  }
                  <th>Sum values</th>
                </tr>
              </thead>
              <tbody>
                {
                  matrix.map( (row:Cell[], index:number) => 
                    <Row 
                      key={index} 
                      row={row} 
                      indexRow={index} 
                    />
                  )
                }
                <tr>
                  <td 
                  >Average values</td>
                  {
                    averageArr.map( (item:number, idx:number) => 
                      <td 
                      key={idx}
                      >{item}</td>
                    )
                  }
                  <td></td>
                </tr>
              </tbody>
            </table>
      
            <button className="add-row-btn" onClick={addRow}>Add Row</button>
          </>
        )
      }

    </div>
  );
}

export default App;
