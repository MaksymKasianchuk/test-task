import { useState } from "react";
import { useMatrix } from "../context/MatrixProvider";


const Form: React.FC = () => {
  const [show, setShow] = useState(true);
  const [showError, setShowError] = useState(false);
  const {  
    setM, 
    setN, 
    setMatrix, 
    createMatrix, 
  } = useMatrix();

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      mVal: { value: string };
      nVal: { value: string };
    };
    const M = Number(target.mVal.value); // typechecks!
    const N = Number(target.nVal.value); // typechecks!
    if(M <= 0 || M > 100 || N <= 0 || N > 100){
      setShowError(true);
      return;
    }
    setM(M);
    setN(N);
    const matr = createMatrix(M, N);
    setMatrix(matr);
    setShow(false);
  }

  return (
    <>
      {show && (
        <>
          <h1>Enter the size of matrix</h1>
          <form onSubmit={handleSubmit}>
            <input type="number" name="mVal" placeholder="M value"/>
            <input type="number" name="nVal" placeholder="N value"/>
            <button>Generate</button>
          </form>
          {showError && (<p className="form-error">The value of M or N must be between 0 and 100</p>)}
        </>
      )}
    </>
  )
}

export default Form;
