    //  //create matrix
    //  const createMatrix = (vM:number, vN:number) => {
    //     let matrixL:Cell[][] = [[]];
    //     for (let i = 0; i < vM; i++) {
    //       matrixL.push(new Array(N));
    //       for (let j = 0; j < vN; j++) {
    //         matrixL[i][j] = newCell(Number(nanoidNum()), (vM*vN));
    //       }
    //     }
    //     matrixL.pop();
    //   return matrixL;
    //   }
      
    //   // const countSumArr = () => {
    //   //   let result:number[] = [];
    //   //   matrix.map((row:Cell[]) => {
    //   //     const initialValue = 0;
    //   //     return result.push(row.reduce(
    //   //       (accumulator, currentValue) => accumulator + currentValue.amount,
    //   //       initialValue
    //   //     ));
    //   //   });
    //   //   return result;
    //   // }
  
    //   const countAverege = () => {
    //     let result = [];
    //     let i, j;
      
    //     for (i = 0; i < M; i++) {
    //       console.log(matrix);
    //       let accumulator = 0;
    //       for (j = 0; j < N; j++) {
    //         accumulator += matrix[j][i].amount;
    //       }
    //       let item = (accumulator / N).toFixed(1);
    //       result.push(Number(item));
    //     }
      
    //     return result;
    //   }
      
    // //generation newCell
    // function newCell(id:CellId, maxValue:number){
    //   const amount:CellValue = Math.floor(Math.random() * maxValue);
    //   const newCell:Cell = {
    //     id,
    //     amount
    //   }
    //   return newCell;
    // }
  
    // const generateFirstRow = () => {
    //   let arr:string[] = [];
    //   for (let j = 0; j <= N; j++) {
    //     if (j===0) {
    //       arr.push('');
          
    //     } else{
    //       arr.push(`Cell values N = ${j}`);
    //     }
    //   }
    //   return arr;
    // }
  
    // const handleIncrement = (id:number) => {
    //   const newMatrix = matrix.map(row =>{
    //     row.map(item => { 
    //       if(item.id === id){
    //         item.amount++;
    //       }
    //       return item;
    //     });
    //     return row;
    //   });
    //   setMatrix(newMatrix);
    // }
  
    // const deleteRow = (indexRow:number) => {
    //   if(matrix.length < 3) return;
    //   const newMatrix = [...matrix];
    //   newMatrix.splice(indexRow, 1);
    //   setMatrix(newMatrix);
    // }
  
    // const addRow = () => {
    //   let newMatrixRow:Cell[] = [];
    //   for (let j = 0; j < N; j++) {
    //     newMatrixRow.push(newCell(Number(nanoidNum()), (M*N)));
    //   }
    //   // console.log(newMatrix);
    //   setMatrix(prevMatrix => [...prevMatrix, newMatrixRow]);
    // }
  
    // const onSubmit = (mVal:number, nVal:number) => {
    //   setM(mVal);
    //   setN(nVal);
    // }
    // const firstRow = generateFirstRow();
  

     {/* <tr>
                  {
                    firstRow.map( item => 
                      <td key={nanoid()}>{item}</td>
                    )
                  }
                  <td key={nanoid()}>Sum values</td>
                </tr> */}