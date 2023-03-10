import { useState } from "react";

type Props = {
  onSubmitFoo: (M:number, N:number) => void;
};

const Form: React.FC<Props> = ({onSubmitFoo}) => {
  const [show, setShow] = useState(true);
  const [showError, setShowError] = useState(false);

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
    onSubmitFoo(M, N);
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
          {showError && (<p>The value of M or N must be greater than 0 and less than 100</p>)}
        </>
      )}
    </>
  )
}

export default Form;
