import { useState } from "react";

type Props = {
  onSubmitFoo: (M:number, N:number) => void;
};

const Form: React.FC<Props> = ({onSubmitFoo}) => {
  const [show, setShow] = useState(true);
  
  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      mVal: { value: string };
      nVal: { value: string };
    };
    const M = Number(target.mVal.value); // typechecks!
    const N = Number(target.nVal.value); // typechecks!
    onSubmitFoo(M, N);
    setShow(false);
  }

  return (
    <>
      {show && (
      <form onSubmit={handleSubmit}>
        <input type="number" name="mVal"/>
        <input type="number" name="nVal"/>
        <button>Generate</button>
      </form>
      )}
    </>
  )
}

export default Form;
